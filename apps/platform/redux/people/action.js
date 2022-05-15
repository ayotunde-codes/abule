export const actionTypes = {
  PEOPLE_SEARCH_RESULT_LOADED: 'PEOPLE_SEARCH_RESULT_LOADED',
};

export const resultLoaded = (props) => ({
  props,
  type: actionTypes.PEOPLE_SEARCH_RESULT_LOADED,
});
