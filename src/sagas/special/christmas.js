import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/special/christmas';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { christmasFetch } = actions;

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
    socket.on(`christmas`, data => {
      emit(christmasFetch.success(data));
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

function* fetchChristmasConfiguration(user) {
  try {
    const uri = `${API_URI}/${user}/special/christmas/`;
    const response = yield call(axios.get, uri);
    yield put(christmasFetch.success(response.data.data, Date.now()));
  } catch (error) {
    yield put(christmasFetch.failure(error));
  }
}

function* watchChristmasFetchRequest() {
  const { user } = yield take(actions.CHRISTMAS_FETCH.REQUEST);
  yield call(fetchChristmasConfiguration, user);

  const socket = yield call(connect, user, 'christmas');
  yield fork(read, socket);
}

export default function* christmasSagas() {
  yield fork(watchChristmasFetchRequest);
}
