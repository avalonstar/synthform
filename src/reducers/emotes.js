import { fromJS } from 'immutable';

import * as actions from 'actions/emotes';

const initialState = fromJS({
  isFetching: false,
  error: ''
});

const emotes = (state = initialState, action) => {
  switch (action.type) {
    case actions.EMOTE_FETCH.REQUEST:
      return state.merge({
        isFetching: true
      });
    case actions.EMOTE_FETCH.FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case actions.EMOTE_FETCH.SUCCESS:
      return state.merge({
        isFetching: false,
        emotes: action.payload
      });
    default:
      return state;
  }
};

export default emotes;
