import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { EmoteCounter, SubPoints, Ticker } from 'clients/avalonstar/components';
import * as Providers from 'providers';

import styled from 'styled-components';
import { Frame } from 'clients/avalonstar/styles';

const layoutPropTypes = {
  user: PropTypes.string.isRequired
};

/* eslint-disable react/prop-types */
const Layout = ({ user }) => (
  <Container>
    <Providers.Emotes user={user}>
      {props => <StyledEmoteCounter emotes={props.payload} limit={11} />}
    </Providers.Emotes>
    <Providers.Events user={user}>
      {props => (
        <Fragment>
          <StyledTicker events={props.payload} anchor="top" timer={2} />
        </Fragment>
      )}
    </Providers.Events>
    <Providers.SubPoints user={user}>
      {props => <StyledSubPoints points={props.payload} />}
    </Providers.SubPoints>
  </Container>
);
/* eslint-enable react/prop-types */

const Break = () => (
  <Frame.Wrapper>
    <Layout user="avalonstar" />
  </Frame.Wrapper>
);

Layout.propTypes = layoutPropTypes;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;
`;

const StyledEmoteCounter = styled(EmoteCounter)`
  grid-column: 1 / span 17;
  grid-row: 12;
  padding: 0;
`;

const StyledSubPoints = styled(SubPoints)`
  grid-column: 15 / span 3;
  grid-row: 11;
  align-self: end;
`;

const StyledTicker = styled(Ticker)`
  grid-column: 1 / span 17;
  grid-row: 1;

  position: absolute;
  top: -24px;
  margin: 0 -24px 0;
  z-index: 200;
`;

export default Providers.Sockets('avalonstar')(Break);
