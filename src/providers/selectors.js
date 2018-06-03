import * as fromEmotes from 'reducers/emotes';
import * as fromEvents from 'reducers/events';

export const getEmotes = state => fromEmotes.getEmotes(state.emotes);

export const getEvents = state => fromEvents.getEvents(state.events);
export const getNotifications = state =>
  fromEvents.getNotifications(state.events);

export const getSubathon = state => state.subathon.payload;
export const getSubathonState = state => state.subathon.isActive;
