import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion, spring } from 'react-motion';
import { ChevronRight } from 'react-feather';
import { Map } from 'immutable';

import { channel } from 'configurations/constants';
import { setAndHandleLatestSubscriberListener } from 'modules/subscriptions';

import './LatestSubscriber.css';
import crown from './prime.png';

const propTypes = {
  username: PropTypes.string,
  setAndHandleLatestSubscriberListener: PropTypes.func.isRequired
};

const defaultProps = {
  username: ''
};

const contentPropsTypes = {
  username: PropTypes.string,
  length: PropTypes.number,
  prime: PropTypes.bool
};

const contentDefaultProps = {
  username: '',
  length: null,
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
  return (
    <TransitionMotion
      defaultStyles={defaultStyles}
      styles={styles}
      willEnter={willEnter}
      willLeave={willLeave}
    >
      {content =>
        <div
          className="ls-content"
          style={{
            transform: `translate3d(0, ${content[0].style.y}%, 0)`,
            opacity: content[0].style.opacity
          }}
        >
          <div className="ls-actor">
            {props.username}
          </div>
          {props.prime &&
            <div className="ls-prime">
              <img src={crown} alt="Prime" />
            </div>}
          {props.length &&
            <div className="ls-length">
              <span>
                {'\u2715'}
              </span>
              {props.length}
            </div>}
        </div>}
    </TransitionMotion>
  );
}

class LatestSubscriber extends Component {
  componentDidMount() {
    this.props.setAndHandleLatestSubscriberListener(channel);
  }

  render() {
    return (
      <div className="label ls">
        <div className="ls-title">
          <ChevronRight color="#02fa7b" size={16} />
          {'Latest'}
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
  const subscriber = state.subscriptions.get('latest') || Map();
  return {
    isFetching: state.subscriptions.get('isFetchingLatestSubscriber'),
    error: state.subscriptions.get('error'),
    username: subscriber.get('username'),
    length: subscriber.get('length'),
    prime: subscriber.get('prime')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setAndHandleLatestSubscriberListener }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestSubscriber);
