import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setAndHandleEventListener } from 'modules/events';
import { setAndHandleMessageListener } from 'modules/messages';

import Chat from 'components/Chat';
import Ticker from 'components/Events';

import './BaseDisplay.css';

const channel = 'avalonstar';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  setAndHandleEventListener: PropTypes.func.isRequired,
  setAndHandleMessageListener: PropTypes.func.isRequired
};

class BaseDisplay extends Component {
  componentDidMount() {
    this.props.setAndHandleEventListener(channel);
    this.props.setAndHandleMessageListener(channel);
  }
  render() {
    return (
      <div className="display">
        <div className="upper-thirds">
          {'upper thirds'}
          <Chat channel="avalonstar" />
        </div>
        <div className="middle-thirds">
          {'middle thirds'}
        </div>
        <div className="lower-thirds">
          {'lower thirds'}
          <Ticker channel="avalonstar" />
        </div>
      </div>
    );
  }
}

BaseDisplay.propTypes = propTypes;

function mapStateToProps({ events, messages }) {
  const isFetching = [events.get('isFetching'), messages.get('isFetching')];
  return {
    isFetching: isFetching.every(Boolean)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAndHandleEventListener,
      setAndHandleMessageListener
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseDisplay);
