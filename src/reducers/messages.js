import { fromJS } from 'immutable';

import * as actions from 'actions/messages';

const initialState = fromJS({});

const messages = (state = initialState, action) => {
  switch (action.type) {
    case actions.MESSAGE_FETCH.SUCCESS:
      return state.merge({
        messages: action.payload
      });
    default:
      return state;
  }
};

export default messages;
