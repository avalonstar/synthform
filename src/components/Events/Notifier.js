import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { eventFetch, eventNotifier } from 'actions/events';

import Notification from './Notification';

const propTypes = {
  notifierPool: PropTypes.instanceOf(List),
  request: PropTypes.func.isRequired,
  deleteEventFromNotifier: PropTypes.func.isRequired,
  debugMode: PropTypes.bool
};

const defaultProps = {
  notifierPool: List(),
  debugMode: false
};

class Notifier extends Component {
  constructor(props) {
    super(props);

    this.onComplete = () => {
      if (!this.props.debugMode) {
        this.props.deleteEventFromNotifier();
      }
    };
  }

  componentDidMount() {
    this.props.request(this.props.debugMode);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifierPool.get(0) !== this.props.notifierPool.get(0);
  }

  render() {
    return (
      <Notification
        event={this.props.notifierPool.get(0)}
        onComplete={this.onComplete}
      />
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    notifierPool: state.events.get('notifierPool')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: debugMode => dispatch(eventFetch.request(debugMode)),
      deleteEventFromNotifier: () => dispatch(eventNotifier.delete())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
