import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import Activity from 'containers/Activity';
import App from 'containers/App';
import Intertitle from 'containers/Intertitle';

import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const target = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <main>
        <Switch>
          <Route exact path="/displays/activity" component={Activity} />
          <Route exact path="/displays/intertitle" component={Intertitle} />
          <Route component={App} />
        </Switch>
      </main>
    </ConnectedRouter>
  </Provider>,
  target
);

registerServiceWorker();
