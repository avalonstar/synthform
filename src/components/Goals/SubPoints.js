import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';

import { subpointFetch } from 'actions/subscriptions';
import * as selectors from 'selectors';

import './SubPoints.css';

const propTypes = {
  subPoints: PropTypes.number.isRequired,
  request: PropTypes.func.isRequired
};

const indicatorPropTypes = {
  progress: PropTypes.number.isRequired
};

const labelPropTypes = {
  points: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired
};

const getWidth = (span, end) => span / end * 100;

function Goal({ progress }) {
  return (
    <Motion defaultStyle={{ x: 0 }} style={{ x: spring(progress) }}>
      {({ x }) => (
        <div className="spg-bar">
          <div
            className="spg-indicator"
            data-progress={progress}
            style={{ width: `${x}%` }}
          />
        </div>
      )}
    </Motion>
  );
}

function Label(props) {
  return (
    <Motion
      defaultStyle={{ points: 0 }}
      style={{ points: spring(props.points) }}
    >
      {({ points }) => (
        <div className="spg-label">
          <span className="spg-title">2017 GOAL</span>
          <div className="spg-progress">
            <span className="spg-points">{Math.round(points)}</span>
            <span className="spg-goal">/{props.goal}</span>
          </div>
        </div>
      )}
    </Motion>
  );
}

function PB({ points, progress }) {
  return (
    <Motion defaultStyle={{ x: 0 }} style={{ x: spring(progress) }}>
      {({ x }) => (
        <div
          className="spg-pb-indicator"
          data-progress={progress}
          style={{ width: `${x}%` }}
        >
          <span className="spg-pb-text">{points}</span>
        </div>
      )}
    </Motion>
  );
}

class SubPointGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      best: 432,
      goal: 450
    };
  }

  componentDidMount() {
    this.props.request();
  }

  render() {
    const points = this.props.subPoints;
    const { best, goal } = this.state;
    const goalWidth = getWidth(points, goal);
    const bestWidth = getWidth(best, goal);
    return (
      <div className="spg">
        {/* <PB points={best} progress={bestWidth} /> */}
        <Goal progress={goalWidth} />
        <Label goal={goal} points={points} />
      </div>
    );
  }
}

SubPointGoal.propTypes = propTypes;
Goal.propTypes = indicatorPropTypes;
Label.propTypes = labelPropTypes;
PB.propTypes = indicatorPropTypes;

function mapStateToProps(state) {
  return {
    subPoints: selectors.getSubPoints(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(subpointFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SubPointGoal);
