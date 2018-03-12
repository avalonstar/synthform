/* eslint-disable no-underscore-dangle */

import axios from 'axios';

import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

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
    yield call(delay, 30 * 1000);
    const uri = `https://api.nightbot.tv/1/song_requests/queue?channel=${nightbotID}`;
    const response = yield call(axios.get, uri);
    const {
      createdAt: requested,
      track: { artist, title },
      user: { displayName: user }
    } = response.data._currentSong;
    let { track: { duration } } = response.data._currentSong;
    duration = new Date(parseInt(duration, 10) * 1000)
      .toISOString()
      .substr(14, 5);

    const currentSong = { user, requested, artist, title, duration };
    yield put(songFetch.success(response.data._total, currentSong));
  } catch (error) {
    yield put(songFetch.failure(error));
  }
}

export default function* songSagas() {
  yield all([
    takeLatest(actions.SONG_FETCH.REQUEST, fetchSongs),
    takeEvery(actions.SONG_FETCH.SUCCESS, fetchSongs)
  ]);
}
