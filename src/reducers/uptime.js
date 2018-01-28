import * as actions from 'actions/uptime';

const initialState = {
  isFetching: false,
  error: ''
};

const uptime = (state = initialState, action) => {
  switch (action.type) {
    case actions.UPTIME_FETCH.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.UPTIME_FETCH.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actions.UPTIME_FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        startTime: action.startTime
      };
    default:
      return state;
  }
};

export default uptime;
