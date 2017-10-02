import axios from 'axios';

import { all, call, fork, put, take } from 'redux-saga/effects';

import * as actions from 'actions/songs';
import { nightbotID } from 'configurations/constants';

const { songFetch } = actions;

function delay(ms) {
  const promise = new Promise(resolve => {
    setTimeout(() => resolve(true), ms);
  });
  return promise;
}

function* fetchSongs() {
  try {
    yield call(delay, 3 * 1000);
    const uri = `https://api.nightbot.tv/1/song_requests/queue?channel=${nightbotID}`;
    const response = yield call(axios.get, uri);
    yield put(songFetch.success(response.data));
  } catch (error) {
    yield put(songFetch.error(error));
  }
}

function* watchInitialSongFetchRequest() {
  yield take(actions.SONG_FETCH.REQUEST);
  yield call(fetchSongs);
}

function* watchSongFetchRequest() {
  while (true) {
    yield take(actions.SONG_FETCH.SUCCESS);
    yield call(fetchSongs);
  }
}

export default function* songSagas() {
  yield all([fork(watchInitialSongFetchRequest), fork(watchSongFetchRequest)]);
}
