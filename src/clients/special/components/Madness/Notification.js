import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sound from 'react-sound';

import { GameContext } from 'clients/special/components/Madness';
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

const getEventType = (game, eventData, visibility) => ({
  cheer: CheerEvent({ game, ...eventData, visibility }),
  subscription: SubscriptionEvent({ game, ...eventData, visibility }),
  subgift: SubGiftEvent({ game, ...eventData, visibility }),
  resub: ResubEvent({ game, ...eventData, visibility })
});

const specialAmounts = {
  eb: ['411', '420', '666', '1337', '2001'],
  ffv: ['404', '420', '776', '1337', '6969'],
  smrpg: ['411', '420', '666', '1337', '2001']
};

const getSoundUrl = (game, eventData) => {
  if (eventData.event === 'cheer') {
    const { bits } = eventData;
    if (specialAmounts[game].includes(bits)) return `${bits}bits`;
    if (bits < 100) return `0bits`;
    if (bits >= 100 && bits < 1000) return `100bits`;
    if (bits >= 1000 && bits < 2500) return `1000bits`;
    if (bits >= 2500 && bits < 5000) return `2500bits`;
    if (bits >= 5000 && bits < 10000) return `5000bits`;
    if (bits >= 10000) return `10000bits`;
  }
  return eventData.event;
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
      <GameContext.Consumer>
        {game => (
          <div className={this.props.className} data-event={data.event}>
            {getEventType(game, data, this.state.isVisible)[data.event]}
            <Sound
              url={`http://synthform.s3.amazonaws.com/audio/special/madness/${game}_${getSoundUrl(
                game,
                data
              )}.wav`}
              playStatus={this.state.playStatus}
              onFinishedPlaying={this.handleSongFinishedPlaying}
              volume={50}
            />
          </div>
        )}
      </GameContext.Consumer>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
