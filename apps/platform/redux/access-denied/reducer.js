import { actionTypes } from './action';

export const initState = {
  type: 'host-activity',
  onPaymentSuccess: () => {},
  show: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.ACCESS_DENIED_SHOW:
      return {
        ...state,
        ...action.props,
        show: true,
      };
    case actionTypes.ACCESS_DENIED_HIDE:
      return {
        ...state,
        ...initState,
      };
    default:
      return state;
  }
}

export default reducer;
