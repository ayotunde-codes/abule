export const actionTypes = {
  SETTINGS_SET_INFO: 'SETTINGS_SET_INFO',
  SETTINGS_UPDATE_HEADER: 'SETTINGS_UPDATE_HEADER',
  SETTINGS_UPDATE_FOOTER: 'SETTINGS_UPDATE_FOOTER',
  SETTINGS_DOCUMENT_LOADED: 'SETTINGS_DOCUMENT_LOADED',
  SESSION_USER_ADD_KID: 'SESSION_USER_ADD_KID',
  SESSION_USER_UPDATE_KID: 'SESSION_USER_UPDATE_KID',
  SESSION_USER_DELETE_KID: 'SESSION_USER_DELETE_KID',
  SETTINGS_UPDATE_SCREEN: 'SETTINGS_UPDATE_SCREEN',
  UPDATE_SESSION_USER: 'UPDATE_SESSION_USER',
  SIGN_OUT: 'SIGN_OUT',
};

export const setInfo = (props) => ({ type: actionTypes.SETTINGS_SET_INFO, props });
export const documentLoaded = () => ({ type: actionTypes.SETTINGS_DOCUMENT_LOADED });
export const updateHeader = (props) => ({ type: actionTypes.SETTINGS_UPDATE_HEADER, props });
export const updateFooter = (props) => ({ type: actionTypes.SETTINGS_UPDATE_FOOTER, props });
export const updateScreen = (props) => ({ type: actionTypes.SETTINGS_UPDATE_SCREEN, props });
export const updateSessionUser = (props) => ({ type: actionTypes.UPDATE_SESSION_USER, props });
export const sessionUserAddKid = (kid) => ({ type: actionTypes.SESSION_USER_ADD_KID, kid });
export const sessionUserUpdateKid = (kidId, props) => ({ type: actionTypes.SESSION_USER_UPDATE_KID, kidId, props });
export const sessionUserDeleteKid = (kidId) => ({ type: actionTypes.SESSION_USER_DELETE_KID, kidId });
export const signOut = () => ({ type: actionTypes.SIGN_OUT });
