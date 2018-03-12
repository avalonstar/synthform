import axios from 'axios';

import { call, put, takeLatest } from 'redux-saga/effects';

import * as actions from 'actions/subathon';
import { API_URI } from 'configurations/constants';

const { subathonFetch } = actions;

function* fetchSubathonConfiguration(user) {
  try {
    const uri = `${API_URI}/${user}/subathon/configuration/`;
    const { data } = yield call(axios.get, uri);
    yield put(subathonFetch.success(data.data, Date.now()));
  } catch (error) {
    yield put(subathonFetch.failure(error));
  }
}

function* onSubathonFetchRequest(action) {
  yield call(fetchSubathonConfiguration, action.user);
}

export default function* subathonSagas() {
  yield takeLatest(actions.SUBATHON_FETCH.REQUEST, onSubathonFetchRequest);
}
