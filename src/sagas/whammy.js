import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/whammy';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { whammyFetch } = actions;

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
  yield fork(watchWhammyFetchRequest);
}
