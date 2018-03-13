import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

import styled from 'styled-components';
import { Capsule } from 'clients/avalonstar/styles';
import { Play, Pause, PlusSquare, XSquare } from 'react-feather';

import { CountdownTimer, Stopwatch } from 'components/Timers';

import Notification from './Notification';

const propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  addedMinutes: PropTypes.number,
  contributions: PropTypes.bool,
  elapsedTime: PropTypes.number,
  endTimestamp: PropTypes.number,
  notifierPool: PropTypes.arrayOf(PropTypes.object).isRequired,
  minimumLength: PropTypes.number,
  remainingTime: PropTypes.number,
  startTimestamp: PropTypes.number
};

const statusPropTypes = {
  active: PropTypes.bool.isRequired
};

const timerPropTypes = {
  active: PropTypes.bool.isRequired,
  elapsedTime: PropTypes.number.isRequired,
  endTimestamp: PropTypes.number.isRequired,
  minimumLength: PropTypes.number.isRequired,
  remainingTime: PropTypes.number.isRequired,
  startTimestamp: PropTypes.number.isRequired
};

const contributionPropTypes = {
  active: PropTypes.bool.isRequired,
  addedMinutes: PropTypes.number.isRequired
};

const defaultProps = {
  active: false,
  addedMinutes: 0,
  className: '',
  contributions: false,
  elapsedTime: 0,
  endTimestamp: Date.now(),
  notifierPool: [],
  minimumLength: 4,
  remainingTime: 0,
  startTimestamp: Date.now()
};

const ContributionState = props => (
  <StatusCounter>
    {props.active ? (
      <PlusSquare color="#02fa7b" size={14} />
    ) : (
      <XSquare color="#f5515f" size={14} />
    )}
    {moment.duration(props.addedMinutes, 'minutes').format('hh[h]mm[m]')}
  </StatusCounter>
);

const SubathonState = props => (
  <Capsule.Title>
    {props.active ? (
      <Play color="#02fa7b" size={18} />
    ) : (
      <Pause color="#f5515f" size={18} />
    )}
  </Capsule.Title>
);

const SubathonTimer = props => (
  <Timer>
    <Stopwatch
      active={props.active}
      startTime={moment
        .unix(props.startTimestamp)
        .subtract(moment.duration(props.elapsedTime))
        .unix()}
      elapsedTime={props.elapsedTime}
    />
    <TimerSeparator>/</TimerSeparator>
    <CountdownTimer
      active={props.active}
      endTime={props.endTimestamp}
      minimumLength={props.minimumLength}
      remainingTime={props.remainingTime}
    />
  </Timer>
);

const Status = props => (
  <Wrapper className={props.className}>
    <Notification event={props.notifierPool[0]} />
    <SubathonState active={props.active} />
    <Content>
      <Header>!subathon</Header>
      <Info>
        <SubathonTimer {...props} />
        <ContributionState
          active={props.contributions}
          addedMinutes={props.addedMinutes}
        />
      </Info>
    </Content>
  </Wrapper>
);

ContributionState.propTypes = contributionPropTypes;
SubathonState.propTypes = statusPropTypes;
SubathonTimer.propTypes = timerPropTypes;
Status.propTypes = propTypes;
Status.defaultProps = defaultProps;

const Wrapper = styled(Capsule.Wrapper)`
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

  svg {
    margin-right: 2px;
  }
`;

const StatusCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  color: #8b99a7;
  font-family: ${props => props.theme.gotham};
  font-weight: 600;

  svg {
    margin-right: 2px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2px 10px 0;

  font-family: ${props => props.theme.gotham};
`;

const Timer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-weight: 700;
`;

const TimerSeparator = styled.div`
  color: #8b99a7;
  padding: 0 1px;
`;

export default Status;
