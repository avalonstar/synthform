import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { ActivityCamera } from 'components/Cameras';
import Counter from 'components/Emotes';
import { Notifier, Ticker } from 'components/Events';
import SubPointGoal from 'components/Goals';
import { LatestSubscriber, Uptime } from 'components/Labels';
import { Notifier as SongNotifier } from 'components/Songs';

import './Activity.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

const StyledTicker = styled(Ticker)`
  grid-column: 1 / span 17;
  grid-row: 12;
  margin: 0 -24px 0;
  z-index: 200;
`;

function Layout(debugMode) {
  return (
    <div className="activity-container">
      <div className="activity">
        <ActivityCamera />
        <Counter limit={6} />
        <LatestSubscriber />
        <Notifier debugMode={debugMode} />
        <SongNotifier />
        <SubPointGoal />
        <StyledTicker debugMode={debugMode} />
      </div>
    </div>
  );
}

function Activity(props) {
  const query = new URLSearchParams(props.location.search);
  const debugMode = query.get('debug') === 'true';
  return props.isFetching ? <div /> : Layout(debugMode);
}

Activity.propTypes = propTypes;

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

export default connect(mapStateToProps)(Activity);
