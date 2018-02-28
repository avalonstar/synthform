import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/subathon';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { subathonFetch } = actions;

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
    socket.on(`subathon`, data => {
      emit(subathonFetch.success(data));
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

function* fetchSubathonConfiguration(user) {
  try {
    const uri = `${API_URI}/${user}/subathon/configuration/`;
    const response = yield call(axios.get, uri);
    yield put(subathonFetch.success(response.data.data, Date.now()));
  } catch (error) {
    yield put(subathonFetch.failure(error));
  }
}

function* watchSubathonFetchRequest() {
  const { user } = yield take(actions.SUBATHON_FETCH.REQUEST);
  yield call(fetchSubathonConfiguration, user);

  const socket = yield call(connect, user, 'subathon');
  yield fork(read, socket);
}

export default function* subathonSagas() {
  yield fork(watchSubathonFetchRequest);
}
