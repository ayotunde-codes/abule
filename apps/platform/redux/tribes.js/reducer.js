import { GET_ALL_CAPTIONS, ADD_CAPTION_TAG } from './actionTypes';

const initialState = {
  captions: [],
  loading: true,
  tag: '',
  tagCaptions: []
};

function rootReducer (state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_CAPTIONS:
      return {
        ...state,
        captions: payload,
        loading: false
      }
    case ADD_CAPTION_TAG:
      return {
        ...state,
        tag: payload.tag,
        tagCaptions: payload.captions,
        loading: false
      }
    default:
      return state;
  }
}

export default rootReducer;
