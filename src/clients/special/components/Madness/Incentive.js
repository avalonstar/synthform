import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import styled from 'styled-components';
import { rgba } from 'polished';

import { GameContext } from 'clients/special/components/Madness';
import { EBWindowDecoration, FF5WindowDecoration } from './Styles';

const propTypes = {
  className: PropTypes.string,
  goal: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

const defaultProps = {
  className: ''
};

const Incentive = props => (
  <GameContext.Consumer>
    {game => (
      <Wrapper game={game} className={props.className}>
        <Objective>
          At <strong>{numeral(props.goal).format('0,0')} bits</strong> each
        </Objective>
        <strong>{props.name}</strong>
      </Wrapper>
    )}
  </GameContext.Consumer>
);

Incentive.propTypes = propTypes;
Incentive.defaultProps = defaultProps;

const Wrapper = styled.div`
  padding: 12px 24px;

  border-radius: 6px;
  color: #fff;
  font-family: ${props => props.theme.din};
  font-size: 16px;
  text-shadow: 0 1px 0 ${rgba('#000', 0.4)};

  ${props => props.game === 'ffv' && FF5WindowDecoration} ${props =>
    props.game === 'eb' && EBWindowDecoration};

  text-align: left;
`;

const Objective = styled.div`
  margin-bottom: 2px;
  font-size: 13px;
`;

export default Incentive;
