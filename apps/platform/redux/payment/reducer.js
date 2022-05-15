import { actionTypes } from './action';

export const initState = {
  product: {},
  onPaymentSuccess: () => {},
  show: false,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.PAYMENT_SHOW:
      return {
        ...state,
        ...action.props,
        show: true,
      };
    case actionTypes.PAYMENT_HIDE:
      return {
        ...state,
        ...initState,
      };
    default:
      return state;
  }
}

export default reducer;
