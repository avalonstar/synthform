import * as actions from 'actions/special/whammy';

const initialState = {
  isFetching: false,
  error: '',
  cheers: {},
  events: [],
  notifierPool: []
};

const whammy = (state = initialState, action) => {
  switch (action.type) {
    case actions.WHAMMY_FETCH.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.WHAMMY_FETCH.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actions.WHAMMY_FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        cheers: action.payload.cheers,
        events: action.payload.events
      };
    case actions.WHAMMY_NOTIFIER_ADD:
      return {
        ...state,
        notifierPool: [...state.notifierPool, action.event]
      };
    case actions.WHAMMY_NOTIFIER_DELETE:
      return {
        ...state,
        notifierPool: [...state.notifierPool.slice(1)]
      };
    default:
      return state;
  }
};

export default whammy;
