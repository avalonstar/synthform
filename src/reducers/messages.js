import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as actions from 'actions/messages';

const allIds = (state = [], action) => {
  if (action.messages) {
    return [...action.messages.result];
  }
  return state;
};

const byId = (state = {}, action) => {
  if (action.messages) {
    return {
      ...state,
      ...action.messages.entities.messages
    };
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actions.MESSAGE_FETCH.REQUEST:
      return true;
    case actions.MESSAGE_FETCH.SUCCESS:
    case actions.MESSAGE_FETCH.FAILURE:
      return false;
    default:
      return state;
  }
};

const messages = combineReducers({
  byId,
  allIds,
  isFetching
});

export default messages;

const getMessagesById = state => state.byId;
const getAllIds = state => state.allIds;

export const getMessages = createSelector(
  [getAllIds, getMessagesById],
  (ids, entities) => ids.map(id => entities[id])
);
