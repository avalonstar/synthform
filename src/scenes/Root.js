import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { ThemeProvider } from 'styled-components';

import App from 'scenes/App';
import {
  Activity,
  Audio,
  Break,
  Discussion
} from 'clients/avalonstar/canvases';
import { Madness, Whammy } from 'clients/special/canvases';
import { foundation } from 'helpers/foundation';
import { history } from 'store';

const Main = () => (
  <Switch>
    <Route exact path="/avalonstar/canvases/audio" component={Audio} />
    <Route exact path="/avalonstar/canvases/activity" component={Activity} />
    <Route exact path="/avalonstar/canvases/break" component={Break} />
    <Route
      exact
      path="/avalonstar/canvases/discussion"
      component={Discussion}
    />

    <Route exact path="/special/canvases/madness" component={Madness} />
    {/* <Route exact path="/special/canvases/chrono" component={Whammy} /> */}
    <Route component={App} />
  </Switch>
);

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={foundation}>
        <Main />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
);

export default Root;
