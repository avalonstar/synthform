import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { ChevronRight } from 'react-feather';

import { channel } from 'configurations/constants';
import { setAndHandleLatestSubscriberListener } from 'modules/subscriptions';

import './LatestSubscriber.css';
import crown from './prime.png';

const propTypes = {
  username: PropTypes.string,
  length: PropTypes.number,
  prime: PropTypes.bool,
  setAndHandleLatestSubscriberListener: PropTypes.func.isRequired
};

const defaultProps = {
  username: '',
  length: '',
  prime: false
};

class LatestSubscriber extends Component {
  componentDidMount() {
    this.props.setAndHandleLatestSubscriberListener(channel);
  }

  render() {
    const { username, length, prime } = this.props;
    return (
      <div className="label ls">
        <div className="ls-title">
          <ChevronRight color="#02fa7b" size={16} />
          {'Latest'}
        </div>
        <div className="ls-actor">
          {username}
        </div>
        {prime &&
          <div className="ls-prime">
            <img src={crown} alt="Prime" />
          </div>}
        {length &&
          <div className="ls-length">
            <span>
              {'\u2715'}
            </span>
            {length}
          </div>}
      </div>
    );
  }
}

LatestSubscriber.propTypes = propTypes;
LatestSubscriber.defaultProps = defaultProps;

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
