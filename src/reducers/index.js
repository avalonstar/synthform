import { combineReducers } from 'redux';

import christmas from './christmas';
import emotes from './emotes';
import events from './events';
import messages from './messages';
import songs from './songs';
import subathon from './subathon';
import subscriptions from './subscriptions';
import tmi from './tmi';
import uptime from './uptime';

const rootReducer = combineReducers({
  christmas,
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
