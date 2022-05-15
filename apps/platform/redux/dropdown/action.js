export const actionTypes = {
  DROPDOWN_SHOW: 'DROPDOWN_SHOW',
  DROPDOWN_HIDE: 'DROPDOWN_HIDE',
};

export const show = (props) => ({
  props,
  type: actionTypes.DROPDOWN_SHOW,
});
export const hide = (props) => ({
  props,
  type: actionTypes.DROPDOWN_HIDE,
});
