import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/events';
import { channel } from 'configurations/constants';

const { eventFetch } = actions;

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
    socket.on(`api.${channel}.events`, data => {
      emit(eventFetch.success(data, Date.now()));
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

function* fetchEvents() {
  try {
    const uri = `http://localhost:3001/api/${channel}/events/`;
    const response = yield call(axios.get, uri);
    yield put(eventFetch.success(response.data.data));
  } catch (error) {
    yield put(eventFetch.error(error));
  }
}

function* watchEventFetchRequest() {
  yield take(actions.EVENT_FETCH.REQUEST);
  yield call(fetchEvents);

  const socket = yield call(connect);
  socket.emit('client.event.request');

  yield fork(read, socket);
}

export default function* eventSagas() {
  yield fork(watchEventFetchRequest);
}
