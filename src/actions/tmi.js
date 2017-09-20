import { action, createRequestTypes } from './utils';

export const TMI_CONNECT = createRequestTypes('TMI_CONNECT');
export const TMI_RECEIVE = createRequestTypes('TMI_RECEIVE');

export const tmiConnect = {
  request: () => action(TMI_CONNECT.REQUEST),
  success: () => action(TMI_CONNECT.SUCCESS),
  failure: error => action(TMI_CONNECT.FAILURE, { error })
};

export const tmiReceive = {
  success: (message, metadata) => action(TMI_RECEIVE, { message, metadata })
};
