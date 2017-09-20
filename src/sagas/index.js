import { all, fork } from 'redux-saga/effects';

import eventSagas from './events';
import messageSagas from './messages';
import songSagas from './songs';
import subscriptionSagas from './subscriptions';
import uptimeSagas from './uptime';

export default function* rootSaga() {
  yield all([
    fork(eventSagas),
    fork(messageSagas),
    fork(songSagas),
    fork(subscriptionSagas),
    fork(uptimeSagas)
  ]);
}
