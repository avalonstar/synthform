import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import moment from 'moment';
import 'moment-duration-format';

import styled from 'styled-components';
import { rgba } from 'polished';
import { Play, Pause, PlusSquare, XSquare } from 'react-feather';

import { CountdownTimer, Stopwatch } from 'components/Timers';
import { subathonFetch } from 'actions/subathon';
import * as selectors from 'selectors';

import Notification from './Notification';

const propTypes = {
  active: PropTypes.bool,
  addedMinutes: PropTypes.number,
  elapsedTime: PropTypes.number,
  remainingTime: PropTypes.number,
  events: PropTypes.instanceOf(List),
  contributions: PropTypes.bool,
  endTime: PropTypes.number,
  startTime: PropTypes.number,
  request: PropTypes.func.isRequired
};

const statusPropTypes = {
  active: PropTypes.bool.isRequired
};

const contributionPropTypes = {
  active: PropTypes.bool.isRequired,
  addedMinutes: PropTypes.number.isRequired
};

const defaultProps = {
  active: false,
  addedMinutes: 0,
  elapsedTime: 0,
  events: List(),
  contributions: false,
  endTime: null,
  startTime: null
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;

  background: linear-gradient(#2c333a, #23292f);
  border-radius: 4px;
  box-shadow: 0 1px 3px ${rgba('#090a0c', 0.12)},
    0 1px 2px ${rgba('#090a0c', 0.24)};
  color: #f3f5f6;
  font-size: 14px;

  .ss-icon {
    padding: 9px 6px 5px 8px;
    background: linear-gradient(#23292f, #1a1f23);
  }

  .ss-content {
    flex: 1;
  }

  .ss-header {
    display: flex;
    align-items: center;
    padding: 10px 10px 5px 8px;

    color: #738596;
    font-family: ${props => props.theme.forza};
    font-weight: 700;
    font-size: 14px;

    svg {
      margin-right: 2px;
    }
  }

  .ss-info {
    display: flex;
    align-items: center;
    padding: 0px 10px 10px 8px;

    font-family: ${props => props.theme.gotham};
  }

  .ss-timer {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    font-weight: 700;
  }

  .timer-separator {
    color: #8b99a7;
    padding: 0 1px;
  }

  .ss-minutes {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    color: #8b99a7;
    font-family: ${props => props.theme.gotham};
    font-weight: 600;

    svg {
      margin-right: 2px;
    }
  }
`;

const ContributionStatus = props => (
  <div className="ss-minutes">
    {props.active ? (
      <PlusSquare color="#02fa7b" size={14} />
    ) : (
      <XSquare color="#f5515f" size={14} />
    )}
    {moment.duration(props.addedMinutes, 'minutes').format('hh[h]mm[m]')}
  </div>
);

const SubathonStatus = props =>
  props.active ? (
    <Play color="#02fa7b" size={18} />
  ) : (
    <Pause color="#f5515f" size={18} />
  );

class SubathonTimer extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    const startTime = moment
      .unix(this.props.startTime)
      .subtract(moment.duration(this.props.elapsedTime))
      .unix();
    return (
      <Wrapper>
        <Notification event={this.props.events.get(0)} />
        <div className="ss-icon">
          <SubathonStatus active={this.props.active} />
        </div>
        <div className="ss-content">
          <div className="ss-header">!subathon (day 3)</div>
          <div className="ss-info">
            <div className="ss-timer">
              {this.props.startTime && (
                <Stopwatch
                  active={this.props.active}
                  startTime={startTime}
                  elapsedTime={this.props.elapsedTime}
                />
              )}
              <span className="timer-separator">/</span>
              {this.props.endTime && (
                <CountdownTimer
                  active={this.props.active}
                  endTime={this.props.endTime}
                  remainingTime={this.props.remainingTime}
                />
              )}
            </div>
            <ContributionStatus
              active={this.props.contributions}
              addedMinutes={this.props.addedMinutes}
            />
          </div>
        </div>
      </Wrapper>
    );
  }
}

ContributionStatus.propTypes = contributionPropTypes;
SubathonStatus.propTypes = statusPropTypes;
SubathonTimer.propTypes = propTypes;
SubathonTimer.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    active: selectors.getSubathonState(state),
    addedMinutes: selectors.getSubathonAddedMinutes(state),
    elapsedTime: selectors.getSubathonElapsedTime(state),
    remainingTime: selectors.getSubathonRemainingTime(state),
    events: selectors.getNotifierPool(state),
    contributions: selectors.getSubathonContributionState(state),
    endTime: selectors.getSubathonEndTime(state),
    startTime: selectors.getSubathonStartTime(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(subathonFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SubathonTimer);
