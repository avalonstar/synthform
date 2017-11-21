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

const followPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
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

const subgiftPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

const resubPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  months: PropTypes.number.isRequired,
  visibility: PropTypes.bool.isRequired
};

const tipPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  visibility: PropTypes.bool.isRequired
};

function NotificationWrapper(props) {
  return (
    <Motion
      defaultStyle={{ y: 250, rotate: 0 }}
      style={{
        y: spring(props.isVisible ? 0 : 250, { stiffness: 120, damping: 14 }),
        rotate: spring(props.isVisible ? 360 : 0, {
          stiffness: 180,
          damping: 12
        })
      }}
    >
      {({ y, rotate }) => (
        <div className="ntf" style={{ transform: `translate3d(0, ${y}%, 0)` }}>
          <div className="ntf-image">
            <img
              src={props.url}
              style={{
                transform: `translate3d(0, ${y}%, 0) rotate(-${rotate}deg)`
              }}
              alt=""
            />
          </div>
          <div className="ntf-content">{props.children}</div>
        </div>
      )}
    </Motion>
  );
}

export function FollowEvent(props) {
  return (
    <Motion
      defaultStyle={{ y: 200 }}
      style={{
        y: spring(props.visibility ? 0 : 200, { stiffness: 210, damping: 30 })
      }}
    >
      {({ y }) => (
        <div
          className="ntf-follow"
          style={{ transform: `translate3d(0, ${y}%, 0)` }}
        >
          <div className="ntf-image">
            <img
              src="https://static-cdn.jtvnw.net/emoticons/v1/206446/3.0"
              alt=""
            />
          </div>
          <div className="ntf-content">
            <div className="ntf-message">
              Hello there <strong>{props.username}</strong>! Welcome!
            </div>
          </div>
        </div>
      )}
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
        <strong>{props.username}</strong>
        {' thank you for the host!'}
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">host</div>
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
        <strong>{props.username}</strong>
        {' has just subscribed!'}
      </div>
      <div className="ntf-message">
        <strong>Welcome to AVLN</strong>
        {
          ' and thanks for subscribing! Chat, bring the hype for the newest member of the family!'
        }
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">subscription</div>
        <TrendingUp size={14} />
        <div className="ntf-fr">SP UP</div>
      </div>
    </NotificationWrapper>
  );
}

export function SubGiftEvent(props) {
  return (
    <NotificationWrapper
      url="https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0"
      event={props.event}
      isVisible={props.visibility}
    >
      <div className="ntf-header">
        <strong>{props.username}</strong>
        {' gifted '}
        <strong>{props.recipient}</strong>
        {' a subscription!'}
      </div>
      <div className="ntf-message">
        <strong>Enjoy the subscription</strong>
        {'  and spam those emotes! Welcome to the family! '}
        {'Thank you for your generosity, '}
        {props.username}
        {'!'}
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">subgift</div>
        <TrendingUp size={14} />
        <div className="ntf-fr">SP UP</div>
      </div>
    </NotificationWrapper>
  );
}

export function ResubEvent(props) {
  return (
    <NotificationWrapper
      url="https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0"
      event={props.event}
      isVisible={props.visibility}
    >
      <div className="ntf-header">
        <strong>{props.username}</strong>
        {' subscribed for '}
        <strong>{`${props.months} months in a row!`}</strong>
      </div>
      <div className="ntf-message">
        {`Thank you for marching forward with us! Chat, let's bring the hype for them!`}
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">
          {'resub'}
          {'\u00D7'}
          {props.months}
        </div>
        <Circle size={14} />
        <div className="ntf-fr">SP RETAIN</div>
      </div>
    </NotificationWrapper>
  );
}

export function TipEvent(props) {
  return (
    <NotificationWrapper
      url="https://static-cdn.jtvnw.net/emoticons/v1/459215/2.0"
      event={props.event}
      isVisible={props.visibility}
    >
      <div className="ntf-header">
        <strong>{props.username}</strong>
        {' just tipped '}
        <strong>
          {props.currency}
          {props.amount}
          {'!'}
        </strong>
      </div>
      <div className="ntf-message">
        {`Holy moly! Thank you for your generosity and your support! Chat, please shower all of the love on them!`}
      </div>
      <div className="ntf-footer">
        <div className="ntf-fl">tip</div>
        <Heart size={14} />
      </div>
    </NotificationWrapper>
  );
}

NotificationWrapper.propTypes = wrapperPropTypes;
NotificationWrapper.defaultProps = wrapperDefaultProps;
FollowEvent.propTypes = followPropTypes;
HostEvent.propTypes = hostPropTypes;
SubscriptionEvent.propTypes = subscriptionPropTypes;
SubGiftEvent.propTypes = subgiftPropTypes;
ResubEvent.propTypes = resubPropTypes;
TipEvent.propTypes = tipPropTypes;
