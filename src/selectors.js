import { List, Map } from 'immutable';

export const getTotalEmoteCounts = state =>
  state.emotes.get('emotes') || List();

export const getNotifierPool = state =>
  state.events.get('notifierPool') || List();
export const getEventList = state => state.events.get('events') || List();

export const getLatestSubscription = state =>
  state.subscriptions.get('latest') || Map();
export const getSubCount = state => state.subscriptions.get('subCount') || 0;
export const getSubPoints = state => state.subscriptions.get('subPoints') || 0;

export const getStreamStartTime = state => state.uptime.get('startTime');

export const getCurrentSong = state => state.songs.get('currentSong') || Map();
export const getQueueSize = state => state.songs.get('queueSize') || 0;
