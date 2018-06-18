import axios from 'axios';
import io from 'socket.io-client';

import { normalize } from 'normalizr';
import { eventChannel } from 'redux-saga';
import {
  all,
  call,
  fork,
  put,
  take,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import * as schema from 'actions/schema';
import * as actions from 'actions/special/madness';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { madnessFetch, madnessNotifier } = actions;

let initialEvent = {};
let shouldNotify = true;

const connect = (user, saga) => {
  const socket = io(`${API_BASE_URI}/${user}`);
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit('channel', { channel: 'api', saga });
      resolve(socket);
    });
  });
};

const subscribe = (user, socket) =>
  eventChannel(emit => {
    socket.on('madness', data =>
      emit(
        madnessFetch.success(
          user,
          data.cheers,
          normalize(data.events, schema.eventList)
        )
      )
    );
    socket.on('disconnect', reason => console.log(reason)); // eslint-disable-line
    return () => {};
  });

function* read(user, socket) {
  const evc = yield call(subscribe, user, socket);
  while (true) {
    const action = yield take(evc);
    yield put(action);
  }
}

function* triggerNotification(action) {
  shouldNotify = true;

  const event = action.madnessEvents.result[0];
  if (event === initialEvent) {
    shouldNotify = false;
  }
  if (shouldNotify) {
    yield put(madnessNotifier.add(event));
  }
}

function* fetchMadness(user) {
  try {
    const uri = `${API_URI}/${user}/special/madness/`;
    const { data } = yield call(axios.get, uri);
    initialEvent = data.data.events[0].id; // eslint-disable-line

    shouldNotify = false;
    yield put(
      madnessFetch.success(
        user,
        data.data.cheers,
        normalize(data.data.events, schema.eventList)
      )
    );
  } catch (error) {
    yield put(madnessFetch.failure(error));
  }
}

function* onMadnessFetchRequest(action) {
  yield call(fetchMadness, action.user);

  const socket = yield call(connect, action.user, 'madness');
  yield fork(read, action.user, socket);
}

export default function* madnessSagas() {
  yield all([
    takeLatest(actions.MADNESS_FETCH.REQUEST, onMadnessFetchRequest),
    takeEvery(actions.MADNESS_FETCH.SUCCESS, triggerNotification)
  ]);
}
