import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uptimeFetch } from 'actions/uptime';
import * as selectors from 'selectors';

import Timer from './UptimeTimer';

const propTypes = {
  startTime: PropTypes.number,
  request: PropTypes.func.isRequired
};

const defaultProps = {
  startTime: Date.now()
};

class Uptime extends Component {
  componentDidMount() {
    this.props.request();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.startTime !== this.props.startTime;
  }

  render() {
    return this.props.startTime && <Timer startTime={this.props.startTime} />;
  }
}

Uptime.propTypes = propTypes;
Uptime.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    startTime: selectors.getStreamStartTime(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(uptimeFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Uptime);
