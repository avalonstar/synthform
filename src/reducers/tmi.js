import { fromJS } from 'immutable';

import * as actions from 'actions/tmi';

const initialState = fromJS({
  isConnecting: false,
  isConnected: false,
  latestMessage: {
    message: '',
    metadata: {}
  }
});

const tmi = (state = initialState, action) => {
  switch (action.type) {
    case actions.TMI_CONNECT.REQUEST:
      return state.merge({
        isConnecting: true,
        isConnected: false
      });
    case actions.TMI_CONNECT.SUCCESS:
      return state.merge({
        isConnecting: false,
        isConnected: true
      });
    case actions.TMI_RECEIVE.SUCCESS:
      return state.merge({
        latestMessage: {
          message: action.message,
          metadata: action.metadata
        }
      });
    default:
      return state;
  }
};

export default tmi;
