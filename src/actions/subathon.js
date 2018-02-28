import { action, createRequestTypes } from './utils';

export const SUBATHON_FETCH = createRequestTypes('SUBATHON_FETCH');
export const SUBATHON_END_SET = 'SUBATHON_END_SET';

export const subathonFetch = {
  request: user => action(SUBATHON_FETCH.REQUEST, { user }),
  success: payload => action(SUBATHON_FETCH.SUCCESS, { payload }),
  failure: error => action(SUBATHON_FETCH.FAILURE, { error })
};

export const subathonEndSet = endTime => action(SUBATHON_END_SET, { endTime });
