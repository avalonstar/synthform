import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'scenes/Root';
import baseStyles from 'helpers/foundation';

import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import initializeTmi from './tmi';

const store = configureStore();

const render = () => {
  baseStyles();
  ReactDOM.render(<Root store={store} />, document.getElementById('root'));
};

render();
initializeTmi(store);
registerServiceWorker();
