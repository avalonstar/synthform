import { combineReducers } from 'redux';

import * as actions from 'actions/special/madness';

const notifications = (state = [], action) => {
  switch (action.type) {
    case actions.MADNESS_NOTIFIER_ADD:
      return [...state, action.event];
    case actions.MADNESS_NOTIFIER_DELETE:
      return [...state.slice(1)];
    default:
      return state;
  }
};

const madness = combineReducers({
  notifications
});

export default madness;

export const getNotifications = state => state.notifications;
