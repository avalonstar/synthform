import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { whammyNotifier } from 'actions/special/whammy';

import Notification from './Notification';

const propTypes = {
  className: PropTypes.string,
  deleteEventFromNotifier: PropTypes.func.isRequired,
  isFlipped: PropTypes.bool,
  notifierPool: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  className: '',
  isFlipped: false
};

class Notifier extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifierPool[0] !== this.props.notifierPool[0];
  }

  onComplete = () => {
    this.props.deleteEventFromNotifier();
  };

  render() {
    return (
      <Notification
        className={this.props.className}
        isFlipped={this.props.isFlipped}
        event={this.props.notifierPool[0]}
        onComplete={this.onComplete}
      />
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

const mapDispatchToProps = dispatch => ({
  deleteEventFromNotifier: () => dispatch(whammyNotifier.delete())
});

export default connect(null, mapDispatchToProps)(Notifier);
