import { actionTypes } from './action';

export const initState = {
  items: [],
  items: false,
  focusedIndex: 0,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GALLERY_SET_ITEMS: {
      return {
        ...state,
        items: [
          ...action.items,
        ],
        focusedIndex: action.focusedIndex,
      };
    }
    case actionTypes.GALLERY_SET_FOCUSED_ITEM: {
      let focusedIndex = action.index;
      const lastIndex = state.items.length - 1;
      if (focusedIndex > lastIndex) focusedIndex = lastIndex;
      else if (focusedIndex < 0) focusedIndex = 0;

      return {
        ...state,
        focusedIndex,
      };
    }
    case actionTypes.GALLERY_HIDE_ITEMS: {
      return {
        ...state,
        items: false,
        focusedIndex: 0,
      };
    }
    default:
      return state;
  }
}

export default reducer;
