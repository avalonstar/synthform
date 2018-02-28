import { action, createRequestTypes } from './utils';

export const MESSAGE_FETCH = createRequestTypes('MESSAGE_FETCH');

export const messageFetch = {
  request: user => action(MESSAGE_FETCH.REQUEST, { user }),
  success: payload => action(MESSAGE_FETCH.SUCCESS, { payload }),
  failure: error => action(MESSAGE_FETCH.FAILURE, { error })
};
