import { combineReducers } from 'redux';

import events from './events';
import messages from './messages';
import songs from './songs';
import subscriptions from './subscriptions';
import tmi from './tmi';
import uptime from './uptime';

const rootReducer = combineReducers({
  events,
  messages,
  songs,
  subscriptions,
  tmi,
  uptime
});

export default rootReducer;
