import axios from 'axios';
import io from 'socket.io-client';

import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/subscriptions';
import { API_BASE_URI, API_URI } from 'configurations/constants';

const { subpointFetch } = actions;

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

function* fetchSubpoints(user) {
  try {
    const uri = `${API_URI}/${user}/subpoints/`;
    const response = yield call(axios.get, uri);
    yield put(subpointFetch.success(response.data.data));
  } catch (error) {
    yield put(subpointFetch.failure(error));
  }
}

function* watchSubpointFetch() {
  const { user } = yield take(actions.SUBPOINT_FETCH.REQUEST);
  yield call(fetchSubpoints, user);

  const socket = yield call(connect, user, 'subpoints');
  yield fork(read, socket);
}

export default function* subscriptionSagas() {
  yield fork(watchSubpointFetch);
}
