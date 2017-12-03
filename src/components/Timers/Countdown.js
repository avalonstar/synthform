import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

const propTypes = {
  active: PropTypes.bool.isRequired,
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
  }

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
    return <span className="timer">{this.state.time}</span>;
  }
}

Timer.propTypes = propTypes;

export default Timer;
