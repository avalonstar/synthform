import { all, spawn } from 'redux-saga/effects';

import christmasSagas from './christmas';
import emoteSagas from './emotes';
import eventSagas from './events';
import messageSagas from './messages';
import socketSagas from './sockets';
import songSagas from './songs';
import subathonSagas from './subathon';
import subscriptionSagas from './subscriptions';
import uptimeSagas from './uptime';

export default function* rootSaga() {
  yield all([
    spawn(christmasSagas),
    spawn(emoteSagas),
    spawn(eventSagas),
    spawn(messageSagas),
    spawn(socketSagas),
    spawn(songSagas),
    spawn(subathonSagas),
    spawn(subscriptionSagas),
    spawn(uptimeSagas)
  ]);
}
