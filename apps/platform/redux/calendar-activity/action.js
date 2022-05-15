export const actionTypes = {
  CALENDAR_ACTIVITY_SET_ACTIVITY: 'CALENDAR_ACTIVITY_SET_ACTIVITY',
  CALENDAR_ACTIVITY_UPDATE_ACTIVITY: 'CALENDAR_ACTIVITY_UPDATE_ACTIVITY',
};

export const setActivity = (props) => ({
  props,
  type: actionTypes.CALENDAR_ACTIVITY_SET_ACTIVITY,
});
export const updateActivity = (props) => ({
  props,
  type: actionTypes.CALENDAR_ACTIVITY_UPDATE_ACTIVITY,
});
