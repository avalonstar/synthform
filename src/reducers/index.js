import { combineReducers } from 'redux';

import events from './events';
import messages from './messages';
import songs from './songs';

const rootReducer = combineReducers({
  events,
  messages,
  songs
});

export default rootReducer;
