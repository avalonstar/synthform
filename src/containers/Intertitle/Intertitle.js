import React from 'react';
import PropTypes from 'prop-types';

import Chat from 'components/Chat';
import { Notifier, Ticker } from 'components/Events';

import './Intertitle.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

function Layout(debugMode) {
  return (
    <div className="intertitle-container">
      <div className="intertitle">
        <Chat />
        <Notifier debugMode={debugMode} />
        <Ticker debugMode={debugMode} />
      </div>
    </div>
  );
}

function Intertitle(props) {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return props.isFetching ? <div /> : Layout(debugMode);
}

Intertitle.propTypes = propTypes;

export default Intertitle;
