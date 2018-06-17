import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import * as Providers from 'providers';

const propTypes = {};

const Madness = () => (
  <Wrapper>
    <Providers.Madness>
      {({ cheers }) => <div>{JSON.stringify(cheers)}</div>}
    </Providers.Madness>
  </Wrapper>
);

Madness.propTypes = propTypes;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default Madness;
