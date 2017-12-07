import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion, spring } from 'react-motion';
import { ChevronRight } from 'react-feather';

import { latestSubscriberFetch } from 'actions/subscriptions';
import * as selectors from 'selectors';

import './LatestSubscriber.css';
import crown from './prime.png';

const propTypes = {
  username: PropTypes.string,
  request: PropTypes.func.isRequired
};

const defaultProps = {
  username: ''
};

const contentPropsTypes = {
  username: PropTypes.string,
  recipient: PropTypes.string,
  months: PropTypes.number,
  prime: PropTypes.bool
};

const contentDefaultProps = {
  username: '',
  recipient: null,
  months: null,
  prime: false
};

const defaultStyles = [
  {
    key: 'x',
    style: {
      y: 50,
      opacity: 0
    }
  }
];

const styles = [
  {
    key: 'x',
    style: {
      y: spring(0),
      opacity: spring(1)
    }
  }
];

const willEnter = () => ({
  y: 50,
  opacity: 0
});

const willLeave = () => ({
  y: spring(-50),
  opacity: spring(0)
});

function Content(props) {
  const username = props.recipient ? props.recipient : props.username;
  return (
    <TransitionMotion
      defaultStyles={defaultStyles}
      styles={styles}
      willEnter={willEnter}
      willLeave={willLeave}
    >
      {content => (
        <div
          className="ls-content"
          style={{
            transform: `translate3d(0, ${content[0].style.y}%, 0)`,
            opacity: content[0].style.opacity
          }}
        >
          <div className="ls-actor">{username}</div>
          {props.prime && (
            <div className="ls-prime">
              <img src={crown} alt="Prime" />
            </div>
          )}
          {props.months && (
            <div className="ls-length">
              <span>{'\u2715'}</span>
              {props.months}
            </div>
          )}
        </div>
      )}
    </TransitionMotion>
  );
}

class LatestSubscriber extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return (
      <div className="label ls">
        <div className="ls-title">
          <ChevronRight color="#02fa7b" size={16} />
          {'!hype'}
        </div>
        {this.props.username && <Content {...this.props} />}
      </div>
    );
  }
}

LatestSubscriber.propTypes = propTypes;
LatestSubscriber.defaultProps = defaultProps;
Content.propTypes = contentPropsTypes;
Content.defaultProps = contentDefaultProps;

function mapStateToProps(state) {
  const subscriber = selectors.getLatestSubscription(state);
  return {
    isFetching: state.subscriptions.get('isFetchingLatestSubscriber'),
    error: state.subscriptions.get('error'),
    username: subscriber.get('username'),
    recipient: subscriber.get('recipient'),
    months: subscriber.get('months'),
    prime: subscriber.get('prime')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      request: () => dispatch(latestSubscriberFetch.request())
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestSubscriber);
