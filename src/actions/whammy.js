import { action, createRequestTypes } from './utils';

export const WHAMMY_FETCH = createRequestTypes('WHAMMY_FETCH');
export const WHAMMY_NOTIFIER_ADD = 'WHAMMY_NOTIFIER_ADD';
export const WHAMMY_NOTIFIER_DELETE = 'WHAMMY_NOTIFIER_DELETE';

export const whammyFetch = {
  request: user => action(WHAMMY_FETCH.REQUEST, { user }),
  success: payload => action(WHAMMY_FETCH.SUCCESS, { payload }),
  failure: error => action(WHAMMY_FETCH.FAILURE, { error })
};

export const whammyNotifier = {
  add: event => action(WHAMMY_NOTIFIER_ADD, { event }),
  delete: () => action(WHAMMY_NOTIFIER_DELETE)
};
