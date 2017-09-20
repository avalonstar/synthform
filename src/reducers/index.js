import { combineReducers } from 'redux';

import events from './events';
import messages from './messages';
import songs from './songs';
import subscriptions from './subscriptions';

const rootReducer = combineReducers({
  events,
  messages,
  songs,
  subscriptions
});

export default rootReducer;
