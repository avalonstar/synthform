import axios from 'axios';

import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/subscriptions';
import { API_URI } from 'configurations/constants';

const { subpointFetch } = actions;

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
}

export default function* subscriptionSagas() {
  yield fork(watchSubpointFetch);
}
