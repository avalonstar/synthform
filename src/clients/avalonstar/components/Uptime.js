import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Capsule } from 'clients/avalonstar/styles';
import { ChevronRight } from 'react-feather';

import { UptimeTimer as Timer } from 'components/Timers';

const propTypes = {
  className: PropTypes.string,
  startTime: PropTypes.number,
  title: PropTypes.string
};

const defaultProps = {
  className: '',
  startTime: null,
  title: ''
};

const StyledTimer = styled(Timer)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: ${props => props.theme.gotham};
  font-weight: 700;
`;

const Uptime = props =>
  props.startTime ? (
    <Capsule.Wrapper className={props.className}>
      <Capsule.Title>
        <ChevronRight color="#02fa7b" size={16} />
        {props.title}
      </Capsule.Title>
      <StyledTimer startTime={props.startTime} />
    </Capsule.Wrapper>
  ) : (
    <div />
  );

Uptime.propTypes = propTypes;
Uptime.defaultProps = defaultProps;

export default Uptime;
