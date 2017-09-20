import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/uptime';
import { channel } from 'configurations/constants';

const { uptimeFetch } = actions;

const connect = () => {
  const socket = io('http://localhost:3001');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const subscribe = socket =>
  eventChannel(emit => {
    socket.on(`api.${channel}.startTime`, data => {
      emit(uptimeFetch.success(data, Date.now()));
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

function* fetchStartTime() {
  try {
    const uri = `http://localhost:3001/api/${channel}/stream/started/`;
    const response = yield call(axios.get, uri);
    yield put(uptimeFetch.success(response.data.data, Date.now()));
  } catch (error) {
    yield put(uptimeFetch.failure(error));
  }
}

function* watchUptimeFetchRequest() {
  yield take(actions.UPTIME_FETCH.REQUEST);
  yield call(fetchStartTime);

  const socket = yield call(connect);
  socket.emit('client.starttime.request');

  yield fork(read, socket);
}

export default function* uptimeSagas() {
  yield fork(watchUptimeFetchRequest);
}
