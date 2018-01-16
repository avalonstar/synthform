import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';

import Activity from 'containers/Activity';
import App from 'containers/App';
import Break from 'containers/Break';
import Intertitle from 'containers/Intertitle';
import Christmas from 'containers/Special';
import baseStyles, { foundation } from 'helpers/foundation';

import store, { history } from './store';
import registerServiceWorker from './registerServiceWorker';
import initializeTmi from './tmi';

const target = document.getElementById('root');

const render = () => {
  baseStyles();
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={foundation}>
          <main>
            <Switch>
              <Route
                exact
                path="/displays/special/christmas"
                component={Christmas}
              />

              <Route exact path="/displays/activity" component={Activity} />
              <Route exact path="/displays/break" component={Break} />
              <Route exact path="/displays/intertitle" component={Intertitle} />
              <Route component={App} />
            </Switch>
          </main>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>,
    target
  );
};

render();
initializeTmi(store);
registerServiceWorker();
