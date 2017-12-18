import { fromJS } from 'immutable';

import * as actions from 'actions/christmas';

const initialState = fromJS({
  isFetching: false,
  error: ''
});

const christmas = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHRISTMAS_FETCH.REQUEST:
      return state.merge({
        isFetching: true
      });
    case actions.CHRISTMAS_FETCH.FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case actions.CHRISTMAS_FETCH.SUCCESS:
      return state.merge({
        isFetching: false,
        isBreak: action.payload.isBreak,
        current: action.payload.current || null,
        next: action.payload.next || null
      });
    default:
      return state;
  }
};

export default christmas;
