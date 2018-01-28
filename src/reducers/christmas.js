import * as actions from 'actions/christmas';

const initialState = {
  isFetching: false,
  error: ''
};

const christmas = (state = initialState, action) => {
  switch (action.type) {
    case actions.CHRISTMAS_FETCH.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.CHRISTMAS_FETCH.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actions.CHRISTMAS_FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        isBreak: action.payload.isBreak,
        current: action.payload.current || null,
        next: action.payload.next || null
      };
    default:
      return state;
  }
};

export default christmas;
