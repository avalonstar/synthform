import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';
import { Map } from 'immutable';
import { ChevronRight } from 'react-feather';

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
        defaultStyle={{ opacity: 0, scale: 1.5, rotate: 5, y: 100 }}
        style={{
          opacity: spring(this.state.isVisible ? 1 : 0),
          scale: spring(this.state.isVisible ? 1 : 1.5, {
            stiffness: 120,
            damping: 14
          }),
          rotate: spring(this.state.isVisible ? 0 : 10, {
            stiffness: 120,
            damping: 14
          }),
          y: spring(this.state.isVisible ? 0 : 100)
        }}
      >
        {({ opacity, scale, rotate, y }) =>
          <div className="m brb-mode">
            <div
              className="brb-dialog"
              style={{
                transform: `scale(${scale}) rotate(${rotate}deg)`,
                opacity
              }}
            >
              <div className="dlg-image">
                <img
                  src="https://static-cdn.jtvnw.net/emoticons/v1/266369/3.0"
                  className="dlg-emote"
                  alt="avalonBLANK"
                />
                <img
                  src="https://static-cdn.jtvnw.net/emoticons/v1/200212/3.0"
                  className="dlg-reaction"
                  alt="TBTacoProps"
                />
              </div>
              <div className="dlg-header">
                <strong>{`Hang on!`}</strong> {` Don't go anywhere!`}
              </div>
              <div className="dlg-message">
                {`Bryan had to step away for a second. Or a minute. When's the last time you stretched? Maybe you should get up. I see how your cat's looking at you.`}
              </div>
              <div className="dlg-footer">
                <ChevronRight size={16} /> {'!brb on'}
              </div>
            </div>
            <div
              className="door top-door"
              style={{ transform: `translate3d(0, -${y}%, 0)`, opacity }}
            />
            <div
              className="door bottom-door"
              style={{ transform: `translate3d(0, ${y}%, 0)`, opacity }}
            />
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
