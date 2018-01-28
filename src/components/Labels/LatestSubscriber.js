import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion, spring } from 'react-motion';

import styled from 'styled-components';
import { ellipsis, rgba } from 'polished';
import { ChevronRight } from 'react-feather';

import { latestSubscriberFetch } from 'actions/subscriptions';
import * as selectors from 'selectors';

import crown from './prime.png';

const propTypes = {
  subscriber: PropTypes.shape({
    username: PropTypes.string,
    recipient: PropTypes.string
  }).isRequired,
  request: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
};

const contentPropsTypes = {
  username: PropTypes.string,
  months: PropTypes.number,
  prime: PropTypes.bool
};

const contentDefaultProps = {
  username: '',
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

const Subscriber = ({ username, prime, months }) => (
  <TransitionMotion
    defaultStyles={defaultStyles}
    styles={styles}
    willEnter={willEnter}
    willLeave={willLeave}
  >
    {content => (
      <Content
        style={{
          transform: `translate3d(0, ${content[0].style.y}%, 0)`,
          opacity: content[0].style.opacity
        }}
      >
        <Actor>{username}</Actor>
        {prime && (
          <Prime>
            <Crown src={crown} alt="Prime" />
          </Prime>
        )}
        {months && (
          <Length>
            <span>{'\u2715'}</span>
            {months}
          </Length>
        )}
      </Content>
    )}
  </TransitionMotion>
);

class LatestSubscriber extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    const { username, recipient } = this.props.subscriber;
    const name = recipient || username;
    return (
      <Wrapper className={this.props.className}>
        <Title>
          <ChevronRight color="#02fa7b" size={16} />
          {'!hype'}
        </Title>
        {name && <Subscriber username={name} {...this.props} />}
      </Wrapper>
    );
  }
}

LatestSubscriber.propTypes = propTypes;
Subscriber.propTypes = contentPropsTypes;
Subscriber.defaultProps = contentDefaultProps;

const mapStateToProps = state => ({
  isFetching: state.subscriptions.isFetchingLatestSubscriber,
  error: state.subscriptions.error,
  subscriber: selectors.getLatestSubscription(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      request: () => dispatch(latestSubscriberFetch.request())
    },
    dispatch
  );

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  overflow: hidden;

  background: linear-gradient(#2c333a, #23292f);
  border-radius: 4px;
  box-shadow: 0 1px 3px ${rgba('#090a0c', 0.12)},
    0 1px 2px ${rgba('#090a0c', 0.24)};
  color: #f3f5f6;
  font-size: 13px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 10px 9px 8px;
  margin-right: 10px;

  background: linear-gradient(#23292f, #1a1f23);
  color: #738596;
  font-family: ${props => props.theme.forza};
  font-weight: 700;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Actor = styled.div`
  ${ellipsis()};

  font-family: ${props => props.theme.gotham};
  font-weight: 700;
  flex: 1;
`;

const Prime = styled.div`
  margin-left: 4px;
  padding: 1px 4px 0px;
  border-radius: 2px;
  background: #019cdc;
`;

const Crown = styled.img`
  width: 16px;
`;

const Length = styled.div`
  margin-left: 4px;
  padding: 3px 5px 3px 6px;
  box-shadow: inset 0 0 0 1px #586674;
  border-radius: 2px;
  font-family: ${props => props.theme.miedinger};

  span {
    font-size: 10px;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(LatestSubscriber);
