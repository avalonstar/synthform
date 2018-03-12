import axios from 'axios';

import { call, put, takeEvery } from 'redux-saga/effects';

import * as actions from 'actions/messages';
import { API_URI } from 'configurations/constants';

const { messageFetch } = actions;

function* fetchMessages(user) {
  try {
    const uri = `${API_URI}/${user}/messages/`;
    const { data } = yield call(axios.get, uri);
    yield put(messageFetch.success(data.data));
  } catch (error) {
    yield put(messageFetch.failure(error));
  }
}

function* onMessageFetchRequest(action) {
  yield call(fetchMessages, action.user);
}

export default function* messageSagas() {
  yield takeEvery(actions.MESSAGE_FETCH.REQUEST, onMessageFetchRequest);
}
