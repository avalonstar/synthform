import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Capsule } from 'clients/avalonstar/styles';
import { ChevronRight } from 'react-feather';

const propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  className: '',
  content: ''
};

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: left;

  font-family: ${props => props.theme.gotham};
  font-weight: 700;
`;

function Generic(props) {
  return (
    <Capsule.Wrapper className={props.className}>
      <Capsule.Title>
        <ChevronRight color="#02fa7b" size={16} />
        {props.title}
      </Capsule.Title>
      <Content>{props.content}</Content>
    </Capsule.Wrapper>
  );
}

Generic.propTypes = propTypes;
Generic.defaultProps = defaultProps;

export default Generic;
