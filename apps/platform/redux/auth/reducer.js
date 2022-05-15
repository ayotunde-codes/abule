import { actionTypes } from './action';

export const initState = {
  login: {
    show: false,
  },
  signUp: {
    show: false,
    props: {},
  },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH_SHOW_LOGIN: {
      return {
        ...state,
        login: {
          ...state.login,
          show: true,
        },
        signUp: {
          ...state.signUp,
          ...initState.signUp,
        },
      };
    }
    case actionTypes.AUTH_HIDE_LOGIN: {
      return {
        ...state,
        login: {
          ...state.login,
          show: false,
        },
      };
    }
    case actionTypes.AUTH_SHOW_SIGNUP: {
      return {
        ...state,
        login: {
          ...state.login,
          show: false,
        },
        signUp: {
          ...state.signUp,
          show: true,
          props: action.props,
        },
      };
    }
    case actionTypes.AUTH_HIDE_SIGNUP: {
      return {
        ...state,
        signUp: {
          ...state.signUp,
          ...initState.signUp,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;
