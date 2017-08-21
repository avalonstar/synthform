import React from 'react';
import PropTypes from 'prop-types';

import { getCheermoteURL } from './utils';

const propTypes = {
  event: PropTypes.string.isRequired
};

const cheerPropTypes = {
  bits: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export function AutoHostEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">
        {props.event}
      </span>
    </div>
  );
}

export function CheerEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">
        {props.event}
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
      <span className="ti-event">
        {props.event}
      </span>
    </div>
  );
}

export function HostEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">
        {props.event}
      </span>
    </div>
  );
}

export function SubscriptionEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">
        {props.event}
      </span>
    </div>
  );
}

export function SubstreakEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">
        {props.event}
      </span>
    </div>
  );
}

export function TipEvent(props) {
  return (
    <div className="ti-piece">
      <span className="ti-event">
        {props.event}
      </span>
    </div>
  );
}

AutoHostEvent.propTypes = propTypes;
CheerEvent.propTypes = Object.assign(propTypes, cheerPropTypes);
FollowEvent.propTypes = propTypes;
HostEvent.propTypes = propTypes;
SubscriptionEvent.propTypes = propTypes;
SubstreakEvent.propTypes = propTypes;
TipEvent.propTypes = propTypes;
