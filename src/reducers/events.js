import * as actions from 'actions/events';

const initialState = {
  isFetching: false,
  error: '',
  events: [],
  notifierPool: [],
  notificationsActive: true
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case actions.EVENT_FETCH.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.EVENT_FETCH.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actions.EVENT_FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        events: action.payload
      };
    case actions.EVENT_NOTIFIER_ADD:
      return {
        ...state,
        notifierPool: [...state.notifierPool, action.event]
      };
    case actions.EVENT_NOTIFIER_DELETE:
      return {
        ...state,
        notifierPool: [...state.notifierPool.slice(1)]
      };
    default:
      return state;
  }
};

export default events;
