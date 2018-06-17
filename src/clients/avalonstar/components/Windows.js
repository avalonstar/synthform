import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
  explicitHeight: PropTypes.bool,
  children: PropTypes.node.isRequired
};

const defaultProps = {
  title: 'Untitled Window',
  explicitHeight: false
};

const WindowChrome = props => (
  <Wrapper className={props.className} explicitHeight={props.explicitHeight}>
    <Header>
      <ChromeButtons>
        <ChromeCircle color="#ff5f57" />
        <ChromeCircle color="#ffc130" />
        <ChromeCircle color="#02fa7b" />
      </ChromeButtons>
      <ChromeTitle>{props.title}</ChromeTitle>
    </Header>
    {props.children}
  </Wrapper>
);

WindowChrome.propTypes = propTypes;
WindowChrome.defaultProps = defaultProps;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${props => (props.explicitHeight ? '100%' : 'auto')};
  overflow: hidden;

  box-shadow: 0 10px 20px ${rgba('#000', 0.19)}, 0 6px 6px ${rgba('#000', 0.23)};
  border-radius: 6px;
`;

const Zone = styled.div`
  display: block;
  flex: 1;
  position: relative;
  overflow: hidden;

  background: #090a0c;
  color: #f3f5f6;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const Header = styled.div`
  position: relative;
  align-items: center;
  padding: 12px;

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

export default WindowChrome;
