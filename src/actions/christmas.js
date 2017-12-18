import { action, createRequestTypes } from './utils';

export const CHRISTMAS_FETCH = createRequestTypes('CHRISTMAS_FETCH');
export const CHRISTMAS_END_SET = 'CHRISTMAS_END_SET';

export const christmasFetch = {
  request: () => action(CHRISTMAS_FETCH.REQUEST),
  success: payload => action(CHRISTMAS_FETCH.SUCCESS, { payload }),
  failure: error => action(CHRISTMAS_FETCH.FAILURE, { error })
};
