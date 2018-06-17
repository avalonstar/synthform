import { schema } from 'normalizr';

export const event = new schema.Entity('events');
export const eventList = [event];
export const emote = new schema.Entity('emotes');
export const emoteList = [emote];
export const message = new schema.Entity('messages');
export const messageList = [message];
