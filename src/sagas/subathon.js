import axios from 'axios';

import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/subathon';
import { API_URI } from 'configurations/constants';

const { subathonFetch } = actions;

function* fetchSubathonConfiguration(user) {
  try {
    const uri = `${API_URI}/${user}/subathon/configuration/`;
    const response = yield call(axios.get, uri);
    yield put(subathonFetch.success(response.data.data, Date.now()));
  } catch (error) {
    yield put(subathonFetch.failure(error));
  }
}

function* watchSubathonFetchRequest() {
  const { user } = yield take(actions.SUBATHON_FETCH.REQUEST);
  yield call(fetchSubathonConfiguration, user);
}

export default function* subathonSagas() {
  yield fork(watchSubathonFetchRequest);
}
