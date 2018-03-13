import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';
import { Capsule } from 'clients/avalonstar/styles';
import { AlertTriangle, PlusSquare } from 'react-feather';

const propTypes = {
  event: PropTypes.shape({
    event: PropTypes.string,
    minutes: PropTypes.number
  })
};

const defaultProps = {
  event: {
    event: '',
    minutes: 0
  }
};

const getEventText = () => ({
  cheer: 'CHEER >= 100',
  resub: 'RESUB',
  subgift: 'SUBGIFT',
  subscription: 'SUBSCRIPTION',
  tip: 'TIP >= $1'
});

const getPlanText = () => ({
  1000: ' / TIER 1',
  2000: ' / TIER 2',
  3000: ' / TIER 3'
});

class Notification extends Component {
  state = {
    isVisible: false
  };

  componentDidMount() {
    this.initRun(this.props.event);
  }

  componentWillReceiveProps(nextProps) {
    this.initRun(nextProps.event);
  }

  handleHoldTimer() {
    this.holdTimer = setTimeout(() => {
      clearTimeout(this.holdTimer);
      if (this.state && this.state.isVisible) {
        this.setState({ isVisible: false });
      }
    }, 1000 * 4);
    clearTimeout(this.timer);
  }

  initRun(event) {
    if (event.minutes) {
      this.timer = setTimeout(() => {
        this.setState({ isVisible: true });
        this.handleHoldTimer();
      }, 250);
    }
  }

  render() {
    const data = this.props.event;
    return !data.event ? (
      <Wrapper />
    ) : (
      <Motion
        defaultStyle={{ y: -100 }}
        style={{
          y: spring(this.state.isVisible ? 0 : -100, {
            stiffness: 210,
            damping: 30
          })
        }}
      >
        {({ y }) => (
          <Wrapper style={{ transform: `translate3d(0, ${y}%, 0)` }}>
            <Capsule.Title>
              <AlertTriangle color="#f5515f" size={18} />
            </Capsule.Title>
            <Content>
              <Header>
                {getEventText()[data.event]}
                {data.plan && getPlanText()[data.plan]}
              </Header>
              <Info>
                <strong>{data.username}</strong>
                <Minutes>
                  <PlusSquare color="#02fa7b" size={14} />
                  {data.minutes} min
                </Minutes>
              </Info>
            </Content>
          </Wrapper>
        )}
      </Motion>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

const Wrapper = styled(Capsule.Wrapper)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  font-size: 14px;
`;

const Content = styled.div`
  flex: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 10px 5px 0;

  color: #738596;
  font-family: ${props => props.theme.forza};
  font-weight: 700;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 10px 0;

  font-family: ${props => props.theme.gotham};
`;

const Minutes = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  color: #8b99a7;
`;

export default Notification;
