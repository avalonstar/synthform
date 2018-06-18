import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { all, call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/special/whammy';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { whammyFetch, whammyNotifier } = actions;

const cheerWhitelist = ['1000', '2500', '5000', '10000'];

const connect = (user, saga) => {
  const socket = io(`${API_BASE_URI}/${user}`);
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit('channel', { channel: 'api', saga });
      resolve(socket);
    });
  });
};

const subscribe = socket =>
  eventChannel(emit => {
    socket.on('whammy', data => {
      emit(whammyFetch.success(data));
    });

    socket.on('disconnect', () => {
      // TODO: Handle this.
    });

    return () => {};
  });

function* read(socket) {
  const evc = yield call(subscribe, socket);
  while (true) {
    const action = yield take(evc);
    yield put(action);
  }
}

function* triggerNotification() {
  while (true) {
    const action = yield take(actions.WHAMMY_FETCH.SUCCESS);
    const payload = action.payload.events[0];
    if (
      payload.event !== 'cheer' ||
      (payload.event === 'cheer' && cheerWhitelist.includes(payload.bits))
    ) {
      yield put(whammyNotifier.add(payload));
    }
  }
}

function* fetchWhammy(user) {
  try {
    const uri = `${API_URI}/${user}/special/whammy/`;
    const response = yield call(axios.get, uri);
    yield put(whammyFetch.success(response.data.data));
  } catch (error) {
    yield put(whammyFetch.failure(error));
  }
}

function* watchWhammyFetchRequest() {
  const { user } = yield take(actions.WHAMMY_FETCH.REQUEST);
  yield call(fetchWhammy, user);

  const socket = yield call(connect, user, 'whammy');
  yield fork(read, socket);
}

export default function* whammySagas() {
  yield all([fork(watchWhammyFetchRequest), fork(triggerNotification)]);
}
