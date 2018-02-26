import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/emotes';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { emoteFetch } = actions;

const connect = saga => {
  const socket = io(`${API_BASE_URI}/avalonstar`);
  return new Promise(resolve => {
    socket.on('connect', () => {
      socket.emit('channel', { channel: 'api', saga });
      resolve(socket);
    });
  });
};

const subscribe = socket =>
  eventChannel(emit => {
    socket.on('emotes', data => {
      emit(emoteFetch.success(data));
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

function* fetchEmotes() {
  try {
    const uri = `${API_URI}/avalonstar/emotes/`;
    const response = yield call(axios.get, uri);
    yield put(emoteFetch.success(response.data.data));
  } catch (error) {
    yield put(emoteFetch.failure(error));
  }
}

function* watchEmoteFetchRequest() {
  yield take(actions.EMOTE_FETCH.REQUEST);
  yield call(fetchEmotes);

  const socket = yield call(connect);
  yield fork(read, socket);
}

export default function* emoteSagas() {
  yield fork(watchEmoteFetchRequest);
}
