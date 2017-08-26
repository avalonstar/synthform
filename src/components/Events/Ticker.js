import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { channel } from 'configurations/constants';
import { setAndHandleEventListener } from 'modules/events';
import { default as TickerItem } from './TickerItem';

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
        {this.props.events.map(data => {
          return <TickerItem key={data.get('timestamp')} data={data.toJS()} />;
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
