import { combineReducers } from 'redux';

import * as actions from 'actions/special/rpgm';

const cheers = (state = {}, action) => {
  if (action.rpgm) {
    return state;
  }
  return state;
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case actions.RPGM_FETCH.REQUEST:
      return true;
    case actions.RPGM_FETCH.SUCCESS:
    case actions.RPGM_FETCH.FAILURE:
      return false;
    default:
      return state;
  }
};

const notifications = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const rpgm = combineReducers({
  cheers,
  isFetching,
  notifications
});

export default rpgm;

export const getCheers = state => state.cheers;
export const getNotifications = state => state.notifications;
export const getErrorMessage = state => state.error;
export const getIsFetching = state => state.isFetching;
