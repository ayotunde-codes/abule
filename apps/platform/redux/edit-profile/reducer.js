import { actionTypes } from './action';

const defaultErrors = {
  personaError: false,
  personaOptionError: false,

  imageError: false,

  aboutError: false,

  interestsError: false,

  firstNameError: false,

  lastNameError: false,

  emailError: false,

  usernameError: false,

  phoneNumberError: false,

  dobError: false,

  genderError: false,

  maritalStatusError: false,

  streetAddressError: false,

  cityError: false,

  stateError: false,

  zipCodeError: false,
  interestsErrorBad: false,
  idVerifiedError: false,

};
export const initState = {
  photo: null,
  persona: {
    options: {
      primary: '',
      secondary: [],
    },
    primary: '',
    secondary: [],
  },
  imageUrl: '',
  about: '',
  interests: [],
  firstName: '',
  lastName: '',
  email: '',
  allowEditEmail: true,
  username: '',
  usernameMsg: '',
  phoneNumber: '',
  dob: '',
  gender: '',
  maritalStatus: '',
  addressId: '',
  streetAddress: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  submitting: false,
  supports: [],
  ...defaultErrors,
};

export const temp = {};

function reducer(state = { ...initState, ...temp }, action) {
  switch (action.type) {
    case actionTypes.EDIT_PROFILE_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    case actionTypes.EDIT_PROFILE_SET_SUPPORT: {
      const supports = [];
      for (const support_ of state.supports) {
        supports.push(support_.type === action.support.type ? action.support : support_);
      }

      return {
        ...state,
        supports,
      };
    }
    case actionTypes.EDIT_PROFILE_RESET_INFO: {
      return {
        ...state,
        ...initState,
        ...action.props,
      };
    }
    case actionTypes.EDIT_PROFILE_CLEAR_ERRORS: {
      return {
        ...state,
        ...initState,
        ...defaultErrors,
        ...action.props,
      };
    }
    case actionTypes.EDIT_PROFILE_SAVE_TO_TEMP: {
      return {
        ...state,
        temp: {
          ...state,
          temp: null,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;
