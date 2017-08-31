import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ActivityCamera } from 'components/Cameras';
import { LatestSubscriber, SocialMedia } from 'components/Labels';
import SubPointGoal from 'components/Goals';
import { Notifier, Ticker } from 'components/Events';

import './Activity.css';

const propTypes = {
  isFetching: PropTypes.bool.isRequired
};

function Layout() {
  return (
    <div className="activity">
      <div className="upper-thirds">
        <SubPointGoal />
        <LatestSubscriber />
      </div>
      <div className="middle-thirds" />
      <div className="lower-thirds">
        <ActivityCamera />
        <Notifier />
        <Ticker />
        <SocialMedia />
      </div>
    </div>
  );
}

function Activity(props) {
  return props.isFetching ? <div /> : Layout();
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
