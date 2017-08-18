import React, { Component } from 'react';

import './BaseDisplay.css';

const BaseDisplay = () =>
  <div className="display">
    <div className="upper-thirds">
      {'upper thirds'}
    </div>
    <div className="middle-thirds">
      {'middle thirds'}
    </div>
    <div className="lower-thirds">
      {'lower thirds'}
    </div>
  </div>;

export default BaseDisplay;
