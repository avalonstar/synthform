import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';

const propTypes = {
  message: PropTypes.string,
  metadata: PropTypes.instanceOf(Map)
};

const defaultProps = {
  message: '',
  metadata: Map()
};

class BRB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      command: '!brb',
      isVisible: false
    };

    this.setVisibility = state => {
      if (state === 'on') {
        return true;
      } else if (state === 'off') {
        return false;
      }
      return this.state.isVisible;
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.metadata.get('isBroadcaster') ||
      nextProps.metadata.get('isMod')
    ) {
      const [command, state] = nextProps.message.split(' ');
      if (command === this.state.command) {
        this.setState({ isVisible: this.setVisibility(state) });
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.isVisible ? 'visible! :D' : 'hidden. D:'}
      </div>
    );
  }
}

BRB.propTypes = propTypes;
BRB.defaultProps = defaultProps;

function mapStateToProps(state) {
  const latestMessage = state.tmi.get('latestMessage');
  return {
    message: latestMessage.get('message'),
    metadata: latestMessage.get('metadata')
  };
}

export default connect(mapStateToProps)(BRB);
