import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { eventFetch, eventNotifier } from 'actions/events';
import * as selectors from 'selectors';

import Notification from './Notification';

const propTypes = {
  notifierPool: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
  request: PropTypes.func.isRequired,
  deleteEventFromNotifier: PropTypes.func.isRequired,
  debugMode: PropTypes.bool
};

const defaultProps = {
  className: '',
  debugMode: false
};

class Notifier extends Component {
  componentDidMount() {
    this.props.request(this.props.debugMode);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifierPool[0] !== this.props.notifierPool[0];
  }

  onComplete = () => {
    if (!this.props.debugMode) {
      this.props.deleteEventFromNotifier();
    }
  };

  render() {
    return (
      <Notification
        className={this.props.className}
        event={this.props.notifierPool[0]}
        onComplete={this.onComplete}
      />
    );
  }
}

Notifier.propTypes = propTypes;
Notifier.defaultProps = defaultProps;

function mapStateToProps(state) {
  return {
    notifierPool: selectors.getNotifierPool(state)
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
