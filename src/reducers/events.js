import { fromJS } from 'immutable';

import * as actions from 'actions/events';

const initialState = fromJS({
  isFetching: false,
  error: ''
});

const events = (state = initialState, action) => {
  switch (action.type) {
    case actions.EVENT_FETCH.REQUEST:
      return state.merge({
        isFetching: true
      });
    case actions.EVENT_FETCH.ERROR:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case actions.EVENT_FETCH.SUCCESS:
      return state.merge({
        isFetching: false,
        lastUpdated: action.lastUpdated,
        events: action.payload
      });
    default:
      return state;
  }
};

export default events;
