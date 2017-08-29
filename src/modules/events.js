import { fromJS } from 'immutable';

import { addListener } from 'modules/listeners';
import { listenToEvents } from 'helpers/api';

const SETTING_EVENT_LISTENER = 'SETTING_EVENT_LISTENER';
const SETTING_EVENT_LISTENER_ERROR = 'SETTING_EVENT_LISTENER_ERROR';
const SETTING_EVENT_LISTENER_SUCCESS = 'SETTING_EVENT_LISTENER_SUCCESS';
const ADD_EVENT_TO_NOTIFIER = 'ADD_EVENT_TO_NOTIFIER';
const REMOVE_EVENT_FROM_NOTIFIER = 'REMOVE_EVENT_FROM_NOTIFIER';

const blacklistedEvents = ['follow', 'cheer', 'autohost'];

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

function settingEventListenerSuccess(channel, payload, lastUpdated) {
  return {
    type: SETTING_EVENT_LISTENER_SUCCESS,
    channel,
    payload,
    lastUpdated
  };
}

function addEventToNotifier(event) {
  return {
    type: ADD_EVENT_TO_NOTIFIER,
    event
  };
}

export function removeEventFromNotifier() {
  return {
    type: REMOVE_EVENT_FROM_NOTIFIER
  };
}

export function setAndHandleEventListener(channel, limit = 20) {
  return function execute(dispatch, getState) {
    if (getState().listeners.events === true) {
      return;
    }

    dispatch(addListener('events'));
    dispatch(settingEventListener());

    listenToEvents(
      channel,
      limit,
      payload => {
        dispatch(settingEventListenerSuccess(channel, payload, Date.now()));
        if (!blacklistedEvents.includes(payload[0].event)) {
          dispatch(addEventToNotifier(payload[0]));
        }
      },
      error => dispatch(settingEventListenerError(error))
    );
  };
}

const initialState = fromJS({
  isFetching: false,
  error: '',
  notifierPool: []
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
        lastUpdated: action.lastUpdated,
        events: action.payload
      });
    case ADD_EVENT_TO_NOTIFIER:
      return state.merge({
        notifierPool: state.get('notifierPool').push(action.event)
      });
    case REMOVE_EVENT_FROM_NOTIFIER:
      return state.merge({
        notifierPool: state.get('notifierPool').delete(0)
      });
    default:
      return state;
  }
}
