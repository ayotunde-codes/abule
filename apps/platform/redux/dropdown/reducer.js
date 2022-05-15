import { actionTypes } from './action';

export const initState = {
  options: {

  },
  options: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.DROPDOWN_SHOW: {
      return {
        ...state,
        options: {
          ...action.props,
        },
      };
    }
    case actionTypes.DROPDOWN_HIDE: {
      return {
        ...state,
        options: false,
      };
    }
    default:
      return state;
  }
}

export default reducer;
