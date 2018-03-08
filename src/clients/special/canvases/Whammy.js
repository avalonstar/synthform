import React, { Fragment } from 'react';

import styled from 'styled-components';

import * as Providers from 'providers';
import { Cheers, Events } from 'clients/special/components';

const Whammy = () => (
  <Wrapper>
    <Providers.Whammy>
      {({ cheers, events }) => (
        <Fragment>
          <Cheers payload={cheers} />
          <Events payload={events} />
        </Fragment>
      )}
    </Providers.Whammy>
  </Wrapper>
);

const Wrapper = styled.div`
  position: absolute;
  margin: 24px;
  width: 240px;
`;

export default Whammy;
