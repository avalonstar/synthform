import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { rgba } from 'polished';

import Counter from 'components/Emotes';
import { Ticker } from 'components/Events';
import SubPointGoal from 'components/Goals';
import { Generic, Uptime } from 'components/Labels';
import { Notifier as SongNotifier } from 'components/Songs';
import * as selectors from 'selectors';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const Layout = () => (
  <Wrapper>
    <Container>
      <StyledCounter limit={11} />
      <StyledGeneric
        title="On Break"
        content="Taking a quick break! Hang tight and I'll be back soon!"
      />
      <StyledSongNotifier />
      <StyledSubPointGoal />
      <StyledTicker anchor="top" timer={2} />
      <StyledUptime title="Partnerversary" />
    </Container>
  </Wrapper>
);

const Break = props => {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return props.isFetching ? <div /> : Layout(debugMode);
};

Break.propTypes = propTypes;

const mapStateToProps = state => ({
  isFetching: selectors.getFetchState(state)
});

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
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;
`;

const StyledCounter = styled(Counter)`
  grid-column: 1 / span 17;
  grid-row: 12;
  padding: 0;
`;

const StyledGeneric = styled(Generic)`
  grid-column: span 6;
  align-self: end;
  grid-row: 11;
`;

const StyledSongNotifier = styled(SongNotifier)`
  grid-column: 15 / span 3;
  grid-row: 1;
  align-self: start;
`;

const StyledSubPointGoal = styled(SubPointGoal)`
  grid-column: 15 / span 3;
  grid-row: 11;
  align-self: end;
`;

const StyledTicker = styled(Ticker)`
  grid-column: 1 / span 17;
  grid-row: 1;

  position: absolute;
  top: -24px;
  margin: 0 -24px 0;
  z-index: 200;
`;

const StyledUptime = styled(Uptime)`
  grid-column: 1 / span 3;
  grid-row: 11;
  align-self: end;
`;

export default connect(mapStateToProps)(Break);
