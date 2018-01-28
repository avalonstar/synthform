import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { rgba } from 'polished';

import Chat from 'components/Chat';
import { Notifier, Ticker } from 'components/Events';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px;

  position: absolute;
  overflow: hidden;
  width: 1600px;
  height: 900px;

  background: linear-gradient(
    105deg,
    ${rgba('#090a0c', 0)} 85%,
    ${rgba('#090a0c', 0.4)}
  );

  .intertitle {
    display: grid;
    grid-column: 2;
    align-self: end;

    grid-template-columns: repeat(17, 80px);
    grid-template-rows: repeat(12, 62px);
    grid-gap: 12px;
  }

  .intertitle .c {
    grid-column: 14 / span 4;
    grid-row: 1 / span 11;
    align-self: end;
  }

  .intertitle .t {
    grid-column: 1 / span 17;
    grid-row: 12;
    margin: 0 -24px;
    z-index: 200;
  }
`;

function Layout(debugMode) {
  return (
    <Wrapper>
      <div className="intertitle">
        <Chat />
        <Notifier debugMode={debugMode} />
        <Ticker debugMode={debugMode} />
      </div>
    </Wrapper>
  );
}

function Intertitle(props) {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return props.isFetching ? <div /> : Layout(debugMode);
}

Intertitle.propTypes = propTypes;

export default Intertitle;