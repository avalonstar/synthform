import { action, createRequestTypes } from './utils';

export const EVENT_FETCH = createRequestTypes('EVENT_FETCH');

export const eventFetch = {
  request: () => action(EVENT_FETCH.REQUEST),
  success: (payload, lastUpdated) =>
    action(EVENT_FETCH.SUCCESS, { payload, lastUpdated }),
  failure: error => action(EVENT_FETCH.FAILURE, { error })
};
