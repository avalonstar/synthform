import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityCamera,
  EmoteCounter,
  Panel,
  Notifier,
  Ticker,
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
  debugMode: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired
};

/* eslint-disable react/prop-types */
const Layout = ({ user, cameraMode, debugMode }) => (
  <Container cameraMode={cameraMode}>
    <StyledCamera />
    <Providers.Emotes user={user}>
      {props => (
        <StyledEmoteCounter emotes={props.payload} limit={cameraMode ? 6 : 9} />
      )}
    </Providers.Emotes>
    <Providers.Events user={user} debugMode={debugMode}>
      {props => (
        <Fragment>
          <StyledNotifier notifierPool={props.notifierPool} />
          <StyledPanel events={props.payload} />
          <StyledTicker events={props.payload} />
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
  grid-column: 14 / span 4;
  grid-row: 12;
  align-self: end;
  z-index: 400;
`;

const StyledEmoteCounter = styled(EmoteCounter)`
  grid-row: 12;
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 1 / span 5;
  grid-row: 11;
  align-self: end;
  z-index: 300;

  &[data-event='follow'] {
    align-self: start;
    z-index: 0;
  }
`;

const StyledPanel = styled(Panel)`
  grid-column: 1 / span 3;
  grid-row: 12;
  align-self: center;
  z-index: 100;
`;

const StyledSubPoints = styled(SubPoints)`
  grid-column: 15 / span 3;
  grid-row: 11;
  align-self: end;
`;

const StyledTicker = styled(Ticker)`
  display: none;
  grid-column: 1 / span 17;
  grid-row: 12;
  margin: 0 -24px 0;
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

  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
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
