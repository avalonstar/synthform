import { action, createRequestTypes } from './utils';

export const SUBPOINT_FETCH = createRequestTypes('SUBPOINT_FETCH');

export const subpointFetch = {
  request: user => action(SUBPOINT_FETCH.REQUEST, { user }),
  success: payload => action(SUBPOINT_FETCH.SUCCESS, { payload }),
  failure: error => action(SUBPOINT_FETCH.FAILURE, { error })
};
