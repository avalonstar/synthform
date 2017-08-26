import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Chat from 'components/Chat';
import Ticker from 'components/Events';
import SubPointGoal from 'components/Goals';
import LatestSubscriber from 'components/Labels';

import './BaseDisplay.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired
};

class BaseDisplay extends Component {
  render() {
    return (
      <div className="display">
        <div className="upper-thirds">
          <SubPointGoal />
          <LatestSubscriber />
        </div>
        <div className="middle-thirds">
          <Chat />
        </div>
        <div className="lower-thirds">
          <Ticker />
        </div>
      </div>
    );
  }
}

BaseDisplay.propTypes = propTypes;

function mapStateToProps(state) {
  const isFetching = [
    state.events.get('isFetching'),
    state.messages.get('isFetching'),
    state.subscriptions.get('isFetchingLatestSubscriber'),
    state.subscriptions.get('isFetchingSubCount'),
    state.subscriptions.get('isFetchingSubPoints')
  ];
  return {
    isFetching: isFetching.every(Boolean)
  };
}

export default connect(mapStateToProps)(BaseDisplay);
