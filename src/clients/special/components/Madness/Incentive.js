import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  className: PropTypes.string,
  goal: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

const defaultProps = {
  className: ''
};

const Incentive = props => (
  <Wrapper className={props.className}>
    <Objective>
      At <strong>{numeral(props.goal).format('0,0')} bits</strong> each
    </Objective>
    <strong>{props.name}</strong>
  </Wrapper>
);

Incentive.propTypes = propTypes;
Incentive.defaultProps = defaultProps;

const Wrapper = styled.div`
  padding: 12px 24px;

  background-image: linear-gradient(-180deg, #3838d0 0%, #2020a0 100%);
  box-shadow: inset 0 0 0 1px #979797, inset 0 0 0 4px #fff,
    inset 0 0 0 6px ${rgba('#000', 0.25)}, 0 6px 6px 0 ${rgba('#000', 0.26)},
    0 10px 20px 0 ${rgba('#000', 0.19)};
  border-radius: 6px;
  color: #fff;
  font-family: ${props => props.theme.din};
  font-size: 13px;
  text-shadow: 0 1px 0 ${rgba('#000', 0.4)};
`;

const Objective = styled.div`
  margin-bottom: 2px;
  font-size: 12px;
`;

export default Incentive;
