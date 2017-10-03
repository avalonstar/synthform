/* eslint-disable no-underscore-dangle */

import { fromJS } from 'immutable';

import * as actions from 'actions/songs';

const initialState = fromJS({
  isFetching: false
});

const songs = (state = initialState, action) => {
  switch (action.type) {
    case actions.SONG_FETCH.REQUEST:
      return state.merge({
        isFetching: true
      });
    case actions.SONG_FETCH.SUCCESS: {
      return state.merge({
        isFetching: false,
        queueSize: action.queueSize,
        currentSong: action.currentSong
      });
    }
    default:
      return state;
  }
};

export default songs;
