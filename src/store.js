import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import rootSaga from './sagas';
import rootReducer from './reducers';

export const history = createHistory();

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const initialState = {};
  const enhancers = [];
  const middleware = [sagaMiddleware, routerMiddleware(history), logger];

  if (process.env.NODE_ENV === 'development') {
    const { devToolsExtension } = window;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
  );
  const reducers = Object.assign(rootReducer, { routing: routerReducer });

  const store = createStore(reducers, initialState, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
