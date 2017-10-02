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
      const currentSong = action.payload._currentSong;
      return state.merge({
        isFetching: false,
        totalSongs: action.payload._total,
        queue: [...action.payload.queue],
        currentSong: {
          title: currentSong.track.title,
          artist: currentSong.track.artist,
          duration: currentSong.track.duration,
          requester: currentSong.user.displayName,
          requested: currentSong.createdAt
        }
      });
    default:
      return state;
  }
};

export default songs;
