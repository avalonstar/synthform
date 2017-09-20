import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { all, call, fork, put, select, take } from 'redux-saga/effects';

import * as actions from 'actions/events';
import { channel } from 'configurations/constants';

const { eventFetch, eventNotifier } = actions;

let debugMode = false;
let shouldNotify = true;

const blacklistedEvents = ['follow', 'cheer', 'autohost'];
const getShouldNotify = state => state.events.get('notificationsActive');

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
    const requestPath = debugMode ? 'testevents' : 'events';
    socket.on(`api.${channel}.${requestPath}`, data => {
      emit(eventFetch.success(data, Date.now()));
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

function* triggerNotification() {
  while (true) {
    const action = yield take(actions.EVENT_FETCH.SUCCESS);
    if (shouldNotify && !blacklistedEvents.includes(action.payload[0].event)) {
      yield put(eventNotifier.add(action.payload[0]));
    }

    shouldNotify = yield select(getShouldNotify);
  }
}

function* fetchEvents() {
  try {
    const requestPath = debugMode ? 'testEvents' : 'events';
    const uri = `http://localhost:3001/api/${channel}/${requestPath}/`;
    const response = yield call(axios.get, uri);

    shouldNotify = false;
    yield put(eventFetch.success(response.data.data));
  } catch (error) {
    yield put(eventFetch.failure(error));
  }
}

function* watchEventFetchRequest() {
  const request = yield take(actions.EVENT_FETCH.REQUEST);
  debugMode = request.debugMode;
  yield call(fetchEvents);

  const socket = yield call(connect);
  socket.emit('client.event.request');

  yield fork(read, socket);
}

export default function* eventSagas() {
  yield all([fork(watchEventFetchRequest), fork(triggerNotification)]);
}
