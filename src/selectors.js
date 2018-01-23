import { List, Map } from 'immutable';
import { createSelector } from 'reselect';

export const getFetchState = state => {
  const isFetching = [
    state.events.get('isFetching'),
    state.subscriptions.get('isFetchingLatestSubscriber'),
    state.subscriptions.get('isFetchingSubPoints')
  ];
  return isFetching.every(Boolean);
};

export const getTotalEmoteCounts = state =>
  state.emotes.get('emotes') || List();

export const getNotifierPool = state =>
  state.events.get('notifierPool') || List();
export const getEventList = state => state.events.get('events') || List();
export const getShouldNotify = state => state.events.get('notificationsActive');

export const getLatestSubscription = state =>
  state.subscriptions.get('latest') || Map();
export const getSubCount = state => state.subscriptions.get('subCount') || 0;
export const getSubPoints = state => state.subscriptions.get('subPoints') || 0;

export const getStreamStartTime = state => state.uptime.get('startTime');

export const getCurrentSong = state => state.songs.get('currentSong') || Map();
export const getQueueSize = state => state.songs.get('queueSize') || 0;

export const getSubathonAddedMinutes = state =>
  state.subathon.get('addedMinutes');
export const getSubathonContributionCap = state =>
  state.subathon.get('contributionCap');
export const getSubathonEndTime = state => state.subathon.get('endTimestamp');
export const getSubathonStartTime = state =>
  state.subathon.get('startTimestamp');
export const getSubathonElapsedTime = state =>
  state.subathon.get('elapsedTime') || 0;
export const getSubathonRemainingTime = state =>
  state.subathon.get('remainingTime');
export const getSubathonState = state => state.subathon.get('active');

export const getSubathonContributionState = createSelector(
  getSubathonState,
  getSubathonAddedMinutes,
  getSubathonContributionCap,
  (state, minutes, cap) => state && minutes < cap
);

export const getCurrentChristmasBroadcaster = state =>
  state.christmas.get('current') || Map();
export const getNextChristmasBroadcaster = state =>
  state.christmas.get('next') || Map();
