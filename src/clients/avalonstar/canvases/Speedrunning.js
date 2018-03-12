import React, { Fragment } from 'react';

import styled from 'styled-components';
import { rgba } from 'polished';
import { Frame } from 'clients/avalonstar/styles';

import {
  Panel,
  Notifier,
  SubPoints,
  Uptime
} from 'clients/avalonstar/components';
import * as Providers from 'providers';

const propTypes = {};

/* eslint-disable react/prop-types */
const Layout = ({ user }) => (
  <Container>
    <Console />
    <Aside>
      {/* <StyledCamera flipped /> */}
      <Providers.Events user={user}>
        {props => (
          <Fragment>
            <StyledNotifier notifierPool={props.notifierPool} />
            <Panel events={props.payload} />
          </Fragment>
        )}
      </Providers.Events>
      <Providers.SubPoints user={user}>
        {props => <StyledSubPoints points={props.payload} />}
      </Providers.SubPoints>
      <Providers.Uptime user={user}>
        {props => <StyledUptime title="!uptime" startTime={props.payload} />}
      </Providers.Uptime>
    </Aside>
  </Container>
);
/* eslint-enable react/prop-types */

const Speedrunning = () => (
  <Frame.Wrapper>
    <Layout user="avalonstar" />
  </Frame.Wrapper>
);

Speedrunning.propTypes = propTypes;

// const StyledCamera = styled(ActivityCamera)`
//   grid-column: 2 / span 4;
//   grid-row: 1;
//   align-self: start;
//   margin-top: -24px;
//   z-index: 400;
// `;

const StyledNotifier = styled(Notifier)``;

const StyledSubPoints = styled(SubPoints)`
  grid-column: 2;
  grid-row: 12;
  align-self: center;
`;

const StyledUptime = styled(Uptime)`
  grid-column: 3 / span 3;
  grid-row: 12;
  align-self: center;
`;

const Container = styled.div`
  grid-column: 2 / span 3;
  align-self: end;

  display: grid;
  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;
`;

const Aside = styled.aside`
  grid-column: 13 / span 5;
  grid-row: 1 / span 12;
  margin: 0 -24px 0 -12px;

  position: relative;
  display: grid;
  grid-template-columns: 12px 1fr 1fr 1fr 1fr 12px;
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -24px;
    width: 8px;
    height: calc(100% + 24px);

    background-repeat: repeat-y;
    z-index: 200;
  }
  &::before {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAACwCAYAAAAyli+TAAAArElEQVRYhe3VMQqDQBSE4d/gNaytPYIHECtBG/VoJk0CqYIH8GimCEpQcQNL0F3GSuRjeDjL2yCKkzHNKgDaogSgez4AGPo7FwyPgICAryCI4mTcAyHA3gKxTzjDf3ACqCyfQLj80NS5OSHNqrmfVQJ8SrJLmGr/qe7NhOnA/HHI74QVuN5e83tT5+Yhz3AenABaQQ4BleUT0H1hM6Tui0OAVpBDQGUJCAgcCN43oZAKzq+1fqaaaabjru5erkjggg==);
    box-shadow: 1px 0 10px ${rgba('#090a0c', 0.5)};
  }
  &::after {
    right: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAACwCAYAAAAyli+TAAAAr0lEQVRYhe3VMQ6CQBCF4R/DNaipOQIHIFYm0qhHUxpMrAwH4GhYgQXLQKIGxrwtyZe3w85mNkrSrMuLEoDL4QjA9XEHoG1qdswsAQGBfwVRkmadBWIAa4B8nrCFc3AB1CxHIIb3CU6C82k/fLhVz/EWeVEO/QgmtE1tFzmb0BcZSlr2m/0F+WGRVkLw0o62sJbAQqAR5AioWY6A3ouvFqn3YhNAI8gRULMEBARWBC+ATpAOu8sdVQAAAABJRU5ErkJggg==);
    box-shadow: -1px 0 10px ${rgba('#090a0c', 0.5)};
  }
`;

const Console = styled.div`
  background: #000;
  grid-column: 1 / span 12;
  grid-row: 1 / span 12;

  margin: -24px 0 0 -24px;
`;

export default Providers.Sockets('avalonstar')(Speedrunning);
