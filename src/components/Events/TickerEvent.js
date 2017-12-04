import React from 'react';
import PropTypes from 'prop-types';
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

export function MinuteModifier(props) {
  return props.minutes ? (
    <div className="ti-bubble">
      <PlusSquare color="#02fa7b" size={14} />
      {props.minutes}
    </div>
  ) : (
    <div />
  );
}

export function AutoHostEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">{props.event}</span>
    </div>
  );
}

export function CheerEvent(props) {
  return (
    <div className="ti-piece">
      <MinuteModifier {...props} />
      <span className="ti-event">
        {props.bits}
        {' Bits'}
      </span>
      <div className="ti-cheermote">
        <img alt={props.bits} src={getCheermoteURL(props.bits)} />
      </div>
    </div>
  );
}

export function FollowEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">{props.event}</span>
    </div>
  );
}

export function HostEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">{props.event}</span>
    </div>
  );
}

export function SubscriptionEvent(props) {
  return (
    <div className="ti-piece">
      <MinuteModifier {...props} />
      <span className="ti-event">{props.event}</span>
    </div>
  );
}

export function SubGiftEvent(props) {
  return (
    <div className="ti-piece">
      <MinuteModifier {...props} />
      <span className="ti-event">
        {'subgift from '}
        {props.username}
      </span>
    </div>
  );
}

export function ResubEvent(props) {
  return (
    <div className="ti-piece">
      <MinuteModifier {...props} />
      <span className="ti-event">
        <span className="ti-number">{props.months}</span>
        {' months'}
      </span>
    </div>
  );
}

export function TipEvent(props) {
  return (
    <div className="ti-piece">
      <MinuteModifier {...props} />
      <span className="ti-event">
        <span className="ti-number">
          {props.currency}
          {props.amount} {' tip'}
        </span>
      </span>
    </div>
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
