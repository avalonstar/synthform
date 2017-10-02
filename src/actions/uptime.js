import { action, createRequestTypes } from './utils';

export const UPTIME_FETCH = createRequestTypes('UPTIME_FETCH');
export const UPTIME_SET = 'UPTIME_SET';

export const uptimeFetch = {
  request: () => action(UPTIME_FETCH.REQUEST),
  success: startTime => action(UPTIME_FETCH.SUCCESS, { startTime }),
  failure: error => action(UPTIME_FETCH.FAILURE, { error })
};

export const uptimeSet = startTime => action(UPTIME_SET, { startTime });
