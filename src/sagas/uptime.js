import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/uptime';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { uptimeFetch } = actions;

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
    socket.on(`startTime`, data => {
      emit(uptimeFetch.success(data));
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

function* fetchStartTime(user) {
  try {
    const uri = `${API_URI}/${user}/stream/started/`;
    const response = yield call(axios.get, uri);
    yield put(uptimeFetch.success(response.data.data, Date.now()));
  } catch (error) {
    yield put(uptimeFetch.failure(error));
  }
}

function* watchUptimeFetchRequest() {
  const { user } = yield take(actions.UPTIME_FETCH.REQUEST);
  yield call(fetchStartTime, user);

  const socket = yield call(connect, user, 'uptime');
  yield fork(read, socket);
}

export default function* uptimeSagas() {
  yield fork(watchUptimeFetchRequest);
}
