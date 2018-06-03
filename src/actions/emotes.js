import { action, createRequestTypes } from './utils';

export const EMOTE_FETCH = createRequestTypes('EMOTE_FETCH');

export const emoteFetch = {
  request: user => action(EMOTE_FETCH.REQUEST, { user }),
  success: (user, emotes) => action(EMOTE_FETCH.SUCCESS, { user, emotes }),
  failure: error => action(EMOTE_FETCH.FAILURE, { error })
};
