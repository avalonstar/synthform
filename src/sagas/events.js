/* eslint-disable prefer-destructuring */

import axios from 'axios';

import { all, call, fork, put, select, take } from 'redux-saga/effects';

import * as actions from 'actions/events';
import { API_URI } from 'configurations/constants';
import * as selectors from 'selectors';

const { eventFetch, eventNotifier } = actions;

let debugMode = false;
let shouldNotify = true;
let subathon = false;

const subathonPassthroughEvents = ['follow', 'host'];
const blacklistedEvents = ['autohost'];

function* triggerNotification() {
  while (true) {
    const action = yield take(actions.EVENT_FETCH.SUCCESS);
    const payload = action.payload[0];

    subathon = yield select(selectors.getSubathonState);
    shouldNotify = yield select(selectors.getShouldNotify);
    if (
      subathon &&
      !payload.minutes &&
      !subathonPassthroughEvents.includes(payload.event)
    ) {
      shouldNotify = false;
    }
    if (shouldNotify && !blacklistedEvents.includes(payload.event)) {
      yield put(eventNotifier.add(payload));
    }
  }
}

function* fetchEvents(user) {
  try {
    const requestPath = debugMode ? 'testEvents' : 'events';
    const uri = `${API_URI}/${user}/${requestPath}/`;
    const response = yield call(axios.get, uri);

    shouldNotify = false;
    yield put(eventFetch.success(response.data.data));
  } catch (error) {
    yield put(eventFetch.failure(error));
  }
}

function* watchEventFetchRequest() {
  const request = yield take(actions.EVENT_FETCH.REQUEST);
  debugMode = request.debugMode;
  yield call(fetchEvents, request.user);
}

export default function* eventSagas() {
  yield all([fork(watchEventFetchRequest), fork(triggerNotification)]);
}
