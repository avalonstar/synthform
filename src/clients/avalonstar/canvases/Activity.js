import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityCamera,
  EmoteCounter,
  Panel,
  Notifier,
  Ticker,
  // Status as SubathonStatus,
  SubPoints,
  Uptime
} from 'clients/avalonstar/components';
import * as Providers from 'providers';

import styled from 'styled-components';
import { Frame } from 'clients/avalonstar/styles';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const layoutPropTypes = {
  user: PropTypes.string.isRequired
};

/* eslint-disable react/prop-types */
const Layout = ({ user, cameraMode }) => (
  <Container cameraMode={cameraMode}>
    <StyledCamera title="Untitled Broadcaster (1)" />
    <Providers.Emotes user={user}>
      {props => (
        <StyledEmoteCounter emotes={props.payload} limit={cameraMode ? 6 : 9} />
      )}
    </Providers.Emotes>
    <Providers.Events>
      {(state, notifierPool, onComplete) => (
        <Fragment>
          <StyledNotifier notifierPool={notifierPool} onComplete={onComplete} />
          <StyledPanel events={state.data} />
          <StyledTicker events={state.data} anchor="bottom" />
        </Fragment>
      )}
    </Providers.Events>
    {/* <Providers.Subathon user={user}>
      {props => (
        <StyledSubathonStatus
          notifierPool={props.notifierPool}
          {...props.payload}
        />
      )}
    </Providers.Subathon> */}
    <Providers.SubPoints user={user}>
      {props => <StyledSubPoints points={props.payload} />}
    </Providers.SubPoints>
    <Providers.Uptime user={user}>
      {props => <StyledUptime title="!uptime" startTime={props.payload} />}
    </Providers.Uptime>
  </Container>
);
/* eslint-enable react/prop-types */

const Activity = props => {
  const query = new URLSearchParams(props.location.search);
  const cameraMode = JSON.parse(query.get('camera'));
  const debugMode = query.get('debug') === 'true';
  return (
    <Frame.Wrapper>
      <Layout user="avalonstar" cameraMode={cameraMode} debugMode={debugMode} />
    </Frame.Wrapper>
  );
};

Activity.propTypes = propTypes;
Layout.propTypes = layoutPropTypes;

const StyledCamera = styled(ActivityCamera)`
  grid-column: 21 / span 7;
  grid-row: 20;
  align-self: end;
  z-index: 400;
`;

const StyledEmoteCounter = styled(EmoteCounter)`
  display: none;
  grid-row: 12;
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 1 / span 8;
  grid-row: 20;
  align-self: end;
  z-index: 300;

  &[data-event='follow'] {
    align-self: center;
    z-index: 0;
  }
`;

const StyledPanel = styled(Panel)`
  grid-column: 21 / span 7;
  grid-row: 21;
  z-index: 100;

  border-radius: 0;
`;

// const StyledSubathonStatus = styled(SubathonStatus)`
//   display: none;
//   grid-column: 15 / span 3;
//   grid-row: 10;
//   align-self: end;
// `;

const StyledSubPoints = styled(SubPoints)`
  display: none;
  grid-column: 15 / span 3;
  grid-row: 11;
  align-self: end;
`;

const StyledTicker = styled(Ticker)`
  grid-column: 1 / span 30;
  grid-row: 21;
  margin: 0 -36px 0;
  z-index: 200;
`;

const StyledUptime = styled(Uptime)`
  display: none;
  grid-column: 1 / span 2;
  align-self: start;
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(30, 50px);
  grid-template-rows: repeat(21, 40px);
  grid-gap: 12px;

  ${StyledCamera} {
    display: ${props => (props.cameraMode ? 'block' : 'none')};
  }
  ${StyledEmoteCounter} {
    grid-column: 4 / span ${props => (props.cameraMode ? 10 : 14)};
    padding-right: ${props => (props.cameraMode ? 12 : 0)};
  }
  ${StyledSubPoints} {
    grid-row: ${props => (props.cameraMode ? 9 : 11)};
  }
`;

export default Providers.Sockets('avalonstar')(Activity);
