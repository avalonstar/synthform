import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/messages';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { messageFetch } = actions;

const connect = () => {
  const socket = io(`${API_BASE_URI}/avalonstar`);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const subscribe = socket =>
  eventChannel(emit => {
    socket.on('messages', data => {
      emit(messageFetch.success(data));
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

function* fetchMessages() {
  try {
    const uri = `${API_URI}/avalonstar/messages/`;
    const response = yield call(axios.get, uri);
    yield put(messageFetch.success(response.data.data));
  } catch (error) {
    yield put(messageFetch.failure(error));
  }
}

function* watchMessageFetchRequest() {
  yield take(actions.MESSAGE_FETCH.REQUEST);
  yield call(fetchMessages);

  const socket = yield call(connect);
  yield fork(read, socket);
}

export default function* messageSagas() {
  yield fork(watchMessageFetchRequest);
}
