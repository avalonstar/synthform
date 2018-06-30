import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import AnimatedNumber from 'react-animated-number';

import styled from 'styled-components';

import { GameContext } from 'clients/special/components/Madness';

import hand from './hand.png';
import {
  WindowDecoration,
  EBWindowDecoration,
  FF5WindowDecoration
} from '../Styles';

const propTypes = {
  cheered: PropTypes.number,
  goal: PropTypes.number
};

const defaultProps = {
  cheered: '0',
  goal: '0'
};

const Overview = props => (
  <GameContext.Consumer>
    {game => (
      <CheersContainer game={game}>
        {game === 'ffv' && <Hand src={hand} />}
        <Title>Next Incentive</Title>
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
    )}
  </GameContext.Consumer>
);

Overview.propTypes = propTypes;
Overview.defaultProps = defaultProps;

const CheersContainer = WindowDecoration.extend`
  position: absolute;
  top: 0;
  left: 0;
  padding: 24px;
  width: 176px;

  ${props => props.game === 'ffv' && FF5WindowDecoration} ${props =>
    props.game === 'eb' && EBWindowDecoration};
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
