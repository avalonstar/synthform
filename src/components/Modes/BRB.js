import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { Map } from 'immutable';

import './BRB.css';

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
      <Motion
        defaultStyle={{ opacity: 0, y: 100 }}
        style={{
          opacity: spring(this.state.isVisible ? 1 : 0),
          y: spring(this.state.isVisible ? 0 : 100)
        }}
      >
        {({ opacity, y }) =>
          <div className="m brb-mode">
            <div className="brb-doors">
              <div
                className="door top-door"
                style={{ transform: `translate3d(0, -${y}%, 0)`, opacity }}
              />
              <div
                className="door bottom-door"
                style={{ transform: `translate3d(0, ${y}%, 0)`, opacity }}
              />
            </div>
            {this.state.isVisible ? 'visible! :D' : 'hidden. D:'}
          </div>}
      </Motion>
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
