import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import $ from 'jquery';
import {
  Fn, InputField, Referrals, InputSelect, InputPicker, InputLocation, InputDatePicker, InputSchool,
} from '@abule-common/components';
import dynamic from 'next/dynamic';
import Layout from '../../components/general/Layout';

import {
  clearErrors, saveChanges, setSupport, setInfo,
  setInfo as setSettingInfo,
} from '../../redux/edit-profile/action';
import {
  AgeGroups, Grades, Personas, Utils,
} from '../../datastore';
import KidProfile from '../../components/profile/KidProfile';
import UpdateSupportType from '../../components/profile/UpdateSupportType';
import VerifyPhoneNo from '../../components/VerifyPhoneNo';

const {
  ucFirst,
  devalueString,
  isEmpty,
  isEmail,
  isDate,
  capitalize,
  formatPhoneNo,
  parsePhoneNo,
  milSecToYears,
  popAlert,
} = Fn;

let start = () => { };
const VerifyButton = dynamic(() => import('@passbase/button/react').then((mod) => {
  start = mod.start;
  return mod;
}), { ssr: false });
class OnBoarding extends React.Component {
  constructor(props) {
    super(props);
    this.defaultKidProfile = {
      preferredName: '',
      preferredNameError: false,
      dob: '',
      dobError: false,
      gender: '',
      genderError: false,
      interests: [],
      interestsError: false,
      interestsErrorBad: false,
      coreValues: [],
      coreValuesError: false,
      coreValuesErrorBad: false,
      color: '',
      colorError: false,
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      schoolId: '',
      schoolName: '',
      schoolNameError: false,
      schoolStreetAddress: '',
      schoolStreetAddressError: false,
      schoolCity: '',
      schoolCityError: false,
      schoolState: '',
      schoolStateError: false,
      schoolZipCode: '',
      schoolZipCodeError: false,
      specialInstruction: '',
      specialInstructionError: false,
      submitting: false,
    };
    this.state = {
      screenHeight: window.innerHeight,
      disableNext: false,
      disablePrevious: false,
      showWelcomeNote: false,
      showKidWelcomeNote: false,
      showKidFinishNote: false,
      activeStep: 0,
      formType: 'profile',
      profileDisplayDragOver: false,
      validating: false,
      caregiverForm: Router.query['account-type'] && Router.query['account-type'] === 'caregiver',
      swappingProfileContentLeft: false,
      swappingProfileContentRight: false,
      focusedSupport: 'driving',
      /// /////////////////////////////////////////
      ...this.defaultKidProfile,
      /// ////////////////////////////////k/////////
      referralList: [],
      userVaccinationAnswer: '',
      userVaccinationAnswerError: false,
      userToSubmitVaccineProof: null,
      userToSubmitVaccineProofError: false,
      progress: [],
      verifyingPhoneNo: false,
    };

    if (props.settings.sessionUser.accountType === 'caregiver') {
      this.state.caregiverForm = true;
    }

    this.imagePicker = false;
    this._isMounted = false;
    this.fields = {
      photo: null,
      firstName: null,
      interests: null,
      coreValues: null,
      kidInterests: null,
      lastName: null,
      username: null,
      about: null,
      email: null,
      streetAddress: null,
      phoneNumber: null,
      dob: null,
      gender: null,
      maritalStatus: null,
    };

    this.banner = null;
    this.transitionElementContainer = null;
    this.formActions = null;
    this.profileImagePicker = null;
    this._isMounted = false;
    this.kidsProfileSteps = [];
    this.swapProfileContent = this.swapProfileContent.bind(this);
    this.createKidProfile = this.createKidProfile.bind(this);
    this.profilePersona = this.profilePersona.bind(this);
    this.profilePersonaOption = this.profilePersonaOption.bind(this);
    this.profileIndex = this.profileIndex.bind(this);
    this.profileName = this.profileName.bind(this);
    this.profileMaritalStatus = this.profileMaritalStatus.bind(this);
    this.profileAddress = this.profileAddress.bind(this);
    this.profileAbout = this.profileAbout.bind(this);
    this.profileInterests = this.profileInterests.bind(this);
    this.profileCoreValues = this.profileCoreValues.bind(this);
    this.profilePhoneNo = this.profilePhoneNo.bind(this);
    this.identityVerification = this.identityVerification.bind(this);
    this.profileVaccination = this.profileVaccination.bind(this);
    this.backgroundCheck = this.backgroundCheck.bind(this);
    this.profileSupport = this.profileSupport.bind(this);
    this.profileDisplayImage = this.profileDisplayImage.bind(this);
    this.onWindowsUpdate = () => {
      this.setState({
        screenHeight: window.innerHeight,
      });
    };

    this.defaultProfileSteps = [
      this.profilePersona,
      this.profileIndex,
    ];

    this.profileSteps = [
      ...this.defaultProfileSteps,
    ];
  }

  clearSession() {
    const { props } = this;
    if (this.props.setSessionUser) {
      this.props.setSessionUser(false);
    }
    localStorage.removeItem('sessionUserToken');
    localStorage.removeItem('sessionUserProfileId');
    // this.props.signOut();
    // this.toogleMobileNavDropList();
    Router.push(`${props.AppUrl}/login`);
  }

