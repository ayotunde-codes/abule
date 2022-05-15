export const actionTypes = {
  PAYMENT_SHOW: 'PAYMENT_SHOW',
  PAYMENT_HIDE: 'PAYMENT_HIDE',
};

export const makePayment = (props) => ({ type: actionTypes.PAYMENT_SHOW, props });
export const closePayment = (props) => ({ type: actionTypes.PAYMENT_HIDE, props });
