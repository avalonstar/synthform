import * as actions from 'actions/subscriptions';

const initialState = {
  subPoints: 0
};

const subscriptions = (state = initialState, action) => {
  switch (action.type) {
    case actions.SUBPOINT_FETCH.SUCCESS:
      return {
        ...state,
        subPoints: action.payload
      };
    default:
      return state;
  }
};

export default subscriptions;
