import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import * as actions from 'actions/emotes';

const allIds = (state = [], action) => {
  if (action.emotes) {
    return [...action.emotes.result];
  }
  return state;
};

const byId = (state = {}, action) => {
  if (action.emotes) {
    return {
      ...state,
      ...action.emotes.entities.emotes
    };
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actions.EMOTE_FETCH.REQUEST:
      return true;
    case actions.EMOTE_FETCH.SUCCESS:
    case actions.EMOTE_FETCH.FAILURE:
      return false;
    default:
      return state;
  }
};

const emotes = combineReducers({
  byId,
  allIds,
  isFetching
});

export default emotes;

const getEmotesById = state => state.byId;
const getAllIds = state => state.allIds;

export const getEmotes = createSelector(
  [getAllIds, getEmotesById],
  (ids, entities) => ids.map(id => entities[id])
);
