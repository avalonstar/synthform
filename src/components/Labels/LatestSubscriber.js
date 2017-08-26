import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import { channel } from 'configurations/constants';
import { setAndHandleLatestSubscriberListener } from 'modules/subscriptions';

const propTypes = {
  username: PropTypes.string,
  length: PropTypes.number,
  prime: PropTypes.bool,
  setAndHandleLatestSubscriberListener: PropTypes.func.isRequired
};

class LatestSubscriber extends Component {
  componentDidMount() {
    this.props.setAndHandleLatestSubscriberListener(channel);
  }
  render() {
    return (
      <div>
        {this.props.username}
        {this.props.length}
        {this.props.prime}
      </div>
    );
  }
}

LatestSubscriber.propTypes = propTypes;

function mapStateToProps(state) {
  const subscriber = state.subscriptions.get('latest') || Map();
  return {
    isFetching: state.subscriptions.get('isFetchingLatestSubscriber'),
    error: state.subscriptions.get('error'),
    username: subscriber.get('username') || '',
    length: subscriber.get('length') || null,
    prime: subscriber.get('prime') || false
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAndHandleLatestSubscriberListener }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestSubscriber);
