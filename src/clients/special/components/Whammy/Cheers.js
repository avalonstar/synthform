import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import AnimatedNumber from 'react-animated-number';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';
import { rgba } from 'polished';

import windowBorder from './windowBorder.png';
import windowBackground from './windowBackground.png';

const propTypes = {
  className: PropTypes.string,
  payload: PropTypes.objectOf(PropTypes.number).isRequired
};

const defaultProps = {
  className: ''
};

const progressionPropTypes = {
  channel: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired
};

const objectivePropTypes = {
  points: PropTypes.number.isRequired
};

const breakdownPropTypes = {
  payload: PropTypes.objectOf(PropTypes.number).isRequired,
  goal: PropTypes.number.isRequired
};

const getWidth = (span, end, cap) => {
  span = span > cap ? cap : span; // eslint-disable-line
  return span / end * 100;
};

const Progression = ({ channel, progress }) => (
  <Motion defaultStyle={{ x: 0 }} style={{ x: spring(progress) }}>
    {({ x }) => (
      <Fragment>
        <Progress data-channel={channel} style={{ width: `${x}%` }} />
      </Fragment>
    )}
  </Motion>
);

const Objective = ({ points }) => (
  <ObjectiveContainer>
    <Title>100% Run</Title>
    <AnimatedNumber
      value={points}
      duration={500}
      stepPrecision={0}
      formatValue={n => numeral(n).format('0')}
    />
    {'%'}
  </ObjectiveContainer>
);

const Breakdown = ({ payload, goal }) => (
  <BreakdownContainer>
    {Object.keys(payload).map(key => (
      <BreakdownItem key={key} data-channel={key}>
        <Name>{key}</Name>
        <AnimatedNumber
          value={payload[key]}
          style={{ color: '#fff' }}
          duration={500}
          stepPrecision={0}
          formatValue={n => numeral(n).format('0,0')}
        />
        {'/'}
        {numeral(goal).format('0,0')}
      </BreakdownItem>
    ))}
  </BreakdownContainer>
);

class Cheers extends Component {
  state = {
    individualGoal: 20000,
    totalGoal: 80000
  };

  render() {
    const { payload } = this.props;
    const { individualGoal, totalGoal } = this.state;
    const total = Object.values(payload)
      .map(value => (value > individualGoal ? individualGoal : value))
      .reduce((acc, val) => acc + val, 0);
    const totalPercentage = total / totalGoal * 100;
    return (
      <Wrapper className={this.props.className}>
        <BarContainer>
          <Bar>
            {Object.keys(payload).map(key => (
              <Progression
                key={key}
                channel={key}
                progress={getWidth(payload[key], totalGoal, individualGoal)}
              />
            ))}
          </Bar>
          <Objective points={totalPercentage} />
        </BarContainer>
        <Breakdown payload={payload} goal={individualGoal} />
      </Wrapper>
    );
  }
}

Cheers.propTypes = propTypes;
Cheers.defaultProps = defaultProps;
Progression.propTypes = progressionPropTypes;
Objective.propTypes = objectivePropTypes;
Breakdown.propTypes = breakdownPropTypes;

const Wrapper = styled.div`
  box-shadow: 0 0 2px #111;
  color: #fff;
  text-shadow: 0 2px 0 #111;
`;

const StyledBorder = styled.div`
  background: url(${windowBackground});
  border: 8px double black;
  border-image: url(${windowBorder}) 8 8 8 8 repeat repeat;
  font-family: ${props => props.theme.chronotype};
`;

const BarContainer = styled(StyledBorder)`
  padding: 2px 6px 0;
`;

const Bar = styled.div`
  display: inline-flex;
  width: 100%;
  height: 14px;
  padding: 2px;

  background: ${rgba('#090a0c', 0.25)};
  border: 2px solid #8c9494;
  border-radius: 18px;
  box-shadow: 0 2px 0 #111;
`;

const Progress = styled.div`
  height: 100%;
  box-shadow: inset 0px -1px 0 0 ${rgba('#000', 0.1)};

  &:first-child {
    border-radius: 18px;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  &:last-child {
    border-radius: 18px;
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  &[data-channel='avalonstar'] {
    background: linear-gradient(0deg, #00eac9, #02fa7b);
  }
  &[data-channel='slackaholicus'] {
    background: linear-gradient(0deg, #b70000, #db1c1c);
  }
  &[data-channel='spoonee'] {
    background: linear-gradient(0deg, #3f0ea2, #a925de);
  }
  &[data-channel='tehmorag'] {
    background: linear-gradient(0deg, #2fbd21, #8ae860);
  }
`;

const ObjectiveContainer = styled.div`
  display: flex;

  font-size: 22px;
  font-weight: 500;
`;

const Title = styled.span`
  flex: 1;
  color: #8c9494;
`;

const BreakdownContainer = styled(StyledBorder)`
  padding: 8px 6px 2px;

  border-top: 0;
  color: #8c9494;
  font-size: 18px;
`;

const BreakdownItem = styled.li`
  display: flex;
  position: relative;

  &::before {
    position: absolute;
    top: 1px;
    height: 14px;
    width: 14px;

    background: red;
    box-shadow: 0 2px 0 #111, inset 0 -2px 0 ${rgba('#111', 0.2)};
    content: '';
  }

  &[data-channel='avalonstar']::before {
    background: linear-gradient(0deg, #00eac9, #02fa7b);
  }
  &[data-channel='slackaholicus']::before {
    background: linear-gradient(0deg, #b70000, #db1c1c);
  }
  &[data-channel='spoonee']::before {
    background: linear-gradient(0deg, #3f0ea2, #a925de);
  }
  &[data-channel='tehmorag']::before {
    background: linear-gradient(0deg, #2fbd21, #8ae860);
  }
`;

const Name = styled.span`
  flex: 1;
  padding-left: 20px;
  color: #fff;
`;

export default Cheers;
