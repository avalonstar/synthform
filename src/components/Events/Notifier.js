import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { channel } from 'configurations/constants';
import { setAndHandleEventListener } from 'modules/events';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  events: PropTypes.instanceOf(List),
  setAndHandleEventListener: PropTypes.func.isRequired
};

const defaultProps = {
  events: List()
};

class Notifier extends Component {
  componentDidMount() {
    this.props.setAndHandleEventListener(channel);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.events.get(0) !== this.props.events.get(0);
  }

  render() {
    return <div />;
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

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

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
