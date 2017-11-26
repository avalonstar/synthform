import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';

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

function Indicator(props) {
  return (
    <Motion defaultStyle={{ x: 0 }} style={{ x: spring(props.progress) }}>
      {({ x }) => (
        <div className="spg-bar">
          <div
            className="spg-indicator"
            data-progress={props.progress}
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
          <span className="spg-title">SP</span>
          <div className="spg-progress">
            <span className="spg-points">{Math.round(points)}</span>
            <span className="spg-goal">/{props.goal}</span>
          </div>
        </div>
      )}
    </Motion>
  );
}

class SubPointGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: 800
    };
  }

  componentDidMount() {
    this.props.request();
  }

  render() {
    const points = this.props.subPoints;
    const { goal } = this.state;
    const progress = points / goal * 100;
    return (
      <div className="spg">
        {Indicator({ progress })}
        {Label({ points, goal })}
      </div>
    );
  }
}

SubPointGoal.propTypes = propTypes;
Indicator.propTypes = indicatorPropTypes;
Label.propTypes = labelPropTypes;

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
