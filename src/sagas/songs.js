import axios from 'axios';

import { call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/songs';
import { nightbotID } from 'configurations/constants';

const { songFetch } = actions;

const POLLING_DELAY = 30 * 1000;

function delay(ms) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), ms);
  });
  return promise;
}

function* fetchSongs() {
  try {
    yield call(delay, POLLING_DELAY);
    const uri = `https://api.nightbot.tv/1/song_requests/queue?channel=${nightbotID}`;
    const response = yield call(axios.get, uri);
    yield put(songFetch.success(response.data));
  } catch (error) {
    yield put(songFetch.error(error));
  }
}

export function* watchSongFetchRequest() {
  while (true) {
    yield call(fetchSongs);
  }
}

export default function* songSagas() {
  yield fork(watchSongFetchRequest);
}
