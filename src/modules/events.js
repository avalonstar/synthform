import { fromJS } from 'immutable';

import { addListener } from 'modules/listeners';
import { listenToEvents } from 'helpers/api';

const SETTING_EVENT_LISTENER = 'SETTING_EVENT_LISTENER';
const SETTING_EVENT_LISTENER_ERROR = 'SETTING_EVENT_LISTENER_ERROR';
const SETTING_EVENT_LISTENER_SUCCESS = 'SETTING_EVENT_LISTENER_SUCCESS';

function settingEventListener() {
  return {
    type: SETTING_EVENT_LISTENER
  };
}

function settingEventListenerError(error) {
  console.warn(error);
  return {
    type: SETTING_EVENT_LISTENER_ERROR,
    error: 'Error fetching events.'
  };
}

function settingEventListenerSuccess(channel, events, lastUpdated) {
  return {
    type: SETTING_EVENT_LISTENER_SUCCESS,
    channel,
    events,
    lastUpdated
  };
}

export function setAndHandleEventListener(channel, limit = 15) {
  return function(dispatch, getState) {
    if (getState().listeners.events === true) {
      return;
    }

    dispatch(addListener('events'));
    dispatch(settingEventListener());

    listenToEvents(
      channel,
      limit,
      events => {
        dispatch(settingEventListenerSuccess(channel, events, Date.now()));
      },
      error => dispatch(settingEventListenerError(error))
    );
  };
}

const initialState = fromJS({
  isFetching: false,
  error: ''
});

export default function events(state = initialState, action) {
  switch (action.type) {
    case SETTING_EVENT_LISTENER:
      return state.merge({
        isFetching: true
      });
    case SETTING_EVENT_LISTENER_ERROR:
      return state.merge({
        isFetching: false,
        error: action.error
      });
    case SETTING_EVENT_LISTENER_SUCCESS:
      return state.merge({
        isFetching: false,
        error: '',
        [action.channel]: {
          lastUpdated: action.lastUpdated,
          events: action.events
        }
      });
    default:
      return state;
  }
}
