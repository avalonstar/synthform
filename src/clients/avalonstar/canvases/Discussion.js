import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  ActivityCamera,
  Panel,
  Ticker,
  List as MessageList,
  WindowChrome
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
    <StyledDisplay title="Test title.">
      <DisplayZone />
    </StyledDisplay>
    <Providers.Messages user={user}>
      {props => (
        <StyledChat explicitHeight>
          <ChatZone>
            <MessageList messages={props.payload} />
          </ChatZone>
        </StyledChat>
      )}
    </Providers.Messages>
    <Providers.Events user={user} debugMode={debugMode}>
      {props => (
        <Fragment>
          <StyledPanel events={props.payload} />
          <StyledTicker events={props.payload} anchor="bottom" />
        </Fragment>
      )}
    </Providers.Events>
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

const StyledDisplay = styled(WindowChrome)`
  grid-column: 1 / span 23;
  grid-row: 3;
  align-self: start;
  z-index: 400;
`;

const StyledChat = styled(WindowChrome)`
  grid-column: 24 / span 7;
  grid-row: 3 / span 15;
  align-self: start;
  z-index: 400;
`;

const ChatZone = styled.div`
  flex: 1;

  display: inline-flex;
  flex-direction: column-reverse;
  overflow: hidden;
  width: 100%;
  align-self: end;

  background: #090a0c;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  color: #f3f5f6;
`;

const DisplayZone = styled.div`
  display: block;
  flex: 1;
  width: 100%;
  padding-top: ${9 / 16 * 100}%;

  background: #090a0c;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const StyledPanel = styled(Panel)`
  grid-column: 24 / span 7;
  grid-row: 21;
  z-index: 100;

  border-radius: 0;
`;

const StyledTicker = styled(Ticker)`
  grid-column: 1 / span 30;
  grid-row: 21;
  margin: 0 -36px 0;
  z-index: 200;
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(30, 50px);
  grid-template-rows: repeat(21, 40px);
  grid-gap: 12px;
`;

export default Providers.Sockets('avalonstar')(Activity);
