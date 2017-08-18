import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';

import App from 'containers/App';
import BaseDisplay from 'containers/BaseDisplay';

import './index.css';

const target = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <main>
        <Switch>
          <Route exact path="/displays/base" component={BaseDisplay} />
          <Route component={App} />
        </Switch>
      </main>
    </ConnectedRouter>
  </Provider>,
  target
);
registerServiceWorker();
