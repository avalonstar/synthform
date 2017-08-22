import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setAndHandleEventListener } from 'modules/events';
import { setAndHandleMessageListener } from 'modules/messages';
import {
  setAndHandleSubCountListener,
  setAndHandleSubPointListener
} from 'modules/goals';

import Chat from 'components/Chat';
import Ticker from 'components/Events';
import SubPointGoal from 'components/Goals';

import './BaseDisplay.css';

const channel = 'avalonstar';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  setAndHandleEventListener: PropTypes.func.isRequired,
  setAndHandleMessageListener: PropTypes.func.isRequired,
  setAndHandleSubCountListener: PropTypes.func.isRequired,
  setAndHandleSubPointListener: PropTypes.func.isRequired
};

class BaseDisplay extends Component {
  componentDidMount() {
    this.props.setAndHandleEventListener(channel);
    this.props.setAndHandleMessageListener(channel);
    this.props.setAndHandleSubCountListener(channel);
    this.props.setAndHandleSubPointListener(channel);
  }
  render() {
    return (
      <div className="display">
        <div className="upper-thirds">
          {'upper thirds'}
          <Chat channel="avalonstar" />
        </div>
        <div className="middle-thirds">
          <SubPointGoal channel="avalonstar" />
        </div>
        <div className="lower-thirds">
          <Ticker channel="avalonstar" />
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
    state.goals.get('isFetchingSubCount'),
    state.goals.get('isFetchingSubPoints')
  ];
  return {
    isFetching: isFetching.every(Boolean)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAndHandleEventListener,
      setAndHandleMessageListener,
      setAndHandleSubCountListener,
      setAndHandleSubPointListener
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseDisplay);
