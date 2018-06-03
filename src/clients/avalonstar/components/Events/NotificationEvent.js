import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';
import { rgba } from 'polished';
import { Circle, Heart, TrendingUp } from 'react-feather';

const wrapperPropTypes = {
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired
};

const wrapperDefaultProps = {
  url: 'https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0'
};

const eventPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

const hostPropTypes = {
  ...eventPropTypes
};

const subscriptionPropTypes = {
  ...eventPropTypes
};

const subgiftPropTypes = {
  ...eventPropTypes,
  recipient: PropTypes.string.isRequired
};

const resubPropTypes = {
  ...eventPropTypes,
  months: PropTypes.number.isRequired
};

const tipPropTypes = {
  ...eventPropTypes,
  formattedAmount: PropTypes.string.isRequired
};

const NotificationWrapper = ({ isVisible, url, children }) => (
  <Motion
    defaultStyle={{ y: 250, rotate: 0 }}
    style={{
      y: spring(isVisible ? 0 : 250, { stiffness: 120, damping: 14 }),
      rotate: spring(isVisible ? 360 : 0, {
        stiffness: 180,
        damping: 12
      })
    }}
  >
    {({ y, rotate }) => (
      <Wrapper style={{ transform: `translate3d(0, ${y}%, 0)` }}>
        <Image>
          <img
            src={url}
            style={{
              transform: `translate3d(0, ${y}%, 0) rotate(-${rotate}deg)`
            }}
            alt=""
          />
        </Image>
        <Content>{children}</Content>
      </Wrapper>
    )}
  </Motion>
);

export const HostEvent = ({ event, visibility, username }) => (
  <NotificationWrapper
    url="https://static-cdn.jtvnw.net/emoticons/v1/291666/2.0"
    event={event}
    isVisible={visibility}
  >
    <Header>
      <strong>{username}</strong>
      {' thank you for the host!'}
    </Header>
    <Footer>
      <EventType>host</EventType>
      <Heart size={14} />
    </Footer>
  </NotificationWrapper>
);

export const SubscriptionEvent = ({ event, visibility, displayName }) => (
  <NotificationWrapper
    url="https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0"
    event={event}
    isVisible={visibility}
  >
    <Header>
      <strong>{displayName}</strong>
      {' has just subscribed!'}
    </Header>
    <Footer>
      <EventType>subscription</EventType>
      <TrendingUp size={14} />
      <Modification>SP UP</Modification>
    </Footer>
  </NotificationWrapper>
);

export const SubGiftEvent = ({ event, visibility, gifter, displayName }) => (
  <NotificationWrapper
    url="https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0"
    event={event}
    isVisible={visibility}
  >
    <Header>
      <strong>{gifter}</strong>
      {' gifted '}
      <strong>{displayName}</strong>
      {' a subscription!'}
    </Header>
    <Footer>
      <EventType>subgift</EventType>
      <TrendingUp size={14} />
      <Modification>SP UP</Modification>
    </Footer>
  </NotificationWrapper>
);

export const ResubEvent = ({ event, visibility, displayName, months }) => (
  <NotificationWrapper
    url="https://static-cdn.jtvnw.net/emoticons/v1/309775/2.0"
    event={event}
    isVisible={visibility}
  >
    <Header>
      <strong>{displayName}</strong>
      {' subscribed for '}
      <strong>{`${months} months in a row!`}</strong>
    </Header>
    <Footer>
      <EventType>
        {'resub'}
        {'\u00D7'}
        {months}
      </EventType>
      <Circle size={14} />
      <Modification>SP RETAIN</Modification>
    </Footer>
  </NotificationWrapper>
);

export const TipEvent = ({
  event,
  visibility,
  displayName,
  formattedAmount
}) => (
  <NotificationWrapper
    url="https://static-cdn.jtvnw.net/emoticons/v1/459215/2.0"
    event={event}
    isVisible={visibility}
  >
    <Header>
      <strong>{displayName}</strong>
      {' just tipped '}
      <strong>
        {formattedAmount}
        {'!'}
      </strong>
    </Header>
    <Footer>
      <EventType>tip</EventType>
      <Heart size={14} />
    </Footer>
  </NotificationWrapper>
);

NotificationWrapper.propTypes = wrapperPropTypes;
NotificationWrapper.defaultProps = wrapperDefaultProps;
HostEvent.propTypes = hostPropTypes;
SubscriptionEvent.propTypes = subscriptionPropTypes;
SubGiftEvent.propTypes = subgiftPropTypes;
ResubEvent.propTypes = resubPropTypes;
TipEvent.propTypes = tipPropTypes;

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;

  border-radius: 4px;
  box-shadow: 0 14px 28px ${rgba('#090a0c', 0.25)},
    0 10px 10px ${rgba('#090a0c', 0.22)};
  color: #1a1f23;
  font-family: ${props => props.theme.gotham};
`;

const Image = styled.div`
  background: linear-gradient(#1a1f23, #121417);
  padding: 18px;
`;

const Content = styled.div`
  width: 100%;
  background: #fff;
  line-height: 1.3;
`;

const Header = styled.div`
  padding: 18px 18px 18px;
  color: #4f5c69;
  font-size: 18px;
`;

const Message = styled.div`
  margin-top: -6px;
  padding: 0 18px 18px;
  color: #738596;
  font-family: ${props => props.theme.whitney};
  font-size: 16px;
`;

const Footer = styled.div`
  display: flex;
  align-items: baseline;
  padding: 12px 18px;

  border-top: 1px solid #dce0e5;
  background: #e8ebed;
  color: #607080;
  font-family: ${props => props.theme.forza};
  font-weight: 600;
  text-transform: uppercase;

  svg {
    color: #a2adb9;
    position: relative;
    top: 1px;
  }
`;

const EventType = styled.div`
  flex: 1;
`;

const Modification = styled.div`
  padding-left: 4px;
  color: #a2adb9;
  font-weight: 400;
`;
