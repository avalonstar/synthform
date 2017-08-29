import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { SubscriptionEvent, SubstreakEvent } from './NotificationEvent';

import './Notification.css';

const propTypes = {
  event: PropTypes.shape({
    event: PropTypes.string,
    username: PropTypes.string,
    length: PropTypes.number
  }),
  onComplete: PropTypes.func.isRequired
};

const defaultProps = {
  event: {
    event: '',
    username: '',
    length: 0
  }
};

const getEventType = eventData => ({
  subscription: SubscriptionEvent({ ...eventData }),
  substreak: SubstreakEvent({ ...eventData })
});

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soundStatus: false
    };
  }

  handleRest() {
    setTimeout(() => this.props.onComplete());
  }

  render() {
    const data = this.props.event;
    return (
      <div className="n">
        {getEventType(data)[data.event]}
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
