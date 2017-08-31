import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
import { Circle, Heart, TrendingUp } from 'react-feather';

const wrapperPropTypes = {
  event: PropTypes.string.isRequired,
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired
};

const wrapperDefaultProps = {
  url: 'https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0'
};

const hostPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

const subscriptionPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

const substreakPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  visibility: PropTypes.bool.isRequired
};

function NotificationWrapper(props) {
  return (
    <Motion
      defaultStyle={{ y: 200 }}
      style={{
        y: spring(props.isVisible ? 0 : 200, { stiffness: 120, damping: 14 })
      }}
    >
      {({ y }) =>
        <div
          className="ntf"
          style={{ transform: `translate3d(0, ${y}%, 0)` }}
          data-event={props.event}
        >
          <div className="ntf-image">
            <img
              src={props.url}
              style={{ transform: `translate3d(0, ${y}%, 0)` }}
              alt=""
            />
          </div>
          <div className="ntf-content">
            {props.children}
          </div>
        </div>}
    </Motion>
  );
}

export function HostEvent(props) {
  return (
    <NotificationWrapper
      url="https://static-cdn.jtvnw.net/emoticons/v1/291666/2.0"
      event={props.event}
      isVisible={props.visibility}
    >
      <div className="ntf-header">
        <strong>
          {props.username}
        </strong>
        {' thank you for the host!'}
      </div>
      <div className="ntf-message">
        {`Thank you ${props.username} for bringing your viewers in! Now... if only we could see them.`}
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">
          {'host'}
        </div>
        <Heart size={14} />
      </div>
    </NotificationWrapper>
  );
}

export function SubscriptionEvent(props) {
  return (
    <NotificationWrapper
      url="https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0"
      event={props.event}
      isVisible={props.visibility}
    >
      <div className="ntf-header">
        <strong>
          {props.username}
        </strong>
        {' has just subscribed!'}
      </div>
      <div className="ntf-message">
        <strong>
          {'Welcome to AVLN'}
        </strong>
        {
          ' and thanks for subscribing! Chat, bring the hype for the newest member of the family!'
        }
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">
          {'subscription'}
        </div>
        <TrendingUp size={14} />
        <div className="ntf-fr">
          {'SP UP'}
        </div>
      </div>
    </NotificationWrapper>
  );
}

export function SubstreakEvent(props) {
  return (
    <NotificationWrapper
      url="https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0"
      event={props.event}
      isVisible={props.visibility}
    >
      <div className="ntf-header">
        <strong>
          {props.username}
        </strong>
        {' subscribed for '}
        <strong>{`${props.length} months in a row!`}</strong>
      </div>
      <div className="ntf-message">
        {`Thank you for marching forward with us! Chat, let's bring the hype for them!`}
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">
          {'substreak'}
          {'\u00D7'}
          {props.length}
        </div>
        <Circle size={14} />
        <div className="ntf-fr">
          {'SP RETAIN'}
        </div>
      </div>
    </NotificationWrapper>
  );
}

NotificationWrapper.propTypes = wrapperPropTypes;
NotificationWrapper.defaultProps = wrapperDefaultProps;
HostEvent.propTypes = hostPropTypes;
SubscriptionEvent.propTypes = subscriptionPropTypes;
SubstreakEvent.propTypes = substreakPropTypes;
