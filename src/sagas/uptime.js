import axios from 'axios';

import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/uptime';
import { API_URI } from 'configurations/constants';

const { uptimeFetch } = actions;

function* fetchStartTime(user) {
  try {
    const uri = `${API_URI}/${user}/stream/started/`;
    const response = yield call(axios.get, uri);
    yield put(uptimeFetch.success(response.data.data, Date.now()));
  } catch (error) {
    yield put(uptimeFetch.failure(error));
  }
}

function* watchUptimeFetchRequest() {
  const { user } = yield take(actions.UPTIME_FETCH.REQUEST);
  yield call(fetchStartTime, user);
}

export default function* uptimeSagas() {
  yield fork(watchUptimeFetchRequest);
}
