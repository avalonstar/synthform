import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { rgba } from 'polished';

import { ActivityCamera } from 'components/Cameras';
import Counter from 'components/Emotes';
import { Notifier, Ticker } from 'components/Events';
// import SubPointGoal from 'components/Goals';
import { LatestSubscriber } from 'components/Labels';
import { Notifier as SongNotifier } from 'components/Songs';
import * as selectors from 'selectors';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const layoutPropTypes = {
  cameraOff: PropTypes.bool.isRequired,
  debugMode: PropTypes.bool.isRequired
};

const Layout = ({ cameraOff, debugMode }) => (
  <Container cameraOff={cameraOff}>
    <StyledCamera />
    <StyledCounter limit={cameraOff ? 9 : 6} />
    <StyledLatestSubscriber />
    <StyledNotifier debugMode={debugMode} />
    <StyledSongNotifier />
    {/* <StyledSubPointGoal /> */}
    <StyledTicker debugMode={debugMode} />
  </Container>
);

function Activity(props) {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  const cameraOff = query.get('cameraOff') === 'true';
  return props.isFetching ? (
    <Wrapper />
  ) : (
    <Wrapper>
      <Layout cameraOff={cameraOff} debugMode={debugMode} />
    </Wrapper>
  );
}

Activity.propTypes = propTypes;
Layout.propTypes = layoutPropTypes;

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

const StyledCounter = styled(Counter)`
  grid-row: 12;
`;

const StyledCamera = styled(ActivityCamera)`
  grid-column: 14 / span 4;
  grid-row: 12;
  align-self: end;
  z-index: 400;
`;

const StyledLatestSubscriber = styled(LatestSubscriber)`
  grid-column: 1 / span 3;
  grid-row: 12;
  align-self: center;
  z-index: 100;
`;

const StyledNotifier = styled(Notifier)`
  grid-column: 1 / span 5;
  grid-row: 11;
  align-self: end;
  z-index: 300;

  &[data-event='follow'] {
    align-self: start;
    z-index: 0;
  }
`;

const StyledSongNotifier = styled(SongNotifier)`
  grid-column: 15 / span 3;
  grid-row: 1;
  align-self: start;
`;

// const StyledSubPointGoal = styled(SubPointGoal)`
//   grid-column: 15 / span 3;
//   grid-row: 9;
//   align-self: end;
// `;

const StyledTicker = styled(Ticker)`
  grid-column: 1 / span 17;
  grid-row: 12;
  margin: 0 -24px 0;
  z-index: 200;
`;

const Container = styled.div`
  display: grid;
  grid-column: 2;
  align-self: end;

  grid-template-columns: repeat(17, 80px);
  grid-template-rows: repeat(12, 62px);
  grid-gap: 12px;

  ${StyledCounter} {
    grid-column: 4 / span ${props => (props.cameraOff ? 14 : 10)};
    padding-right: ${props => (props.cameraOff ? 0 : 12)};
  }

  ${StyledCamera} {
    display: ${props => (props.cameraOff ? 'none' : 'block')};
  }

  ${'' /* ${StyledSubPointGoal} {
    grid-row: ${props => (props.cameraOff ? 11 : 9)};
  } */};
`;

export default connect(mapStateToProps)(Activity);
