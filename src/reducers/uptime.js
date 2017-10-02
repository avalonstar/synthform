import { fromJS } from 'immutable';

import * as actions from 'actions/uptime';

const initialState = fromJS({
  isFetching: false,
  error: ''
});

const uptime = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPTIME_FETCH.REQUEST:
      return state.merge({
        isFetching: true
      });
    case actions.UPTIME_FETCH.FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case actions.UPTIME_FETCH.SUCCESS:
      return state.merge({
        isFetching: false,
        startTime: action.startTime
      });
    default:
      return state;
  }
};

export default uptime;
