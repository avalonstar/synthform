import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

const propTypes = {
  active: PropTypes.bool.isRequired,
  endTime: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired
};

class Timer extends Component {
  state = {
    intervalTimer: null,
    internalEndTime: this.props.endTime,
    time: null
  };

  componentDidMount() {
    this.tickTime();
  }

  componentDidUpdate(prevProps) {
    this.onUpdate(prevProps);
  }

  onUpdate = prevProps => {
    if (prevProps.active && prevProps.endTime) {
      if (!this.props.active) {
        clearInterval(this.state.intervalTimer);
        this.setState({ intervalTimer: null });
      } else {
        if (!this.state.intervalTimer) {
          if (this.props.active && this.props.endTime) {
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
      }
    } else if (this.props.active && this.props.endTime) {
      const intervalTimer = setInterval(() => this.tickTime(), 1000);
      this.setState({
        intervalTimer,
        internalEndTime: this.props.endTime
      });
      this.tickTime();
    }
  };

  tickTime = () => {
    const now = moment();
    const endTime = moment.unix(this.state.internalEndTime);
    const diff = moment.duration(endTime.diff(now));
    const time = diff.format('h:mm:ss', { trim: false });
    this.setState({ time });
  };

  render() {
    const remainingTime = this.props.remainingTime
      ? moment.duration(this.props.remainingTime).format('h:mm:ss')
      : moment.duration(8, 'hours').format('h:mm:ss');
    return (
      <span className="timer">
        {this.props.active ? this.state.time : remainingTime}
      </span>
    );
  }
}

Timer.propTypes = propTypes;

export default Timer;
