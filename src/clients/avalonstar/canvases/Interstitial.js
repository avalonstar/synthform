import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Messages } from 'clients/avalonstar/components';
import * as Providers from 'providers';

import styled from 'styled-components';
import { rgba } from 'polished';
import { Frame } from 'clients/avalonstar/styles';

const layoutPropTypes = {
  user: PropTypes.string.isRequired
};

/* eslint-disable react/prop-types */
const Layout = ({ user }) => (
  <Container>
    <Providers.Messages user={user}>
      {props => <StyledMessages messages={props.payload} />}
    </Providers.Messages>
    <Overlay />
  </Container>
);
/* eslint-enable react/prop-types */

const Interstitial = () => (
  <Frame.Wrapper>
    <Layout user="avalonstar" />
  </Frame.Wrapper>
);

Layout.propTypes = layoutPropTypes;

const StyledMessages = styled(Messages)`
  grid-column: 19 / span 11;
  grid-row: 1 / span 14;
  align-self: end;
  overflow: hidden;
`;

const Overlay = styled.div`
  grid-column: 18 / span 13;
  grid-row: 1 / span 21;
  background: ${rgba('#000', 0.9)};
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(30, 50px);
  grid-template-rows: repeat(21, 40px);
  grid-gap: 12px;
`;

export default Interstitial;
