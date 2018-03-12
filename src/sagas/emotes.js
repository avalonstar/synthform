import axios from 'axios';

import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/emotes';
import { API_URI } from 'configurations/constants';

const { emoteFetch } = actions;

function* fetchEmotes(user) {
  try {
    const uri = `${API_URI}/${user}/emotes/`;
    const response = yield call(axios.get, uri);
    yield put(emoteFetch.success(response.data.data));
  } catch (error) {
    yield put(emoteFetch.failure(error));
  }
}

function* watchEmoteFetchRequest() {
  const { user } = yield take(actions.EMOTE_FETCH.REQUEST);
  yield call(fetchEmotes, user);
}

export default function* emoteSagas() {
  yield fork(watchEmoteFetchRequest);
}
