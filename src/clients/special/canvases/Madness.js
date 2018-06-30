import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as Providers from 'providers';
import {
  Progression,
  MadnessNotifier as Notifier
} from 'clients/special/components';
import { GameProvider } from 'clients/special/components/Madness';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const Madness = props => {
  const query = new URLSearchParams(props.location.search);
  const game = query.get('game') || 'ffv';
  return (
    <GameProvider value={game}>
      <Wrapper>
        <Providers.Madness>
          {(state, notifierPool, onComplete) => (
            <Container>
              <StyledProgression payload={state.bits} />
              <StyledNotifier
                notifierPool={notifierPool}
                onComplete={onComplete}
              />
            </Container>
          )}
        </Providers.Madness>
      </Wrapper>
    </GameProvider>
  );
};

Madness.propTypes = propTypes;

const Wrapper = styled.div`
  width: 480px;
  height: 100vh;
`;

const StyledProgression = styled(Progression)`
  margin: 0 auto;
`;

const StyledNotifier = styled(Notifier)`
  margin: -60px auto 0;
`;

const Container = styled.div``;

export default Madness;
