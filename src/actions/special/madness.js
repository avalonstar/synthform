import { action, createRequestTypes } from '../utils';

export const MADNESS_FETCH = createRequestTypes('MADNESS_FETCH');
export const MADNESS_NOTIFIER_ADD = 'MADNESS_NOTIFIER_ADD';
export const MADNESS_NOTIFIER_DELETE = 'MADNESS_NOTIFIER_DELETE';

export const madnessFetch = {
  request: user => action(MADNESS_FETCH.REQUEST, { user }),
  success: (user, madnessCheers, madnessEvents) =>
    action(MADNESS_FETCH.SUCCESS, { user, madnessCheers, madnessEvents }),
  failure: error => action(MADNESS_FETCH.FAILURE, { error })
};

export const madnessNotifier = {
  add: event => action(MADNESS_NOTIFIER_ADD, { event }),
  delete: () => action(MADNESS_NOTIFIER_DELETE)
};
