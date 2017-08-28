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
  error: PropTypes.string.isRequired,
  events: PropTypes.instanceOf(List),
  setAndHandleEventListener: PropTypes.func.isRequired
};

class Ticker extends Component {
  componentDidMount() {
    this.props.setAndHandleEventListener(channel);
  }

  render() {
    return (
      <ol className="t">
        <li className="t-cap">
          <ChevronRight color="#fff" size={24} />
        </li>
        {this.props.events.map((data, i) => {
          return (
            <Delay
              key={data.get('timestamp')}
              initial={100}
              value={0}
              period={i * 30}
            >
              {delayed => <TickerItem data={data.toJS()} delay={delayed} />}
            </Delay>
          );
        })}
      </ol>
    );
  }
}

Ticker.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isFetching: state.events.get('isFetching'),
    error: state.events.get('error'),
    events: state.events.get('events') || List()
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAndHandleEventListener }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticker);
