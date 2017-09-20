import { all, spawn } from 'redux-saga/effects';

import eventSagas from './events';
import messageSagas from './messages';
import songSagas from './songs';
import subscriptionSagas from './subscriptions';
import uptimeSagas from './uptime';

export default function* rootSaga() {
  yield all([
    spawn(eventSagas),
    spawn(messageSagas),
    spawn(songSagas),
    spawn(subscriptionSagas),
    spawn(uptimeSagas)
  ]);
}
