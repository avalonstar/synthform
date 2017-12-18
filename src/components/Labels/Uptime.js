import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ChevronRight } from 'react-feather';

import { uptimeFetch } from 'actions/uptime';
import * as selectors from 'selectors';

import { UptimeTimer as Timer } from 'components/Timers';

import './Uptime.css';

const propTypes = {
  startTime: PropTypes.number,
  request: PropTypes.func.isRequired
};

const defaultProps = {
  startTime: null
};

class Uptime extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return this.props.startTime ? (
      <div className="ut">
        <span className="ut-text">
          <ChevronRight color="#02fa7b" size={16} />
          #AVCC2017
        </span>
        <Timer startTime={this.props.startTime} />
      </div>
    ) : (
      <div />
    );
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
