import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

const propTypes = {
  startTime: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalTimer: null,
      internalStartTime: props.startTime,
      time: null
    };
  }

  componentDidMount() {
    this.tickTime();
  }

  componentDidUpdate(prevProps) {
    this.onUpdate(prevProps);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalTimer);
  }

  onUpdate = prevProps => {
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

  tickTime = () => {
    const now = moment();
    const startTime = moment(this.state.internalStartTime);
    const diff = moment.duration(now.diff(startTime));
    const time = diff.format('h:mm:ss', { trim: false });
    this.setState({ time });
  };

  render() {
    return <span className={this.props.className}>{this.state.time}</span>;
  }
}

Timer.propTypes = propTypes;

export default Timer;
