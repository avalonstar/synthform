import { action, createRequestTypes } from './utils';

export const MESSAGE_FETCH = createRequestTypes('MESSAGE_FETCH');

export const messageFetch = {
  request: user => action(MESSAGE_FETCH.REQUEST, { user }),
  success: (user, messages) =>
    action(MESSAGE_FETCH.SUCCESS, { user, messages }),
  failure: error => action(MESSAGE_FETCH.FAILURE, { error })
};
