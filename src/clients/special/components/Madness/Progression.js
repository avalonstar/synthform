import _ from 'lodash';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';

import { GameContext } from 'clients/special/components/Madness';
import { EarthBoundWindowDecoration, FF5WindowDecoration } from './Styles';

import Incentive from './Incentive';
import Detail from './Cheers/Detail';
import Overview from './Cheers/Overview';
import incentives from './incentives';

const propTypes = {
  className: PropTypes.string,
  payload: PropTypes.objectOf(PropTypes.number).isRequired
};

const defaultProps = {
  className: ''
};

class Progression extends Component {
  state = {
    incentiveValues: Object.keys(incentives)
      .reverse()
      .concat([0])
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.payload !== this.props.payload) {
      this.setState(this.getCurrentIncentive(nextProps.payload));
    }
  }

  getCurrentIncentive = cheers => {
    const current = Object.values(cheers);
    const amount = this.state.incentiveValues
      .map(value => (current.every(x => x >= value) ? value : undefined))
      .filter(item => item !== undefined)[0];
    const index = this.state.incentiveValues.indexOf(amount);
    return incentives[this.state.incentiveValues[index - 1]];
  };

  render() {
    const { payload: cheers } = this.props;
    const { goal, game, name } = this.state;
    const totalCheered = Object.values(cheers).reduce((a, b) => a + b, 0);
    const totalGoal = goal * 2;

    return (
      !_.isEmpty(cheers) && (
        <GameContext.Consumer>
          {selectedGame => (
            <Fragment>
              <Wrapper game={selectedGame} className={this.props.className}>
                <BroadcasterContainer>
                  {Object.keys(cheers).map(broadcaster => (
                    <Detail
                      key={broadcaster}
                      name={broadcaster}
                      cheers={cheers[broadcaster]}
                      goal={goal}
                    />
                  ))}
                </BroadcasterContainer>
                <Overview cheered={totalCheered} goal={totalGoal} />
              </Wrapper>
              <StyledIncentive goal={goal} game={game} name={name} />
            </Fragment>
          )}
        </GameContext.Consumer>
      )
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

  border-radius: 6px;
  color: #fff;
  font-family: ${props => props.theme.din};
  font-style: italic;
  text-shadow: 0 1px 0 ${rgba('#000', 0.4)};

  ${props => props.game === 'ffv' && FF5WindowDecoration} ${props =>
    props.game === 'eb' && EarthBoundWindowDecoration};
`;

const BroadcasterContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledIncentive = styled(Incentive)`
  margin: 6px auto 0;
  width: 422px;
  z-index: 0;
`;

export default Progression;
