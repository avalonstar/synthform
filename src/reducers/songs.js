/* eslint-disable no-underscore-dangle */

import { fromJS } from 'immutable';

import * as actions from 'actions/songs';

const initialState = fromJS({});

const songs = (state = initialState, action) => {
  switch (action.type) {
    case actions.SONG_FETCH.SUCCESS:
      return state.merge({
        totalSongs: action.payload._total,
        queue: [...action.payload.queue],
        currentSong: action.payload._currentSong
      });
    default:
      return state;
  }
};

export default songs;
