/* eslint-disable no-underscore-dangle */

import * as actions from 'actions/songs';

const initialState = {
  isFetching: false,
  queueSize: 0,
  currentSong: {}
};

const songs = (state = initialState, action) => {
  switch (action.type) {
    case actions.SONG_FETCH.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.SONG_FETCH.SUCCESS: {
      return {
        ...state,
        isFetching: false,
        queueSize: action.queueSize,
        currentSong: action.currentSong
      };
    }
    default:
      return state;
  }
};

export default songs;
