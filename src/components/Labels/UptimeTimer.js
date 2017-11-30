/* eslint-disable no-nested-ternary */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ArrowUp, Clock } from 'react-feather';

import './UptimeTimer.css';

const propTypes = {
  startTime: PropTypes.number.isRequired
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalTimer: null,
      internalStartTime: props.startTime,
      time: null
    };

    this.onUpdate = prevProps => {
      if (prevProps.startTime) {
        if (!this.state.intervalTimer) {
          if (this.props.startTime) {
            const intervalTimer = setInterval(() => this.tickTime(), 1000);
            this.setState({ intervalTimer });
            this.tickTime();
          }
        }
        if (this.props.startTime !== this.state.internalStartTime) {
          setTimeout(() => {
            this.setState({ internalStartTime: this.props.startTime });
          }, 1800);
        }
      } else if (this.props.startTime) {
        const intervalTimer = setInterval(() => this.tickTime(), 1000);
        this.setState({
          intervalTimer,
          internalStartTime: this.props.startTime
        });
        this.tickTime();
      }
    };

    this.tickTime = () => {
      const now = moment();
      const startTime = moment(this.state.internalStartTime);
      const diff = moment.duration(now.diff(startTime));

      const hours = diff
        .hours()
        .toString()
        .padStart(2, '0');
      const minutes = diff
        .minutes()
        .toString()
        .padStart(2, '0');
      const seconds = diff
        .seconds()
        .toString()
        .padStart(2, '0');
      const time = `${hours}:${minutes}:${seconds}`;
      this.setState({ time });
    };
  }

  componentDidUpdate(prevProps) {
    this.onUpdate(prevProps);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalTimer);
  }

  render() {
    return (
      <div className="ut">
        <span className="ut-text">
          <ArrowUp color="#02fa7b" size={18} />
          <Clock color="#02fa7b" size={16} />
        </span>
        <span className="ut-timer">{this.state.time}</span>
      </div>
    );
  }
}

Timer.propTypes = propTypes;

export default Timer;
