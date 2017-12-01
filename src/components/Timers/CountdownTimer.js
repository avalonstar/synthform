import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ChevronRight } from 'react-feather';

import './CountdownTimer.css';

const propTypes = {
  endTime: PropTypes.number.isRequired
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalTimer: null,
      internalEndTime: props.endTime,
      time: null
    };

    this.onUpdate = prevProps => {
      if (prevProps.endTime) {
        if (!this.state.intervalTimer) {
          if (this.props.endTime) {
            const intervalTimer = setInterval(() => this.tickTime(), 1000);
            this.setState({ intervalTimer });
            this.tickTime();
          }
        }
        if (this.props.endTime !== this.state.internalEndTime) {
          setTimeout(() => {
            this.setState({ internalEndTime: this.props.endTime });
          }, 1800);
        }
      } else if (this.props.endTime) {
        const intervalTimer = setInterval(() => this.tickTime(), 1000);
        this.setState({
          intervalTimer,
          internalEndTime: this.props.endTime
        });
        this.tickTime();
      }
    };

    this.tickTime = () => {
      const now = moment();
      const endTime = moment.unix(this.state.internalEndTime);
      const diff = moment.duration(endTime.diff(now));

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

  componentDidMount() {
    this.tickTime();
  }

  componentDidUpdate(prevProps) {
    this.onUpdate(prevProps);
  }

  render() {
    return (
      <div className="cdt">
        <span className="cdt-text">
          <ChevronRight color="#02fa7b" size={18} />
          {'!subathon'}
        </span>
        <span className="cdt-timer">{this.state.time}</span>
      </div>
    );
  }
}

Timer.propTypes = propTypes;

export default Timer;
