import { fork } from 'redux-saga/effects';

import messagesFlow from './messages';

export default function* rootSaga() {
  yield fork(messagesFlow);
}
