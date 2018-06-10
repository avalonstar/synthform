import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import WindowChrome from './Windows';

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string
};

const defaultProps = {
  title: 'Untitled Broadcaster'
};

const ActivityCamera = props => (
  <WindowChrome className={props.className} title={props.title}>
    <Zone />
  </WindowChrome>
);

ActivityCamera.propTypes = propTypes;
ActivityCamera.defaultProps = defaultProps;

const Zone = styled.div`
  display: block;
  position: relative;
  width: 100%;
  padding-top: ${9 / 16 * 100}%;

  background: #090a0c;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

export default ActivityCamera;
