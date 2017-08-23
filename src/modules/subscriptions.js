import { fromJS } from 'immutable';

import { addListener } from 'modules/listeners';
import { listenToSubCount, listenToSubPoints } from 'helpers/api';

const SETTING_SUBPOINT_LISTENER = 'SETTING_SUBPOINT_LISTENER';
const SETTING_SUBPOINT_LISTENER_ERROR = 'SETTING_SUBPOINT_LISTENER_ERROR';
const SETTING_SUBPOINT_LISTENER_SUCCESS = 'SETTING_SUBPOINT_LISTENER_SUCCESS';
const SETTING_SUBCOUNT_LISTENER = 'SETTING_SUBCOUNT_LISTENER';
const SETTING_SUBCOUNT_LISTENER_ERROR = 'SETTING_SUBCOUNT_LISTENER_ERROR';
const SETTING_SUBCOUNT_LISTENER_SUCCESS = 'SETTING_SUBCOUNT_LISTENER_SUCCESS';

function settingSubCountListener() {
  return {
    type: SETTING_SUBCOUNT_LISTENER
  };
}

function settingSubCountListenerError(error) {
  console.warn(error);
  return {
    type: SETTING_SUBCOUNT_LISTENER_ERROR,
    error: 'Error fetching sub count.'
  };
}

function settingSubCountListenerSuccess(channel, subCount, lastUpdated) {
  return {
    type: SETTING_SUBCOUNT_LISTENER_SUCCESS,
    channel,
    subCount,
    lastUpdated
  };
}

function settingSubPointListener() {
  return {
    type: SETTING_SUBPOINT_LISTENER
  };
}

function settingSubPointListenerError(error) {
  console.warn(error);
  return {
    type: SETTING_SUBPOINT_LISTENER_ERROR,
    error: 'Error fetching sub points.'
  };
}

function settingSubPointListenerSuccess(channel, subPoints, lastUpdated) {
  return {
    type: SETTING_SUBPOINT_LISTENER_SUCCESS,
    channel,
    subPoints,
    lastUpdated
  };
}

export function setAndHandleSubCountListener(channel) {
  return function(dispatch, getState) {
    if (getState().listeners.subcount === true) {
      return;
    }

    dispatch(addListener('subcount'));
    dispatch(settingSubCountListener());

    listenToSubCount(
      channel,
      payload => {
        dispatch(settingSubCountListenerSuccess(channel, payload, Date.now()));
      },
      error => dispatch(settingSubCountListenerError(error))
    );
  };
}

export function setAndHandleSubPointListener(channel) {
  return function(dispatch, getState) {
    if (getState().listeners.subpoint === true) {
      return;
    }

    dispatch(addListener('subpoint'));
    dispatch(settingSubPointListener());

    listenToSubPoints(
      channel,
      payload => {
        dispatch(settingSubPointListenerSuccess(channel, payload, Date.now()));
      },
      error => dispatch(settingSubPointListenerError(error))
    );
  };
}

const initialState = fromJS({
  isFetchingSubCount: false,
  isFetchingSubPoints: false,
  error: ''
});

export default function subscriptions(state = initialState, action) {
  switch (action.type) {
    case SETTING_SUBCOUNT_LISTENER:
      return state.merge({
        isFetchingSubCount: true
      });
    case SETTING_SUBCOUNT_LISTENER_ERROR:
      return state.merge({
        isFetchingSubCount: false,
        error: action.error
      });
    case SETTING_SUBCOUNT_LISTENER_SUCCESS:
      return state.merge({
        isFetchingSubCount: false,
        error: '',
        lastUpdated: action.lastUpdated,
        subCount: action.subCount
      });
    case SETTING_SUBPOINT_LISTENER:
      return state.merge({
        isFetchingSubPoints: true
      });
    case SETTING_SUBPOINT_LISTENER_ERROR:
      return state.merge({
        isFetchingSubPoints: false,
        error: action.error
      });
    case SETTING_SUBPOINT_LISTENER_SUCCESS:
      return state.merge({
        isFetchingSubPoints: false,
        error: '',
        lastUpdated: action.lastUpdated,
        subPoints: action.subPoints
      });
    default:
      return state;
  }
}