  async componentDidMount() {
    this._isMounted = true;
    const { props, state } = this;
    const { settings, editProfile } = props;
    const { sessionUser } = settings;
    console.log({ sessionUser });
    props.onPageLoad();
    props.setFirstSession();

    const data = {
      ...sessionUser,
      allowEditEmail: !isEmail(sessionUser.email),
      // dob: this.parseDob(sessionUser.dob),
      ...editProfile.temp,
    };
    window.addEventListener('resize', this.onWindowsUpdate);
    props.updateFormState(data);

    if (!isEmpty(sessionUser.persona.primary)) {
      if (!Personas.find(sessionUser.persona.primary)) {
        alert('error persona');
        this.defaultProfileSteps.shift();
        this.loadOnboardingProcess('invited');
      } else this.loadOnboardingProcess(sessionUser.persona.primary);
    }
    this.loadOnboardingProcess(sessionUser.persona.primary);

    let lastStep = 0; // this.state.caregiverForm ? 13 : 10;
    // Focus on first invalid screen
    let test = false;
    test = await this.submitForm({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    }, false);
    if (!await this.submitForm({
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
    }, false)) {
      lastStep = 0;
    } else if (!await this.submitForm({
      phoneNumber: data.phoneNumber,
    }, false)) {
      lastStep = 2;
    } else if (!await this.submitForm({
      dob: new Date(data.dob),
    }, false)) {
      lastStep = 3;
    } else if (!await this.submitForm({
      gender: data.gender,
    }, false)) {
      lastStep = 4;
    } else if (!await this.submitForm({
      maritalStatus: data.maritalStatus,
    }, false)) {
      lastStep = 5;
    } else if (!await this.submitForm({
      addressId: data.addressId,
    }, false)) {
      lastStep = 6;
    } else if (!await this.submitForm({
      about: data.about,
    }, false)) {
      lastStep = 7;
    } else if (!await this.submitForm({
      interests: data.interests,
    }, false)) {
      lastStep = 8;
    } else if (!await this.submitForm({
      coreValues: data.coreValues,
    }, false)) {
      lastStep = 9;
    } else if (!await this.submitForm({
      photoAssemblyId: data.photoAssemblyId,
    }, false)) {
      lastStep = 10;
    } else if (this.state.caregiverForm) {
      if (!await this.submitForm({
        supports: data.supports,
      }, false)) {
        lastStep = 11;
      } else {
        // test for id verification and background test will come here
        lastStep = 12;
      }
    } else {
      lastStep = 10;
    }

    console.log({
      data,
    });

    // this.state.activeStep = lastStep;
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.onWindowsUpdate, false);
  }

  toggleProgressTracker(index, value = null) {
    const progress = [...this.state.progress];
    console.log('Progress', { progress, index });
    progress.forEach((prog, i) => {
      if (i === index) {
        progress[index].active = value === null ? !progress[index].active : !!value;
      } else {
        progress[i].active = false;
      }
    });
    this.setState({
      progress,
    });
  }

  swapProfileContent(dir, steps) {
    // alert('you clicked');
    const newActiveStep = this.state.activeStep + (dir === 'backward' ? -1 : 1);
    if (steps[newActiveStep]) {
      this.setState({
        swappingProfileContentLeft: dir === 'backward',
        swappingProfileContentRight: dir !== 'backward',
      }, () => {
        document.querySelector('html').scrollTop = 0;
        $(this.transitionElementContainer).animate({
          left: dir === 'backward' ? '0px' : '-200%',
          height: 'auto',
        }, 500, () => {
          this.setState((state) => ({
            activeStep: newActiveStep,
            swappingProfileContentLeft: false,
            swappingProfileContentRight: false,
          }), () => {
            $(this.transitionElementContainer).css({
              left: '-100%',
            });
          });
        });
      });
    }

    return this;
  }

  parseDob(value) {
    return value;
  }

  getMinDOB() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - AgeGroups.maxAge);
    return date;
  }

  validateUsername(username) {
    const { props, state } = this;
    if (!isEmpty(username)) {
      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/profiles/check-username/${username}`,
      }).then(({ available }) => {
        if (this._isMounted) {
          props.updateFormState({
            usernameMsg: available ? 'available' : 'already exists',
            usernameError: !available,
          });
        }
      }).catch((erroRes) => {
        console.log('the actual error is : ', erroRes);
        Router.push(`${props.AppUrl}/`);
      });
    }
  }

  parseUsername(value) {
    return (value.match(/[A-Za-z0-9]/gi) || []).slice(0, 15).join('');
  }

  async submitForm(fields, option) {
    const { updateData, testData, enforceValue } = {
      updateData: false,
      testData: false,
      enforceValue: true,
      ...(option || {}),
    };
    const { state, props } = this;
    const { editProfile, isEditProfilePage } = props;
    const { sessionUser } = props.settings;

    // console.log(this.fields);
    const parseFieldsError = (errors, extraState = {}) => {
      const errorKeys = Object.keys(errors);
      console.log('validation erros', errorKeys);
      const Errors = {};
      let firstError = false;
      errorKeys.forEach((key) => {
        const value = errors[key];
        // alert(key);
        // const extras = [];
        if (/* !extras.includes(key) && */ !firstError && value !== false && this.fields[key]) {
          if (['interests'].includes(key)) {
            $('.form-container .form').scrollTop(0);
          } else {
            this.fields[key].focus();
            firstError = true;
          }
        }

        let errorKey = key;
        if (key === 'photoAssemblyId') {
          errorKey = 'image';
        }

        // if (extras.includes(key)) {
        //   Errors[key] = value;
        // } else {
        // alert(`error name ${errorKey}`);
        if (key === 'username') extraState.usernameMsg = errors.usernameMsg || 'already exists';
        if (key === 'interests') {
          extraState.interestsErrorBad = true;
        }
        if (key === 'coreValues') {
          extraState.coreValuesErrorBad = true;
        }
        Errors[`${errorKey}Error`] = value;
        // }
      });

      if (updateData || testData) {
        props.updateFormState({
          ...Errors,
          ...extraState,
        });
      }
    };

    const validate = () => {
      let isValid = true;
      const errors = {};
      let noEmptyField = [
        'firstName',
        'lastName',
        'username',
        'addressId',
        'phoneNumber',
      ];
      if (state.caregiverForm) {
        noEmptyField = [
          ...noEmptyField,
        ];
      }
      console.log('noempty field', { noEmptyField, fields });
      if (enforceValue) {
        Object.keys(fields).forEach((key) => {
          const value = fields[key];

          // console.log({ key, value }, { editProfile });
          if (noEmptyField.indexOf(key) > -1 && (!value || isEmpty(value))) {
            const diffErrorMsg = ['streetAddress', 'city', 'state', 'zipCode'];
            if (key === 'addressId') {
              diffErrorMsg.forEach((keey) => {
                const addValue = fields[keey];
                if (isEmpty(addValue)) {
                  errors[`${keey}`] = `invalid ${devalueString(keey)}`;
                  console.log(`setting isvalid to false ${keey}`);
                  isValid = false;
                }
              });
            } else {
              isValid = false;
              if (diffErrorMsg.indexOf(key) > -1) {
                errors[`${key}`] = `invalid ${devalueString(key)}`;
              } else if (key === 'username') {
                errors[`${key}Msg`] = 'can\'t be empty';
                errors[`${key}`] = true;
              } else {
                errors[`${key}`] = 'can\'t be empty';
              }
            }
          } else if (key === 'email' && !value) {
            isValid = false;
            errors[`${key}`] = 'invalid email';
          } else if (key === 'about' && (!value || value.length < Utils.getValue('MinProfileAboutLen'))) {
            isValid = false;
            errors[`${key}`] = `needs to be at least ${Utils.getValue('MinProfileAboutLen')} characters long`;
          } else if (['gender', 'maritalStatus'].indexOf(key) > -1 && isEmpty(value)) {
            isValid = false;
            errors[`${key}`] = 'you need to pick one';
          } else if (key === 'dob' && (!value || !isDate(value))) {
            isValid = false;
            console.log({
              value,
              yearGap: isDate(value),
            });
            errors[`${key}`] = 'invalid date';
          } else if (key === 'dob') {
            if (!value || !isDate(value) || milSecToYears(new Date() - value) < 18) { // user must be at least 18 years old
              isValid = false;
              errors[`${key}`] = 'must be at least 18yrs';
            }
          } else if (key === 'username' && fields.usernameError && fields.usernameError !== false) {
            isValid = false;

            errors[key] = 'invalid username';
          } else if (key === 'phoneNumber' && (!value || isNaN(value) || value.length !== 10)) {
            isValid = false;
            errors[`${key}`] = 'invalid phone number';
          } else if (['persona'].indexOf(key) > -1 && (!value.primary || value.primary.length < 1)) {
            isValid = false;
            errors[`${key}`] = 'you need to pick at least 1';
          } else if (['personaOption'].indexOf(key) > -1 && (!value.options.primary || value.options.primary.length < 1)) {
            isValid = false;
            errors[`${key}`] = 'you need to pick at least 1';
          } else if (['interests'].indexOf(key) > -1 && (!value || value.length < Utils.getValue('MinUserInterests'))) {
            isValid = false;
            errors[`${key}`] = `you need to pick at least ${Utils.getValue('MinUserInterests')}`;
          } else if (['coreValues'].indexOf(key) > -1 && (!value || value.length < Utils.getValue('MinCoreValues'))) {
            isValid = false;
            errors[`${key}`] = `you need to pick at least ${Utils.getValue('MinCoreValues')}`;
          }
          if (key === 'photoAssemblyId' && isEmpty(value) && isEmpty(editProfile.imageUrl)) {
            isValid = false;
            errors[key] = 'Select a display image';
          }
        });
      }
      console.log('IS VALID : ', { isValid, errors });
      parseFieldsError(errors);
      return isValid;
    };

    if (validate()) {
      // props.updateFormState({ submitting: true });
      if (updateData) {
        const formData = {};
        Object.keys(fields).forEach((k) => {
          let key = k;
          const value = fields[key];
          if (key === 'personaOption') {
            key = 'persona';
          }
          console.log('submit key is L ', k);
          formData[key] = value;
        });

        try {
          const data = await props.fetchRequest({
            url: `${process.env.REACT_APP_API}/profiles/${sessionUser.id}`,
            method: 'PATCH',
            body: formData,
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (this._isMounted) {
            console.log('updated details and data', data);
            props.setSessionUser({
              ...data,
              // persona: editProfile.persona,
            });

            props.updateFormState({
              ...data,
              phoneNumber: editProfile.phoneNumber,
            });
            return true;
          }
        } catch (erroRes) {
          console.log('the actual error is : ', erroRes);
          if (this._isMounted) {
            const { data, status } = erroRes;
            const { message } = data;

            if (status === 400) {
              // alert('error in after sumbit');
              parseFieldsError(message, { submitting: false });
            } else {
              props.updateFormState({
                ...sessionUser,
              });
            }
          }
        }
      } else {
        return true;
      }
    }
    return false;
  }

  loadOnboardingProcess(personaId) {
    const defaultKidProcess = {
      active: false,
      id: 'kid-profile',
      title: 'Kids Profiles',
      steps: [
        {
          id: 'KidName',
          name: 'Name',
        },
        {
          id: 'KidPrefferedName',
          name: 'Preffered Name',
        },
        {
          id: 'KidInterests',
          name: 'Interests',
        },
        {
          id: 'KidColor',
          name: 'Color',
        },
        {
          id: 'KidSchool',
          name: 'School',
        },
        {
          id: 'KidSpecialInstruction',
          name: 'Special Instruction',
        },
      ],
    };

    const defaultKidsProfileSteps = [
      this.kidProfileName,
      this.kidProfilePreferredName,
      this.kidProfileInterests,
      this.kidProfileColor,
      this.kidProfileSchool,
      this.kidProfileSpecialInstruction,
      this.kidProfileFinishBanner,
    ];
    let title = personaId;
    const persona = Personas.find(personaId);
    if (persona) {
      title = persona.title;
    }
    switch (title) {
      case 'tribe-parent': {
        this.profileSteps = [
          ...this.defaultProfileSteps,
          this.profileName,
          this.profileMaritalStatus,
          this.profileAddress,
          () => this.profileAbout({ optional: true }),
          this.profileInterests,
          this.profileCoreValues,
          this.profilePhoneNo,
          () => this.profileDisplayImage({ optional: true }),
        ];

        this.kidsProfileSteps = defaultKidsProfileSteps;
        this.setState({
          progress: [
            {
              active: true,
              id: 'profile',
              title: 'User Profile',
              steps: [
                {
                  id: 'Name',
                  name: 'Name',
                },
                {
                  id: 'MaritalStatus',
                  name: 'Marital Status',
                },
                {
                  id: 'About',
                  name: 'About',
                },
                {
                  id: 'Address',
                  name: 'Address',
                },
                {
                  id: 'Interests',
                  name: 'Interests',
                },
                {
                  id: 'Values',
                  name: 'Values',
                },
                {
                  id: 'PhoneNumber',
                  name: 'Phone Number',
                },
                {
                  id: 'ProfileImage',
                  name: 'Profile Image',
                },
              ],
            },
            defaultKidProcess,
          ],
        });
        break;
      }
      case 'tribe-caregiver': {
        this.profileSteps = [
          ...this.defaultProfileSteps,
          this.profileName,
          this.profileAddress,
          this.profileInterests,
          this.profileCoreValues,
          this.profilePhoneNo,
          () => this.profileDisplayImage({ optional: true }),
        ];

        this.setState({
          progress: [
            {
              active: true,
              id: 'profile',
              title: 'User Profile',
              steps: [
                {
                  id: 'Name',
                  name: 'Name',
                },
                {
                  id: 'Address',
                  name: 'Address',
                },
                {
                  id: 'Interests',
                  name: 'Interests',
                },
                {
                  id: 'Values',
                  name: 'Values',
                },
                {
                  id: 'PhoneNumber',
                  name: 'Phone Number',
                },
                {
                  id: 'ProfileImage',
                  name: 'Profile Image',
                },
              ],
            },
          ],
        });

        break;
      }
      case 'activity-parent': {
        this.profileSteps = [
          ...this.defaultProfileSteps,
          this.profileName,
        ];

        this.setState({
          progress: [
            {
              active: true,
              id: 'profile',
              title: 'User Profile',
              steps: [
                {
                  id: 'Name',
                  name: 'Name',
                },
              ],
            },
          ],
        });
        break;
      }
      case 'activity-caregiver': {
        this.profileSteps = [
          ...this.defaultProfileSteps,
          this.profileName,
          this.profileMaritalStatus,
          this.profileAddress,
          this.profileInterests,
          this.profileCoreValues,
          this.profilePhoneNo,
          () => this.identityVerification({ optional: true }),
          () => this.profileDisplayImage({ optional: true }),
        ];

        this.setState({
          progress: [
            {
              active: true,
              id: 'profile',
              title: 'User Profile',
              steps: [
                {
                  id: 'Name',
                  name: 'Name',
                },
                {
                  id: 'MaritalStatus',
                  name: 'Marital Status',
                },
                {
                  id: 'Address',
                  name: 'Address',
                },
                {
                  id: 'Interests',
                  name: 'Interests',
                },
                {
                  id: 'Values',
                  name: 'Values',
                },
                {
                  id: 'PhoneNumber',
                  name: 'Phone Number',
                },
                {
                  id: 'IdVerification',
                  name: 'ID Verification',
                },
                {
                  id: 'ProfileImage',
                  name: 'Profile Image',
                },
              ],
            },
          ],
        });
        break;
      }
      case 'request-parent': {
        this.profileSteps = [
          ...this.defaultProfileSteps,
          this.profileName,
          this.profileMaritalStatus,
          this.profileAddress,
          this.profileInterests,
          this.profileCoreValues,
          this.profileVaccination,
          this.profilePhoneNo,
          () => this.profileDisplayImage({ optional: true }),
        ];
        this.kidsProfileSteps = defaultKidsProfileSteps;

        this.setState({
          progress: [
            {
              active: true,
              id: 'profile',
              title: 'User Profile',
              steps: [
                {
                  id: 'Name',
                  name: 'Name',
                },
                {
                  id: 'MaritalStatus',
                  name: 'Marital Status',
                },
                {
                  id: 'Address',
                  name: 'Address',
                },
                {
                  id: 'Interests',
                  name: 'Interests',
                },
                {
                  id: 'Values',
                  name: 'Values',
                },
                {
                  id: 'Vaccination',
                  name: 'Vaccination',
                },
                {
                  id: 'PhoneNumber',
                  name: 'Phone Number',
                },
                {
                  id: 'ProfileImage',
                  name: 'Profile Image',
                },
              ],
            },
            defaultKidProcess,
          ],
        });
        break;
      }
      case 'request-caregiver': {
        this.profileSteps = [
          this.profilePersona,
          this.profilePersonaOption,
          this.profileIndex,
          this.profileName,
          this.profileMaritalStatus,
          this.profileAddress,
          this.profileInterests,
          this.profileCoreValues,
          this.profileVaccination,
          this.identityVerification,
          this.profilePhoneNo,
          () => this.profileDisplayImage({ optional: true }),
        ];

        this.kidsProfileSteps = defaultKidsProfileSteps;
        this.setState({
          progress: [
            {
              active: true,
              id: 'profile',
              title: 'User Profile',
              steps: [
                {
                  id: 'Name',
                  name: 'Name',
                },
                {
                  id: 'MaritalStatus',
                  name: 'Marital Status',
                },
                {
                  id: 'Address',
                  name: 'Address',
                },
                {
                  id: 'Interests',
                  name: 'Interests',
                },
                {
                  id: 'Values',
                  name: 'Values',
                },
                {
                  id: 'Vaccination',
                  name: 'Vaccination',
                },
                {
                  id: 'IdVerification',
                  name: 'ID Verification',
                },
                {
                  id: 'PhoneNumber',
                  name: 'Phone Number',
                },
                {
                  id: 'ProfileImage',
                  name: 'Profile Image',
                },
              ],
            },
            defaultKidProcess,
          ],
        });
        break;
      }
      case 'invited': {
        this.profileSteps = [
          ...this.defaultProfileSteps,
          this.profileName,
          this.profileAddress,
          this.profileInterests,
          this.profileCoreValues,
          this.profilePhoneNo,
          () => this.profileDisplayImage({ optional: true }),
        ];

        this.setState({
          progress: [
            {
              active: true,
              id: 'profile',
              title: 'User Profile',
              steps: [
                {
                  id: 'Name',
                  name: 'Name',
                },
                {
                  id: 'Address',
                  name: 'Address',
                },
                {
                  id: 'Interests',
                  name: 'Interests',
                },
                {
                  id: 'Values',
                  name: 'Values',
                },
                {
                  id: 'PhoneNumber',
                  name: 'Phone Number',
                },
                {
                  id: 'ProfileImage',
                  name: 'Profile Image',
                },
              ],
            },
          ],
        });
        break;
      }
      default: break;
    }
  }

  profilePersona() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { persona } = editProfile;
    const getPersonaLabel = (persona) => {
      switch (persona) {
        case 'tribe-parent': return 'I need to find my tribe';
        case 'tribe-caregiver': return 'I need to invite my tribe';
        case 'activity-parent': return 'I’m looking for activities';
        case 'activity-caregiver': return 'I want to host an activity';
        case 'request-parent': return 'I want to post a request';
        case 'request-caregiver': return 'I want to pickup a request';
        default: return '';
      }
    };

    let fields = [];
    if (isEmpty(persona.primary)) {
      fields = [
        <div id="profilePersona">
          <div className="list">
            <InputPicker
              direction="down"
              type="radio"
              multichoice={false}
              values={[editProfile.persona.primary]}
              options={Personas.data.map((persona, i) => (
                {
                  label: getPersonaLabel(persona.title),
                  value: persona.id,
                  hideLabelBorder: true,
                }
              ))}
              onChange={(value) => {
                // alert('change primary persona');
                props.clearFormErrors();
                this.loadOnboardingProcess(value[0]);
                props.updateFormState({
                  persona: {
                    ...editProfile.persona,
                    primary: value[0],
                    secondary: [],
                    options: {
                      primary: '',
                      secondary: [],
                    },
                  },
                  personaError: false,
                });
              }}
            />

          </div>
        </div>,
      ];
    } else {
      fields = [
        <div id="profilePersona">
          <InputPicker
            direction="down"
            id="primaryPersonaPreview"
            type="radio"
            values="primary"
            options={[{
              label: (
                <div className="primary-persona">
                  <span>{getPersonaLabel(Personas.find(persona.primary).title)}</span>
                  <span
                    className="icon-edit-2-bold delete-icon"
                    onClick={() => {
                      this.profileSteps = [
                        this.profilePersona,
                        this.profileIndex,
                      ];
                      this.setState({
                        progress: [],
                      });
                      props.updateFormState({
                        persona: {
                          primary: '',
                          secondary: [],
                          options: {
                            primary: '',
                            secondary: [],
                          },
                        },
                        // firstNameError: !isEmpty(value) ? false : editProfile.firstNameError,
                      });
                    }}
                  />
                </div>
              ),
              value: 'primary',
              hideLabelBorder: true,
            }]}
          />

          <div className="secondary-personas">
            <span
              className="helper-text"
            >Select other reasons
            </span>
            <InputPicker
              direction="down"
              type="checkbox"
              values={editProfile.persona.secondary}

              options={Personas.data.filter((p) => p.id !== editProfile.persona.primary).map((persona, i) => (
                {
                  label: getPersonaLabel(persona.title),
                  value: persona.id,
                  hideLabelBorder: true,
                }
              ))}
              onChange={(value) => {
                props.updateFormState({
                  persona: {
                    ...persona,
                    secondary: value,
                    options: {
                      primary: '',
                      secondary: [],
                    },
                  },
                  // firstNameError: !isEmpty(value) ? false : editProfile.firstNameError,
                });
              }}
            />
          </div>
        </div>,
      ];
    }

    return {
      hideProgress: true,
      optional: false,
      note: {
        message: <>
          <p>
            <b>Tribe: </b>
            Families or communities of people that you share similar interests with.
          </p>
          <br />
          <p>
            <b>Activities: </b>
            Engaging events hosted by other parents, educators, volunteers, and children.
          </p>
          <br />
          <p>
            <b>Requests: </b>
            Common care tasks such as pick up/drop offs, sitting, tutoring and homework help.
          </p>

        </>,
      },
      question: <>
        <span>First, tell us why you joined Abulé</span>
        {editProfile.personaError && <div className="Error">{editProfile.personaError}</div>}
      </>,
      fields,
      validation: (updateData = true) => this.submitForm({
        persona: editProfile.persona,
      }, { updateData: true }),
    };
  }

  profilePersonaOption() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { persona } = editProfile;
    const getPersonaLabel = (type) => {
      switch (type) {
        case 'sitting': return 'I can help with sitting';
        case 'tutoring': return 'I can help with tutoring';
        case 'homework': return 'I can help with homework';
        case 'driving': return 'I can help with pick-up/drop-offs';
        default: return '';
      }
    };

    let fields = [];
    if (isEmpty(persona.options.primary)) {
      fields = [
        <div id="profilePersona">
          <div className="list">
            <InputPicker
              direction="down"
              type="radio"
              multichoice={false}
              values={[editProfile.persona.options.primary]}
              options={Personas.find(persona.primary).options.map((type) => (
                {
                  label: getPersonaLabel(type),
                  value: type,
                  hideLabelBorder: true,
                }
              ))}
              onChange={(value) => {
                props.updateFormState({
                  persona: {
                    ...persona,
                    options: {
                      primary: value[0],
                      secondary: [],
                    },
                  },
                  personaOptionError: false,
                });
              }}
            />

          </div>
        </div>,
      ];
    } else {
      fields = [
        <div id="profilePersona">
          <InputPicker
            direction="down"
            id="primaryPersonaPreview"
            type="radio"
            values="primary"
            options={[{
              label: (
                <div className="primary-persona">
                  <span>{getPersonaLabel(persona.options.primary)}</span>
                  <span
                    className="icon-edit-2-bold delete-icon"
                    onClick={() => {
                      props.updateFormState({
                        persona: {
                          ...editProfile.persona,
                          options: {
                            primary: '',
                            secondary: [],
                          },
                        },
                        // firstNameError: !isEmpty(value) ? false : editProfile.firstNameError,
                      });
                    }}
                  />
                </div>
              ),
              value: 'primary',
              hideLabelBorder: true,
            }]}
          />

          <div className="secondary-personas">
            <span
              className="helper-text"
            >what else can you help with
            </span>
            <InputPicker
              direction="down"
              type="checkbox"
              values={persona.options.secondary}
              /* onLoad={(e) => {
                if (e) {
                  this.fields.color = e.pickers;
                }
              }} */
              options={Personas.find(persona.primary).options.filter((p) => p !== persona.options.primary).map((type, i) => (
                {
                  label: getPersonaLabel(type),
                  value: type,
                  hideLabelBorder: true,
                }
              ))}
              onChange={(value) => {
                props.updateFormState({
                  persona: {
                    ...persona,
                    options: {
                      ...persona.options,
                      secondary: value,
                    },
                  },
                  // firstNameError: !isEmpty(value) ? false : editProfile.firstNameError,
                });
              }}
            />
          </div>
        </div>,
      ];
    }

    return {
      hideProgress: true,
      question: <>
        <span>What type of request would like to help with?</span>
        {editProfile.personaOptionError && <div className="Error">{editProfile.personaOptionError}</div>}
      </>,
      fields,
      validation: (updateData = true) => this.submitForm({
        personaOption: editProfile.persona,
      }, { updateData: true }),
    };
  }

  profileIndex() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { caregiverForm } = state;
    return {
      hideProgress: true,
      question: 'Great!, here\'s what you\'ll need to fill out',
      note: {
        message: <>
          <p>
            The onboarding process is relatively easy and should take no more than 5 minutes.
            To be well prepared, you will need to:
          </p>
          <br />
          <ul style={{
            margin: 0,
            paddingLeft: '1.7em',
          }}
          >
            <li>Have your Driver’s license, passport or government issued ID handy.</li>
            <li>Provide your proof of vaccination if you intend to certify that you’ve been fully vaccinated.</li>
          </ul>

          <br />
          Note: The background check process may take up to 24 hours or more.
        </>,
      },
      fields: [
        <div id="profileIndex">
          <div className="list">
            {state.progress.map((item, i) => (
              <div className="item">
                <div className="">
                  <span className="number">{/* {i + 1} */}</span>
                  <div className="straight-line" />
                </div>
                <span> {item.title} </span>
              </div>
            ))}
          </div>
        </div>,
      ],
    };
  }

  profileName(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'Name',
      privateInfos: true,
      question: 'Tell us your name and type a username',
      optional: !!options.optional,
      note: {
        message: <>
          Choose a user name so that others can tag you in comments on the platform.
        </>,
      },
      fields: [
        <InputField
          type="text"
          label={(
            <>
              First Name <span className="error"> {editProfile.firstNameError ? `: ${editProfile.firstNameError}` : ''}</span>
            </>
          )}
          readOnly={isEditProfilePage}
          value={ucFirst(editProfile.firstName)}
          // className={`${editProfile.firstNameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.firstName = e.inputBox;
            }
          }}
          onChange={(value) => {
            if (!isEditProfilePage) {
              props.updateFormState({
                firstName: value,
                firstNameError: !isEmpty(value) ? false : editProfile.firstNameError,
              });
            }
          }}
        />,
        <InputField
          type="text"
          label={(
            <>
              Last Name <span className="error"> {editProfile.lastNameError ? `: ${editProfile.lastNameError}` : ''}</span>
            </>
          )}
          readOnly={isEditProfilePage}
          value={ucFirst(editProfile.lastName)}
          // className={`${editProfile.lastNameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.lastName = e.inputBox;
            }
          }}
          onChange={(value) => {
            if (!isEditProfilePage) {
              props.updateFormState({
                lastName: value,
                lastNameError: !isEmpty(value) ? false : editProfile.lastNameError,
              });
            }
          }}
        />,
        <InputField
          type="text"
          label={(
            <>
              Username <span className={editProfile.usernameError ? 'error' : 'success'}>  {editProfile.usernameMsg ? `: ${editProfile.usernameMsg}` : ''}</span>
            </>
          )}
          readOnly={isEditProfilePage}
          maxLength={15}
          value={editProfile.username || ''}
          globalClassName="username"
          // className={`${editProfile.usernameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.username = e.inputBox;
            }
          }}
          onChange={(value) => {
            if (!isEditProfilePage) {
              const username = this.parseUsername(value);
              props.updateFormState({
                username,
                usernameError: !isEmpty(username) ? false : editProfile.usernameError,
              });
              this.validateUsername(username);
            }
          }}
        />,
      ],
      validation: (updateData = true) => this.submitForm({
        firstName: editProfile.firstName,
        lastName: editProfile.lastName,
        username: editProfile.username,
      }, {
        updateData: true,
      }),
    };
  }

  profileUsername() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      question: 'Choose a username',
      fields: [
        <InputField
          type="text"
          label={(
            <>
              Username <span className={editProfile.usernameError ? 'error' : 'success'}>  {editProfile.usernameMsg ? `: ${editProfile.usernameMsg}` : ''}</span>
            </>
          )}
          readOnly={isEditProfilePage}
          maxLength={15}
          value={editProfile.username || ''}
          globalClassName="username"
          // className={`${editProfile.usernameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.username = e.inputBox;
            }
          }}
          onChange={(value) => {
            if (!isEditProfilePage) {
              const username = this.parseUsername(value);
              props.updateFormState({
                username,
                usernameError: !isEmpty(username) ? false : editProfile.usernameError,
              });
              this.validateUsername(username);
            }
          }}
        />,
      ],
      validation: (updateData = true) => this.submitForm({
        username: editProfile.username,
      }, updateData),
    };
  }

  profileAbout(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'About',
      optional: !!options.optional,
      question: 'Tell us about you',
      fields: [
        <InputField
          type="textarea"
          // placeholder="Tell us about yourself, your occupation, or anything else that makes you unique. It helps us build a community of trust."
          label={(
            <p className="">
              about
              <span className="error"> {editProfile.aboutError ? `: ${editProfile.aboutError}` : ''}</span>
            </p>
          )}
          value={ucFirst(editProfile.about)}
          globalClassName="about"
          // className={`${editProfile.aboutError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.about = e.inputBox;
            }
          }}
          onChange={(value) => {
            props.updateFormState({
              about: value,
              aboutError: false,
              // aboutErrorServer: isEmail(value) ? false : editProfile.aboutErrorServer,
            });
          }}
        />,
      ],
      validation: (updateData = true) => this.submitForm({
        about: editProfile.about,
      }, {
        updateData: true,
        enforceValue: !options.optional,
      }),
    };
  }

  profilePhoneNo(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { sessionUser } = settings;
    const phoneVerified = !isEmpty(sessionUser.phoneNumber) && sessionUser.phoneNumber === editProfile.phoneNumber;

    return {
      id: 'PhoneNumber',
      privateInfos: true,
      disableNext: !phoneVerified,
      optional: !!options.optional,
      question: 'How can we reach you ?',
      fields: [
        <>
          <InputField
            type="tel"
            label={(
              <>
                Phone Number  <span className="error"> {editProfile.phoneNumberError ? `: ${editProfile.phoneNumberError}` : ''}</span>
              </>
            )}
            maxLength={14}
            readOnly={isEditProfilePage}
            // placeholder="(***) ***-****"
            value={formatPhoneNo(editProfile.phoneNumber)}
            // className={`${editProfile.phoneNumberError !== false ? ' error' : ''}`}
            onLoad={(e) => {
              if (e) {
                this.fields.phoneNumber = e.inputBox;
              }
            }}
            onChange={(value) => {
              if (!isEditProfilePage) {
                props.updateFormState({
                  phoneNumber: parsePhoneNo(value),
                  phoneNumberError: value.length < 8 || value.length > 13 ? editProfile.phoneNumberError : false,
                });
              }
            }}
          />

          {phoneVerified
            ? (
              <div className="success-message">
                <div className="success-batch">
                  <span className="icon-badge icon" />
                  <span>Verified</span>
                </div>

                Your phone number has been verified
              </div>
            )
            : (
              <buttton
                type="button"
                className="btn btn-1"
                onClick={async () => {
                  const passwordCheck = await this.submitForm({ phoneNumber: editProfile.phoneNumber }, { testData: true });
                  console.log('the password check', passwordCheck);
                  if (passwordCheck) {
                    try {
                      this.setState({
                        verifyingPhoneNo: true,
                      });
                      await props.fetchRequest({
                        url: `${process.env.REACT_APP_API}/auth/users/phone-verification`,
                        method: 'POST',
                        body: JSON.stringify({
                          phoneNumber: formatPhoneNo(editProfile.phoneNumber),
                        }),
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      });
                      this.setState({
                        verifyingPhoneNo: true,
                        showPhoneVerification: true,
                      });
                      props.setSessionUser({
                        ...sessionUser,
                        // phoneNumber: editProfile.phoneNumber,
                      });
                    } catch (e) {
                      this.setState({
                        verifyingPhoneNo: false,
                      });
                    }
                  }
                }}
              >SEND VERIFICATION CODE
                {state.verifyingPhoneNo ? (
                  <span
                    className="icon-refresh icon spinner"
                    style={{
                      marginLeft: '0.6em',
                    }}
                  />
                ) : ''}
              </buttton>
            )}
        </>,
      ],
      validation: (updateData = true) => this.submitForm({
        phoneNumber: editProfile.phoneNumber,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),
    };
  }

  verifyPhone() {
    const { props } = this;
    const { settings, editProfile } = props;
    const { sessionUser } = settings;
    return (
      <VerifyPhoneNo
        fetchRequest={props.fetchRequest}
        number={props.editProfile.phoneNumber}
        onSuccess={() => {
          alert('out close');
          props.setSessionUser({
            ...sessionUser,
            phoneNumber: props.editProfile.phoneNumber,
          });
        }}
        onClose={() => {
          alert('in close');
          this.setState({
            verifyingPhoneNo: false,
            showPhoneVerification: false,
            verifyingPhoneNo: false,
          });
        }}
      />
    );
  }

  profileDOB(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const maxDOB = new Date();

    return {
      privateInfos: true,
      optional: !!options.optional,
      question: 'When were you born ?',
      fields: [
        <div className="input-field">
          <p className="label">
            Date of Birth <span className="error"> {editProfile.dobError ? `: ${editProfile.dobError}` : ''}</span>
          </p>
          <InputDatePicker
            defaultDate={new Date(1990, 0, 1)}
            placeholder="mm/dd/yyyy"
            maxDate={maxDOB} // age can't be more than 18
            readOnly={isEditProfilePage}
            values={editProfile.dob ? [this.parseDob(editProfile.dob)] : []}
            className="input"
            onLoad={(e) => {
              if (e) {
                this.fields.dob = e.inputDate;
              }
            }}
            onChange={(dob) => {
              props.updateFormState({
                dob: dob ? dob[0] : dob,
                dobError: false,
              });
            }}
          />
        </div>,
      ],
      validation: (updateData = true) => {
        let { dob } = editProfile;

        if (dob) {
          if (dob.year) {
            dob = new Date(`${dob.year}/${dob.month}/${dob.day}`);
          } else {
            dob = new Date(dob);
          }
        }
        return this.submitForm({ dob }, {
          updateData,
          enforceValue: !options.optional,
        });
      },

    };
  }

  profileGender(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const maxDOB = new Date();

    return {
      privateInfos: true,
      optional: !!options.optional,
      question: 'What\'s your gender ?',
      fields: [
        <div className="input-field">
          <p className="label">
            Gender <span className="error"> {editProfile.genderError ? `: ${editProfile.genderError}` : ''}</span>
          </p>

          <InputPicker
            multichoice={false}
            readOnly={isEditProfilePage}
            values={[editProfile.gender]}
            // className={` ${editProfile.genderError !== false ? ' error' : ''}`}
            onLoad={(e) => {
              if (e) {
                this.fields.gender = e.pickers;
              }
            }}
            options={Utils.getValue('Genders').map((gender) => ({
              label: capitalize(gender),
              value: gender,
            }))}
            onChange={(value) => {
              props.updateFormState({
                gender: value[0],
                genderError: false,
              });
            }}
          />
        </div>,
      ],
      validation: (updateData = true) => this.submitForm({
        gender: editProfile.gender,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),

    };
  }

  profileMaritalStatus(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const maxDOB = new Date();

    return {
      id: 'MaritalStatus',
      privateInfos: true,
      optional: !!options.optional,
      question: 'What\'s your marital status ?',
      fields: [
        <div className="input-field">
          <p className="label">
            Marital Status <span className="error"> {editProfile.maritalStatusError ? `: ${editProfile.maritalStatusError}` : ''}</span>
          </p>

          <InputPicker
            multichoice={false}
            readOnly={isEditProfilePage}
            values={[editProfile.maritalStatus]}
            // className={` ${editProfile.maritalStatusError !== false ? ' error' : ''}`}
            onLoad={(e) => {
              if (e) {
                this.fields.maritalStatus = e.pickers;
              }
            }}
            options={Utils.getValue('MaritalStatus').map((maritalStatus) => ({
              label: capitalize(maritalStatus),
              value: maritalStatus,
            }))}
            onChange={(value) => {
              props.updateFormState({
                maritalStatus: value[0],
                maritalStatusError: false,
              });
            }}
          />
        </div>,
      ],
      validation: (updateData = true) => this.submitForm({
        maritalStatus: editProfile.maritalStatus,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),

    };
  }

  profileAddress(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'Address',
      privateInfos: true,
      optional: !!options.optional,
      question: 'Where do you live ?',
      fields: [
        <InputLocation
          type="text"
          label={(
            <>
              Street Address  <span className="error"> {editProfile.streetAddressError ? `: ${editProfile.streetAddressError}` : ''}</span>
            </>
          )}
          readOnly={isEditProfilePage}
          value={ucFirst(editProfile.streetAddress)}
          // className={`${editProfile.streetAddressError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.streetAddress = e.inputBox;
            }
          }}
          onChange={(value) => {
            props.updateFormState({
              addressId: '',
              streetAddress: value,
            });
          }}
          onSelect={(value) => {
            if (!isEditProfilePage) {
              props.updateFormState({
                addressId: value.id,
                streetAddress: value.formatted_address,
                streetAddressError: false,
              });
            }
          }}
        />,
        <InputField
          type="text"
          label="Apt, Building, Suite, etc. (optional)"
          value={ucFirst(editProfile.apartment)}
          readOnly={isEditProfilePage}
          onChange={(value) => {
            props.updateFormState({
              apartment: value,
            });
          }}
        />,
      ],
      note: {
        message: '*Only your city and state will be shown to others.',
      },
      validation: (updateData = true) => this.submitForm({
        addressId: editProfile.addressId,
        apartment: editProfile.apartment,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),
    };
  }

  profileInterests(options = {}) {
    const { props, state } = this;
    const {
      settings, editProfile,
      isEditProfilePage,
    } = props;
    const UserInterests = Utils.getValue('UserInterests');

    return {
      id: 'Interests',
      optional: !!options.optional,
      question: (
        <>
          <span>Interests</span>
          {editProfile.interestsError && <span className={editProfile.interestsErrorBad ? 'Error' : 'help-info'}>{editProfile.interestsError}</span>}
        </>
      ),
      fields: Object.keys(UserInterests).map((group, i) => (
        <InputPicker
          label={group}
          direction="right"
          rowCount={2}
          values={editProfile.interests}
          options={UserInterests[group].map((interest) => ({
            value: interest,
            label: capitalize(interest),
          }))}
          onLoad={(e) => {
            if (e && i === 0) {
              this.fields.interests = e.pickers;
            }
          }}
          onChange={(values) => {
            const MaxUserInterests = Utils.getValue('MaxUserInterests');
            const rem = MaxUserInterests - values.length;
            if (rem > -1) {
              props.updateFormState({
                interests: values,
                interestsError: `${rem} option${rem > 1 ? 's' : ''} left`,
                interestsErrorBad: false,
              });
            }
          }}
        />
      )),
      validation: (updateData = true) => this.submitForm({
        interests: editProfile.interests,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),
    };
  }

  profileCoreValues(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const CoreValues = Utils.getValue('CoreValues');

    return {
      id: 'Values',
      optional: !!options.optional,
      question: (
        <>
          <span>Values</span>
          {editProfile.coreValuesError && <span className={editProfile.coreValuesErrorBad ? 'Error' : 'help-info'}>{editProfile.coreValuesError}</span>}
        </>
      ),
      fields: Object.keys(CoreValues).map((group, i) => (
        <InputPicker
          label={group}
          direction="right"
          rowCount={2}
          values={editProfile.coreValues}
          options={CoreValues[group].map((interest) => ({
            value: interest,
            label: capitalize(interest),
          }))}
          onLoad={(e) => {
            if (e && i === 0) {
              this.fields.coreValues = e.pickers;
            }
          }}
          onChange={(values) => {
            const MaxCoreValues = Utils.getValue('MaxCoreValues');
            const rem = MaxCoreValues - values.length;
            if (rem > -1) {
              props.updateFormState({
                coreValues: values,
                coreValuesError: `${rem} option${rem > 1 ? 's' : ''} left`,
                coreValuesErrorBad: false,
              });
            }
          }}
        />
      )),
      validation: (updateData = true) => this.submitForm({
        coreValues: editProfile.coreValues,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),
    };
  }

  profileSupport(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { focusedSupport } = state;
    let supportData = null;
    for (const support of editProfile.supports) {
      if (support.type === focusedSupport) {
        supportData = support;
        break;
      }
    }

    console.log('suppoprt support', { supportData });

    return {
      question: 'Are you available to pick up help requests ?',
      optional: !!options.optional,
      fields: [
        <div className="supports">
          <InputSelect
            value={focusedSupport}
            options={['driving', 'sitting', 'tutoring'].map((type) => ({
              label: type.toUpperCase(),
              value: type,
              // disable: support.days[day].length === 0,
            }))}
            onChange={(value) => {
              this.setState({
                focusedSupport: value,
              });
            }}
          />
          <UpdateSupportType
            support={supportData}
            onChange={(supportt) => {
              console.log('final', { supportt });
              // alert('supportt');
              props.setSupport(supportt);
            }}
          />
        </div>,
      ],
      validation: (updateData = true) => this.submitForm({
        supports: editProfile.supports,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),
    };
  }

  profileDisplayImage(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { profileDisplayDragOver } = state;
    let previewHeight = $('#displayImage .drop-box .preview').outerHeight();
    const onUploadDragLeave = () => {
      this.setState({
        profileDisplayDragOver: false,
      });
    };

    // eslint-disable-next-line class-methods-use-this
    const onUploadDragOver = (event) => {
      event.stopPropagation();
      event.preventDefault();

      this.setState({
        profileDisplayDragOver: true,
      });
    };

    const setImage = async (value) => {
      this.props.updateFormState({
        photoAssemblyId: '',
        photoUploading: true,
        imageUrl: URL.createObjectURL(value),
        imageError: false,
      });
      this.setState({
        disablePrevious: true,
        disableNext: true,
      });
      previewHeight = $('#displayImage .drop-box .preview').outerHeight();

      // upload the image
      let mediaAssemblyId = null;
      let mediaError = null;

      try {
        const { assemblyId, assembly } = await props.processFiles('profile-image', [value]);
        mediaAssemblyId = assemblyId;
      } catch (e) {
        mediaError = true;
        console.log('THERE WAS AN UNFORTUNATE ERROR WHILE PROCESSINIG FILES', e);
      }

      this.props.updateFormState({
        photoAssemblyId: mediaAssemblyId,
        photoUploading: false,
        imageError: mediaError ? "couldn't process file" : false,
      });
      this.setState({
        disablePrevious: false,
        disableNext: false,
      });
    };
    const imagePickHandler = async (event) => {
      const [value] = event.target.files;
      if (value) {
        setImage(value);
      }
    };
    // eslint-disable-next-line class-methods-use-this
    const onUploadDrop = (event) => {
      event.preventDefault();
      onUploadDragLeave(event);

      // Structure an event like object for easy file accessing
      const { files } = event.dataTransfer;
      console.log('FILES DROPPED files IS : ', files);

      const [value] = files;
      if (value) {
        setImage(value);
      }
      // this.uploadFiles(ev);
    };

    const selectProfileImage = () => {
      if (this.profileImagePicker) {
        this.profileImagePicker.click();
      }
    };
    return {
      id: 'ProfileImage',
      optional: !!options.optional,
      question: (
        <>
          <span>Upload profile image</span>
          <span className="help-info mobile-hide">you can drag and drop into the grey area</span>
        </>
      ),
      fields: [
        <div id="displayImage">
          {editProfile.imageError && <div className="Error">{editProfile.imageError}</div>}
          <div className="drop-box">

            {!profileDisplayDragOver && !editProfile.imageUrl && !editProfile.photoUploading && (
              <div className="background">
                <span className="icon-add icon" />
                <span className="text">Drag ‘n’ drop a file or Click to select a file</span>
                <input
                  type="file"
                  ref={(el) => {
                    if (el && !this.profileImagePicker) {
                      this.profileImagePicker = el;
                    }
                  }}
                  className="picker"
                  accept="image/*"
                  onChange={imagePickHandler}
                  onClick={(e) => { e.stopPropagation(); }}
                  alt=""
                />

              </div>
            )}

            <div className="preview">
              <div className="image avi">
                {editProfile.imageUrl && (
                  <img
                    alt=""
                    src={editProfile.imageUrl}
                    onLoad={(e) => {
                      const width = $('#displayImage .drop-box .preview').outerWidth();
                      const height = $('#displayImage .drop-box .preview').outerHeight();
                      const length = width < height ? width : height;
                      $(e.target).css({
                        // width: `${length}px`,
                        // height: `${length}px`,
                      });
                    }}
                    style={{
                      // height: `${previewHeight}px`,
                    }}
                  />
                )}
              </div>
              {editProfile.photoUploading && (
                <div className="uploading">
                  <span className="icon icon-refresh spinner" />
                </div>
              )}
            </div>

            {profileDisplayDragOver && (
              <div className="drop-content">
                <span className="icon fa fa-cloud-download" />
                <p>{/* Drag & */} Put your pretty face here</p>
              </div>
            )}
            <div
              className="drop-container"
              onDrop={onUploadDrop}
              onDragOver={onUploadDragOver}
              onDragLeave={onUploadDragLeave}
              onClick={selectProfileImage}
            />
          </div>
        </div>,
      ],
      validation: (updateData = true) => this.submitForm({
        photoAssemblyId: editProfile.photoAssemblyId,
      }, {
        updateData,
        enforceValue: !options.optional,
      }),
    };
  }

  profileVaccination(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { sessionUser } = settings;
    const { persona } = sessionUser;
    const { referralList } = state;
    const Vaccination = {

    };

    const isUserVaccinated = (choice) => ["I'm fully vaccinated", "I'm partially vaccinated"].includes(choice);

    let fields = [];
    const { userVaccinationAnswer } = state;

    if (isEmpty(userVaccinationAnswer)) {
      fields = [
        <div id="profilePersona">
          <div className="list">
            <InputPicker
              direction="down"
              type="radio"
              multichoice={false}
              values={[userVaccinationAnswer]}
              options={[
                {
                  label: "I'm fully vaccinated",
                  hideLabelBorder: true,

                },
                {
                  label: "I'm partially vaccinated",
                  hideLabelBorder: true,

                },
                {
                  label: "I'm not vaccinated",
                  hideLabelBorder: true,

                },
                {
                  label: 'I choose not to disclose',
                  hideLabelBorder: true,

                },
              ]}
              onChange={(value) => {
                // alert('change primary persona');
                this.setState({
                  userVaccinationAnswer: value[0],
                  userToSubmitVaccineProof: null,
                  userVaccinationAnswerError: false,
                  userToSubmitVaccineProofError: false,
                });
              }}
            />

          </div>
        </div>,
      ];
    } else {
      fields = [
        <div id="profilePersona">
          <InputPicker
            direction="down"
            id="primaryPersonaPreview"
            type="radio"
            values="primary"
            options={[{
              label: (
                <div className="primary-persona">
                  <span>{userVaccinationAnswer}</span>
                  <span
                    className="icon-edit-2-bold delete-icon"
                    onClick={() => {
                      this.setState({
                        userVaccinationAnswer: '',
                      });
                    }}
                  />
                </div>
              ),
              value: 'primary',
              hideLabelBorder: true,
            }]}
          />
          {isUserVaccinated(userVaccinationAnswer) && (
            <div className="secondary-personas">
              {/* <span
                className="helper-text"
              >Select other reasons
              </span> */}
              {state.userToSubmitVaccineProofError && <div className="Error">{state.userToSubmitVaccineProofError}</div>}
              <InputPicker
                direction="down"
                type="radio"
                multichoice={false}
                values={[state.userToSubmitVaccineProof]}
                options={[
                  {
                    label: 'Upload proof of vaccination',
                    value: 'yes',
                    hideLabelBorder: true,
                  },
                  {
                    label: 'I’ll upload it later',
                    value: 'no',
                    hideLabelBorder: true,
                  },
                ]}
                onChange={([value]) => {
                  this.setState({
                    userToSubmitVaccineProof: value,
                    userToSubmitVaccineProofError: false,
                  });
                }}
              />
            </div>
          )}
        </div>,
      ];
    }

    return {
      id: 'Vaccination',
      question: <>
        <span>Do you wish to disclose your COVID-19 vaccination status?</span>
        {state.userVaccinationAnswerError && <div className="Error">{state.userVaccinationAnswerError}</div>}
      </>,
      fields: [
        <div>Disclosing your vaccination status is optional. However, it helps keep our community safe and healthy.</div>,
        ...fields,
      ],
      validation: async () => {
        // alert('change primary persona');
        if (isEmpty(userVaccinationAnswer)) {
          this.setState({
            userVaccinationAnswerError: 'you need to pick atleast 1',
          });
          return false;
        } if (isUserVaccinated(userVaccinationAnswer) && state.userToSubmitVaccineProof === null) {
          this.setState({
            userToSubmitVaccineProofError: 'you need to pick atleast 1',
          });
          return false;
        }
        return true;
      },
    };
  }

  identityVerification(options = {}) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { sessionUser } = settings;
    const { referralList } = state;

    return {
      id: 'IdVerification',
      optional: !!options.optional,
      question: <>
        <span>ID Verification{state.userToSubmitVaccineProof === 'yes' ? ' & vaccine' : ''}</span>
        {editProfile.idVerifiedError && <div className="Error">{editProfile.idVerifiedError}</div>}
      </>,
      fields: [
        <p>We require this for all care givers </p>,
        <buttton
          type="button"
          className="btn btn-1"
          onClick={() => { start(); }}

        >VERIFY ID
          {state.verifyingPhoneNo ? (
            <span
              className="icon-refresh icon spinner"
              style={{
                marginLeft: '0.6em',
              }}
            />
          ) : ''}
        </buttton>,
        <VerifyButton
          hidden
          apiKey="KX6Mfgu0cg8aOmj3QydRCLxh5Tvv8rCzP9cQ8rqpBiILL3dpBr0TaKVDto34ckv5"
          onSubmitted={(identityAccessKey) => {
            popAlert({
              title: 'Id submitted successfully',
              description: `user identityAccessKey is ${identityAccessKey}`,
            });
            console.log('id verification submitted');
          }}
          onFinish={(identityAccessKey) => {
            popAlert({
              title: 'Id finished successfully',
              description: `user identityAccessKey is ${identityAccessKey}`,
            });
            console.log('id verification finished');
          }}
          onError={(errorCode) => { }}
          onStart={() => {
            console.log('id verification starting');
          }}
        />],
      validation: async () =>
        /*  try {
            await props.fetchRequest({
              url: `${process.env.REACT_APP_API}/send-invitation-email`,
              method: 'POST',
              body: JSON.stringify({
                email: referralList,
                finishedSetUp: true,
                ,
              headers: {
                'Content-Type': 'application/json',

              ;

            props.setSessionUser({
              ...sessionUser,
              finishedSetUp: true,
              ;
            catch (e) {} */
        ue
      ,

    };
  }

  backgroundCheck() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { sessionUser } = settings;
    const { referralList } = state;

    return {
      id: '',
      question: 'Background Check',
      fields: [
        <div className="input-field referral-link">
          <p style={{
            fontStyle: 'italic',
            fontWeight: 100,
            fontSize: '1.3em',

          }}
          >We will follow up with you on this
          </p>
        </div>,
      ],
      validation: async () =>
        /*  try {
            await props.fetchRequest({
              url: `${process.env.REACT_APP_API}/send-invitation-email`,
              method: 'POST',
              body: JSON.stringify({
                email: referralList,
                finishedSetUp: true,
                ,
              headers: {
                'Content-Type': 'application/json',

              ;
            props.setSessionUser({
              ...sessionUser,
              finishedSetUp: true,
              ;
            catch (e) {} */
        ue
      ,

    };
  }

  profileWelcomeBanner(style) {
    const { state } = this;
    return (
      <div className="welcome-note" style={style}>

        <img src="/img/connect_with_people.png" alt="" />
        <div className="message">
          <p>
            <span className="timberline-font"> Hey There!</span>
            <span> Welcome to Abulé</span>
            {/* <span className="name">Abule</span> */}
          </p>
          <div className="sub">
            {!state.caregiverForm
              ? "We are rebuilding the village it takes to raise our children  just like it was always meant to be. Go ahead and claim your tribe, we've got your back."
              : 'We appreciate you joining us on our mission to inspire, nurture and share knowledge with future generations. Taking care of the village one child at a time.'}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-1 inline"
          onClick={(e) => {
            $('.welcome-note').fadeOut(400, () => {
              this.setState({
                showWelcomeNote: false,
              });
            });
          }}
        >LET'S GO!
        </button>
      </div>
    );
  }

  submitKidChanges(fields) {
    const { state, props } = this;

    // dob: dob[0] ? new Date(`${dob[0].year}/${dob[0].month}/${dob[0].day}`) : null,

    const validate = () => {
      let isValid = true;
      let errors = {};
      const schoolError = {
        schoolName: false,
        schoolState: false,
        schoolCity: false,
        schoolStreetAddress: false,
        schoolZipCode: false,
      };
      const validateSchool = () => {
        let schoolValid = true;
        const {
          schoolName,
          schoolStreetAddress,
        } = state;
        const school = {
          schoolName,
          schoolStreetAddress,
        };

        Object.keys(school).forEach((key) => {
          const value = school[key];
          console.log('the key', key, ' value : ', value);
          console.log('the key is : ', key);
          if (isEmpty(value)) {
            schoolValid = false;
            schoolError[`${key}`] = 'can\'t be empty';
          } else {
            schoolError[`${key}`] = false;
          }
        });

        return schoolValid;
      };

      Object.keys(fields).forEach((key) => {
        let value = fields[key];
        console.log('the key', key, ' value : ', value);
        if ([
          'preferredName',
          'firstName',
          'lastName',
        ].indexOf(key) > -1) {
          console.log('the key is : ', key);
          if (isEmpty(value)) {
            isValid = false;
            errors[`${key}`] = 'can\'t be empty';
          } else {
            errors[`${key}`] = false;
          }
        } else if (['gender', 'color'].indexOf(key) > -1 && (!value || isEmpty(value))) {
          isValid = false;
          errors[`${key}`] = 'you need to pick one';
        } else if (key === 'dob') {
          console.log('values', value);
          value = new Date(value);
          console.log({
            new: new Date(),
            dob: value,
            result: new Date() - value,
            yearGap: milSecToYears(new Date() - value),
          });
          if (!value || !isDate(value)) {
            errors[`${key}`] = 'invalid date';
            isValid = validateSchool();
          } else if (milSecToYears(new Date() - value) >= 5) {
            // dob is greater than or equals to 5years then check schoolId
            // isValid = validateSchool();
          }
        } else if (key === 'interests') {
          const MinKidInterests = Utils.getValue('MinKidInterests');
          const MaxKidInterests = Utils.getValue('MaxKidInterests');
          const valueLength = value.length;
          if (valueLength < MinKidInterests || valueLength > MaxKidInterests) {
            errors[`${key}`] = `Min : ${MinKidInterests}, Max: ${MaxKidInterests}`;
            isValid = false;
          }
        }
      });

      errors = {
        ...errors,
        ...schoolError,
      };

      const errorKeys = Object.keys(errors);
      console.log('validation erros', errorKeys, isValid);
      const Errors = {};
      let firstError = false;
      errorKeys.forEach((key, index) => {
        const value = errors[key];
        if (!firstError && value !== false) {
          const fieldKey = [
            'schoolName',
            'schoolState',
            'schoolCity',
            'schoolStreetAddress',
            'schoolZipCode',
          ].includes(key) ? 'schoolName' : key;
          if (['interests'].includes(key)) {
            $('.form-container .form').scrollTop(0);
          } else {
            this.fields[fieldKey].focus();
            firstError = true;
          }
        }

        Errors[`${key}Error`] = value;
        if (key === 'interests') {
          Errors.interestsErrorBad = true;
        }
      });
      console.log('validation Erros', Errors);
      this.setState(Errors);
      return isValid;
    };

    return validate();
  }

  kidProfileWelcomeBanner(style) {
    return (
      <div className="kid-welcome-note" style={style}>
        <p className="message">
          <h5>Your profile has been successfully created</h5>
          <p> If you have children, do you want to create their profiles now?</p>
        </p>
        <div className="actions">
          <button
            type="button"
            className="btn btn-glass no-shadow bordered action no"
            onClick={(e) => {
              /*  $('.kid-welcome-note').fadeOut(400, () => {
                this.setState({
                  showKidWelcomeNote: false,
                  ;
                ; */
              // set up finished
              this.setState({
                formType: 'referral',
                activeStep: 0,
              }, () => {
                $('.kid-welcome-note').fadeOut(400, () => {
                  this.setState({
                    showKidWelcomeNote: false,
                  });
                });
              });
            }}
          >NO, THANKS
          </button>
          <button
            type="button"
            className="btn btn-1 inline action"
            onClick={(e) => {
              $('.kid-welcome-note').fadeOut(400, () => {
                this.setState({
                  showKidWelcomeNote: false,
                });
              });
            }}
          >YES
          </button>
        </div>
      </div>
    );
  }

  kidProfileFinishBanner(style) {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { sessionUser } = settings;

    return {
      id: '',
      question: 'Kids profiles',
      fields: [
        <div className="kid-finish-note" style={style}>
          <div
            id="kidsProfile"
          >
            {sessionUser.kids.map((kid) => (
              <KidProfile
                {...props}
                kid={kid}
                // showActions={false}
                onEdit={() => {
                  this.setState({
                    ...kid,
                    formType: 'kid-profile',
                    activeStep: 0,
                  });
                  this.toggleProgressTracker(1, true);
                }}
              />
            ))}
            {sessionUser.kids.length < Utils.getValue('MaxProfileKids')
              ? (
                <div
                  className="kid-profile __create"
                  onClick={() => {
                    // props.saveFormChanges();
                    // Router.push('/kid-profile');
                    this.setState({
                      ...this.defaultKidProfile,
                      formType: 'kid-profile',
                      activeStep: 0,
                      showKidFinishNote: false,
                    });
                    this.toggleProgressTracker(1, true);
                  }}
                >
                  <div className="content">
                    <span className="icon-add icon" />
                  </div>
                </div>
              )
              : ''}
          </div>

        </div>,
      ],
      validation: async () => true,
    };
  }

  kidProfileName() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'KidName',
      privateInfos: true,
      question: 'Tell us about your child',
      fields: [
        <InputField
          type="text"
          label={(
            <>
              First Name <span className="error"> {state.firstNameError ? `: ${state.firstNameError}` : ''}</span>
            </>
          )}
          value={state.firstName}
          // className={`${state.firstNameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.firstName = e.inputBox;
            }
          }}
          onChange={(value) => {
            this.setState({
              firstName: value,
              firstNameError: !isEmpty(value) ? false : state.firstNameError,
            });
          }}
        />,
        <InputField
          type="text"
          label={(
            <>
              Last Name <span className="error"> {state.lastNameError ? `: ${state.lastNameError}` : ''}</span>
            </>
          )}
          value={state.lastName}
          // className={`${state.lastNameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.lastName = e.inputBox;
            }
          }}
          onChange={(value) => {
            this.setState({
              lastName: value,
              lastNameError: !isEmpty(value) ? false : state.lastNameError,
            });
          }}
        />,
        <div id="kidDOB" className="input-field">
          <p className="label">
            Date of Birth <span className="error"> {state.dobError ? `: ${state.dobError}` : ''}</span>
          </p>
          <InputDatePicker
            placeholder=""
            defaultDate={new Date(new Date().getFullYear() - (AgeGroups.maxAge - 1), 0, 1)}
            minDate={this.getMinDOB()} // age can't be more than 16
            maxDate={new Date()}
            values={state.dob ? [this.parseDob(state.dob)] : []}
            className="input "
            onLoad={(e) => {
              if (e) {
                this.fields.dob = e.inputDate;
              }
            }}
            onChange={(dob) => {
              this.setState({
                dob: dob ? dob[0] : dob,
                dobError: false,
              });
            }}
          />
        </div>,
        <div id="kidGender" className="input-field">
          <p className="label">
            Gender<span className="error"> {state.genderError ? `: ${state.genderError}` : ''}</span>
          </p>

          <InputPicker
            multichoice={false}
            values={[state.gender]}
            // className={` ${state.genderError !== false ? ' error' : ''}`}
            onLoad={(e) => {
              if (e) {
                this.fields.gender = e.pickers;
              }
            }}
            options={Utils.getValue('Genders').map((gender) => ({
              label: capitalize(gender),
              value: gender,
            }))}
            onChange={(value) => {
              this.setState({
                gender: value[0],
                genderError: false,
              });
            }}
          />
          <div
            className="helper-text"
            style={{
              marginTop: '1em',
            }}
          >*We also show age
          </div>
        </div>,
      ],
      validation: (updateData = true) => {
        let { dob } = state;

        if (dob) {
          if (dob.year) {
            dob = new Date(`${dob.year}/${dob.month}/${dob.day}`);
          } else {
            dob = new Date(dob);
          }
        }
        return this.submitKidChanges({
          firstName: state.firstName,
          lastName: state.lastName,
          gender: state.gender,
          dob,

        });
      },

    };
  }

  kidProfilePreferredName() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'KidPrefferedName',
      question: `Add a preffered name for ${ucFirst(state.lastName)}`,
      fields: [
        <InputField
          type="text"
          label={(
            <>
              Preferred Name <span className="error"> {state.preferredNameError ? `: ${state.preferredNameError}` : ''}</span>
            </>
          )}
          value={state.preferredName}
          // className={`${state.preferredNameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.preferredName = e.inputBox;
            }
          }}
          onChange={(value) => {
            this.setState({
              preferredName: value,
              preferredNameError: !isEmpty(value) ? false : state.preferredNameError,
            });
          }}
        />,

      ],
      validation: (updateData = true) => this.submitKidChanges({
        preferredName: state.preferredName,
      }),

    };
  }

  kidProfileInterests() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const KidInterests = Utils.getValue('KidInterests');

    return {
      id: 'KidInterests',
      question: (
        <>
          <span>What are {ucFirst(state.lastName)}'s interests</span>
          {state.interestsError && <span className={state.interestsErrorBad ? 'Error' : 'help-info'}>{state.interestsError}</span>}
        </>
      ),
      fields: Object.keys(KidInterests).map((group, i) => (
        <InputPicker
          label={group}
          direction="right"
          rowCount={2}
          values={state.interests}
          options={KidInterests[group].map((interest) => ({
            value: interest,
            label: capitalize(interest),
          }))}
          onLoad={(e) => {
            if (e && i === 0) {
              this.fields.kidInterests = e.pickers;
            }
          }}
          onChange={(values) => {
            const MaxKidInterests = Utils.getValue('MaxKidInterests');

            const rem = MaxKidInterests - values.length;
            if (rem > -1) {
              this.setState({
                interests: values,
                interestsError: `${rem} option${rem > 1 ? 's' : ''} left`,
                interestsErrorBad: false,
              });
            }
          }}
        />
      )),
      validation: (updateData = true) => this.submitKidChanges({
        interests: state.interests,
      }),
    };
  }

  kidProfileColor() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'KidColor',
      question: (
        <>
          <span>Choose a color for {ucFirst(state.lastName)}</span>
          {state.colorError && <span className="Error">{state.colorError}</span>}
        </>
      ),
      fields: [
        <div id="colorPicker">
          <InputPicker
            type="radio"
            label={(
              <p
                className="help-info"
              >Assign a color to your kid to help you make visual distinctions when scheduling events
              </p>
            )}
            multichoice={false}
            values={state.color}
            // className={` ${state.colorError !== false ? ' error' : ''}`}
            onLoad={(e) => {
              if (e) {
                this.fields.color = e.pickers;
              }
            }}
            options={[
              {
                label: 'Blue',
                value: 'blue',
                className: 'kid-indicator',
                props: {
                  color: 'blue',
                },
              },
              {
                label: 'Pink',
                value: 'pink',
                className: 'kid-indicator',
                props: {
                  color: 'pink',
                },
              },
              {
                label: 'Yellow',
                value: 'yellow',
                className: 'kid-indicator',
                props: {
                  color: 'yellow',
                },
              },
              {
                label: 'White',
                value: 'white',
                className: 'kid-indicator',
                props: {
                  color: 'white',
                },
              },
              {
                label: 'Grey',
                value: 'grey',
                className: 'kid-indicator',
                props: {
                  color: 'grey',
                },
              },
            ]}
            onChange={([value]) => {
              this.setState({
                color: value,
                colorError: false,
              });
            }}
          />
        </div>,
      ],
      validation: (updateData = true) => this.submitKidChanges({
        color: state.color,
      }),
    };
  }

  kidProfileSchool() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'KidSchool',
      optional: true,
      question: `Enter ${ucFirst(state.lastName)}'s school information `,
      fields: [
        <InputSchool
          type="text"
          label={(
            <>
              Name <span className="error"> {state.schoolNameError ? `: ${state.schoolNameError}` : ''}</span>
            </>
          )}
          value={state.schoolName}
          // className={`${state.schoolNameError !== false ? ' error' : ''}`}
          onLoad={(e) => {
            if (e) {
              this.fields.schoolName = e.inputBox;
            }
          }}
          onChange={(value) => {
            this.setState({
              schoolName: value,
              schoolId: '',
              schoolStreetAddress: '',
              schoolCity: '',
              schoolState: '',
              schoolZipCode: '',
            });
          }}
          onSelect={(value) => {
            console.log('PiCKED SCHOOL', value);
            this.setState({
              schoolId: value.id,
              schoolName: value.name,
              schoolStreetAddress: value.formatted_address,
              schoolNameError: false,
              schoolCityError: false,
              schoolStateError: false,
              schoolStreetAddressError: false,
              schoolZipCodeError: false,
            });
          }}
        />,

        <InputField
          readOnly
          type="text"
          label={true ? (
            <>
              Address <span className="error"> {state.schoolStreetAddressError ? `: ${state.schoolStreetAddressError}` : ''}</span>
            </>
          ) : ''}
          value={state.schoolStreetAddress}
          // className={`${state.schoolStreetAddressError !== false ? ' error' : ''}`}
          onChange={(value) => {
            this.setState({
              schoolStreetAddress: value,
              schoolStreetAddressError: !isEmpty(value) ? false : state.schoolStreetAddressError,
            });
          }}
        />,
      ],
      validation: (updateData = true) => this.submitKidChanges({
        color: state.color,
      }),
    };
  }

  async createKidProfile() {
    const { state, props } = this;
    const { sessionUser } = props.settings;
    try {
      let { dob } = state;
      const {
        preferredName,
        firstName,
        lastName,
        gender,
        color,
        interests,
        schoolId,
        schoolName,
        schoolState,
        schoolCity,
        schoolStreetAddress,
        schoolZipCode,
        specialInstruction,
        id,
      } = state;

      if (dob) {
        if (dob.year) {
          dob = new Date(`${dob.year}/${dob.month}/${dob.day}`);
        } else {
          dob = new Date(dob);
        }
      }

      let formData = {
        preferredName,
        firstName,
        lastName,
        dob,
        gender,
        color,
        interests,
        schoolId,
        schoolName,
        schoolState,
        schoolCity,
        schoolStreetAddress,
        schoolZipCode,
        specialInstruction,
      };

      if (id) {
        formData = {
          kids: [{
            id,
            ...formData,
          }],
        };
      }

      const kids = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/children`,
        method: formData.kids ? 'PATCH' : 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      props.setSessionUser({
        ...sessionUser,
        kids,
      });
      console.log('the kids returned on create are : ', kids);
      return true;
    } catch (e) {
      console.log('an error happend on creating kids ohhh', e);
      return false;
    }
  }

  kidProfileSpecialInstruction() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      id: 'KidSpecialInstruction',
      optional: true,
      question: `Any special instructions about ${ucFirst(state.lastName)}`,
      fields: [
        <InputField
          type="textarea"
          label="Special Instructions"
          value={state.specialInstruction}
          // className={`${state.specialInstructionError !== false ? ' error' : ''}`}
          onChange={(value) => {
            this.setState({
              specialInstruction: value,
            });
          }}
        />,
      ],
      validation: this.createKidProfile,
    };
  }

  referral() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { sessionUser } = settings;
    const { referralList } = state;

    return {
      optional: true,
      id: 'referralForm',
      question: 'Share Abulé with your friends',
      fields: [
        <Referrals
          {...props}
          values={referralList}
          onChange={(rL) => {
            this.setState({
              referralList: rL,
            });
          }}
        />,
      ],
      validation: async () => {
        await this.finshOnBoardingWithReferal(referralList);
        return true;
      },
    };
  }

  async OnBoardingCompleted() {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;

    try {
      await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/user/${sessionUser.userId}/finish-set-up`,
        method: 'POST',
      });

      props.setSessionUser({
        ...sessionUser,
        finishedSetUp: true,
      });
      Router.push('/app');
    } catch (e) { }
  }

  async finshOnBoardingWithReferal(email) {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;

    try {
      await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/send-invitation-email`,
        method: 'POST',
        body: JSON.stringify({
          email,
          finishedSetUp: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      props.setSessionUser({
        ...sessionUser,
        finishedSetUp: true,
      });
    } catch (e) { }
  }

  async moveForward(steps) {
    const { props, state } = this;
    const { settings, editProfile } = props;
    const { sessionUser } = settings;

    const {
      formType,
      activeStep,
      validating,
      disableNext,
    } = state;

    if (!disableNext && !steps[activeStep].disableNext) {
      const finish = async () => {
        if (steps[activeStep + 1]) {
          console.log('sayning e see am', { steps, total: steps.length, next: activeStep + 1 });

          this.swapProfileContent('forward', steps);
        } else if (formType === 'profile') {
          if (sessionUser.kids.length < Utils.getValue('MaxProfileKids') && this.kidsProfileSteps.length > 0) {
            popAlert({
              title: 'Profile completed',
              description: 'Do you want to create kids profiles now?',
              confirmButton: {
                show: true,
                label: 'YES',
                onClick: (closer) => {
                  this.setState({
                    formType: 'kid-profile',
                    activeStep: 0,
                  });
                  this.toggleProgressTracker(1, true);

                  closer();
                },
              },
              cancelButton: {
                show: true,
                label: 'NO',
                onClick: (closer) => {
                  closer();
                },
              },
              onClose: () => {
                this.OnBoardingCompleted();
              },
            });
          } else {
            await this.OnBoardingCompleted();
          }
        } else if (formType === 'kid-profile') {
          popAlert({
            title: 'Profile completed',
            description: (
              <>
                <p>{ucFirst(state.lastName)}'s profile has been created.</p>
                {sessionUser.kids.length < Utils.getValue('MaxProfileKids') && <p>Do you want to create another child's profile?</p>}
              </>
            ),
            ...(sessionUser.kids.length < Utils.getValue('MaxProfileKids') ? {
              confirmButton: {
                show: true,
                label: 'YES',
                onClick: (closer) => {
                  this.setState({
                    ...this.defaultKidProfile,
                    formType: 'kid-profile',
                    activeStep: 0,
                  });
                  this.toggleProgressTracker(1, true);

                  closer();
                },
              },
              cancelButton: {
                show: true,
                label: 'NO',
                onClick: (closer) => {
                  this.setState({
                    formType: 'referral',
                    activeStep: 0,
                  });
                  this.toggleProgressTracker(2, true);

                  closer();
                },
              },
            } : {
              onClose: () => {
                // alert('we in onclose');
                this.setState({
                  formType: 'referral',
                  activeStep: 0,
                });
                this.toggleProgressTracker(2, true);
              },
            }),
          });
        } else if (formType === 'referral') {
          Router.push(`${props.AppUrl}/`);
        }
      };

      if (!validating) {
        if (steps[activeStep] && steps[activeStep].validation) {
          this.setState({
            validating: true,
          });
          const isValidate = await steps[activeStep].validation();
          if (isValidate) {
            finish();
          }
          this.setState({
            validating: false,
          });
        } else {
          finish();
        }
      }

      // }
    }
  }

  render() {
    const { props, state } = this;
    const { settings, editProfile } = props;
    const { sessionUser, screen, header } = settings;

    const {
      showWelcomeNote,
      showKidWelcomeNote,
      showKidFinishNote,
      activeStep,
      formType,
      validating,
      swappingProfileContentLeft,
      swappingProfileContentRight,
      caregiverForm,
      disableNext,
      disablePrevious,
    } = state;
    let goBack = null;
    const profileSteps = [
      ...this.profileSteps.map((step) => step()),
    ];

    console.log('PROFILE STEPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', profileSteps);
    const kidProfileSteps = this.kidsProfileSteps;

    /*  const referralSteps = [
      this.referral(),
       */

    const steps = (() => {
      switch (formType) {
        case 'kid-profile': {
          if (!state.showKidWelcomeNote && !state.showKidFinishNote) {
            goBack = {
              onClick: () => {
                this.setState({
                  showKidFinishNote: true,
                  activeStep: kidProfileSteps.length - 1,
                });
              },
            };
          }
          return kidProfileSteps;
        }
        /* case 'referral': {
          return referralSteps;
          */
        default: {
          return profileSteps;
        }
      }
    })();

    const { device, width } = screen;

    const contentFitScreen = width <= process.env.IPAD_MINI_BREAKPOINT ? `${(state.screenHeight - header.height)}px` : `calc(100vh - ${(header.height * 1.8)}px)`;
    const contentContainerPaddingBottom = width <= process.env.IPAD_MINI_BREAKPOINT && this.formActions ? $(this.formActions).outerHeight() : '0px';
    // const progress = Number((((activeStep + 1) / steps.length) * 100).toFixed(0));
    const hideProgress = !!steps[activeStep].hideProgress;

    const ProgressTracker = (className = '', style = {}) => {
      const me = '';

      return (
        <div className={`progress-tracker ${className}`} style={{ ...style }}>
          <div className="progress-tracker-container">
            <div className="progress-header">Onboarding process</div>
            <div className="progress-content">
              {state.progress.map((progress, i) => {
                const me = '';
                return (
                  <div className="progress-item">
                    <div
                      className="progress-item-title"
                      onClick={() => {
                        this.toggleProgressTracker(i);
                      }}
                    >
                      <span className="icon">
                        {progress.active
                          ? <span className="icon-arrow-circle-up-bold" />
                          : <span className="icon-arrow-circle-down-bold" />}
                      </span>{progress.title}
                    </div>
                    <div
                      className="progress-item-steps"
                      style={{
                        display: progress.active ? '' : 'none',
                      }}
                    >
                      {progress.steps.map((step) => {
                        const kk = '';
                        return (
                          <div className={`progress-item-step ${steps[activeStep].id === step.id ? 'active' : ''}`}>
                            <span> {step.name} </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              className="btn btn-glass bordered-black mobile-show-flex"
              onClick={() => {
                this.clearSession();
              }}
            >Sign Out
            </button>
          </div>
        </div>
      );
    };
    return (
      <Layout
        {...props}
        header={{
          hideNavList: true,
          NavList: width <= process.env.MOBILE_BREAKPOINT ? ProgressTracker() : null,
          homeClick: () => {
            Router.push('/');
          },
        }}
        footer={{
          show: false,
        }}
      >
        <div
          id="onBoarding"
          className="is-page"
          style={{
            minHeight: contentFitScreen,
            maxHeight: contentFitScreen,
            // maxHeight: device === 'iPad-mini' ? `calc(100vh - ${header.height}px)` : '',
          }}
        >
          {goBack && (
            <div className="go-back">
              <button
                type="button"
                className="thin inline btn btn-glass __pill bordered-black"
                onClick={goBack.onClick}
              >
                <span className="icon-arrow-left-2 icon" />
                Back
              </button>
            </div>
          )}

          <div className="content">
            <div
              className="form-container"
            >
              <div
                className="form"
                style={{
                  overflow: (showWelcomeNote || showKidWelcomeNote || showKidFinishNote) /* && width > process.env.IPAD_MINI_BREAKPOINT  */ ? 'hidden' : '',
                }}
              >
                {/* formType === 'profile' &&  */ showWelcomeNote && this.profileWelcomeBanner({
                  minHeight: contentFitScreen,
                  maxHeight: contentFitScreen,
                  // maxHeight: device === 'iPad-mini' ? `calc(100vh - ${header.height}px)` : '',
                })}
                {/* formType === 'kid-profile'  && */ showKidWelcomeNote && this.kidProfileWelcomeBanner({
                  minHeight: contentFitScreen,
                  maxHeight: contentFitScreen,
                  // maxHeight: device === 'iPad-mini' ? `calc(100vh - ${header.height}px)` : '',
                })}

                {/* formType === 'kid-profile'  && */ showKidFinishNote && this.kidProfileFinishBanner(
                  {
                    minHeight: contentFitScreen,
                    maxHeight: contentFitScreen,
                    // maxHeight: device === 'iPad-mini' ? `calc(100vh - ${header.height}px)` : '',
                  },
                )}

                <>
                  <div className="fields">
                    <div className="progress-bar">
                      {/*  {!hideProgress && (
                        <div
                          className="progress"
                          style={{
                            width: `${progress + 1}%`,
                          }}
                        />
                      )} */}
                      <div className="left-block" />
                      <div className="right-block" />
                      <div className="center-block" />
                    </div>

                    <div className="QandA">
                      <div className="head">
                        {!hideProgress && (
                          <>
                            <div className="private-badge">
                              {/* {steps[activeStep].privateInfos && <div>Private</div>} */}
                            </div>
                            <span className="progress-label" />
                            <div className="skip">
                              <span
                                style={{ visibility: steps[activeStep].optional ? '' : 'hidden' }}
                                onClick={() => {
                                  this.moveForward(steps);
                                }}
                              >SKIP
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      <div
                        className="content-container"
                        onScroll={(e) => {
                          if (e.target.classList.contains('content-container')) {
                            e.target.scrollLeft = 0;
                            e.target.scrollTop = 0;
                            e.preventDefault();
                            e.stopPropagation();
                          }
                        }}
                        style={{
                          paddingBottom: contentContainerPaddingBottom,
                        }}
                      >
                        <div
                          className="content"
                          style={{
                            left: '-100%',
                          }}
                          ref={(e) => {
                            if (e && !this.transitionElementContainer) {
                              this.transitionElementContainer = e;
                            }
                          }}
                        >
                          <div
                            className={`content-column content-left${swappingProfileContentLeft ? ' active' : ''}`}
                            id={steps[activeStep - 1] ? steps[activeStep - 1].id || '' : ''}
                            style={{
                              // maxHeight: hiddenScreenMaxHeight,
                            }}
                          >
                            {steps[activeStep - 1] && (
                              <>
                                <div className="question">
                                  {steps[activeStep - 1].question}
                                </div>
                                <div className="answer">
                                  {steps[activeStep - 1].fields.map((field) => {
                                    const me = '';
                                    return (field);
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                          <div
                            id={steps[activeStep].id || ''}
                            className="content-column content-center"
                          >
                            {steps[activeStep] && (
                              <>
                                <div className="question">
                                  {steps[activeStep].question}
                                </div>
                                <div className="answer">
                                  {steps[activeStep].fields.map((field) => {
                                    const me = '';
                                    return (field);
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                          <div
                            id={steps[activeStep + 1] ? steps[activeStep + 1].id || '' : ''}
                            className={`content-column content-right${swappingProfileContentRight ? ' active' : ''}`}
                            style={{
                              // maxHeight: hiddenScreenMaxHeight,
                            }}
                          >
                            {steps[activeStep + 1] && (
                              <>
                                <div className="question">
                                  {steps[activeStep + 1].question}
                                </div>
                                <div className="answer">
                                  {steps[activeStep + 1].fields.map((field) => {
                                    const me = '';
                                    return (field);
                                  })}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className="actions"
                        ref={(e) => {
                          if (e && !this.formActions) {
                            this.formActions = e;
                          }
                        }}
                      >
                        <button
                          type="button"
                          className={`action btn btn-glass bordered previous${steps[activeStep - 1] ? '' : ' hide'}${disablePrevious ? ' disabled' : ''}`}
                          onClick={() => {
                            if (steps[activeStep - 1] && !disablePrevious) {
                              this.swapProfileContent('backward', steps);
                            }
                          }}
                        >
                          PREVIOUS
                        </button>
                        <button
                          type="button"
                          className={`action btn btn-1${disableNext || steps[activeStep].disableNext ? ' disabled' : ''}`}
                          onClick={() => {
                            this.moveForward(steps);
                          }}
                        >
                          {steps[activeStep + 1] ? 'NEXT' : 'FINISH'} {validating && <span className="icon icon-refresh spinner" />}
                        </button>
                      </div>

                    </div>
                  </div>
                  <div className="fields-description img">
                    {/* {steps[activeStep].note && steps[activeStep].note.image && ( */}
                    <img src="/img/bartering.png" />
                    {/* )} */}
                    {steps[activeStep].note && steps[activeStep].note.message && (
                      <div className="note">
                        {steps[activeStep].note.message}
                      </div>
                    )}
                  </div>
                </>
              </div>
            </div>
            {ProgressTracker('mobile-hide', {
              paddingBottom: contentContainerPaddingBottom,
            })}
          </div>
          {(state.showPhoneVerification) && this.verifyPhone()}
        </div>

      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
  editProfile: state.editProfile,
});
const mapDispatchToProps = (dispatch) => ({
  updateFormState: (props) => dispatch(setInfo(props)),
  saveFormChanges: (props) => dispatch(saveChanges(props)),
  clearFormErrors: (props) => { dispatch(clearErrors(props)); },
  setSupport: (support) => { dispatch(setSupport(support)); },
  setFirstSession: () => dispatch(setSettingInfo({ firstSession: true })),

});
export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
