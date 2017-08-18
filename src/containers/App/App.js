import React from 'react';

import './App.css';
import logomark from './logomark.svg';
import logotype from './logotype.svg';

const App = () =>
  <div className="app">
    <div className="container">
      <a className="logo">
        <img src={logomark} className="logomark" alt="synthform.tv" />
        <img src={logotype} className="logotype" alt="synthform.tv" />
      </a>
    </div>
  </div>;

export default App;
