import { action, createRequestTypes } from './utils';

export const SONG_FETCH = createRequestTypes('SONG_FETCH');

export const songFetch = {
  request: () => action(SONG_FETCH.REQUEST),
  success: song => action(SONG_FETCH.SUCCESS, { song }),
  failure: error => action(SONG_FETCH.FAILURE, { error })
};
