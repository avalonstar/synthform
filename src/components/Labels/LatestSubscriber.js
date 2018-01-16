import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TransitionMotion, spring } from 'react-motion';
import { ChevronRight } from 'react-feather';
import styled from 'styled-components';
import { rgba } from 'polished';

import { latestSubscriberFetch } from 'actions/subscriptions';
import * as selectors from 'selectors';

import crown from './prime.png';

const propTypes = {
  username: PropTypes.string,
  request: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired
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
  display: flex;
  align-items: center;
  width: 100%;
`;

const Actor = styled.div`
  font-family: ${props => props.theme.gotham};
  font-weight: 700;
  flex: 1;
`;

const Prime = styled.div`
  border-radius: 2px;
  background: #019cdc;
  padding: 1px 4px 0px;
`;

const Crown = styled.img`
  width: 16px;
`;

const Length = styled.div`
  margin-left: 6px;
  padding: 2px 4px 0px;
  box-shadow: 0 0 0 1px #586674;
  border-radius: 2px;
  font-family: ${props => props.theme.miedinger};

  span {
    font-size: 10px;
  }
`;

const Subscriber = props => {
  const username = props.recipient ? props.recipient : props.username;
  return (
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
          {props.prime && (
            <Prime>
              <Crown src={crown} alt="Prime" />
            </Prime>
          )}
          {props.months && (
            <Length>
              <span>{'\u2715'}</span>
              {props.months}
            </Length>
          )}
        </Content>
      )}
    </TransitionMotion>
  );
};

class LatestSubscriber extends Component {
  componentDidMount() {
    this.props.request();
  }

  render() {
    return (
      <Wrapper className={this.props.className}>
        <Title>
          <ChevronRight color="#02fa7b" size={16} />
          {'!hype'}
        </Title>
        {this.props.username && <Subscriber {...this.props} />}
      </Wrapper>
    );
  }
}

LatestSubscriber.propTypes = propTypes;
LatestSubscriber.defaultProps = defaultProps;
Subscriber.propTypes = contentPropsTypes;
Subscriber.defaultProps = contentDefaultProps;

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
