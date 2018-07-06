import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';
import { rgba } from 'polished';

import {
  WindowDecoration,
  EBWindowDecoration,
  FF5WindowDecoration,
  SMRPGWindowDecoration
} from './Styles';

const wrapperPropTypes = {
  game: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool
};

const wrapperDefaultProps = {
  isVisible: false
};

const eventPropTypes = {
  event: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

const cheerPropTypes = {
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

const NotifictionWrapper = ({ game, isVisible, children }) => (
  <Motion
    defaultStyle={{ y: -150 }}
    style={{ y: spring(isVisible ? 0 : -150, { stiffness: 120, damping: 14 }) }}
  >
    {({ y }) => (
      <Wrapper game={game} style={{ transform: `translate3d(0, ${y}%, 0)` }}>
        <Content>{children}</Content>
      </Wrapper>
    )}
  </Motion>
);

export const SubscriptionEvent = ({ game, event, visibility, displayName }) => (
  <NotifictionWrapper game={game} event={event} isVisible={visibility}>
    <strong>{displayName}</strong> just subscribed!
  </NotifictionWrapper>
);

export const SubGiftEvent = ({
  game,
  event,
  visibility,
  recipient,
  displayName
}) => (
  <NotifictionWrapper game={game} event={event} isVisible={visibility}>
    <strong>{displayName}</strong> gifted a sub to <strong>{recipient}</strong>!
  </NotifictionWrapper>
);

export const ResubEvent = ({
  game,
  event,
  visibility,
  displayName,
  months
}) => (
  <NotifictionWrapper game={game} event={event} isVisible={visibility}>
    <strong>{displayName}</strong> resubbed for <strong>{months}</strong>{' '}
    months!
  </NotifictionWrapper>
);

export const CheerEvent = ({ game, event, visibility, displayName, bits }) => (
  <NotifictionWrapper game={game} event={event} isVisible={visibility}>
    <strong>{displayName}</strong> cheered{' '}
    <strong>{numeral(bits).format('0,0')}</strong> bits!
  </NotifictionWrapper>
);

NotifictionWrapper.propTypes = wrapperPropTypes;
NotifictionWrapper.defaultProps = wrapperDefaultProps;
CheerEvent.propTypes = cheerPropTypes;
SubscriptionEvent.propTypes = subscriptionPropTypes;
SubGiftEvent.propTypes = subgiftPropTypes;
ResubEvent.propTypes = resubPropTypes;

const Wrapper = WindowDecoration.extend`
  display: flex;
  position: relative;
  width: 422px;
  margin: -2px auto;
  padding: 12px 24px;
  z-index: 10;

  border-radius: 6px;
  color: #fff;
  font-family: ${props => props.theme.din};
  text-shadow: 0 1px 0 ${rgba('#000', 0.4)};

  ${props => props.game === 'ffv' && FF5WindowDecoration} ${props =>
  props.game === 'eb' && EBWindowDecoration} ${props =>
  props.game === 'smrpg' && SMRPGWindowDecoration};

  text-align: center;
`;

const Content = styled.div`
  margin: 0 auto;
`;
