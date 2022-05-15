export const actionTypes = {
  VIEW_ACTIVITY_SET_ACTIVITY: 'VIEW_ACTIVITY_SET_ACTIVITY',
  VIEW_ACTIVITY_UPDATE_ACTIVITY: 'VIEW_ACTIVITY_UPDATE_ACTIVITY',
};

export const setActivity = (props) => ({
  props,
  type: actionTypes.VIEW_ACTIVITY_SET_ACTIVITY,
});
export const updateActivity = (props) => ({
  props,
  type: actionTypes.VIEW_ACTIVITY_UPDATE_ACTIVITY,
});
