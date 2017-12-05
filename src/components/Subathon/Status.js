import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import moment from 'moment';
import 'moment-duration-format';
import { Play, Pause, PlusSquare, XSquare } from 'react-feather';

import { subathonFetch } from 'actions/subathon';
import * as selectors from 'selectors';

import { CountdownTimer, Stopwatch } from 'components/Timers';
import Notification from './Notification';

import './Status.css';

const propTypes = {
  active: PropTypes.bool,
  addedMinutes: PropTypes.number,
  elapsedTime: PropTypes.number,
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
      <div className="ss">
        <Notification event={this.props.events.get(0)} />
        <div className="ss-icon">
          <SubathonStatus active={this.props.active} />
        </div>
        <div className="ss-content">
          <div className="ss-header">!subathon (day 1)</div>
          <div className="ss-info">
            <div className="ss-timer">
              {this.props.startTime && (
                <Stopwatch active={this.props.active} startTime={startTime} />
              )}
              <span className="timer-separator">/</span>
              {this.props.endTime && (
                <CountdownTimer
                  active={this.props.active}
                  endTime={this.props.endTime}
                />
              )}
            </div>
            <ContributionStatus
              active={this.props.contributions}
              addedMinutes={this.props.addedMinutes}
            />
          </div>
        </div>
      </div>
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
