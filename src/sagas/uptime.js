import axios from 'axios';
import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/uptime';
import { channel } from 'configurations/constants';

const { uptimeFetch } = actions;

function* fetchStartTime() {
  try {
    const uri = `http://localhost:3001/api/${channel}/stream/started/`;
    const response = yield call(axios.get, uri);
    yield put(uptimeFetch.success(response.data.data, Date.now()));
  } catch (error) {
    yield put(uptimeFetch.failure(error));
  }
}

function* watchUptimeFetchRequest() {
  yield take(actions.UPTIME_FETCH.REQUEST);
  yield call(fetchStartTime);
}

export default function* uptimeSagas() {
  yield fork(watchUptimeFetchRequest);
}
