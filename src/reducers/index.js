import { combineReducers } from 'redux';

import emotes from './emotes';
import events from './events';
import messages from './messages';
import songs from './songs';
import subathon from './subathon';
import subscriptions from './subscriptions';
import tmi from './tmi';
import uptime from './uptime';

const rootReducer = combineReducers({
  emotes,
  events,
  messages,
  songs,
  subathon,
  subscriptions,
  tmi,
  uptime
});

export default rootReducer;
