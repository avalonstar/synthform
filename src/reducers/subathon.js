import * as actions from 'actions/subathon';

const initialState = {
  isFetching: false,
  error: ''
};

const subathon = (state = initialState, action) => {
  switch (action.type) {
    case actions.SUBATHON_FETCH.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.SUBATHON_FETCH.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actions.SUBATHON_FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        active: action.payload.active,
        addedMinutes: action.payload.addedMinutes,
        contributionCap: action.payload.contributionCap,
        elapsedTime: action.payload.elapsedTime,
        remainingTime: action.payload.remainingTime,
        endTimestamp: action.payload.endTimestamp,
        startTimestamp: action.payload.startTimestamp
      };
    default:
      return state;
  }
};

export default subathon;
