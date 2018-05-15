import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SoundNotification from './SoundNotification';

const propTypes = {
  notifierPool: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired
};

class SoundNotifier extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifierPool[0] !== this.props.notifierPool[0];
  }

  render() {
    return (
      <SoundNotification
        event={this.props.notifierPool[0]}
        onComplete={this.props.onComplete}
      />
    );
  }
}

SoundNotifier.propTypes = propTypes;

export default SoundNotifier;
