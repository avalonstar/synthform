import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import AnimatedNumber from 'react-animated-number';

import styled from 'styled-components';
import { rgba } from 'polished';

const propTypes = {
  className: PropTypes.string,
  payload: PropTypes.objectOf(PropTypes.number).isRequired
};

const defaultProps = {
  className: ''
};

const TotalCheers = props => (
  <CheersContainer>
    <Title>
      {props.goalName}
      {' Incentive'}
    </Title>
    <Total>{numeral(props.cheered).format('0,0')}</Total>
    <Goal>of {numeral(props.goal).format('0,0')}</Goal>
  </CheersContainer>
);

const IndividualCheers = ({ goal, payload }) => (
  <BroadcasterContainer>
    {Object.keys(payload).map(key => (
      <Broadcaster key={key}>
        <Name>{key}</Name>
        <AnimatedNumber
          value={payload[key]}
          duration={500}
          stepPrecision={0}
          formatValue={n => numeral(n).format('0,0')}
        />/{numeral(goal).format('0,0')}
      </Broadcaster>
    ))}
  </BroadcasterContainer>
);

class Cheers extends Component {
  state = {
    goalName: 'EarthBound',
    individualGoal: 75000
  };

  render() {
    const { payload } = this.props;
    const { goalName, individualGoal } = this.state;
    const totalCheered = Object.values(payload).reduce((a, b) => a + b, 0);
    const totalGoal = this.state.individualGoal * 2;
    return (
      <Wrapper className={this.props.className}>
        <IndividualCheers payload={payload} goal={individualGoal} />
        <TotalCheers
          goalName={goalName}
          cheered={totalCheered}
          goal={totalGoal}
        />
      </Wrapper>
    );
  }
}

Cheers.propTypes = propTypes;
Cheers.defaultProps = defaultProps;

const Wrapper = styled.div`
  position: relative;
  padding: 24px;
  z-index: 100;

  color: #fff;
  font-family: ${props => props.theme.din};
  font-style: italic;

  background-image: linear-gradient(-180deg, #3838d0 0%, #2020a0 100%);
  border: 4px solid #ffffff;
  border: 1px solid #979797;
  box-shadow: inset 0 0 0 6px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const BroadcasterContainer = styled.div`
  display: flex;
`;

const Broadcaster = styled.div`
  flex: 1;
  display: flex;
`;

const Name = styled.div`
  flex: 1;
  font-weight: 600;
  text-transform: capitalize;
`;

const CheersContainer = styled.div`
  padding: 24px;

  background-image: linear-gradient(-180deg, #3838d0 0%, #2020a0 100%);
  border: 4px solid #ffffff;
  border: 1px solid #979797;
  box-shadow: inset 0 0 0 6px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  text-align: right;
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

export default Cheers;
