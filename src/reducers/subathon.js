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
        isActive: action.payload.active,
        payload: action.payload
      };
    default:
      return state;
  }
};

export default subathon;
