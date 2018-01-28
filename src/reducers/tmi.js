import * as actions from 'actions/tmi';

const initialState = {
  isConnecting: false,
  isConnected: false,
  latestMessage: {
    message: '',
    metadata: {}
  }
};

const tmi = (state = initialState, action) => {
  switch (action.type) {
    case actions.TMI_CONNECT.REQUEST:
      return {
        ...state,
        isConnecting: true,
        isConnected: false
      };
    case actions.TMI_CONNECT.SUCCESS:
      return {
        ...state,
        isConnecting: false,
        isConnected: true
      };
    case actions.TMI_RECEIVE.SUCCESS:
      return {
        ...state,
        latestMessage: {
          message: action.message,
          metadata: action.metadata
        }
      };
    default:
      return state;
  }
};

export default tmi;
