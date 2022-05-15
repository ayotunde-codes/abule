import { actionTypes } from './action';

export const initState = {
  activity: {},

};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.VIEW_ACTIVITY_SET_ACTIVITY: {
      console.log('the props to set is : ', action.props);
      return {
        ...state,
        activity: action.props,
      };
    }
    case actionTypes.VIEW_ACTIVITY_UPDATE_ACTIVITY: {
      return {
        ...state,
        activity: {
          ...state.activity,
          ...action.props,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;
