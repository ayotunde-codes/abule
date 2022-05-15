export const actionTypes = {
  CALENDAR_SET_PROPS: 'CALENDAR_SET_PROPS',
  CALENDAR_UPDATE_DATE: 'CALENDAR_UPDATE_DATE',
  CALENDAR_UPDATE_EVENTS: 'CALENDAR_UPDATE_EVENTS',
  CALENDAR_RESET_DATE: 'CALENDAR_RESET_DATE',
};

export const setProps = (props) => ({
  props,
  type: actionTypes.CALENDAR_SET_PROPS,
});
export const updateDate = (date) => ({
  date,
  type: actionTypes.CALENDAR_UPDATE_DATE,
});
export const resetDate = (date) => ({
  date,
  type: actionTypes.CALENDAR_RESET_DATE,
});
export const updateEvents = (events, props = {}, action = 'add') => ({
  events,
  props,
  action,
  type: actionTypes.CALENDAR_UPDATE_EVENTS,
});
