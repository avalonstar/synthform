import { fromJS } from 'immutable';

import * as actions from 'actions/subscriptions';

const initialState = fromJS({});

const subscriptions = (state = initialState, action) => {
  switch (action.type) {
    case actions.LATEST_SUBSCRIBER_FETCH.SUCCESS:
      return state.merge({
        latest: action.payload
      });
    case actions.SUBCOUNT_FETCH.SUCCESS:
      return state.merge({
        subCount: action.payload
      });
    case actions.SUBPOINT_FETCH.SUCCESS:
      return state.merge({
        subPoints: action.payload
      });
    default:
      return state;
  }
};

export default subscriptions;
