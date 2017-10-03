import { action, createRequestTypes } from './utils';

export const SONG_FETCH = createRequestTypes('SONG_FETCH');

export const songFetch = {
  request: () => action(SONG_FETCH.REQUEST),
  success: (queueSize, currentSong) =>
    action(SONG_FETCH.SUCCESS, { queueSize, currentSong }),
  failure: error => action(SONG_FETCH.FAILURE, { error })
};
