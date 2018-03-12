import axios from 'axios';

import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from 'actions/uptime';
import { API_URI } from 'configurations/constants';

const { uptimeFetch } = actions;

function* fetchStartTime(user) {
  try {
    const uri = `${API_URI}/${user}/stream/started/`;
    const { data } = yield call(axios.get, uri);
    yield put(uptimeFetch.success(data.data, Date.now()));
  } catch (error) {
    yield put(uptimeFetch.failure(error));
  }
}

function* onUptimeFetchRequest(action) {
  yield call(fetchStartTime, action.user);
}

export default function* uptimeSagas() {
  yield takeLatest(actions.UPTIME_FETCH.REQUEST, onUptimeFetchRequest);
}
