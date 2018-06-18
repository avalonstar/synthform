import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import AnimatedNumber from 'react-animated-number';

import styled from 'styled-components';
import { rgba } from 'polished';

import hand from './hand.png';

const propTypes = {
  cheered: PropTypes.number,
  goal: PropTypes.number,
  goalName: PropTypes.string.isRequired
};

const defaultProps = {
  cheered: '0',
  goal: '0'
};

const Overview = props => (
  <CheersContainer>
    <Hand src={hand} />
    <Title>
      {'Incentive: '}
      <strong>{props.goalName}</strong>
    </Title>
    <Total>
      <AnimatedNumber
        value={props.cheered}
        duration={500}
        stepPrecision={0}
        formatValue={n => numeral(n).format('0,0')}
      />
    </Total>
    <Goal>
      {'of '}
      {numeral(props.goal).format('0,0')}
      {' bits'}
    </Goal>
  </CheersContainer>
);

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

const CheersContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 24px;
  width: 176px;

  text-align: right;
  background-image: linear-gradient(-180deg, #3838d0 0%, #2020a0 100%);
  box-shadow: inset 0 0 0 1px #979797, inset 0 0 0 4px #fff,
    inset 0 0 0 6px ${rgba('#000', 0.25)};
  border-radius: 6px;
`;

const Hand = styled.img`
  position: absolute;
  top: 50px;
  left: -3px;
`;

const Title = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

const Total = styled.div`
  font-size: 36px;
  font-weight: 900;
`;

const Goal = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export default Overview;
