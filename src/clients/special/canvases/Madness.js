import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as Providers from 'providers';
import { Cheers } from 'clients/special/components/Madness';

const propTypes = {};

const Madness = () => (
  <Wrapper>
    <Providers.Madness>
      {({ cheers, notifierPool }) => (
        <Container>
          <Cheers payload={cheers} />
          {JSON.stringify(notifierPool)}
        </Container>
      )}
    </Providers.Madness>
  </Wrapper>
);

Madness.propTypes = propTypes;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div``;

export default Madness;
