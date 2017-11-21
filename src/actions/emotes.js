import { action, createRequestTypes } from './utils';

export const EMOTE_FETCH = createRequestTypes('EMOTE_FETCH');

export const emoteFetch = {
  request: () => action(EMOTE_FETCH.REQUEST),
  success: payload => action(EMOTE_FETCH.SUCCESS, { payload }),
  failure: error => action(EMOTE_FETCH.FAILURE, { error })
};
