export const actionTypes = {
  TOAST_ALERT_UPDATE: 'TOAST_ALERT_UPDATE',
  TOAST_ALERT_HIDE: 'TOAST_ALERT_HIDE',
};

export const set = (props) => ({
  props,
  type: actionTypes.TOAST_ALERT_UPDATE,
});
export const hideToastAlert = (props) => ({
  props,
  type: actionTypes.TOAST_ALERT_UPDATE,
});
