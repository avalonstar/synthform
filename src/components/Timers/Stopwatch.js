import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  active: PropTypes.bool.isRequired,
  startTime: PropTypes.number.isRequired
};

class Stopwatch extends Component {
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

  onUpdate = prevProps => {
    if (prevProps.active && prevProps.startTime) {
      if (!this.props.active) {
        clearInterval(this.state.intervalTimer);
        this.setState({ intervalTimer: null });
      } else {
        if (!this.state.intervalTimer) {
          if (this.props.active && this.props.startTime) {
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
      }
    } else if (this.props.active && this.props.startTime) {
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
    const diff = moment.duration(
      now.diff(moment.unix(this.state.internalStartTime))
    );
    const time = diff.format('hh:mm:ss', { trim: false });
    this.setState({ time });
  };

  render() {
    return <span className="timer">{this.state.time}</span>;
  }
}

Stopwatch.propTypes = propTypes;

export default Stopwatch;
