import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';
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
  bits: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const cheerDefaultProps = {
  bits: 0
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
  currency: PropTypes.string,
  amount: PropTypes.string
};

const tipDefaultProps = {
  currency: '$',
  amount: '0'
};

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

export function MinuteModifier(props) {
  return props.minutes ? (
    <Bubble>
      <PlusSquare color="#02fa7b" size={14} />
      {props.minutes}
    </Bubble>
  ) : (
    <div />
  );
}

export function AutoHostEvent(props) {
  return (
    <Piece>
      <Event>{props.event}</Event>
    </Piece>
  );
}

export function CheerEvent(props) {
  return (
    <Piece>
      <MinuteModifier {...props} />
      <Event>
        <Number>{props.bits}</Number>
        {' bits'}
      </Event>
      <Cheer>
        <Cheermote alt={props.bits} src={getCheermoteURL(props.bits)} />
      </Cheer>
    </Piece>
  );
}

export function FollowEvent(props) {
  return (
    <Piece>
      <Event>{props.event}</Event>
    </Piece>
  );
}

export function HostEvent(props) {
  return (
    <Piece>
      <Event>{props.event}</Event>
    </Piece>
  );
}

export function SubscriptionEvent(props) {
  return (
    <Piece>
      <MinuteModifier {...props} />
      <Event>{props.event}</Event>
    </Piece>
  );
}

export function SubGiftEvent(props) {
  return (
    <Piece>
      <MinuteModifier {...props} />
      <Event>
        {'subgift from '}
        {props.username}
      </Event>
    </Piece>
  );
}

export function ResubEvent(props) {
  return (
    <Piece>
      <MinuteModifier {...props} />
      <Event>
        <Number>{props.months}</Number>
        {' months'}
      </Event>
    </Piece>
  );
}

export function TipEvent(props) {
  return (
    <Piece>
      <MinuteModifier {...props} />
      <Event>
        <Number>
          {props.currency}
          {props.amount}
        </Number>
        {' tip'}
      </Event>
    </Piece>
  );
}

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
