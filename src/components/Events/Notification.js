import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import { HostEvent, SubscriptionEvent, ResubEvent } from './NotificationEvent';

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

const getEventType = (eventData, visibility) => ({
  host: HostEvent({ ...eventData, visibility }),
  subscription: SubscriptionEvent({ ...eventData, visibility }),
  resub: ResubEvent({ ...eventData, visibility })
});

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      playStatus: Sound.status.STOPPED
    };

    this.handleRest = () => {
      if (!this.state.isVisible) {
        setTimeout(() => this.props.onComplete(), 500);
      }
    };

    this.handleSongFinishedPlaying = () => {
      this.setState({
        isVisible: false,
        playStatus: Sound.status.STOPPED
      });
      clearTimeout(this.timer);
      this.handleRest();
    };
  }

  componentDidMount() {
    this.timer = setTimeout(
      () =>
        this.setState({
          isVisible: true,
          playStatus: Sound.status.PLAYING
        }),
      1000 * 2
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.event && nextProps.event !== this.props.event) {
      this.timer = setTimeout(
        () =>
          this.setState({
            isVisible: true,
            playStatus: Sound.status.PLAYING
          }),
        500
      );
    }
  }

  render() {
    const data = this.props.event;
    return !data.event ? (
      <div className="n n-empty" />
    ) : (
      <div className="n">
        {getEventType(data, this.state.isVisible)[data.event]}
        <Sound
          url={`http://synthform.s3.amazonaws.com/audio/avalonstar/${data.event}.ogg`}
          playStatus={this.state.playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
        />
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
