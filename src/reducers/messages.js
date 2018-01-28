import * as actions from 'actions/messages';

const initialState = {};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case actions.MESSAGE_FETCH.SUCCESS:
      return {
        ...state,
        messages: action.payload
      };
    default:
      return state;
  }
};

export default messages;
