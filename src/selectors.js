import { createSelector } from 'reselect';

export const getFetchState = state => {
  const isFetching = [
    state.events.isFetching,
    state.subscriptions.isFetchingLatestSubscriber,
    state.subscriptions.isFetchingSubPoints
  ];
  return isFetching.every(Boolean);
};

export const getTotalEmoteCounts = state => state.emotes.emotes;

export const getNotifierPool = state => state.events.notifierPool;
export const getEventList = state => state.events.events;
export const getShouldNotify = state => state.events.notificationsActive;

export const getLatestSubscription = state => state.subscriptions.latest;
export const getSubPoints = state => state.subscriptions.subPoints;

export const getStreamStartTime = state => state.uptime.startTime;

export const getCurrentSong = state => state.songs.currentSong;
export const getQueueSize = state => state.songs.queueSize;

export const getSubathonAddedMinutes = state => state.subathon.addedMinutes;
export const getSubathonContributionCap = state =>
  state.subathon.contributionCap;
export const getSubathonEndTime = state => state.subathon.endTimestamp;
export const getSubathonStartTime = state => state.subathon.startTimestamp;
export const getSubathonElapsedTime = state => state.subathon.elapsedTime || 0;
export const getSubathonRemainingTime = state => state.subathon.remainingTime;
export const getSubathonState = state => state.subathon.active;

export const getSubathonContributionState = createSelector(
  getSubathonState,
  getSubathonAddedMinutes,
  getSubathonContributionCap,
  (state, minutes, cap) => state && minutes < cap
);

export const getCurrentChristmasBroadcaster = state => state.christmas.current;
export const getNextChristmasBroadcaster = state => state.christmas.next;
