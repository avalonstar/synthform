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
let shouldNotify = true;
let subathon = false;

const subathonPassthroughEvents = ['follow', 'host'];
const blacklistedEvents = ['autohost'];

function* triggerNotification(action) {
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

function* fetchEvents(user) {
  try {
    const requestPath = debugMode ? 'testEvents' : 'events';
    const uri = `${API_URI}/${user}/${requestPath}/`;
    const { data } = yield call(axios.get, uri);

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
