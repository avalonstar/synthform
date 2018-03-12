import axios from 'axios';

import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/messages';
import { API_URI } from 'configurations/constants';

const { messageFetch } = actions;

function* fetchMessages(user) {
  try {
    const uri = `${API_URI}/${user}/messages/`;
    const response = yield call(axios.get, uri);
    yield put(messageFetch.success(response.data.data));
  } catch (error) {
    yield put(messageFetch.failure(error));
  }
}

function* watchMessageFetchRequest() {
  const { user } = yield take(actions.MESSAGE_FETCH.REQUEST);
  yield call(fetchMessages, user);
}

export default function* messageSagas() {
  yield fork(watchMessageFetchRequest);
}
