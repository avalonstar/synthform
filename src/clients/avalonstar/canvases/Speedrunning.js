import React, { Fragment } from 'react';

import styled from 'styled-components';
import { Frame } from 'clients/avalonstar/styles';

import {
  ActivityCamera,
  Generic,
  Panel,
  Notifier,
  SubPoints,
  Uptime
} from 'clients/avalonstar/components';
import * as Providers from 'providers';

const propTypes = {};

/* eslint-disable react/prop-types */
const Layout = ({ user }) => (
  <Container>
    <Console />
    <TimerPlaceholder />
    <StyledCamera />
    <Providers.Events user={user}>
      {props => (
        <Fragment>
          <StyledNotifier notifierPool={props.notifierPool} />
          <StyledPanel events={props.payload} />
        </Fragment>
      )}
    </Providers.Events>
    <Providers.SubPoints user={user}>
      {props => <StyledSubPoints points={props.payload} />}
    </Providers.SubPoints>
    <Providers.Uptime user={user}>
      {props => <StyledUptime title="!uptime" startTime={props.payload} />}
    </Providers.Uptime>
  </Container>
);
/* eslint-enable react/prop-types */

const Speedrunning = () => (
  <Frame.Wrapper>
    <Layout user="avalonstar" />
  </Frame.Wrapper>
);

Speedrunning.propTypes = propTypes;

const StyledCamera = styled(ActivityCamera)`
  grid-column: 2 / span 5;
  grid-row: 12;
  align-self: end;
  margin-top: -24px;
  z-index: 400;
`;

const StyledPanel = styled(Panel)`
  grid-column: 2 / span 5;
  grid-row: 9;
  align-self: center;
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 2 / span 5;
  grid-row: 11;
  align-self: end;
  z-index: 300;

  &[data-event='follow'] {
    align-self: start;
    z-index: 0;
  }
`;

const StyledSubPoints = styled(SubPoints)`
  grid-column: 2 / span 5;
  grid-row: 8;
  align-self: end;
`;

const StyledUptime = styled(Uptime)`
  display: none;
  grid-column: 3 / span 3;
  grid-row: 12;
  align-self: center;
`;

const TimerPlaceholder = styled(Generic)`
  grid-column: 2 / span 5;
  grid-row: 1 / span 7;
`;

const Container = styled.div`
  grid-column: 2 / span 3;
  align-self: end;

  display: grid;
  grid-template-columns: ${1200 - 36}px repeat(5, 65.5px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;
`;

const Console = styled.div`
  display: block;
  position: absolute;
  width: 1200px;
  height: 900px;
  padding-top: ${3 / 4 * 100}%;

  grid-column: 1 / span 12;
  margin: -24px 0 0 -24px;
`;

export default Providers.Sockets('avalonstar')(Speedrunning);
