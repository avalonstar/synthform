import { action, createRequestTypes } from './utils';

export const SOCKET_INIT = createRequestTypes('SOCKET_INIT');

export const socketInit = {
  request: user => action(SOCKET_INIT.REQUEST, { user }),
  success: () => action(SOCKET_INIT.SUCCESS),
  failure: error => action(SOCKET_INIT.FAILURE, { error })
};
