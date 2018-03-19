import axios from 'axios';

import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest
} from 'redux-saga/effects';

import * as actions from 'actions/events';
import { API_URI } from 'configurations/constants';
import * as selectors from 'selectors';

const { eventFetch, eventNotifier } = actions;

let debugMode = false;
let initialEvent = {};
let shouldNotify = true;
let subathon = false;

const subathonPassthroughEvents = ['follow', 'host'];
const blacklistedEvents = ['autohost'];

function* triggerNotification(action) {
  subathon = yield select(selectors.getSubathonState);
  shouldNotify = yield select(selectors.getShouldNotify);

  const payload = action.payload[0];
  const subathonConstraints =
    subathon &&
    !payload.minutes &&
    !subathonPassthroughEvents.includes(payload.event);

  if (subathonConstraints || payload === initialEvent) {
    shouldNotify = false;
  }
  if (shouldNotify && !blacklistedEvents.includes(payload.event)) {
    yield put(eventNotifier.add(payload));
  }
}

function* fetchEvents(user) {
  try {
    const requestPath = debugMode ? 'testEvents' : 'events';
    const uri = `${API_URI}/${user}/${requestPath}/`;
    const { data } = yield call(axios.get, uri);
    initialEvent = data.data[0]; // eslint-disable-line

    shouldNotify = false;
    yield put(eventFetch.success(data.data));
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
