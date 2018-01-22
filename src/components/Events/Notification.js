import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import {
  HostEvent,
  SubscriptionEvent,
  SubGiftEvent,
  ResubEvent,
  TipEvent
} from './NotificationEvent';
import FollowEvent from './NotificationFollowEvent';

const propTypes = {
  event: PropTypes.shape({
    event: PropTypes.string,
    username: PropTypes.string,
    length: PropTypes.number
  }),
  className: PropTypes.string.isRequired,
  onComplete: PropTypes.func.isRequired
};

const defaultProps = {
  event: {
    event: '',
    username: '',
    length: 0
  }
};

const getEventType = (eventData, visibility) => ({
  follow: FollowEvent({ ...eventData, visibility }),
  host: HostEvent({ ...eventData, visibility }),
  subscription: SubscriptionEvent({ ...eventData, visibility }),
  subgift: SubGiftEvent({ ...eventData, visibility }),
  resub: ResubEvent({ ...eventData, visibility }),
  tip: TipEvent({ ...eventData, visibility })
});

class Notification extends Component {
  state = {
    isVisible: false,
    playStatus: Sound.status.STOPPED
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.event && nextProps.event !== this.props.event) {
      this.timer = setTimeout(() =>
        this.setState({
          isVisible: true,
          playStatus: Sound.status.PLAYING
        })
      );
    }
  }

  handleRest = () => {
    if (!this.state.isVisible) {
      setTimeout(() => this.props.onComplete(), 500);
    }
  };

  handleSongFinishedPlaying = () => {
    this.setState({
      isVisible: false,
      playStatus: Sound.status.STOPPED
    });
    clearTimeout(this.timer);
    this.handleRest();
  };

  render() {
    const data = this.props.event;
    return !data.event ? (
      <div className={this.props.className} />
    ) : (
      <div className={this.props.className} data-event={data.event}>
        {getEventType(data, this.state.isVisible)[data.event]}
        <Sound
          url={`http://synthform.s3.amazonaws.com/audio/avalonstar/${
            data.event
          }.ogg`}
          playStatus={this.state.playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={25}
        />
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
