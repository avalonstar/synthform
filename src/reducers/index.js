import { combineReducers } from 'redux';

import emotes from './emotes';
import events from './events';
import messages from './messages';
import subscriptions from './subscriptions';
import tmi from './tmi';
import uptime from './uptime';

import madness from './special/madness';

const rootReducer = combineReducers({
  emotes,
  events,
  messages,
  subscriptions,
  tmi,
  uptime,

  // Special events.
  madness
});

export default rootReducer;
