import { action, createRequestTypes } from './utils';

export const SONG_FETCH = createRequestTypes('SONG_FETCH');

export const songFetch = {
  request: () => action(SONG_FETCH.REQUEST),
  success: payload => action(SONG_FETCH.SUCCESS, { payload }),
  failure: error => action(SONG_FETCH.FAILURE, { error })
};
