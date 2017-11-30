import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { subathonFetch } from 'actions/subathon';
import * as selectors from 'selectors';

import Timer from './CountdownTimer';

const propTypes = {
  endTime: PropTypes.number,
  request: PropTypes.func.isRequired
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

function mapStateToProps(state) {
  return {
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
