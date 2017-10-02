import { fromJS } from 'immutable';

import * as actions from 'actions/events';

const initialState = fromJS({
  isFetching: false,
  error: '',
  notifierPool: [],
  notificationsActive: true
});

const events = (state = initialState, action) => {
  switch (action.type) {
    case actions.EVENT_FETCH.REQUEST:
      return state.merge({
        isFetching: true
      });
    case actions.EVENT_FETCH.ERROR:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case actions.EVENT_FETCH.SUCCESS:
      return state.merge({
        isFetching: false,
        events: action.payload
      });
    case actions.EVENT_NOTIFIER_ADD:
      return state.merge({
        notifierPool: state.get('notifierPool').push(action.event)
      });
    case actions.EVENT_NOTIFIER_DELETE:
      return state.merge({
        notifierPool: state.get('notifierPool').delete(0)
      });
    default:
      return state;
  }
};

export default events;
