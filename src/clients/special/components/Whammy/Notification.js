import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Motion, spring } from 'react-motion';
import Sound from 'react-sound';

import styled from 'styled-components';

import windowBorder from './windowBorder.png';
import windowBackground from './windowBackground.png';

const propTypes = {
  className: PropTypes.string.isRequired,
  event: PropTypes.shape({
    event: PropTypes.string,
    length: PropTypes.number,
    username: PropTypes.string
  }),
  isFlipped: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired
};

const defaultProps = {
  event: {
    event: '',
    length: 0,
    username: ''
  }
};

const eventPropTypes = {
  bits: PropTypes.string,
  event: PropTypes.string.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  penaltyActor: PropTypes.string,
  penaltyType: PropTypes.number,
  username: PropTypes.string.isRequired
};

const eventDefaultProps = {
  bits: null,
  penaltyActor: '',
  penaltyType: null
};

const getEventType = eventData => ({
  cheer: `${eventData.displayName} cheered ${numeral(eventData.bits).format(
    '0,0'
  )}`,
  resub: `${eventData.displayName} resubbed to ${eventData.channel}`,
  subgift: `${eventData.displayName} gifted a sub`,
  subscription: `${eventData.displayName} subbed to ${eventData.channel}`
});

const getPenalty = {
  1: ` is blindfolded for 1 fight.`,
  2: ` can't heal for 1 fight.`,
  3: ` cannot use items for 1 fight.`,
  4: ` cannot use dual- or triple-techs for 1 fight.`,
  1000: ', choose your 1,000 bit reward!',
  2500: ', will you arm or disarm a racer?',
  5000: ', will you give or deprive items?',
  10000: ', will you send a racer to Lavos or give immunity?'
};

const Event = props => (
  <Motion
    defaultStyle={{ y: 100 }}
    style={{
      y: spring(props.isVisible ? 0 : 100)
    }}
  >
    {({ y }) => (
      <EventContainer
        data-event={props.event}
        isFlipped={props.isFlipped}
        style={{ transform: `translate3d(0, ${props.isFlipped ? y : -y}%, 0)` }}
      >
        <Cause>{getEventType(props)[props.event]}</Cause>
        {props.penaltyActor && (
          <Effect>
            <Actor>{props.penaltyActor}</Actor>
            <Penalty>{getPenalty[props.penaltyType]}</Penalty>
          </Effect>
        )}
        {props.bits && (
          <Effect>
            <Actor>{props.username}</Actor>
            <Penalty>{getPenalty[props.bits]}</Penalty>
          </Effect>
        )}
      </EventContainer>
    )}
  </Motion>
);

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
      <Wrapper
        className={this.props.className}
        isFlipped={this.props.isFlipped}
        data-event={data.event}
      >
        <Event
          isVisible={this.state.isVisible}
          isFlipped={this.props.isFlipped}
          {...data}
        />
        <Sound
          url="https://synthform.s3.amazonaws.com/audio/special/whammy.wav"
          playStatus={this.state.playStatus}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          volume={25}
        />
      </Wrapper>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;
Event.propTypes = eventPropTypes;
Event.defaultProps = eventDefaultProps;

const Wrapper = styled.div`
  order: ${props => (props.isFlipped ? '-1' : '1')};

  color: #fff;
  font-family: ${props => props.theme.chronotype};
  text-shadow: 0 2px 0 #111;
`;

const EventContainer = styled.div`
  padding: ${props => (props.isFlipped ? '0 4px 8px' : '8px 4px 0')};

  background: url(${windowBackground});
  border: 16px double black;
  ${props => (props.isFlipped ? 'border-bottom' : 'border-top')}: 0;
  border-image: url(${windowBorder}) 32 32 32 32 repeat repeat;
  box-shadow: 0 0 2px #111;
  font-size: 18px;
`;

const Effect = styled.div`
  font-size: 24px;
  line-height: 0.9;
`;

const Actor = styled.span`
  text-transform: uppercase;
`;

const Penalty = styled.span``;

const Cause = styled.div`
  padding-bottom: 4px;
  color: #8c9494;
  line-height: 1;
`;

export default Notification;
