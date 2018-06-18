import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';

import Detail from './Cheers/Detail';
import Overview from './Cheers/Overview';

const propTypes = {
  className: PropTypes.string,
  payload: PropTypes.objectOf(PropTypes.number).isRequired
};

const defaultProps = {
  className: ''
};

class Progression extends Component {
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
        <BroadcasterContainer>
          {Object.keys(payload).map(key => (
            <Detail
              key={key}
              name={key}
              cheers={payload[key]}
              goal={individualGoal}
            />
          ))}
        </BroadcasterContainer>
        <Overview goalName={goalName} cheered={totalCheered} goal={totalGoal} />
      </Wrapper>
    );
  }
}

Progression.propTypes = propTypes;
Progression.defaultProps = defaultProps;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 422px;
  height: 118px;
  padding: 24px 24px 24px 194px;
  z-index: 100;

  background-image: linear-gradient(-180deg, #3838d0 0%, #2020a0 100%);
  box-shadow: inset 0 0 0 1px #979797, inset 0 0 0 4px #fff,
    inset 0 0 0 6px ${rgba('#000', 0.25)}, 0 6px 6px 0 ${rgba('#000', 0.26)},
    0 10px 20px 0 ${rgba('#000', 0.19)};
  border-radius: 6px;
  color: #fff;
  font-family: ${props => props.theme.din};
  font-style: italic;
  text-shadow: 0 1px 0 ${rgba('#000', 0.4)};
`;

const BroadcasterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Progression;
