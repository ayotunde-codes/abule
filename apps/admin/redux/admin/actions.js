export const actionTypes = {
    ADMIN_ACCESS_DENIED: 'ADMIN_ACCESS_DENIED',
    ADMIN_ACCESS_ALLOWED: 'ADMIN_ACCESS_ALLOWED',
    SET_HISTORY: 'SET_HISTORY'
};
  
export const allowAccess = (props) => ({ type: actionTypes.ADMIN_ACCESS_ALLOWED, props });
export const denyAccess = () => ({ type: actionTypes.ADMIN_ACCESS_DENIED});
export const setHistory = (props) => ({ type: actionTypes.SET_HISTORY, props })
  