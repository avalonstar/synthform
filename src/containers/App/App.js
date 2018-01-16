import React from 'react';
import styled from 'styled-components';

import logomark from './logomark.svg';
import logotype from './logotype.svg';

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  background: #dee3e8;
`;

const Logo = styled.a`
  position: relative;
`;

const Logomark = styled.img``;

const Logotype = styled.img`
  position: absolute;
  right: -20px;
  bottom: -22px;
`;

const App = () => (
  <Container>
    <Logo>
      <Logomark src={logomark} alt="synthform.tv" />
      <Logotype src={logotype} alt="synthform.tv" />
    </Logo>
  </Container>
);

export default App;
