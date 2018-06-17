import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take, takeEvery } from 'redux-saga/effects';

import * as actions from 'actions/special/rpgm';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { rpgmFetch } = actions;

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
    socket.on('rpgm', data => emit(rpgmFetch.success(data)));
    socket.on('disconnect', reason => console.log(reason));
    return () => {};
  });

function* read(socket) {
  const evc = yield call(subscribe, socket);
  while (true) {
    const action = yield take(evc);
    yield put(action);
  }
}

function* fetchRpgm(user) {
  try {
    const uri = `${API_URI}/${user}/special/rpgm/`;
    const response = yield call(axios.get, uri);
    yield put(rpgmFetch.success(user, response.data.data));
  } catch (error) {
    yield put(rpgmFetch.failure(error));
  }
}

function* onRpgmFetchRequest(action) {
  yield call(fetchRpgm, action.user);

  const socket = yield call(connect, action.user, 'rpgm');
  yield fork(read, socket);
}

export default function* rpgmSagas() {
  yield takeEvery(actions.RPGM_FETCH.REQUEST, onRpgmFetchRequest);
}
