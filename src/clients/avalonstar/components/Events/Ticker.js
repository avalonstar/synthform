import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';
import { ChevronRight } from 'react-feather';

import TickerItem from './TickerItem';

const propTypes = {
  anchor: PropTypes.string,
  events: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  timer: PropTypes.number
};

const defaultProps = {
  anchor: 'bottom',
  className: '',
  events: [],
  timer: 5
};

const configureAnchor = () => ({
  top: -100,
  bottom: 100
});

class Ticker extends Component {
  state = {
    isVisible: false,
    timer: 1000 * 60 * this.props.timer
  };

  componentDidMount() {
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
    const anchor = configureAnchor()[this.props.anchor];
    const blacklistedEvents = ['host'];
    const events = this.props.events.filter(
      e => !blacklistedEvents.includes(e.event)
    );
    return (
      <Motion
        defaultStyle={{ y: anchor }}
        style={{ y: spring(this.state.isVisible ? 0 : anchor) }}
      >
        {({ y }) => (
          <StyledFlipMove
            typeName="ol"
            className={this.props.className}
            easing="cubic-bezier(.62, .28, .23, .99)"
            enterAnimation="fade"
            staggerDurationBy={100}
            style={{ transform: `translate3d(0, ${y}%, 0)` }}
          >
            <Cap>
              <ChevronRight color="#02fa7b" size={20} />
            </Cap>
            {events.map(data => (
              <TickerItem
                key={data.timestamp}
                data={data}
                onChange={this.resetTimer}
              />
            ))}
          </StyledFlipMove>
        )}
      </Motion>
    );
  }
}

Ticker.propTypes = propTypes;
Ticker.defaultProps = defaultProps;

const StyledFlipMove = styled(FlipMove)`
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

export default Ticker;
