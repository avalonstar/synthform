import { fromJS } from 'immutable';

import * as actions from 'actions/subathon';

const initialState = fromJS({
  isFetching: false,
  error: ''
});

const subathon = (state = initialState, action) => {
  switch (action.type) {
    case actions.SUBATHON_FETCH.REQUEST:
      return state.merge({
        isFetching: true
      });
    case actions.SUBATHON_FETCH.FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case actions.SUBATHON_FETCH.SUCCESS:
      return state.merge({
        isFetching: false,
        configuration: action.payload
      });
    default:
      return state;
  }
};

export default subathon;
