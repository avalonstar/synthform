import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { PlusSquare } from 'react-feather';

import { getCheermoteURL } from './utils';

const propTypes = {
  event: PropTypes.string.isRequired
};

const minuteModifierPropTypes = {
  minutes: PropTypes.number
};

const minuteModifierDefaultProps = {
  minutes: 0
};

const cheerPropTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const cheerDefaultProps = {
  amount: 0
};

const subgiftPropTypes = {
  username: PropTypes.string.isRequired
};

const resubPropTypes = {
  months: PropTypes.number
};

const resubDefaultProps = {
  months: 1
};

const tipPropTypes = {
  formattedAmount: PropTypes.string
};

const tipDefaultProps = {
  formattedAmount: '$0.00'
};

export const MinuteModifier = ({ minutes }) =>
  minutes ? (
    <Bubble>
      <PlusSquare color="#02fa7b" size={14} />
      {minutes}
    </Bubble>
  ) : (
    <div />
  );

export const AutoHostEvent = ({ event }) => (
  <Piece>
    <Event>{event}</Event>
  </Piece>
);

export const CheerEvent = props => (
  <Piece>
    <MinuteModifier {...props} />
    <Event>
      <Number>{props.amount}</Number>
      {' bits'}
    </Event>
    <Cheer>
      <Cheermote alt={props.amount} src={getCheermoteURL(props.amount)} />
    </Cheer>
  </Piece>
);

export const FollowEvent = ({ event }) => (
  <Piece>
    <Event>{event}</Event>
  </Piece>
);

export const HostEvent = ({ event }) => (
  <Piece>
    <Event>{event}</Event>
  </Piece>
);

export const SubscriptionEvent = props => (
  <Piece>
    <MinuteModifier {...props} />
    <Event>{props.event}</Event>
  </Piece>
);

export const SubGiftEvent = props => (
  <Piece>
    <MinuteModifier {...props} />
    <Event>
      {'subgift from '}
      {props.username}
    </Event>
  </Piece>
);

export const ResubEvent = props => (
  <Piece>
    <MinuteModifier {...props} />
    <Event>
      <Number>{props.months}</Number>
      {' months'}
    </Event>
  </Piece>
);

export const TipEvent = props => (
  <Piece>
    <MinuteModifier {...props} />
    <Event>
      <Number>{props.formattedAmount}</Number>
      {' tip'}
    </Event>
  </Piece>
);

MinuteModifier.propTypes = minuteModifierPropTypes;
MinuteModifier.defaultProps = minuteModifierDefaultProps;
AutoHostEvent.propTypes = propTypes;
CheerEvent.propTypes = cheerPropTypes;
CheerEvent.defaultProps = cheerDefaultProps;
FollowEvent.propTypes = propTypes;
HostEvent.propTypes = propTypes;
SubscriptionEvent.propTypes = propTypes;
SubGiftEvent.propTypes = subgiftPropTypes;
ResubEvent.propTypes = resubPropTypes;
ResubEvent.defaultProps = resubDefaultProps;
TipEvent.propTypes = tipPropTypes;
TipEvent.defaultProps = tipDefaultProps;

const Piece = styled.div`
  position: relative;

  color: #697a8c;
  font-family: ${props => props.theme.forza};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`;

const Event = styled.div``;

const Number = styled.span`
  color: #b9c2ca;
`;

const Cheer = styled.div`
  position: relative;
  top: 5px;
  overflow: hidden;
  height: 10px;
`;

const Cheermote = styled.img`
  height: 28px;
`;

const Bubble = styled.div`
  position: absolute;
  left: 6px;
  display: flex;
  align-items: center;
  padding: 6px 8px;

  background: linear-gradient(#1a1f23, #121417);
  border-radius: 4px;
  border-bottom-left-radius: 0px;
  color: #e8ebed;
  transition: 250ms all ease-out;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 28px;
    width: 0;
    height: 0;
    border-top: 8px solid #121417;
    border-right: 8px solid transparent;
  }
  svg {
    margin-right: 2px;
  }

  display: none;
  ${'' /* !! */};
`;
