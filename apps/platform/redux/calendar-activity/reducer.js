import { actionTypes } from './action';

export const initState = {
  activity: {},

};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.CALENDAR_ACTIVITY_SET_ACTIVITY: {
      console.log('trying to set activity and props is :', action.props);
      return {
        ...state,
        activity: {
          ...action.props,
          date: new Date(2022, 1, 3),
        },
      };
    }
    case actionTypes.CALENDAR_ACTIVITY_UPDATE_ACTIVITY: {
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
