import { action, createRequestTypes } from './utils';

export const LATEST_SUBSCRIBER_FETCH = createRequestTypes(
  'LATEST_SUBSCRIBER_FETCH'
);
export const SUBCOUNT_FETCH = createRequestTypes('SUBCOUNT_FETCH');
export const SUBPOINT_FETCH = createRequestTypes('SUBPOINT_FETCH');

export const latestSubscriberFetch = {
  request: () => action(LATEST_SUBSCRIBER_FETCH.REQUEST),
  success: payload => action(LATEST_SUBSCRIBER_FETCH.SUCCESS, { payload }),
  failure: error => action(LATEST_SUBSCRIBER_FETCH.ERROR, { error })
};

export const subcountFetch = {
  request: () => action(SUBCOUNT_FETCH.REQUEST),
  success: payload => action(SUBCOUNT_FETCH.SUCCESS, { payload }),
  failure: error => action(SUBCOUNT_FETCH.ERROR, { error })
};

export const subpointFetch = {
  request: () => action(SUBPOINT_FETCH.REQUEST),
  success: payload => action(SUBPOINT_FETCH.SUCCESS, { payload }),
  failure: error => action(SUBPOINT_FETCH.ERROR, { error })
};
