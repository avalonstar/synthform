import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import * as reducers from './modules';

import events from './reducers/events';
import messages from './reducers/messages';
import songs from './reducers/songs';
import subscriptions from './reducers/subscriptions';

import rootSaga from './sagas';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const enhancers = [];
const middleware = [thunk, sagaMiddleware, routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const store = createStore(
  combineReducers({
    ...reducers,
    events,
    messages,
    songs,
    subscriptions,
    routing: routerReducer
  }),
  initialState,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export default store;
