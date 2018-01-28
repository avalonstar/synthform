import * as actions from 'actions/emotes';

const initialState = {
  isFetching: false,
  error: '',
  emotes: []
};

const emotes = (state = initialState, action) => {
  switch (action.type) {
    case actions.EMOTE_FETCH.REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actions.EMOTE_FETCH.FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case actions.EMOTE_FETCH.SUCCESS:
      return {
        ...state,
        isFetching: false,
        emotes: action.payload
      };
    default:
      return state;
  }
};

export default emotes;
