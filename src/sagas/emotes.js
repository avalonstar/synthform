import axios from 'axios';

import { normalize } from 'normalizr';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as schema from 'actions/schema';
import * as actions from 'actions/emotes';
import { API_URI } from 'configurations/constants';

const { emoteFetch } = actions;

function* fetchEmotes(user) {
  try {
    const uri = `${API_URI}/${user}/emotes/`;
    const { data } = yield call(axios.get, uri);
    yield put(emoteFetch.success(user, normalize(data.data, schema.emoteList)));
  } catch (error) {
    yield put(emoteFetch.failure(error));
  }
}

function* onEmoteFetchRequest(action) {
  yield call(fetchEmotes, action.user);
}

export default function* emoteSagas() {
  yield takeLatest(actions.EMOTE_FETCH.REQUEST, onEmoteFetchRequest);
}
