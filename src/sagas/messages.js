import axios from 'axios';

import { normalize } from 'normalizr';
import { call, put, takeEvery } from 'redux-saga/effects';

import * as schema from 'actions/schema';
import * as actions from 'actions/messages';
import { API_URI } from 'configurations/constants';

const { messageFetch } = actions;

function* fetchMessages(user) {
  try {
    const uri = `${API_URI}/${user}/messages/`;
    const { data } = yield call(axios.get, uri);
    yield put(
      messageFetch.success(user, normalize(data.data, schema.messageList))
    );
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
