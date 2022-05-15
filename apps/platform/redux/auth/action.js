export const actionTypes = {
  AUTH_SHOW_LOGIN: 'AUTH_SHOW_LOGIN',
  AUTH_HIDE_LOGIN: 'AUTH_HIDE_LOGIN',
  AUTH_SHOW_SIGNUP: 'AUTH_SHOW_SIGNUP',
  AUTH_HIDE_SIGNUP: 'AUTH_HIDE_SIGNUP',
};

export const showLogin = (props) => ({ type: actionTypes.AUTH_SHOW_LOGIN, props });
export const closeLogin = (props) => ({ type: actionTypes.AUTH_HIDE_LOGIN, props });
export const showSignUp = (props) => ({ type: actionTypes.AUTH_SHOW_SIGNUP, props });
export const closeSignUp = (props) => ({ type: actionTypes.AUTH_HIDE_SIGNUP, props });
