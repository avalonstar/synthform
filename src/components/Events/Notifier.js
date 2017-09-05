import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';

import { channel } from 'configurations/constants';
import {
  setAndHandleEventListener,
  removeEventFromNotifier
} from 'modules/events';

import Notification from './Notification';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  notifierPool: PropTypes.instanceOf(List),
  setAndHandleEventListener: PropTypes.func.isRequired,
  removeEventFromNotifier: PropTypes.func.isRequired,
  debug: PropTypes.bool
};

const defaultProps = {
  notifierPool: List(),
  debug: false
};

class Notifier extends Component {
  constructor(props) {
    super(props);

    this.onComplete = () => {
      this.props.removeEventFromNotifier();
    };
  }

  componentDidMount() {
    this.props.setAndHandleEventListener(channel, this.props.debug);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.notifierPool.get(0) !== this.props.notifierPool.get(0);
  }

  render() {
    return (
      !this.props.isFetching &&
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
    isFetching: state.events.get('isFetching'),
    notifierPool: state.events.get('notifierPool')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setAndHandleEventListener,
      removeEventFromNotifier
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
