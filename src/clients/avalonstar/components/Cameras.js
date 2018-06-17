import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import WindowChrome from './Windows';

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string
};

const defaultProps = {
  title: 'Untitled Publisher'
};

const ActivityCamera = props => (
  <WindowChrome className={props.className} title={props.title}>
    <Zone />
  </WindowChrome>
);

ActivityCamera.propTypes = propTypes;
ActivityCamera.defaultProps = defaultProps;

const Zone = styled.div`
  padding-top: ${9 / 16 * 100}%;
`;

export default ActivityCamera;
