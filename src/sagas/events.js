import axios from 'axios';
import { normalize } from 'normalizr';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import * as schema from 'actions/schema';
import * as actions from 'actions/events';
import { API_URI } from 'configurations/constants';

const { eventFetch, eventNotifier } = actions;

let debugMode = false;
let initialEvent = {};
let shouldNotify = true;

function* triggerNotification(action) {
  shouldNotify = true;

  const event = action.response.result[0];
  if (event === initialEvent) {
    shouldNotify = false;
  }
  if (shouldNotify) {
    yield put(eventNotifier.add(event));
  }
}

function* fetchEvents(user) {
  try {
    const requestPath = debugMode ? 'testEvents' : 'events';
    const uri = `${API_URI}/${user}/${requestPath}/`;
    const { data } = yield call(axios.get, uri);
    initialEvent = data.data[0]; // eslint-disable-line

    shouldNotify = false;
    yield put(eventFetch.success(normalize(data.data, schema.eventList)));
  } catch (error) {
    yield put(eventFetch.failure(error));
  }
}

function* onEventFetchRequest(action) {
  debugMode = action.debugMode; // eslint-disable-line
  yield call(fetchEvents, action.user);
}

export default function* eventSagas() {
  yield all([
    takeLatest(actions.EVENT_FETCH.REQUEST, onEventFetchRequest),
    takeEvery(actions.EVENT_FETCH.SUCCESS, triggerNotification)
  ]);
}
