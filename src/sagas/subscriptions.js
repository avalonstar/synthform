import axios from 'axios';

import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from 'actions/subscriptions';
import { API_URI } from 'configurations/constants';

const { subpointFetch } = actions;

function* fetchSubpoints(user) {
  try {
    const uri = `${API_URI}/${user}/subpoints/`;
    const { data } = yield call(axios.get, uri);
    yield put(subpointFetch.success(data.data));
  } catch (error) {
    yield put(subpointFetch.failure(error));
  }
}

function* onSubpointFetch(action) {
  yield call(fetchSubpoints, action.user);
}

export default function* subscriptionSagas() {
  yield takeLatest(actions.SUBPOINT_FETCH.REQUEST, onSubpointFetch);
}
