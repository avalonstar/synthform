import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { call, fork, put, take } from 'redux-saga/effects';

import { LISTEN_TO_MESSAGES, getMessages } from 'actions/messages';

const connect = () => {
  const socket = io('http://localhost:3001');
  return new Promise(resolve => {
    socket.on('connect', () => {
      console.log('messages ready!');
      resolve(socket);
    });
  });
};

const subscribe = socket =>
  eventChannel(emit => {
    socket.on('api.avalonstar.messages', data => {
      console.log('received messages!');
      emit(getMessages(data, Date.now()));
    });
    socket.on('disconnect', () => {
      console.log('disconnected!');
    });

    return () => {};
  });

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

export default function* messagesFlow() {
  yield take(LISTEN_TO_MESSAGES);

  const socket = yield call(connect);
  socket.emit('client.message.request');

  yield fork(read, socket);
}
