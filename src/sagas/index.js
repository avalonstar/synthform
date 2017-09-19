import { fork } from 'redux-saga/effects';

import messagesFlow from './messages';
import songSagas from './songs';

export default function* rootSaga() {
  yield fork(messagesFlow);
  yield fork(songSagas);
}
