import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/messages';
import { channel as user } from 'configurations/constants';

const { messageFetch } = actions;

const connect = saga => {
  const socket = io(`http://localhost:3001/${user}`);
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
      emit(messageFetch.success(data, Date.now()));
    });
    socket.on('disconnect', () => {
      // TODO: Handle this.
    });

    return () => {};
  });

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* fetchMessages() {
  try {
    const uri = `http://localhost:3001/api/${user}/messages/`;
    const response = yield call(axios.get, uri);
    yield put(messageFetch.success(response.data.data));
  } catch (error) {
    yield put(messageFetch.failure(error));
  }
}

function* watchMessageFetchRequest() {
  yield take(actions.MESSAGE_FETCH.REQUEST);
  yield call(fetchMessages);

  const socket = yield call(connect, 'messages');
  yield fork(read, socket);
}

export default function* messageSagas() {
  yield fork(watchMessageFetchRequest);
}
