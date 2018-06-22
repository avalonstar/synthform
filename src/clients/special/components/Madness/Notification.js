import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import {
  SubscriptionEvent,
  SubGiftEvent,
  ResubEvent,
  CheerEvent
} from './NotificationEvent';

const propTypes = {
  className: PropTypes.string.isRequired,
  event: PropTypes.shape({
    event: PropTypes.string,
    length: PropTypes.number,
    username: PropTypes.string
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
  cheer: CheerEvent({ ...eventData, visibility }),
  subscription: SubscriptionEvent({ ...eventData, visibility }),
  subgift: SubGiftEvent({ ...eventData, visibility }),
  resub: ResubEvent({ ...eventData, visibility })
});

const getSoundUrl = eventData => {
  if (eventData.event === 'cheer') {
    const { bits } = eventData;
    const specialAmounts = ['404', '420', '776', '1337', '6969'];
    if (specialAmounts.includes(bits)) return `${bits}bits`;
    if (bits < 100) return `0bits`;
    if (bits >= 100 && bits < 1000) return `100bits`;
    if (bits >= 1000 && bits < 2500) return `1000bits`;
    if (bits >= 2500 && bits < 5000) return `2500bits`;
    if (bits >= 5000 && bits < 10000) return `5000bits`;
    if (bits >= 10000) return `10000bits`;
  } else {
    return eventData.event;
  }
};

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
          url={`http://synthform.s3.amazonaws.com/audio/special/madness/ffv_${getSoundUrl(
            data
          )}.wav`}
          playStatus={this.state.playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={50}
        />
      </div>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
