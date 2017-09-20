import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import { List } from 'immutable';
import { ChevronRight } from 'react-feather';

import { eventFetch } from 'actions/events';

import Delay from 'components/Delay';
import TickerItem from './TickerItem';

import './Ticker.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  events: PropTypes.instanceOf(List),
  request: PropTypes.func.isRequired,
  debugMode: PropTypes.bool
};

const defaultProps = {
  events: List(),
  debugMode: false
};

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      timer: 1000 * 60 * 5
    };

    this.timerExpired = () => {
      this.setState({ isVisible: false });
    };

    this.activateTimer = () => {
      this.timer = setTimeout(() => {
        this.timerExpired();
      }, this.state.timer);
      setTimeout(() => this.setState({ isVisible: true }), 500);
    };

    this.resetTimer = () => {
      this.activateTimer();
      this.deactivateTimer();
    };
  }

  componentDidMount() {
    this.props.request(this.props.debugMode);
    this.activateTimer();
  }

  deactivateTimer() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <Motion
        defaultStyle={{ y: 100 }}
        style={{ y: spring(this.state.isVisible ? 0 : 100) }}
      >
        {({ y }) => (
          <ol className="t" style={{ transform: `translate3d(0, ${y}%, 0)` }}>
            <li className="t-cap">
              <ChevronRight color="#02fa7b" size={24} />
            </li>
            {this.props.isFetching ? (
              ''
            ) : (
              this.props.events.map((data, i) => (
                <Delay
                  key={data.get('timestamp')}
                  initial={100}
                  value={0}
                  period={i * 30}
                >
                  {delayValue => (
                    <TickerItem
                      data={data.toJS()}
                      delayValue={delayValue}
                      onChange={this.resetTimer}
                    />
                  )}
                </Delay>
              ))
            )}
          </ol>
        )}
      </Motion>
    );
  }
}

Ticker.propTypes = propTypes;
Ticker.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    isFetching: state.events.get('isFetching'),
    events: state.events.get('events')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: debugMode => dispatch(eventFetch.request(debugMode))
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
