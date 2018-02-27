import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { EmoteCounter, Panel, SubPoints } from 'clients/avalonstar/components';
import { Notifier, Ticker } from 'components/Events';
import * as Providers from 'providers';

import styled from 'styled-components';
import { rgba } from 'polished';

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
const Layout = ({ user, debugMode }) => (
  <Container>
    <Providers.Emotes user={user}>
      {props => <StyledEmoteCounter emotes={props.payload} limit={9} />}
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
  </Container>
);
/* eslint-enable react/prop-types */

const Activity = props => {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return (
    <Wrapper>
      <Layout user="avalonstar" debugMode={debugMode} />
    </Wrapper>
  );
};

Activity.propTypes = propTypes;
Layout.propTypes = layoutPropTypes;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px;

  position: absolute;
  overflow: hidden;
  width: 1600px;
  height: 900px;

  background: linear-gradient(
    105deg,
    ${rgba('#090a0c', 0)} 85%,
    ${rgba('#090a0c', 0.4)}
  );
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
  grid-column: 1 / span 17;
  grid-row: 12;
  margin: 0 -24px 0;
  z-index: 200;
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;

  ${StyledEmoteCounter} {
    grid-column: 4 / span 14;
    padding-right: 0;
  }
`;

export default Activity;
