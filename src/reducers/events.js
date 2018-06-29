import { combineReducers } from 'redux';

import * as actions from 'actions/events';

const notifications = (state = [], action) => {
  switch (action.type) {
    case actions.EVENT_NOTIFIER_ADD:
      return [...state, action.event];
    case actions.EVENT_NOTIFIER_DELETE:
      return [...state.slice(1)];
    default:
      return state;
  }
};

const events = combineReducers({
  notifications
});

export default events;

export const getNotifications = state => state.notifications;
