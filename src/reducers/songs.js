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
    case actions.SONG_FETCH.SUCCESS:
      return state.merge({
        isFetching: false,
        totalSongs: action.payload._total,
        queue: [...action.payload.queue],
        currentSong: {
          track: action.payload._currentSong.track,
          requester: action.payload._currentSong.user.displayName,
          requested: action.payload._currentSong.createdAt
        }
      });
    default:
      return state;
  }
};

export default songs;
