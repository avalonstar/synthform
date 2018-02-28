import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/messages';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { messageFetch } = actions;

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

function* fetchMessages(user) {
  try {
    const uri = `${API_URI}/${user}/messages/`;
    const response = yield call(axios.get, uri);
    yield put(messageFetch.success(response.data.data));
  } catch (error) {
    yield put(messageFetch.failure(error));
  }
}

function* watchMessageFetchRequest() {
  const { user } = yield take(actions.MESSAGE_FETCH.REQUEST);
  yield call(fetchMessages, user);

  const socket = yield call(connect, user, 'messages');
  yield fork(read, socket);
}

export default function* messageSagas() {
  yield fork(watchMessageFetchRequest);
}
