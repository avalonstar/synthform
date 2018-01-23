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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  box-shadow: 0 10px 20px ${rgba('#090a0c', 0.19)},
    0 6px 6px ${rgba('#090a0c', 0.23)};
`;

const CameraZone = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding-top: ${9 / 16 * 100}%;

  order: ${props => (props.flipped ? 1 : 0)};
  background: #1a1f23;
`;

const CameraPadding = styled.div`
  padding: 5px 12px;

  order: ${props => (props.flipped ? 0 : 1)};
  background: #121417;
  box-shadow: inset 0 ${props => props.flipped && '-'}1px 0 #3d4751;
`;

const ActivityCamera = props => (
  <Wrapper className={props.className}>
    <CameraZone flipped={props.flipped} />
    <CameraPadding flipped={props.flipped} />
  </Wrapper>
);

ActivityCamera.propTypes = propTypes;
ActivityCamera.defaultProps = defaultProps;

export default ActivityCamera;
