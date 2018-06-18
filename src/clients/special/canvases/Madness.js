import React from 'react';

import styled from 'styled-components';

import * as Providers from 'providers';
import {
  Progression,
  MadnessNotifier as Notifier
} from 'clients/special/components';

const propTypes = {};

const Madness = () => (
  <Wrapper>
    <Providers.Madness>
      {({ cheers, notifierPool }) => (
        <Container>
          <StyledProgression payload={cheers} />
          <StyledNotifier notifierPool={notifierPool} />
        </Container>
      )}
    </Providers.Madness>
  </Wrapper>
);

Madness.propTypes = propTypes;

const Wrapper = styled.div`
  width: 480px;
  height: 100vh;
`;

const StyledProgression = styled(Progression)`
  margin: 0 auto;
`;

const StyledNotifier = styled(Notifier)`
  margin: -56px auto 0;
`;

const Container = styled.div``;

export default Madness;
