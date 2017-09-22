import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/subscriptions';
import { channel as user } from 'configurations/constants';

const { latestSubscriberFetch, subcountFetch, subpointFetch } = actions;

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
    socket.on('latestSubscriber', data => {
      emit(latestSubscriberFetch.success(data.slice(-1)[0], Date.now()));
    });
    socket.on('subcount', data => {
      emit(subcountFetch.success(data, Date.now()));
    });
    socket.on('subpoints', data => {
      emit(subpointFetch.success(data, Date.now()));
    });

    socket.on('disconnect', () => {
      // TODO: Handle this.
    });

    return () => {};
  });

function* read(socket) {
  const ec = yield call(subscribe, socket);
  while (true) {
    const action = yield take(ec);
    yield put(action);
  }
}

function* fetchLatestSubscriber() {
  try {
    const uri = `http://localhost:3001/api/${user}/subscriptions/`;
    const response = yield call(axios.get, uri);
    const payload = response.data.data.slice(-1)[0];
    yield put(latestSubscriberFetch.success(payload));
  } catch (error) {
    yield put(latestSubscriberFetch.failure(error));
  }
}

function* fetchSubcount() {
  try {
    const uri = `http://localhost:3001/api/${user}/subcount/`;
    const response = yield call(axios.get, uri);
    yield put(subcountFetch.success(response.data.data));
  } catch (error) {
    yield put(subcountFetch.failure(error));
  }
}

function* fetchSubpoints() {
  try {
    const uri = `http://localhost:3001/api/${user}/subpoints/`;
    const response = yield call(axios.get, uri);
    yield put(subpointFetch.success(response.data.data));
  } catch (error) {
    yield put(subpointFetch.failure(error));
  }
}

function* watchLatestSubscriberFetch() {
  yield take(actions.LATEST_SUBSCRIBER_FETCH.REQUEST);
  yield call(fetchLatestSubscriber);

  const socket = yield call(connect, 'latestSubscriber');
  yield fork(read, socket);
}

function* watchSubcountFetch() {
  yield take(actions.SUBCOUNT_FETCH.REQUEST);
  yield call(fetchSubcount);

  const socket = yield call(connect, 'subcount');
  yield fork(read, socket);
}

function* watchSubpointFetch() {
  yield take(actions.SUBPOINT_FETCH.REQUEST);
  yield call(fetchSubpoints);

  const socket = yield call(connect, 'subpoints');
  yield fork(read, socket);
}

export default function* subscriptionSagas() {
  yield fork(watchLatestSubscriberFetch);
  yield fork(watchSubcountFetch);
  yield fork(watchSubpointFetch);
}
