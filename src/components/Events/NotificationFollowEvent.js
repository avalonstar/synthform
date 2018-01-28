import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';

const followPropTypes = {
  username: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired
};

const FollowEvent = ({ visibility, username }) => (
  <Motion
    defaultStyle={{ y: 200 }}
    style={{
      y: spring(visibility ? 0 : 200, { stiffness: 210, damping: 30 })
    }}
  >
    {({ y }) => (
      <Wrapper style={{ transform: `translate3d(0, ${y}%, 0)` }}>
        <Image>
          <Emote
            src="https://static-cdn.jtvnw.net/emoticons/v1/206446/3.0"
            alt=""
          />
        </Image>
        <Content>
          <Message>
            Hello there <strong>{username}</strong>! Welcome!
          </Message>
        </Content>
      </Wrapper>
    )}
  </Motion>
);

FollowEvent.propTypes = followPropTypes;

const Wrapper = styled.div`
  display: flex;
`;

const Image = styled.div`
  background: transparent;
  padding: 0;
`;

const Emote = styled.img`
  width: 74px;
`;

const Content = styled.div`
  padding-top: 16px;
  width: 100%;
  background: transparent;
  line-height: 1.3;
`;

const Message = styled.div`
  position: relative;
  margin: 0 0 0 12px;
  padding: 12px;

  background: #e8ebed;
  border-radius: 8px;
  border-top-left-radius: 0px;
  color: #4f5c69;
  font-family: ${props => props.theme.whitney};

  &:before {
    content: '';
    position: absolute;
    left: -12px;
    top: 0;

    width: 0;
    height: 0;
    border-top: 12px solid #e8ebed;
    border-left: 12px solid transparent;
  }
`;

export default FollowEvent;
