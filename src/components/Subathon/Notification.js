import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import styled from 'styled-components';
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
  cheer: 'CHEER > 500',
  resub: 'RESUB',
  subgift: 'SUBGIFT',
  subscription: 'SUBSCRIPTION',
  tip: 'TIP > $5'
});

const getPlanText = () => ({
  1000: ' / TIER 1',
  2000: ' / TIER 2',
  3000: ' / TIER 3'
});

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  overflow: hidden;

  background: linear-gradient(#2c333a, #23292f);
  border-radius: 4px;
  color: #f3f5f6;
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 9px 6px 5px 8px;

  background: linear-gradient(#23292f, #1a1f23);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

const Header = styled.div`
  padding: 10px 10px 5px 40px;

  color: #738596;
  font-family: 'Forza SSm A', 'Forza SSm B';
  font-weight: 700;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 10px 10px 40px;

  font-family: 'Gotham SSm A', 'Gotham SSm B';

  svg {
    margin: 0 4px;
  }
`;

const Minutes = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  color: #8b99a7;
`;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.isVisible = false;
  }

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
            <Icon>
              <AlertTriangle color="#f5515f" size={18} />
            </Icon>
            <Header>
              {getEventText()[data.event]}
              {data.plan && getPlanText()[data.plan]}
            </Header>
            <Content>
              <strong>{data.username}</strong>
              <Minutes>
                <PlusSquare color="#02fa7b" size={14} />
                {data.minutes} min
              </Minutes>
            </Content>
          </Wrapper>
        )}
      </Motion>
    );
  }
}

Notification.propTypes = propTypes;
Notification.defaultProps = defaultProps;

export default Notification;
