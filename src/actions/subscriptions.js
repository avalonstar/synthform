import { action, createRequestTypes } from './utils';

export const LATEST_SUBSCRIBER_FETCH = createRequestTypes(
  'LATEST_SUBSCRIBER_FETCH'
);
export const SUBPOINT_FETCH = createRequestTypes('SUBPOINT_FETCH');

export const latestSubscriberFetch = {
  request: () => action(LATEST_SUBSCRIBER_FETCH.REQUEST),
  success: payload => action(LATEST_SUBSCRIBER_FETCH.SUCCESS, { payload }),
  failure: error => action(LATEST_SUBSCRIBER_FETCH.FAILURE, { error })
};

export const subpointFetch = {
  request: () => action(SUBPOINT_FETCH.REQUEST),
  success: payload => action(SUBPOINT_FETCH.SUCCESS, { payload }),
  failure: error => action(SUBPOINT_FETCH.FAILURE, { error })
};
