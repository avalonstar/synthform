import { fromJS } from 'immutable';

import { GET_MESSAGES } from '../actions/messages';

const initialState = fromJS({});

export default function messages(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      console.log('messages reducer!');
      return state.merge({
        lastUpdated: action.lastUpdated,
        messages: action.payload
      });
    default:
      return state;
  }
}
