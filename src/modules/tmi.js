import { fromJS } from 'immutable';

const SETTING_TMI_CONNECTION = 'SETTING_TMI_CONNECTION';
const SETTING_TMI_CONNECTION_SUCCESS = 'SETTING_TMI_CONNECTION_SUCCESS';
const RETURN_LATEST_MESSAGE = 'RETURN_LATEST_MESSAGE';

export function settingTmiConnection() {
  return {
    type: SETTING_TMI_CONNECTION
  };
}

export function settingTmiConnectionSuccess() {
  return {
    type: SETTING_TMI_CONNECTION_SUCCESS
  };
}

export function returnLatestMessage(message, userstate) {
  return {
    type: RETURN_LATEST_MESSAGE,
    message,
    userstate
  };
}

const initialState = fromJS({
  isConnecting: false,
  isConnected: false,
  latestMessage: {}
});

export default function tmi(state = initialState, action) {
  switch (action.type) {
    case SETTING_TMI_CONNECTION:
      return state.merge({
        isConnecting: true,
        isConnected: false
      });
    case SETTING_TMI_CONNECTION_SUCCESS:
      return state.merge({
        isConnecting: false,
        isConnected: true
      });
    case RETURN_LATEST_MESSAGE:
      return state.merge({
        latestMessage: {
          message: action.message,
          userstate: action.userstate
        }
      });
    default:
      return state;
  }
}
