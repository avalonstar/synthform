import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as Providers from 'providers';
import { Cheers, Notifier } from 'clients/special/components';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const Whammy = props => {
  const query = new URLSearchParams(props.location.search);
  const isFlipped = query.get('flipped') === 'true';
  return (
    <Wrapper>
      <Providers.Whammy>
        {({ cheers, notifierPool }) => (
          <Container isFlipped={isFlipped}>
            <Cheers payload={cheers} />
            <Notifier notifierPool={notifierPool} isFlipped={isFlipped} />
          </Container>
        )}
      </Providers.Whammy>
    </Wrapper>
  );
};

Whammy.propTypes = propTypes;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin: 12px;
  width: 240px;

  ${props => (props.isFlipped ? 'bottom' : 'top')}: 0px;
`;

export default Whammy;
