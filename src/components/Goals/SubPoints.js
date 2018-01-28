import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AnimatedNumber from 'react-animated-number';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';
import { rgba } from 'polished';
import { ChevronDown } from 'react-feather';

import { subpointFetch } from 'actions/subscriptions';
import * as selectors from 'selectors';

const propTypes = {
  subPoints: PropTypes.number.isRequired,
  request: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const indicatorPropTypes = {
  progress: PropTypes.number.isRequired
};

const labelPropTypes = {
  points: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired
};

const getWidth = (span, end) => span / end * 100;

const Goal = ({ progress }) => (
  <Motion defaultStyle={{ x: 0 }} style={{ x: spring(progress) }}>
    {({ x }) => (
      <Bar>
        <Progress data-progress={progress} style={{ width: `${x}%` }} />
      </Bar>
    )}
  </Motion>
);

const Label = ({ points, goal }) => (
  <LabelContainer>
    <Title>NEWEMOTE</Title>
    <Points>
      <AnimatedNumber value={points} duration={500} stepPrecision={0} />
    </Points>
    {'/'}
    {goal}
  </LabelContainer>
);

const Best = ({ progress }) => (
  <Motion defaultStyle={{ x: 0 }} style={{ x: spring(progress) }}>
    {({ x }) => (
      <Indicator data-progress={progress} style={{ width: `${x}%` }}>
        <ChevronDown size={18} />
      </Indicator>
    )}
  </Motion>
);

class SubPointGoal extends Component {
  state = {
    best: 462,
    goal: 800
  };

  componentDidMount() {
    this.props.request();
  }

  render() {
    const points = this.props.subPoints;
    const { best, goal } = this.state;
    const bestWidth = getWidth(best, goal);
    const goalWidth = getWidth(points, goal);
    return (
      <Wrapper className={this.props.className}>
        <Best progress={bestWidth} />
        <Goal progress={goalWidth} />
        <Label goal={goal} points={points} />
      </Wrapper>
    );
  }
}

SubPointGoal.propTypes = propTypes;
Best.propTypes = indicatorPropTypes;
Goal.propTypes = indicatorPropTypes;
Label.propTypes = labelPropTypes;

const mapStateToProps = state => ({
  subPoints: selectors.getSubPoints(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      request: () => dispatch(subpointFetch.request())
    },
    dispatch
  );

const Wrapper = styled.div`
  font-family: ${props => props.theme.miedinger};
`;

const Bar = styled.div`
  width: 100%;
  height: 20px;
  padding: 2px;

  background: #090a0c;
  border: 4px solid #1a1f23;
  border-radius: 18px;
  box-shadow: 0 1px 3px ${rgba('#090a0c', 0.12)},
    0 1px 2px ${rgba('#090a0c', 0.24)};
`;

const Progress = styled.div`
  height: 100%;
  background: linear-gradient(${rgba('#fff', 0.25)} 30%, ${rgba('#000', 0.25)}),
    linear-gradient(90deg, #00eac9, #02fa7b);
  box-shadow: inset 1px -3px 0 0 ${rgba('#000', 0.3)};
  border-radius: 18px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
`;

const LabelContainer = styled.div`
  position: relative;
  top: -7px;
  padding: 0 4px;
  margin-bottom: -13px;
  display: flex;
  align-items: baseline;

  color: #aeb8c2;
  font-size: 14px;
  font-weight: 500;
  text-shadow: 0 1px 2px #1a1f23;
`;

const Title = styled.span`
  flex: 1;
`;

const Points = styled.span`
  padding-right: 1px;
  color: #e8ebed;
  font-size: 26px;
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: -1px;

  color: #00eac9;

  svg {
    position: absolute;
    right: -9px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(SubPointGoal);
