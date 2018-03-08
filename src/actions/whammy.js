import { action, createRequestTypes } from './utils';

export const WHAMMY_FETCH = createRequestTypes('WHAMMY_FETCH');

export const whammyFetch = {
  request: user => action(WHAMMY_FETCH.REQUEST, { user }),
  success: payload => action(WHAMMY_FETCH.SUCCESS, { payload }),
  failure: error => action(WHAMMY_FETCH.FAILURE, { error })
};
