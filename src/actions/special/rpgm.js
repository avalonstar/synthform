import { action, createRequestTypes } from '../utils';

export const RPGM_FETCH = createRequestTypes('RPGM_FETCH');

export const rpgmFetch = {
  request: user => action(RPGM_FETCH.REQUEST, { user }),
  success: (user, rpgm) => action(RPGM_FETCH.SUCCESS, { user, rpgm }),
  failure: error => action(RPGM_FETCH.FAILURE, { error })
};
