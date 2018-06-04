/* eslint-disable no-console */

import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take, takeLatest } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import * as schema from 'actions/schema';
import * as actions from 'actions/sockets';
import { emoteFetch } from 'actions/emotes';
import { eventFetch } from 'actions/events';
import { messageFetch } from 'actions/messages';
import { subathonFetch } from 'actions/subathon';
import { subpointFetch } from 'actions/subscriptions';
import { uptimeFetch } from 'actions/uptime';
import { API_BASE_URI } from 'configurations/constants';

const connect = user => {
  const socket = io(`${API_BASE_URI}/${user}`);
  return new Promise(resolve => socket.on('connect', () => resolve(socket)));
};

const subscribe = (socket, user) =>
  eventChannel(emit => {
    socket.on('emotes', data =>
      emit(user, emoteFetch.success(normalize(data, schema.emoteList)))
    );
    socket.on('events', data =>
      emit(eventFetch.success(user, normalize(data, schema.eventList)))
    );
    socket.on('messages', data =>
      emit(messageFetch.success(user, normalize(data, schema.messageList)))
    );
    socket.on('startTime', data => emit(uptimeFetch.success(data)));
    socket.on('subpoints', data => emit(subpointFetch.success(data)));
    socket.on('testevents', data =>
      emit(eventFetch.success(user, normalize(data, schema.eventList)))
    );
    socket.on(`subathon`, data => emit(subathonFetch.success(data)));

    socket.on('disconnect', reason => console.log(reason));
    return () => {};
  });

function* read(socket, user) {
  const evc = yield call(subscribe, socket, user);
  while (true) {
    const action = yield take(evc);
    yield put(action);
  }
}

function* onSocketInitRequest(action) {
  const socket = yield call(connect, action.user);
  yield fork(read, socket, action.user);
}

export default function* socketSagas() {
  yield takeLatest(actions.SOCKET_INIT.REQUEST, onSocketInitRequest);
}
