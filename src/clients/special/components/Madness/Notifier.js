import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Notification from './Notification';

const propTypes = {
  className: PropTypes.string,
  notifierPool: PropTypes.arrayOf(PropTypes.object).isRequired,
  onComplete: PropTypes.func.isRequired
};

const defaultProps = {
  className: ''
};

class Notifier extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifierPool[0] !== this.props.notifierPool[0];
  }

  render() {
    return (
      <Notification
        className={this.props.className}
        event={this.props.notifierPool[0]}
        onComplete={this.props.onComplete}
      />
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

export default Notifier;
