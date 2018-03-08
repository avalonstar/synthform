import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { ThemeProvider } from 'styled-components';

import App from 'containers/App';
import { Activity, Break } from 'clients/avalonstar/canvases';
import { Whammy } from 'clients/special/canvases';
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
                path="/avalonstar/canvases/activity"
                component={Activity}
              />
              <Route
                exact
                path="/avalonstar/canvases/break"
                component={Break}
              />

              <Route exact path="/special/canvases/chrono" component={Whammy} />
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
