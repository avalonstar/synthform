import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Counter from 'components/Emotes';
import { Ticker } from 'components/Events';
import SubPointGoal from 'components/Goals';
import { Generic } from 'components/Labels';
import { Notifier as SongNotifier } from 'components/Songs';
import Status from 'components/Subathon';

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

  background: linear-gradient(105deg, rgba(#090a0c, 0) 85%, rgba(#090a0c, 0.4));
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;

  .t {
    grid-column: 1 / span 17;
    grid-row: 12;
    margin: 0 -24px;
    z-index: 200;
  }

  .spg {
    grid-column: 15 / span 3;
    grid-row: 10;
    align-self: end;
  }

  .ss {
    grid-column: 15 / span 3;
    grid-row: 11;
    align-self: end;
    z-index: 200;
  }

  .sn {
    grid-column: 15 / span 3;
    grid-row: 1;
    align-self: start;
  }

  .ec {
    grid-column: 1 / span 17;
    grid-row: 12;
    padding: 0;
  }
`;

function Layout() {
  return (
    <Wrapper>
      <Container>
        <Ticker timer={2} />
        <Counter limit={12} />
        <SongNotifier />
        <SubPointGoal />
        <Status />

        {/* <Generic
          title="Hello"
          content="Hello there this is Avalonstar."
        /> */}
      </Container>
    </Wrapper>
  );
}

function Break(props) {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return props.isFetching ? <div /> : Layout(debugMode);
}

Break.propTypes = propTypes;

function mapStateToProps(state) {
  const isFetching = [
    state.events.get('isFetching'),
    state.subscriptions.get('isFetchingLatestSubscriber'),
    state.subscriptions.get('isFetchingSubCount'),
    state.subscriptions.get('isFetchingSubPoints')
  ];
  return {
    isFetching: isFetching.every(Boolean)
  };
}

export default connect(mapStateToProps)(Break);