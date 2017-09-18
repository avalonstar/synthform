export const LISTEN_TO_MESSAGES = 'LISTEN_TO_MESSAGES';
export const GET_MESSAGES = 'GET_MESSAGES';

export function listenToMessages() {
  return {
    type: LISTEN_TO_MESSAGES
  };
}

export function getMessages(payload, lastUpdated) {
  console.log('messages!');
  return {
    type: GET_MESSAGES,
    payload,
    lastUpdated
  };
}
