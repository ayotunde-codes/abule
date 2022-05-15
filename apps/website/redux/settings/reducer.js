import { actionTypes } from './action';

export const initState = {
  sessionUser: 'loading',
  documentLoaded: false,
  firstSession: false,
  price: '',
  isSubscribed: false,
  header: {
    height: 0,
    marginBottom: 0,
    transparent: true,
    fixed: false,
    show: true,
    backButton: {
      show: false,
      onClick: false, // () => { },
    },
  },
  footer: {
    show: true,
  },
  screen: {
    width: 0,
    height: 0,
    device: 'desktop',
    orientation: 'portrait',
  },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SETTINGS_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    case actionTypes.SETTINGS_DOCUMENT_LOADED:
      return {
        ...state,
        documentLoaded: true,
      };
    case actionTypes.SETTINGS_UPDATE_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          ...action.props,
        },
      };
    case actionTypes.SETTINGS_UPDATE_FOOTER:
      return {
        ...state,
        footer: {
          ...state.footer,
          ...action.props,
        },
      };
    case actionTypes.SETTINGS_UPDATE_SCREEN:
      return {
        ...state,
        screen: {
          ...state.screen,
          ...action.props,
        },
      };
    case actionTypes.UPDATE_SESSION_USER: {
      return {
        ...state,
        sessionUser: {
          ...state.sessionUser,
          ...action.props,
        },
      };
    }
    case actionTypes.SESSION_USER_ADD_KID: {
      return {
        ...state,
        sessionUser: {
          ...state.sessionUser,
          kids: [...state.sessionUser.kids, action.kid],
        },
      };
    }
    case actionTypes.SESSION_USER_UPDATE_KID: {
      const kids = [];
      state.sessionUser.kids.forEach((kid) => {
        kids.push(kid.id === action.kidId ? { ...kid, ...action.props } : kid);
      });

      return {
        ...state,
        sessionUser: {
          ...state.sessionUser,
          kids,
        },
      };
    }
    case actionTypes.SESSION_USER_DELETE_KID: {
      const kids = [];
      console.log('the logs', {
        kids: state.sessionUser.kids,
        kidId: action.kidId,
      });
      alert('inside and going through ');
      state.sessionUser.kids.forEach((kid) => {
        if (kid.id !== action.kidId) {
          kids.push(kid);
        }
      });

      return {
        ...state,
        sessionUser: {
          ...state.sessionUser,
          kids,
        },
      };
    }
    case actionTypes.SIGN_OUT: {
      return {
        ...state,
        sessionUser: false,
        documentLoaded: true,
      };
    }
    default:
      return state;
  }
}

export default reducer;
