import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  flipped: PropTypes.bool,
  className: PropTypes.string.isRequired
};

const defaultProps = {
  flipped: false
};

const ActivityCamera = props => (
  <Wrapper className={props.className}>
    <CameraHeader>
      <ChromeButtons>
        <ChromeCircle color="#ff5f57" />
        <ChromeCircle color="#ffc130" />
        <ChromeCircle color="#02fa7b" />
      </ChromeButtons>
      <ChromeTitle>Untitled Broadcaster</ChromeTitle>
    </CameraHeader>
    <CameraZone flipped={props.flipped} />
  </Wrapper>
);

ActivityCamera.propTypes = propTypes;
ActivityCamera.defaultProps = defaultProps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  box-shadow: 0 10px 20px ${rgba('#000', 0.19)}, 0 6px 6px ${rgba('#000', 0.23)};
  border-radius: 6px;
`;

const CameraZone = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding-top: ${9 / 16 * 100}%;

  order: ${props => (props.flipped ? 1 : 0)};
  background: #090a0c;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const CameraHeader = styled.div`
  position: relative;
  align-items: center;
  padding: 12px;

  order: ${props => (props.flipped ? 0 : 1)};
  background: #1a1f23;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const ChromeButtons = styled.div`
  position: absolute;
  top: 14px;
  display: flex;
`;

const ChromeCircle = styled.div`
  width: 12px;
  height: 12px;
  margin-right: 6px;

  background: #1a1f23;
  box-shadow: inset 0 0 0 2px ${props => props.color};
  border-radius: 12px;
`;

const ChromeTitle = styled.div`
  color: #738596;
  font-family: ${props => props.theme.din};
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  text-transform: uppercase;
`;

export default ActivityCamera;
