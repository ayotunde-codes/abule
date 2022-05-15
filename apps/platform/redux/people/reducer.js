import { actionTypes } from './action';

export const initState = {
  filters: {
    categories: [],
    ageGroups: [],
    startDate: null,
    stopDate: null,
  },
  result: [],
  loadResult: true,
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.PEOPLE_SEARCH_RESULT_LOADED: {
      return {
        ...state,
        result: action.props,
        loading: false,
      };
    }
    case actionTypes.SEARCH_LOAD_RESULT: {
      // alert('2');
      return {
        ...state,
        loadResult: false,
      };
    }
    default:
      return state;
  }
}

export default reducer;
