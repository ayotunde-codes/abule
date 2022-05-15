import { actionTypes } from './action';

export const initState = {
  content: null,
  animation: null,
  timeout: null,
  stamp: new Date(),
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.TOAST_ALERT_UPDATE: {
      return {
        ...state,
        ...initState,
        ...action.props,
        stamp: new Date(),
      };
    }
    case actionTypes.TOAST_ALERT_HIDE: {
      return {
        ...state,
        ...initState,
      };
    }
    default:
      return state;
  }
}

export default reducer;
