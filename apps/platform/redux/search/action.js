export const actionTypes = {
  SEARCH_SET_SEARCH_PROPS: 'SEARCH_SET_SEARCH_PROPS',
  SEARCH_RESET_SEARCH_PROPS: 'SEARCH_RESET_SEARCH_PROPS',
  SEARCH_RESULT_LOADED: 'SEARCH_RESULT_LOADED',
  SEARCH_LOAD_RESULT: 'SEARCH_LOAD_RESULT',
};

export const setSearchProps = (props) => ({
  props,
  type: actionTypes.SEARCH_SET_SEARCH_PROPS,
});

export const resetSearchProps = (props) => ({
  props,
  type: actionTypes.SEARCH_RESET_SEARCH_PROPS,
});

export const loadResult = () => ({
  type: actionTypes.SEARCH_LOAD_RESULT,
});

export const resultLoaded = (props) => ({
  props,
  type: actionTypes.SEARCH_RESULT_LOADED,
});
