export const actionTypes = {
  EDIT_PROFILE_SET_INFO: 'EDIT_PROFILE_SET_INFO',
  EDIT_PROFILE_SET_SUPPORT: 'EDIT_PROFILE_SET_SUPPORT',
  EDIT_PROFILE_RESET_INFO: 'EDIT_PROFILE_RESET_INFO',
  EDIT_PROFILE_CLEAR_ERRORS: 'EDIT_PROFILE_CLEAR_ERRORS',
  EDIT_PROFILE_SAVE_TO_TEMP: 'EDIT_PROFILE_SAVE_TO_TEMP',
};

export function setInfo(props) {
  return { type: actionTypes.EDIT_PROFILE_SET_INFO, props };
}

export function resetInfo(props) {
  return { type: actionTypes.EDIT_PROFILE_RESET_INFO, props };
}

export function clearErrors(props = {}) {
  return { type: actionTypes.EDIT_PROFILE_CLEAR_ERRORS, props };
}

export function setSupport(support) {
  return { type: actionTypes.EDIT_PROFILE_SET_SUPPORT, support };
}

export function saveChanges(support) {
  return { type: actionTypes.EDIT_PROFILE_SAVE_TO_TEMP, support };
}
