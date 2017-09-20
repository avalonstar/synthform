import { action, createRequestTypes } from './utils';

export const SONG_FETCH = createRequestTypes('SONG_FETCH');

export const MESSAGE_FETCH = createRequestTypes('MESSAGE_FETCH');

export const messageFetch = {
  request: () => action(MESSAGE_FETCH.REQUEST),
  success: (payload, lastUpdated) =>
    action(MESSAGE_FETCH.SUCCESS, { payload, lastUpdated }),
  failure: error => action(MESSAGE_FETCH.FAILURE, { error })
};
