import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  className: PropTypes.string.isRequired
};

const Wrapper = styled.div`
  box-shadow: 0 10px 20px ${rgba('#090a0c', 0.19)},
    0 6px 6px ${rgba('#090a0c', 0.23)};
`;

const CameraZone = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding-top: ${9 / 16 * 100}%;

  background: #1a1f23;
`;

const CameraPadding = styled.div`
  display: flex;
  padding: 5px 12px;

  background: linear-gradient(176deg, #121417, #1a1f23);
  box-shadow: inset 0 1px 0 #3d4751;
`;

const ActivityCamera = props => (
  <Wrapper className={props.className}>
    <CameraZone />
    <CameraPadding />
  </Wrapper>
);

ActivityCamera.propTypes = propTypes;

export default ActivityCamera;
