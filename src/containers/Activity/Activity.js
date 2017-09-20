import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ActivityCamera } from 'components/Cameras';
import { BRB } from 'components/Modes';
import { Notifier as SongNotifier } from 'components/Songs';
import { LatestSubscriber, SocialMedia } from 'components/Labels';
import { Notifier, Ticker } from 'components/Events';
import SubPointGoal from 'components/Goals';

import './Activity.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string
  }).isRequired
};

function Layout(debug) {
  return (
    <div className="activity">
      <BRB />
      <div className="upper-thirds">
        <SubPointGoal />
        <LatestSubscriber />
      </div>
      <div className="middle-thirds" />
      <div className="lower-thirds">
        <ActivityCamera />
        <Notifier debug={debug} />
        <Ticker debug={debug} />
        <SocialMedia />
        <SongNotifier />
      </div>
    </div>
  );
}

function Activity(props) {
  const query = new URLSearchParams(props.location.search);
  const debug = query.get('debug') === 'true';
  return props.isFetching ? <div /> : Layout(debug);
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
