import { all, spawn } from 'redux-saga/effects';

import emoteSagas from './emotes';
import messageSagas from './messages';
import socketSagas from './sockets';
import subscriptionSagas from './subscriptions';
import uptimeSagas from './uptime';

import madnessSagas from './special/madness';

export default function* rootSaga() {
  yield all([
    spawn(emoteSagas),
    spawn(messageSagas),
    spawn(socketSagas),
    spawn(subscriptionSagas),
    spawn(uptimeSagas),

    spawn(madnessSagas)
  ]);
}
