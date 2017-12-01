import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { subathonFetch } from 'actions/subathon';
import * as selectors from 'selectors';

import { CountdownTimer as Timer } from 'components/Timers';

const propTypes = {
  active: PropTypes.bool,
  events: PropTypes.instanceOf(List),
  contributions: PropTypes.bool,
  endTime: PropTypes.number,
  request: PropTypes.func.isRequired
};

const defaultProps = {
  active: false,
  events: List(),
  contributions: false,
  endTime: null
};

class SubathonTimer extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return this.props.endTime ? (
      <Timer endTime={this.props.endTime} />
    ) : (
      <div />
    );
  }
}

SubathonTimer.propTypes = propTypes;
SubathonTimer.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    active: selectors.getSubathonState(state),
    events: selectors.getNotifierPool(state),
    contributions: selectors.getSubathonContributionState(state),
    endTime: selectors.getSubathonEndTime(state)
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
