import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as actions from 'actions/special/madness';

const allIds = (state = [], action) => {
  if (action.madnessEvents) {
    return [...action.madnessEvents.result];
  }
  return state;
};

const byId = (state = {}, action) => {
  if (action.madnessEvents) {
    return {
      ...state,
      ...action.madnessEvents.entities.events
    };
  }
  return state;
};

const cheers = (state = {}, action) => {
  if (action.madnessCheers) {
    return action.madnessCheers;
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actions.MADNESS_FETCH.REQUEST:
      return true;
    case actions.MADNESS_FETCH.SUCCESS:
    case actions.MADNESS_FETCH.FAILURE:
      return false;
    default:
      return state;
  }
};

const notificationIds = (state = [], action) => {
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
  byId,
  allIds,
  cheers,
  isFetching,
  notificationIds
});

export default madness;

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

export const getCheers = state => state.cheers;
export const getErrorMessage = state => state.error;
export const getIsFetching = state => state.isFetching;
