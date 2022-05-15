export const actionTypes = {
  ACCESS_DENIED_SHOW: 'ACCESS_DENIED_SHOW',
  ACCESS_DENIED_HIDE: 'ACCESS_DENIED_HIDE',
};

export const showAccessDenied = (props) => ({ type: actionTypes.ACCESS_DENIED_SHOW, props });
export const closeAccessDenied = (props) => ({ type: actionTypes.ACCESS_DENIED_HIDE, props });
