import { fromJS } from 'immutable';

import { addListener } from 'modules/listeners';
import { listenToMessages } from 'helpers/api';

const SETTING_MESSAGE_LISTENER = 'SETTING_MESSAGE_LISTENER';
const SETTING_MESSAGE_LISTENER_ERROR = 'SETTING_MESSAGE_LISTENER_ERROR';
const SETTING_MESSAGE_LISTENER_SUCCESS = 'SETTING_MESSAGE_LISTENER_SUCCESS';

function settingMessageListener() {
  return {
    type: SETTING_MESSAGE_LISTENER
  };
}

function settingMessageListenerError(error) {
  console.warn(error);
  return {
    type: SETTING_MESSAGE_LISTENER_ERROR,
    error: 'Error fetching messages.'
  };
}

function settingMessageListenerSuccess(channel, payload, lastUpdated) {
  return {
    type: SETTING_MESSAGE_LISTENER_SUCCESS,
    channel,
    payload,
    lastUpdated
  };
}

export function setAndHandleMessageListener(channel) {
  return function execute(dispatch, getState) {
    if (getState().listeners.messages === true) {
      return;
    }

    dispatch(addListener('messages'));
    dispatch(settingMessageListener());

    listenToMessages(
      channel,
      payload => {
        dispatch(settingMessageListenerSuccess(channel, payload, Date.now()));
      },
      error => dispatch(settingMessageListenerError(error))
    );
  };
}

const initialState = fromJS({
  isFetching: false,
  error: ''
});

export default function messages(state = initialState, action) {
  switch (action.type) {
    case SETTING_MESSAGE_LISTENER:
      return state.merge({
        isFetching: true
      });
    case SETTING_MESSAGE_LISTENER_ERROR:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case SETTING_MESSAGE_LISTENER_SUCCESS:
      return state.merge({
        isFetching: false,
        error: '',
        lastUpdated: action.lastUpdated,
        messages: action.messages
      });
    default:
      return state;
  }
}
