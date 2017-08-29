import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { ChevronRight } from 'react-feather';

import { channel } from 'configurations/constants';
import { setAndHandleEventListener } from 'modules/events';

import Delay from 'components/Delay';
import TickerItem from './TickerItem';

import './Ticker.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  events: PropTypes.instanceOf(List),
  setAndHandleEventListener: PropTypes.func.isRequired
};

const defaultProps = {
  events: List()
};

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
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
    this.props.setAndHandleEventListener(channel);
  }

  deactivateTimer() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <ol className="t">
        <li className="t-cap">
          <ChevronRight color="#02fa7b" size={24} />
        </li>
        {this.props.events.map((data, i) =>
          <Delay
            key={data.get('timestamp')}
            initial={100}
            value={0}
            period={i * 30}
          >
            {delayValue =>
              <TickerItem
                data={data.toJS()}
                delayValue={delayValue}
                onChange={this.resetTimer}
              />}
          </Delay>
        )}
      </ol>
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
  return bindActionCreators({ setAndHandleEventListener }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
