import { fork } from 'redux-saga/effects';

import eventSagas from './events';
import messageSagas from './messages';
import songSagas from './songs';
import subscriptionSagas from './subscriptions';

export default function* rootSaga() {
  yield fork(eventSagas);
  yield fork(messageSagas);
  yield fork(songSagas);
  yield fork(subscriptionSagas);
}
