import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import styled from 'styled-components';

import windowBorder from './windowBorder.png';
import windowBackground from './windowBackground.png';

const propTypes = {
  className: PropTypes.string,
  payload: PropTypes.arrayOf(PropTypes.object).isRequired
};

const defaultProps = {
  className: ''
};

const eventPropTypes = {
  bits: PropTypes.string,
  event: PropTypes.string.isRequired,
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
  subscription: `subbed to ${eventData.channel}`
});

const getPenalty = {
  1: ` is blindfolded for 1m.`,
  2: ` can't heal for 1m.`,
  3: ` cannot use items for 1m.`,
  4: ` cannot use dual- or triple-techs for 1m.`,
  1000: ', choose your 1,000 bit reward!',
  2500: ', will you arm or disarm a racer?',
  5000: ', will you give or deprive items?',
  10000: ', will you send a racer to Lavos or give immunity?'
};

const Event = props => (
  <EventContainer data-event={props.event}>
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
);

class Events extends Component {
  state = {
    cheerWhitelist: ['1000', '2500', '5000', '10000']
  };

  render() {
    const { payload } = this.props;
    const events = payload.filter(
      e =>
        e.event !== 'cheer' ||
        (e.event === 'cheer' && this.state.cheerWhitelist.includes(e.bits))
    );

    return (
      <Wrapper className={this.props.className}>
        {events.map(event => <Event key={event.id} {...event} />)}
      </Wrapper>
    );
  }
}

Events.propTypes = propTypes;
Events.defaultProps = defaultProps;
Event.propTypes = eventPropTypes;
Event.defaultProps = eventDefaultProps;

const Wrapper = styled.div`
  margin-top: 6px;
  box-shadow: 0 0 2px #111;
  color: #fff;
  font-family: ${props => props.theme.chronotype};
  text-shadow: 0 2px 0 #111;
`;

const EventContainer = styled.div`
  padding: 0 4px;

  background: url(${windowBackground});
  border: 16px double black;
  border-image: url(${windowBorder}) 32 32 32 32 repeat repeat;
  font-size: 18px;
`;

const Effect = styled.div`
  font-size: 24px;
  line-height: normal;
`;

const Actor = styled.span`
  text-transform: uppercase;
`;

const Penalty = styled.span``;

const Cause = styled.div`
  padding-bottom: 4px;
  color: #8c9494;
  line-height: normal;
`;

export default Events;
