import React from 'react';
import PropTypes from 'prop-types';
import { ChevronRight } from 'react-feather';
import styled from 'styled-components';

const propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background: linear-gradient(#2c333a, #23292f);

  border-radius: 4px;
  color: #f3f5f6;
  font-size: 13px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 10px 9px 8px;

  color: #738596;
  font-weight: 700;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

function Generic(props) {
  return (
    <Wrapper>
      <Title>
        <ChevronRight color="#02fa7b" size={16} />
        {props.title}
      </Title>
      <Content>{props.content}</Content>
    </Wrapper>
  );
}

Generic.propTypes = propTypes;

export default Generic;
