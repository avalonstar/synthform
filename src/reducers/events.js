import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as actions from 'actions/events';

const allIds = (state = [], action) => {
  if (action.response) {
    return [...action.response.result];
  }
  return state;
};

const byId = (state = {}, action) => {
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.events
    };
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actions.EVENT_FETCH.REQUEST:
      return true;
    case actions.EVENT_FETCH.SUCCESS:
    case actions.EVENT_FETCH.FAILURE:
      return false;
    default:
      return state;
  }
};

const notificationIds = (state = [], action) => {
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
  byId,
  allIds,
  isFetching,
  notificationIds
});

export default events;

const getEventsById = state => state.byId;
const getAllIds = state => state.allIds;
const getNotificationIds = state => state.notificationIds;

export const getEvents = createSelector(
  [getAllIds, getEventsById],
  (ids, entities) => ids.map(id => entities[id])
);

export const getNotifications = createSelector(
  [getNotificationIds, getEventsById],
  (ids, entities) => ids.map(id => entities[id])
);

export const getErrorMessage = state => state.error;
export const getIsFetching = state => state.isFetching;
