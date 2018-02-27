import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/subscriptions';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { latestSubscriberFetch, subpointFetch } = actions;

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
    socket.on('subscriptions', data => {
      emit(latestSubscriberFetch.success(data.slice(-1)[0]));
    });
    socket.on('subpoints', data => {
      emit(subpointFetch.success(data));
    });

    socket.on('disconnect', () => {
      // TODO: Handle this.
    });

    return () => {};
  });

function* read(user, socket) {
  const ec = yield call(subscribe, user, socket);
  while (true) {
    const action = yield take(ec);
    yield put(action);
  }
}

function* fetchLatestSubscriber() {
  try {
    const uri = `${API_URI}/avalonstar/subscriptions/`;
    const response = yield call(axios.get, uri);
    const payload = response.data.data.slice(-1)[0];
    yield put(latestSubscriberFetch.success(payload));
  } catch (error) {
    yield put(latestSubscriberFetch.failure(error));
  }
}

function* fetchSubpoints(user) {
  try {
    const uri = `${API_URI}/${user}/subpoints/`;
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

function* watchSubpointFetch() {
  const { user } = yield take(actions.SUBPOINT_FETCH.REQUEST);
  yield call(fetchSubpoints, user);

  const socket = yield call(connect, 'subpoints');
  yield fork(read, user, socket);
}

export default function* subscriptionSagas() {
  yield fork(watchLatestSubscriberFetch);
  yield fork(watchSubpointFetch);
}
