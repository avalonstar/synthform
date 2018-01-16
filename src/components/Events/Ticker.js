import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Motion, spring } from 'react-motion';
import { List } from 'immutable';

import styled from 'styled-components';
import { ChevronRight } from 'react-feather';

import { eventFetch } from 'actions/events';
import * as selectors from 'selectors';

import TickerItem from './TickerItem';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  events: PropTypes.instanceOf(List).isRequired,
  className: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  debugMode: PropTypes.bool,
  timer: PropTypes.number
};

const defaultProps = {
  debugMode: false,
  timer: 5
};

const Container = styled.ol`
  background: #090a0c;

  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  white-space: nowrap;
  margin: 0;
  padding: 0;

  list-style: none;
`;

const Cap = styled.li`
  background: linear-gradient(#1a1f23, #121417);
  padding: 12px 4px 12px 12px;
`;

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      timer: 1000 * 60 * this.props.timer
    };
  }

  componentDidMount() {
    this.props.request(this.props.debugMode);
    this.activateTimer();
  }

  timerExpired = () => {
    this.setState({ isVisible: false });
  };

  activateTimer = () => {
    this.timer = setTimeout(() => {
      this.timerExpired();
    }, this.state.timer);
    setTimeout(() => this.setState({ isVisible: true }), 500);
  };

  deactivateTimer() {
    clearTimeout(this.timer);
  }

  resetTimer = () => {
    this.deactivateTimer();
    this.activateTimer();
  };

  render() {
    return (
      <Motion
        defaultStyle={{ y: 100 }}
        style={{ y: spring(this.state.isVisible ? 0 : 100) }}
      >
        {({ y }) => (
          <Container
            className={this.props.className}
            style={{ transform: `translate3d(0, ${y}%, 0)` }}
          >
            <Cap>
              <ChevronRight color="#02fa7b" size={20} />
            </Cap>
            {this.props.isFetching
              ? ''
              : this.props.events.map(data => (
                  <TickerItem
                    key={data.get('timestamp')}
                    data={data.toJS()}
                    onChange={this.resetTimer}
                  />
                ))}
          </Container>
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
    events: selectors.getEventList(state)
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
