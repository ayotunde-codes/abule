import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import {
  Fn,
  InputSelect, InputField, InputDatePicker, InputLocation, InputSchool, PopMessage, InputPicker,
  TimelineView, CreditsChart,
} from '@abule-common/components';
import Layout from '../../components/general/Layout';

import {
  updateHeader, sessionUserDeleteKid,
} from '../../redux/settings/action';
import KidProfile from '../../components/profile/KidProfile';
import { Messages } from '../../public/data/assets';
import {
  AgeGroups, Grades, Utils,
} from '../../datastore';
import PageLoader from '../../components/general/PageLoader';
import BuyCredit from '../../components/BuyCredit';
import ActivityGroup from '../../components/ActivityGroup';
import AddTribeModal from '../../components/tribe/AddUserToTribe';

import UpdateSupportType from '../../components/profile/UpdateSupportType';

const {
  capitalize, formatPhoneNo, isDate, isEmpty, popAlert, ucFirst, parsePhoneNo,
  milSecToYears, popPrompt, devalueString,
} = Fn;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.defaultKidProfile = {
      preferredName: '',
      preferredNameError: false,
      dob: null,
      dobError: false,
      gender: '',
      genderError: false,
      interests: [],
      interestsError: false,
      interestsErrorBad: false,
      customInterests: [],
      customInterestsError: false,
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
      showValues: false,
      showInterests: false,
    };

    this.state = {
      user: {},
      buyCredit: false,
      loading: true,
      errorMsg: false,
      groups: [],
      uniassgnedTribe: '',
      loadProfile: this.isLoadOtherProfile(props),
      modal: false,
      supportType: 'driving',
      showGrades: false,
      showSubjects: false,
      acceptModal: false,
      editProfile: {},
      supportUpdate: {},
      kidProfile: this.defaultKidProfile,
      editUserDetails: false,
      editUserAbout: false,
      editUserValues: false,
      editKidProfile: false,
      showKidInterests: false,
      showSupportUpdate: false,
      buttonOneLoading: false,
      buttonTwoLoading: false,
      photoAssemblyId: '',
      photoUploading: false,
      imageUrl: false,
      imageError: false,
    };
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

    this.closeModal = this.closeModal.bind(this);
    this.reactToFriendRequest = this.reactToFriendRequest.bind(this);
    this.updateEditProfile = this.updateEditProfile.bind(this);
    this.imagePickHandler = this.imagePickHandler.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const { state, props } = this;
    props.onPageLoad();
    const { loadProfile } = state;
    const { profileId, settings, tribeCheck } = props;
    const { sessionUser } = settings;

    let user = sessionUser;
    // Load/Set profile
    if (loadProfile) {
      if (profileId === sessionUser.id) {
        this.props.loadProfile = false;
      } else {
        try {
          const data = await props.fetchRequest({
            url: `${process.env.REACT_APP_API}/profiles/${profileId}`,
          });

          if (this._isMounted && data) {
            user = data;
          }
        } catch (e) {
          console.log('ERRROR FOUND IN THE GETTING PROFILE REQ', e);
          if (this._isMounted) {
            if (e.status === 422) {
              this.setState({
                errorMsg: (
                  <div id="profileNotFound">
                    <span>User profile not found or has been deleted</span>
                    <Link href={`${props.AppUrl}/`}>
                      <a
                        type="button"
                        className="btn btn-1 inline"
                      >Go Home
                      </a>
                    </Link>
                  </div>
                ),
                loading: false,
              });
            } else {
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            }
          }
        }
      }
    } else {
      user = sessionUser;
    }

    let supportType = 'driving';
    const supports = {};
    user.supports.forEach((support) => {
      supports[support.type] = support;
    });

    if (!supports.driving.isAvailable) {
      if (supports.sitting.isAvailable) {
        supportType = 'sitting';
      } else if (supports.tutoring.isAvailable) {
        supportType = 'tutoring';
      }
    }

    console.log('all the supports : ', supports);

    this.setState({
      user,
      supportType,
      loading: false,
    }, async () => {
      if (Router.query['accept-friend-request']) {
        await this.reactToFriendRequest('approve');
        popAlert({
          title: 'Request accepted',
          description: `${capitalize(user.firstName)} is now a member of your tribe`,
        });
      }
    });
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  isLoadOtherProfile(props) {
    const { settings, loadProfile, profileId } = props;
    const { sessionUser } = settings;
    if (loadProfile) {
      if (profileId !== sessionUser.id) {
        return true;
      }
    }
    return false;
  }

  closeModal() {
    this.setState({ modal: false });
  }

  async submitKidProfile(updateData = true) {
    const { state, props } = this;
    const fields = state.kidProfile;
    const { editProfile, isEditProfilePage } = props;
    const { sessionUser } = props.settings;

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
        Errors[`${errorKey}Error`] = value;
        // }
      });

      if (updateData) {
        this.updateEditProfile({
          ...Errors,
          ...extraState,
        });
      }
      if (errorKeys.length) {
        throw new Error('field error');
      }
    };

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
        } = fields;
        const school = {
          schoolName,
          schoolStreetAddress,
        };

        Object.keys(school).forEach((key) => {
          const value = school[key];
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
        if ([
          'preferredName',
          'firstName',
          'lastName',
        ].indexOf(key) > -1) {
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
          if (value) {
            value = new Date(value.year, value.month, value.day);
          }
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
      this.updateKidProfile(Errors);
      if (errorKeys.length) {
        // parseFieldsError(errors);
      }
      return isValid;
    };

    if (validate()) {
      if (updateData) {
        const {
          preferredName,
          firstName,
          lastName,
          gender,
          color,
          interests,
          dob,
          schoolId,
          schoolName,
          schoolState,
          schoolCity,
          schoolStreetAddress,
          schoolZipCode,
          specialInstruction,
        } = fields;
        let formData = {
          preferredName,
          firstName,
          lastName,
          gender,
          dob: new Date(dob.year, dob.month, dob.day),
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

        if (fields.id) {
          formData = {
            kids: [{
              id: fields.id,
              ...formData,
            }],
          };
        }

        try {
          const Kids = await props.fetchRequest({
            url: `${process.env.REACT_APP_API}/children`,
            method: formData.kids ? 'PATCH' : 'POST',
            body: JSON.stringify(formData),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (this._isMounted) {
            props.setSessionUser({
              ...sessionUser,
              kids: Kids,
            });

            this.setState({
              user: {
                ...sessionUser,
                kids: Kids,
              },
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
              this.updateKidProfile({
                ...sessionUser,
              });
            }
          }
        }
      } else {
        return true;
      }
    } else {
      throw new Error();
    }
  }

  async submitForm(fields, updateData = true) {
    const { state, props } = this;
    const { editProfile, isEditProfilePage } = props;
    const { sessionUser } = props.settings;

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
          if (['interests', 'coreValues'].includes(key)) {
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
        Errors[`${errorKey}Error`] = value;
        // }
      });

      if (updateData) {
        this.updateEditProfile({
          ...Errors,
          ...extraState,
        });
      }
      if (errorKeys.length) {
        throw new Error('field error');
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
      ];
      if (state.caregiverForm) {
        noEmptyField = [
          ...noEmptyField,
        ];
      }
      console.log('noempty field', noEmptyField);
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
        } else if (state.caregiverForm) {
          if (key === 'email' && !value) {
            isValid = false;
            errors[`${key}`] = 'invalid email';
          } else if (key === 'phoneNumber' && (!value || isNaN(value) || value.length !== 10)) {
            isValid = false;
            errors[`${key}`] = 'invalid phone number';
          } else if (key === 'about' && (!value || value.length < Utils.getValue('MinProfileAboutLen'))) {
            isValid = false;
            errors[`${key}`] = `needs to be at least ${Utils.getValue('MinProfileAboutLen')} characters long`;
          } else if (['gender', 'maritalStatus'].indexOf(key) > -1 && isEmpty(value)) {
            isValid = false;
            errors[`${key}`] = 'you need to pick one';
          } else if (key === 'dob' && (!value || !isDate(value))) {
            isValid = false;
            errors[`${key}`] = 'invalid date';
          } else if (key === 'dob') {
            if (!value || !isDate(value) || milSecToYears(new Date() - value) < 18) { // user must be at least 18 years old
              isValid = false;
              errors[`${key}`] = 'must be at least 18yrs';
            }
          } else if (key === 'username' && fields.usernameError && fields.usernameError !== false) {
            isValid = false;

            errors[key] = 'invalid username';
          }
        } else if (['interests'].indexOf(key) > -1 && (!value || value.length < Utils.getValue('MinUserInterests'))) {
          isValid = false;
          errors[`${key}`] = `you need to pick at least ${Utils.getValue('MinUserInterests')}`;
        } else if (['coreValues'].indexOf(key) > -1 && (!value || value.length < Utils.getValue('MinCoreValues'))) {
          isValid = false;
          errors[`${key}`] = `you need to pick at least ${Utils.getValue('MinCoreValues')}`;
        }
        /* if (key === 'photoAssemblyId' && isEmpty(value) && isEmpty(editProfile.imageUrl)) {
          isValid = false;
          errors[key] = 'Select a display image';
        } */
      });

      console.log('IS VALID : ', isValid);
      parseFieldsError(errors);
      return isValid;
    };

    if (validate()) {
      if (updateData) {
        const formData = { ...fields };
        const expectedData = [
          'addressId',
          'dob',
          'firstName',
          'lastName',
          'gender',
          'maritalStatus',
          'phoneNumber',
          'username',
          'about',
          'supports',
        ];

        expectedData.forEach((key) => {
          if (!Object.keys(formData).includes(key)) {
            formData[key] = sessionUser[key];
          }
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
            props.setSessionUser({
              ...data,
            });

            this.setState({
              user: data,
            });

            this.updateEditProfile({
              ...data,
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
              this.updateEditProfile({
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

  validateUsername(username) {
    const { props, state } = this;
    if (!isEmpty(username)) {
      props.fetchRequest({
        url: `${process.env.REACT_APP_API}/profiles/check-username/${username}`,
      }).then(({ available }) => {
        if (this._isMounted) {
          this.updateEditProfile({
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

  parseDob(value) {
    if (isDate(value)) {
      const date = new Date(value);
      return {
        month: date.getMonth() + 1,
        day: date.getDate(),
        year: date.getFullYear(),
      };
    }

    return value;
  }

  parseUsername(value) {
    return (value.match(/[A-Za-z0-9]/gi) || []).slice(0, 15).join('');
  }

  updateEditProfile(data) {
    this.setState((prev) => ({
      editProfile: {
        ...prev.editProfile,
        ...data,
      },
    }));
  }

  updateKidProfile(data, extras = {}) {
    this.setState((prev) => ({
      kidProfile: {
        ...prev.kidProfile,
        ...data,
      },
      ...extras,
    }));
  }

  getMinDOB() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - AgeGroups.maxAge);
    return date;
  }

  async reactToFriendRequest(status) {
    const { props, state } = this;
    if (!state.buttonOneLoading && !state.buttonTwoLoading) {
      const { user } = state;
      const { sessionUser } = props.settings;

      const buttonOneLoading = status === 'approve';
      const buttonTwoLoading = status === 'ignore';
      this.setState({
        buttonOneLoading,
        buttonTwoLoading,
      });
      const userProfile = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/tribe/friends/${user.userId}`,
        body: JSON.stringify({
          status,
        }),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({
        buttonOneLoading: false,
        buttonTwoLoading: false,
      });
      props.setSessionUser({
        ...sessionUser,
        ...userProfile,
      });
    }
  }

  imagePickHandler(event) {
    const { props } = this;
    const setImage = async (value) => {
      this.setState({
        photoUploading: true,
        imageUrl: URL.createObjectURL(value),
        imageError: false,
      });

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

      if (mediaError) {
        this.setState({
          photoUploading: false,
          imageUrl: false,
          imageError: "couldn't process file",
        });
      } else {
        await this.submitForm({
          photoAssemblyId: mediaAssemblyId,
        });

        this.setState({
          photoUploading: false,
          imageError: false,
        });
      }
    };

    const [value] = event.target.files;
    if (value) {
      setImage(value);
    }
  }

  render() {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;
    const {
      user, loading, errorMsg, loadProfile, editProfile, kidProfile,
    } = state;

    const userSupports = [];
    const creditsChartData = [];
    let totalCreditSpent = 0;
    if (!loading) {
      for (const support of user.supports) {
        if (support.isAvailable) {
          userSupports.push(support);
        }
      }

      if (!loadProfile) {
        Object.keys(user.transactionSummary).forEach((k) => {
          totalCreditSpent += user.transactionSummary[k];
        });
        Object.keys(user.transactionSummary).forEach((k) => {
          const value = user.transactionSummary[k];
          if (value > 0) {
            creditsChartData.push({
              className: k,
              title: `Credits spent on ${capitalize(k)} (${value})`,
              share: (value / totalCreditSpent) * 100,
            });
          }
        });
      }

      // alert(`user data entr : ${userDataEmpty} => ${user.about}`);
    }

    const actionButtons = {
      buyCredit: {
        label: 'BUY CREDITS',
        onClick: () => {
          this.setState({
            buyCredit: true,
          });
        },
        className: 'btn-1',
      },
      addToTribe: {
        label: 'Add to Tribe',
        onClick: () => this.setState({ modal: true }),
        className: '',
      },
      pendingRequest: {
        label: 'Pending Request',
        className: 'disabled',
      },
      acceptRequest: {
        label: (
          <>
            Approve {state.buttonOneLoading && <span className="icon-refresh icon spinner" />}
          </>
        ),
        onClick: () => this.reactToFriendRequest('approve'),
        // className: 'disabled',
      },
      ignoreRequest: {
        label: (
          <>
            Ignore {state.buttonTwoLoading && <span className="icon-refresh icon spinner" />}
          </>
        ),
        onClick: () => {
          this.reactToFriendRequest('ignore');
        },
      },
      message: {
        label: 'Message',
        href: `${props.AppUrl}/inbox/[id]`,
        as: `${props.AppUrl}/inbox/${user.userId}`,
      },
    };

    const sentUserFriendRequest = (() => {
      for (const request of sessionUser.friends.sentRequests) {
        if (request.friendId === user.userId) {
          return request;
        }
      }
      return false;
    })();

    const pendingFriend = (() => {
      for (const request of sessionUser.friends.pending) {
        if (request.userId === user.userId) {
          return request;
        }
      }
      return false;
    })();

    let primaryAction = actionButtons.buyCredit;
    let secondaryAction = null;

    if (loadProfile) {
      secondaryAction = actionButtons.message;
      if (sentUserFriendRequest) {
        primaryAction = actionButtons.message;
        secondaryAction = actionButtons.pendingRequest;
      } else if (pendingFriend) {
        primaryAction = actionButtons.acceptRequest;
        secondaryAction = actionButtons.ignoreRequest;
      } else if (!sessionUser.friends.all[user.userId]) {
        primaryAction = actionButtons.addToTribe;
      } else {
        primaryAction = actionButtons.message;
        secondaryAction = null;
      }
    }

    const getSupport = (type) => {
      if (user) {
        for (const support of user.supports) {
          if (support.type === type) {
            return support;
          }
        }
      }
      return false;
    };

    const getTimeLineSelectionColor = () => {
      switch (state.supportType) {
        case ('sitting'): {
          return '#fdeaf3';
        }
        case ('driving'): {
          return '#D6FDFF';
        }
        case ('tutoring'): {
          return '#F0F0F0';
        }
        default: {
          return '#e1e1e1';
        }
      }
    };
    return (
      <Layout {...props}>
        <div id="NewProfile" className={`${loadProfile ? 'other-profile' : ''}`}>

          {loading ? <PageLoader inline /> : (
            <>{
              errorMsg || (
                <>
                  <div className="profile-data">
                    <div id="userDetails" className="data-section">
                      <div
                        className="edit-data-section icon icon-edit-2"
                        onClick={() => {
                          console.log('user for edit president', user);
                          this.setState({
                            editUserDetails: true,
                            editProfile: user,
                          });
                        }}
                      />

                      <div
                        id="profileImage"
                        tabIndex={0}
                        ref={(e) => {
                          if (e && !this.fields.photoAssemblyId) this.fields.photoAssemblyId = e;
                        }}
                      >
                        <div
                          className="edit-data-section icon icon-camera"
                          onClick={() => {
                            if (this.imagePicker) this.imagePicker.click();
                          }}
                        />
                        <div className="avi">
                          {!user.imageUrl
                            ? <span className="icon-user default-image" />
                            : <img src={state.imageUrl || user.imageUrl} alt="" className="" />}
                          <input
                            type="file"
                            ref={(e) => { this.imagePicker = e; }}
                            onChange={this.imagePickHandler}
                          />
                        </div>
                        {(state.photoUploading) && (
                          <div className="uploading">
                            <span className="icon icon-refresh spinner" />
                          </div>
                        )}
                      </div>

                      <span className="profile-image-error Error">{state.imageError}</span>

                      <p className="name">{user.firstName} {user.lastName}</p>
                      <p className="username">@{user.username}</p>
                      {user.addressId && <p className="location">{user.city}, {user.state}</p>}

                      <div className={`actions ${primaryAction && secondaryAction ? 'len-2' : 'len-1'}`}>
                        {primaryAction && (() => {
                          const Button = (
                            <button
                              type="button"
                              className={`action btn btn-black no-shadow  _1 ${primaryAction.className || ''}`}
                              onClick={() => {
                                if (primaryAction.onClick) primaryAction.onClick();
                              }}
                            >{primaryAction.label}
                            </button>
                          );

                          return primaryAction.href
                            ? (
                              <Link
                                href={primaryAction.href}
                                as={primaryAction.as || primaryAction.href}
                              >{Button}
                              </Link>
                            )
                            : Button;
                        })()}
                        {secondaryAction && (() => {
                          const Button = (
                            <button
                              type="button"
                              className={`action btn btn-glass no-shadow bordered-black _2 ${secondaryAction.className || ''}`}
                              onClick={() => {
                                if (secondaryAction.onClick) secondaryAction.onClick();
                              }}
                            >{secondaryAction.label}
                            </button>
                          );

                          return secondaryAction.href
                            ? (
                              <Link
                                href={secondaryAction.href}
                                as={secondaryAction.as || secondaryAction.href}
                              >{Button}
                              </Link>
                            )
                            : Button;
                        })()}
                      </div>

                      {/*
                      <div className="pending-verifications">
                        <p className="check-background">Background Check</p>
                      </div>

                      <div className="user-confirmed-details">
                        <b className="header">Confirmed</b>
                        <div className="list">
                          <div>
                            <span className="icon icon-badge" />
                            <span>ID Verification</span>
                          </div>
                          <div>
                            <span className="icon icon-badge" />
                            <span>Phone Number</span>
                          </div>
                        </div>
                      </div>
                    */}
                    </div>

                    <div className="user-info">
                      <section className="about-user data-section">
                        <div
                          className="edit-data-section icon icon-edit-2"
                          onClick={() => {
                            this.setState({
                              editUserAbout: true,
                              editProfile: user,
                            });
                          }}
                        />
                        <div className="data-section-title">
                          <span className="label">About</span>
                        </div>

                        <div className="info"> {user.about} </div>
                      </section>

                      {/* {(user.coreValues && user.coreValues.length > 0) && ( */}
                      <section
                        id="userInterests"
                        className="data-section"
                        onClick={() => {
                          this.setState({
                            showValues: true,
                          });
                        }}
                      >
                        <div
                          className="edit-data-section icon icon-edit-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            this.setState({
                              editUserValues: true,
                              editProfile: user,
                            });
                          }}
                        />
                        <div className="data-section-title">
                          <span className="label">VALUES</span>
                        </div>

                        <InputPicker
                          readOnly
                          // activeType="empty"
                          values={sessionUser.userId === user.userId ? [] : sessionUser.coreValues}
                          options={[
                            ...user.coreValues,
                          ].map((interest) => ({
                            label: capitalize(interest),
                            value: interest,
                          }))}
                        />
                      </section>
                      {/* )} */}

                      {/* {(user.interests && user.interests.length > 0) && ( */}
                      <section
                        id="userInterests"
                        className="data-section"
                        onClick={() => {
                          this.setState({
                            showInterests: true,
                          });
                        }}
                      >
                        <div
                          className="edit-data-section icon icon-edit-2"
                          onClick={(e) => {
                            e.stopPropagation();

                            this.setState({
                              editUserInterests: true,
                              editProfile: user,
                            });
                          }}
                        />
                        <div className="data-section-title">
                          <span className="label">INTERESTS</span>
                        </div>

                        <InputPicker
                          readOnly
                          values={sessionUser.userId === user.userId ? [] : sessionUser.interests}
                          customValues={user.customInterests}
                          options={user.interests.map((interest) => ({
                            label: capitalize(interest),
                            value: interest,
                          }))}
                        />
                      </section>
                      {/* )} */}
                    </div>
                  </div>

                  {(!loadProfile || user.kids.length > 0) && (
                    <div id="addLearner" className="data-section">
                      <div className="data-section-title">
                        <span className="">Kid{user.kids.length === 1 ? "'" : ''}s Profile</span>

                      </div>
                      <div id="kidsProfile">
                        {[
                          ...user.kids,
                        ].map((kid) => (
                          <KidProfile
                            {...props}
                            showActions={!loadProfile}
                            kid={kid}
                            onEdit={() => {
                              this.updateKidProfile({
                                ...kid,
                                dob: this.parseDob(kid.dob),
                              }, {
                                editKidProfile: true,
                              });
                            }}
                          />
                        ))}
                        <div
                          className="add-new-kid"
                          onClick={() => {
                            this.setState({
                              editKidProfile: true,
                              kidProfile: this.defaultKidProfile,
                            });
                          }}
                        >
                          <span className="icon-add icon" />
                          <span className="text">
                            Add  a kid
                          </span>

                        </div>
                      </div>
                    </div>
                  )}

                  <div className="supports-timeline data-section">
                    <div
                      className="edit-data-section icon icon-edit-2"
                      onClick={() => {
                        let support = [{}];
                        if (user.supports) {
                          support = { ...getSupport(state.supportType) };
                        }
                        this.setState({
                          showSupportUpdate: true,
                          supportUpdate: support,
                        });
                      }}
                    />
                    <div className="data-section-title">
                      <span>AVAILABILITY</span>
                    </div>
                    <div className="header">
                      <div />
                      <InputSelect
                        className=""
                        value={state.supportType}
                        options={[
                          {
                            label: 'driving',
                          },
                          {
                            label: 'sitting',
                          },
                          {
                            label: 'tutoring',
                          },
                        ]}
                        onChange={(value) => {
                          this.setState({
                            supportType: value,
                          });
                        }}
                      />
                      <div className="support-info">
                        {state.supportType === 'tutoring'
                          ? (
                            <div className="support-actions">
                              <div
                                className="support-action"
                                onClick={() => {
                                  this.setState({
                                    showGrades: true,
                                  });
                                }}
                              >Grades
                              </div>
                              <div
                                className="support-action"
                                onClick={() => {
                                  this.setState({
                                    showSubjects: true,
                                  });
                                }}
                              >Subjects
                              </div>
                            </div>
                          )
                          : (
                            <>
                              {
                                getSupport(state.supportType).age
                                  ? <span>{getSupport(state.supportType).age.start} - {getSupport(state.supportType).age.end} yrs</span>
                                  : ''
                              }
                            </>
                          )}
                      </div>
                    </div>
                    <TimelineView
                      selectionColor={getTimeLineSelectionColor()}
                      timeline={user.supports ? getSupport(state.supportType).days : null}
                      on
                    />
                  </div>

                  {!loadProfile && (
                    <>
                      <div className="usage-summary">
                        <div className="card usage data-section">
                          <div className="data-section-title">
                            <span> CREDIT USAGE</span>
                          </div>

                          <div className="usage-details">
                            <CreditsChart
                              data={creditsChartData}
                              total={totalCreditSpent}
                            />
                            <div className="legends">
                              <div className="legend activities">
                                <span className="indicator" />
                                <span className="label">Activity</span>
                              </div>
                              <div className="legend driving">
                                <span className="indicator" />
                                <span className="label">Driving</span>
                              </div>
                              <div className="legend sitting">
                                <span className="indicator" />
                                <span className="label">Sitting</span>
                              </div>
                              <div className="legend tutoring">
                                <span className="indicator" />
                                <span className="label">Tutoring</span>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="card summary data-section">
                          <div className="data-section-title">
                            <span> CREDIT DETAILS</span>
                          </div>
                          <div className="summary-details">
                            <div className="">
                              <p>Total Credits</p>
                              <span>{Number((sessionUser.creditBalance.purchased + sessionUser.creditBalance.earned).toFixed(2))}</span>
                            </div>
                            <div className="">
                              <p>Credits Used</p>
                              <span>{Number((totalCreditSpent).toFixed(2))}</span>
                            </div>
                            <div className="">
                              <p>Credits on Hold</p>
                              <span>{Number(Number(sessionUser.creditBalance.held).toFixed(2))}</span>
                            </div>
                            <div className="">
                              <p>Available Credits</p>
                              <span>{Number(((sessionUser.creditBalance.purchased + sessionUser.creditBalance.earned) - sessionUser.creditBalance.held).toFixed(2))}</span>
                            </div>
                          </div>

                          <div className="actions">
                            {/* <Link href={`${props.AppUrl}/settings?page=history`}>
         <a>History</a>
       </Link> */}
                            <button
                              className="btn btn-black inline"
                            >CASH OUT
                            </button>
                          </div>
                        </div>
                      </div>

                      <div id="userCreditDetails">

                        <div className="activities">
                          <ActivityGroup
                            {...props}
                            header={(
                              <div className="section-title title timberline-font">
                                <h3 className="">{user.firstName}'s Activities</h3>
                              </div>
                            )}
                            rootClassName=" "
                            counter={null}
                            OnCounterClick={() => {
                              // Router.push('/activities/search?type=featured&title=Featured');
                            }}
                            activities={user.activities}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )
            }
            </>
          )}
        </div>
        {state.buyCredit && (
          <BuyCredit
            {...props}
            onClose={() => {
              this.setState({
                buyCredit: false,
              });
            }}
          />
        )}
        {state.modal && (
          <AddTribeModal
            {...props}
            modal={this.state.modal}
            setModalState={this.closeModal}
            groups={this.state.groups}
            user={user}
            otherProps={props}
            uniassgnedTribe={this.state.uniassgnedTribe}
          />
        )}

        {state.showGrades && (() => {
          const support = getSupport(state.supportType);

          return (
            <PopMessage
              // show={}
              style={{ zIndex: '2' }}
              message={(
                <div id="updateInterestsPopUp">
                  <div className="title">
                    <div className="label">Grades</div>
                  </div>
                  <div className="pickers">
                    <InputPicker
                      values={support.grades}
                      options={support.grades.map((gradeId) => {
                        const grade = Grades.find(gradeId);
                        return {
                          value: grade.id,
                          label: ucFirst(grade.title),
                        };
                      })}
                    />
                  </div>

                </div>
              )}
              confirmButton={{
                show: false,
                label: 'CLOSE',
                onClick: async (closer, hideLoader) => {
                  closer();
                },
                className: 'btn btn-1',
              }}
              onCancel={() => {
                this.setState({
                  showGrades: false,
                });
              }}
            />
          );
        }
        )()}

        {state.showSubjects && (() => {
          const support = getSupport(state.supportType);

          return (
            <PopMessage
              // show={}
              style={{ zIndex: '2' }}
              message={(
                <div id="updateInterestsPopUp">
                  <div className="title">
                    <div className="label">Subjects</div>
                  </div>
                  <div className="pickers">
                    <InputPicker
                      values={support.subjects}
                      options={support.subjects.map((subject) => ({
                        value: subject,
                        label: capitalize(subject),
                      }))}
                    />
                  </div>

                </div>
              )}
              confirmButton={{
                show: false,
                label: 'CLOSE',
                onClick: async (closer, hideLoader) => {
                  closer();
                },
                className: 'btn btn-1',
              }}
              onCancel={() => {
                this.setState({
                  showSubjects: false,
                });
              }}
            />
          );
        }
        )()}

        {state.showValues && (() => (
          <PopMessage
            // show={}
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">Values</div>
                </div>
                <div className="pickers">
                  <InputPicker
                    readOnly
                    values={sessionUser.userId === user.userId ? [] : sessionUser.coreValues}
                    options={[
                      ...user.coreValues,
                    ].map((interest) => ({
                      label: capitalize(interest),
                      value: interest,
                    }))}
                  />
                </div>

              </div>
            )}
            confirmButton={{
              show: false,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                showValues: false,
              });
            }}
          />
        )
        )()}
        {state.showInterests && (() => (
          <PopMessage
            // show={}
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">Interests</div>
                </div>
                <div className="pickers">
                  <InputPicker
                    readOnly
                    values={sessionUser.userId === user.userId ? [] : sessionUser.interests}
                    customValues={user.customInterests}
                    options={user.interests.map((interest) => ({
                      label: capitalize(interest),
                      value: interest,
                    }))}
                  />
                </div>

              </div>
            )}
            confirmButton={{
              show: false,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                showInterests: false,
              });
            }}
          />
        )
        )()}

        {(state.editUserDetails) && (() => (
          <PopMessage
            // show={}
            style={{ zIndex: '2' }}
            message={(
              <div id="editProfilePopUp">
                <div className="title">
                  <div className="label">Edit Profile</div>
                </div>

                <div className="content">
                  <InputField
                    type="text"
                    label={(
                      <>
                        First Name <span className="error"> {editProfile.firstNameError ? `: ${editProfile.firstNameError}` : ''}</span>
                      </>
                    )}
                    value={ucFirst(editProfile.firstName)}
                    // className={`${editProfile.firstNameError !== false ? ' error' : ''}`}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.firstName = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateEditProfile({
                        firstName: value,
                        firstNameError: !isEmpty(value) ? false : editProfile.firstNameError,
                      });
                    }}
                  />
                  <InputField
                    type="text"
                    label={(
                      <>
                        Last Name <span className="error"> {editProfile.lastNameError ? `: ${editProfile.lastNameError}` : ''}</span>
                      </>
                    )}
                    value={ucFirst(editProfile.lastName)}
                    // className={`${editProfile.lastNameError !== false ? ' error' : ''}`}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.lastName = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateEditProfile({
                        lastName: value,
                        lastNameError: !isEmpty(value) ? false : editProfile.lastNameError,
                      });
                    }}
                  />
                  <InputField
                    type="text"
                    label={(
                      <>
                        Username <span className={editProfile.usernameError ? 'error' : 'success'}>  {editProfile.usernameMsg ? `: ${editProfile.usernameMsg}` : ''}</span>
                      </>
                    )}
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
                      const username = this.parseUsername(value);
                      this.updateEditProfile({
                        username,
                        usernameError: !isEmpty(username) ? false : editProfile.usernameError,
                      });
                      this.validateUsername(username);
                    }}
                  />

                  <InputField
                    readOnly
                    type="text"
                    label={(<> Email </>)}
                    value={editProfile.email || ''}
                  />

                  <InputField
                    type="tel"
                    label={(
                      <>
                        Phone Number  <span className="error"> {editProfile.phoneNumberError ? `: ${editProfile.phoneNumberError}` : ''}</span>
                      </>
                    )}
                    maxLength={14}
                    // placeholder="(***) ***-****"
                    value={formatPhoneNo(editProfile.phoneNumber)}
                    // className={`${editProfile.phoneNumberError !== false ? ' error' : ''}`}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.phoneNumber = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateEditProfile({
                        phoneNumber: parsePhoneNo(value),
                        phoneNumberError: value.length < 8 || value.length > 13 ? editProfile.phoneNumberError : false,
                      });
                    }}
                  />

                  <div className="input-field">
                    <p className="label">
                      Date of Birth <span className="error"> {editProfile.dobError ? `: ${editProfile.dobError}` : ''}</span>
                    </p>
                    <InputDatePicker
                      defaultDate={new Date(1990, 0, 1)}
                      placeholder="mm/dd/yyyy"
                      maxDate={new Date()} // age can't be more than 18
                      values={editProfile.dob ? [this.parseDob(editProfile.dob)] : []}
                      className="input"
                      onLoad={(e) => {
                        if (e) {
                          this.fields.dob = e.inputDate;
                        }
                      }}
                      onChange={(dob) => {
                        this.updateEditProfile({
                          dob: dob ? dob[0] : dob,
                          dobError: false,
                        });
                      }}
                    />
                  </div>

                  <div className="input-field">
                    <p className="label">
                      Gender <span className="error"> {editProfile.genderError ? `: ${editProfile.genderError}` : ''}</span>
                    </p>

                    <InputPicker
                      multichoice={false}
                      values={[editProfile.gender]}
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
                        this.updateEditProfile({
                          gender: value[0],
                          genderError: false,
                        });
                      }}
                    />
                  </div>

                  <div className="input-field">
                    <p className="label">
                      Marital Status <span className="error"> {editProfile.maritalStatusError ? `: ${editProfile.maritalStatusError}` : ''}</span>
                    </p>

                    <InputPicker
                      multichoice={false}
                      values={[editProfile.maritalStatus]}
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
                        this.updateEditProfile({
                          maritalStatus: value[0],
                          maritalStatusError: false,
                        });
                      }}
                    />
                  </div>

                  <InputLocation
                    type="text"
                    globalClassName="street-address"
                    label={(
                      <>
                        Street Address  <span className="error"> {editProfile.streetAddressError ? `: ${editProfile.streetAddressError}` : ''}</span>
                      </>
                    )}
                    value={ucFirst(editProfile.streetAddress)}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.streetAddress = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateEditProfile({
                        addressId: '',
                        streetAddress: value,
                      });
                    }}
                    onSelect={(value) => {
                      this.updateEditProfile({
                        addressId: value.id,
                        streetAddress: value.formatted_address,
                        streetAddressError: false,
                      });
                    }}
                  />
                  <InputField
                    globalClassName="street-address"
                    type="text"
                    label="Apt, Building, Suite, etc. (optional)"
                    value={ucFirst(editProfile.apartment)}
                    onChange={(value) => {
                      this.updateEditProfile({
                        apartment: value,
                      });
                    }}
                  />
                </div>
              </div>
            )}
            confirmButton={{
              show: true,
              label: 'SAVE',
              onClick: async (closer, hideLoader) => {
                let { dob } = editProfile;

                if (dob) {
                  if (dob.year) {
                    dob = new Date(`${dob.year}/${dob.month}/${dob.day}`);
                  } else {
                    dob = new Date(dob);
                  }
                }
                try {
                  await this.submitForm({
                    firstName: editProfile.firstName,
                    lastName: editProfile.lastName,
                    username: editProfile.username,
                    phoneNumber: editProfile.phoneNumber,
                    dob,
                    gender: editProfile.gender,
                    maritalStatus: editProfile.maritalStatus,
                    addressId: editProfile.addressId,
                    apartment: editProfile.apartment,
                  });
                  closer();
                } catch (e) {
                  console.log("COULDN'T UPDATE PROFILE DETAILS : ", e);
                  hideLoader();
                }
              },
              // className: 'btn btn-1',
            }}
            cancelButton={{
              show: true,
              label: 'CLOSE',
              onClick: async (closer, hideLoader) => {
                closer();
              },
              // className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                editUserDetails: false,
              });
            }}
          />
        )
        )()}

        {(state.editUserAbout) && (() => (
          <PopMessage
            // show={}
            style={{ zIndex: '2' }}
            message={(
              <div id="editProfilePopUp">
                <div className="title">
                  <div className="label">Edit Profile</div>
                </div>

                <div className="content">
                  <InputField
                    type="textarea"
                    placeholder="Tell us about yourself, your occupation, or anything else that makes you unique. It helps us build a community of trust."
                    label={(
                      <p className="">
                        about
                        <span className="error"> {editProfile.aboutError ? `: ${editProfile.aboutError}` : ''}</span>
                      </p>
                    )}
                    value={ucFirst(editProfile.about)}
                    globalClassName="about"
                    onLoad={(e) => {
                      if (e) {
                        this.fields.about = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateEditProfile({
                        about: value,
                        aboutError: false,
                        // aboutErrorServer: isEmail(value) ? false : editProfile.aboutErrorServer,
                      });
                    }}
                  />
                </div>
              </div>
            )}
            confirmButton={{
              show: true,
              label: 'SAVE',
              onClick: async (closer, hideLoader) => {
                try {
                  await this.submitForm({
                    about: editProfile.about,
                  });
                  closer();
                } catch (e) {
                  console.log("COULDN'T UPDATE PROFILE DETAILS : ", e);
                  hideLoader();
                }
              },
              // className: 'btn btn-1',
            }}
            cancelButton={{
              show: true,
              label: 'CLOSE',
              // className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                editUserAbout: false,
              });
            }}
          />
        )
        )()}

        {(state.editUserValues) && (() => {
          const CoreValues = Utils.getValue('CoreValues');

          return (
            <PopMessage
              // show={}
              style={{ zIndex: '2' }}
              message={(
                <div id="editProfilePopUp">
                  <div className="title">
                    <div className="label">Values</div>
                  </div>

                  <b className="Error interests-error"> {editProfile.coreValuesError ? `${editProfile.coreValuesError}` : ''}</b>
                  <div className="content">
                    <div className="user-interests">
                      {Object.keys(CoreValues).map((group, i) => (
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
                              this.updateEditProfile({
                                coreValues: values,
                                // coreValuesError: `${rem} option${rem > 1 ? 's' : ''} left`,
                                // coreValuesErrorBad: false,
                                coreValuesError: false,
                              });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              confirmButton={{
                show: true,
                label: 'SAVE',
                onClick: async (closer, hideLoader) => {
                  try {
                    await this.submitForm({
                      coreValues: editProfile.coreValues,
                    });
                    closer();
                  } catch (e) {
                    console.log("COULDN'T UPDATE PROFILE DETAILS : ", e);
                    hideLoader();
                  }
                },
                // className: 'btn btn-1',
              }}
              cancelButton={{
                show: true,
                label: 'CLOSE',
                // className: 'btn btn-1',
              }}
              onCancel={() => {
                this.setState({
                  editUserValues: false,
                });
              }}
            />
          );
        }
        )()}

        {(state.editUserInterests) && (() => {
          const UserInterests = Utils.getValue('UserInterests');

          return (
            <PopMessage
              // show={}
              style={{ zIndex: '2' }}
              message={(
                <div id="editProfilePopUp">
                  <div className="title">
                    <div className="label">Interests</div>
                  </div>
                  <b className="interests-error Error"> {editProfile.interestsError ? `${editProfile.interestsError}` : ''}</b>
                  <div className="content">
                    <div className="user-interests">
                      {Object.keys(UserInterests).map((group, i) => (
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
                              this.updateEditProfile({
                                interests: values,
                                // interestsError: `${rem} option${rem > 1 ? 's' : ''} left`,
                                // interestsErrorBad: false,
                                interestsError: false,
                              });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              confirmButton={{
                show: true,
                label: 'SAVE',
                onClick: async (closer, hideLoader) => {
                  try {
                    await this.submitForm({
                      interests: editProfile.interests,
                    });
                    closer();
                  } catch (e) {
                    console.log("COULDN'T UPDATE PROFILE DETAILS : ", e);
                    hideLoader();
                  }
                },
                // className: 'btn btn-1',
              }}
              cancelButton={{
                show: true,
                label: 'CLOSE',
                // className: 'btn btn-1',
              }}
              onCancel={() => {
                this.setState({
                  editUserInterests: false,
                });
              }}
            />
          );
        }
        )()}

        {(state.editKidProfile) && (() => (
          <PopMessage
            // show={}
            style={{ zIndex: '2' }}
            message={(
              <div id="editProfilePopUp">
                <div className="title">
                  <div className="label">{kidProfile.id ? 'Edit' : 'New'} Kid's Profile</div>
                </div>

                <span className="sub-header">Public Profile</span>
                <div className="content">
                  <InputField
                    type="text"
                    label={(
                      <>
                        Preferred Name <span className="error"> {kidProfile.preferredNameError ? `: ${kidProfile.preferredNameError}` : ''}</span>
                      </>
                    )}
                    value={ucFirst(kidProfile.preferredName)}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.preferredName = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateKidProfile({
                        preferredName: value,
                        preferredNameError: !isEmpty(value) ? false : kidProfile.preferredNameError,
                      });
                    }}
                  />

                  <div id="kidDOB" className="input-field">
                    <p className="label">
                      Date of Birth <span className="error"> {kidProfile.dobError ? `: ${kidProfile.dobError}` : ''}</span>
                    </p>
                    <InputDatePicker
                      defaultDate={new Date(new Date().getFullYear() - (AgeGroups.maxAge - 1), 0, 1)}
                      placeholder="mm/dd/yyyy"
                      minDate={this.getMinDOB()} // age can't be more than 16
                      maxDate={new Date()}
                      values={kidProfile.dob ? [kidProfile.dob] : []}
                      className="input "
                      onLoad={(e) => {
                        if (e) {
                          this.fields.dob = e.inputDate;
                        }
                      }}
                      onChange={(dob) => {
                        this.updateKidProfile({
                          dob: dob ? dob[0] : dob,
                          dobError: false,
                        });
                      }}
                    />
                  </div>

                  <div id="kidGender" className="input-field">
                    <p className="label">
                      Gender<span className="error"> {kidProfile.genderError ? `: ${kidProfile.genderError}` : ''}</span>
                    </p>

                    <InputPicker
                      multichoice={false}
                      values={[kidProfile.gender]}
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
                        this.updateKidProfile({
                          gender: value[0],
                          genderError: false,
                        });
                      }}
                    />
                  </div>

                  <InputPicker
                    className="input-field"
                    label={(
                      <>
                        <p>
                          Choose a color <span className="error"> {kidProfile.colorError ? `: ${kidProfile.colorError}` : ''}</span>
                        </p>
                        <p
                          className="help-info"
                        >Assign a color to your kid to help you make visual distinctions when scheduling events.
                        </p>
                      </>
                    )}
                    multichoice={false}
                    values={kidProfile.color}
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
                      this.updateKidProfile({
                        color: value,
                        colorError: false,
                      });
                    }}
                  />

                  <div id="kidGender" className="input-field street-address">
                    <p className="label">
                      <p>
                        Interests <span className="error"> {kidProfile.interestsError ? `${kidProfile.interestsError}` : ''}</span>
                      </p>
                      <p className="help-info"> Choose activities that your kids like to engage in so that we can match them with other kids in your area. </p>
                    </p>

                    <InputPicker
                      readOnly
                      // activeType="empty"
                      values={kidProfile.interests}
                      options={kidProfile.interests.map((interest) => ({
                        label: capitalize(interest),
                        value: interest,
                      }))}
                    />

                    <button
                      type="button"
                      className="btn btn-glass __pill bordered"
                      style={{ marginTop: '2em' }}
                      onClick={() => {
                        this.setState({
                          showKidInterests: true,
                        });
                      }}
                    >Update
                    </button>
                  </div>
                </div>

                <span className="sub-header">Private Profile</span>
                <div className="content">

                  <InputField
                    type="text"
                    label={(
                      <>
                        First Name <span className="error"> {kidProfile.firstNameError ? `: ${kidProfile.firstNameError}` : ''}</span>
                      </>
                    )}
                    value={ucFirst(kidProfile.firstName)}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.firstName = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateKidProfile({
                        firstName: value,
                        firstNameError: !isEmpty(value) ? false : kidProfile.firstNameError,
                      });
                    }}
                  />
                  <InputField
                    type="text"
                    label={(
                      <>
                        Last Name <span className="error"> {kidProfile.lastNameError ? `: ${kidProfile.lastNameError}` : ''}</span>
                      </>
                    )}
                    value={ucFirst(kidProfile.lastName)}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.lastName = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateKidProfile({
                        lastName: value,
                        lastNameError: !isEmpty(value) ? false : kidProfile.lastNameError,
                      });
                    }}
                  />

                  <InputSchool
                    type="text"
                    label={(
                      <>
                        School  Name <span className="error"> {kidProfile.schoolNameError ? `: ${kidProfile.schoolNameError}` : ''}</span>
                      </>
                    )}
                    globalClassName="street-address"
                    value={ucFirst(kidProfile.schoolName)}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.schoolName = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateKidProfile({
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
                      this.updateKidProfile({
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
                  />

                  <InputField
                    readOnly
                    type="text"
                    globalClassName="street-address"
                    label={true ? (
                      <>
                        School  Address <span className="error"> {kidProfile.schoolStreetAddressError ? `: ${kidProfile.schoolStreetAddressError}` : ''}</span>
                      </>
                    ) : ''}
                    value={ucFirst(kidProfile.schoolStreetAddress)}
                    // className={`${kidProfile.schoolStreetAddressError !== false ? ' error' : ''}`}
                    onChange={(value) => {
                      this.updateKidProfile({
                        schoolStreetAddress: value,
                        schoolStreetAddressError: !isEmpty(value) ? false : kidProfile.schoolStreetAddressError,
                      });
                    }}
                  />

                  <InputField
                    type="textarea"
                    globalClassName="street-address"
                    label="Special Instructions"
                    value={ucFirst(kidProfile.specialInstruction)}
                    onChange={(value) => {
                      this.updateKidProfile({
                        specialInstruction: value,
                      });
                    }}
                  />
                </div>
              </div>
            )}
            confirmButton={{
              show: true,
              label: 'SAVE',
              onClick: async (closer, hideLoader) => {
                try {
                  await this.submitKidProfile();
                  closer();
                } catch (e) {
                  console.log("COULDN'T UPDATE PROFILE DETAILS : ", e);
                  hideLoader();
                }
              },
              // className: 'btn btn-1',
            }}
            cancelButton={{
              show: true,
              label: 'DELETE',
              onClick: async (closer, hideLoader) => {
                popPrompt({
                  warning: true,
                  message: (
                    <>
                      <p>Are you sure you want to delete {capitalize(kidProfile.preferredName)}'s profile?</p>
                      {/* <p style={{ marginTop: '1em' }}>You will no longer be friends</p> */}
                    </>
                  ),
                  confirmButton: {
                    label: 'CONFIRM',
                    onClick: async (closerr) => {
                      try {
                        await props.fetchRequest({
                          url: `${process.env.REACT_APP_API}/children/${kidProfile.id}`,
                          method: 'DELETE',
                        });
                        const kids = [];
                        sessionUser.kids.forEach((kid) => {
                          if (kid.id !== kidProfile.id) {
                            kids.push(kid);
                          }
                        });
                        props.setSessionUser({
                          ...sessionUser,
                          kids,
                        });
                        this.setState({
                          user: {
                            ...sessionUser,
                            kids,
                          },
                        });
                        popAlert({
                          title: 'Profile Deleted',
                          description: (<p>{capitalize(kidProfile.preferredName)}'s profile has been successfully deleted.</p>),
                        });
                      } catch (erroRes) {
                        if (this._isMounted) {
                          console.log(erroRes);
                        }
                      }
                      /*
                      props.setSessionUser({
                        ...sessionUser,
                        ...userProfile,
                      }); */
                      closerr();
                      closer();
                    },
                  },
                });
                hideLoader();
              },
              // className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                editKidProfile: false,
                kidProfile: this.defaultKidProfile,
              });
            }}
          />
        )
        )()}

        {(state.showKidInterests) && (() => {
          const UserInterests = Utils.getValue('KidInterests');

          return (
            <PopMessage
              // show={}
              style={{ zIndex: '2' }}
              message={(
                <div id="editProfilePopUp">
                  <div className="title">
                    <div className="label">Kid's Interests</div>
                  </div>
                  <b className="interests-error Error"> {editProfile.interestsError ? `${editProfile.interestsError}` : ''}</b>
                  <div className="content">
                    <div className="user-interests">
                      {Object.keys(UserInterests).map((group, i) => (
                        <InputPicker
                          label={group}
                          direction="right"
                          rowCount={2}
                          values={kidProfile.interests}
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
                              this.updateKidProfile({
                                interests: values,
                                // interestsError: `${rem} option${rem > 1 ? 's' : ''} left`,
                                // interestsErrorBad: false,
                                interestsError: false,
                              });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              confirmButton={{
                show: true,
                label: 'SAVE',
                onClick: async (closer, hideLoader) => {
                  try {
                    await this.submitForm({
                      interests: editProfile.interests,
                    });
                    closer();
                  } catch (e) {
                    console.log("COULDN'T UPDATE PROFILE DETAILS : ", e);
                    hideLoader();
                  }
                },
                // className: 'btn btn-1',
              }}
              cancelButton={{
                show: true,
                label: 'CLOSE',
                // className: 'btn btn-1',
              }}
              onCancel={() => {
                this.setState({
                  showKidInterests: false,
                });
              }}
            />
          );
        }
        )()}

        {state.showSupportUpdate && (() => (
          <PopMessage
            // show
            style={{ zIndex: '2' }}
            message={(
              <div id="updateInterestsPopUp">
                <div className="title">
                  <div className="label">{state.supportUpdate.type}</div>
                </div>
                <UpdateSupportType
                  support={state.supportUpdate}
                  onChange={(supportt) => {
                    this.setState((prev) => ({
                      user: prev.user,
                      supportUpdate: {
                        ...prev.supportUpdate,
                        ...supportt,
                      },
                    }));
                  }}
                />
              </div>
            )}
            confirmButton={{
              show: true,
              label: 'SAVE',
              onClick: async (closer, hideLoader) => {
                try {
                  await this.submitForm({
                    supports: [
                      ...(user.supports.filter((support) => support.type !== state.supportUpdate.type)),
                      state.supportUpdate,
                    ],
                  });
                  closer();
                } catch (e) {
                  console.log("COULDN'T UPDATE PROFILE DETAILS : ", e);
                  hideLoader();
                }
              },
              className: 'btn btn-1',
            }}
            onCancel={() => {
              this.setState({
                showSupportUpdate: false,
              });
            }}
          />
        ))()}
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  // setSessionUser: (user) => dispatch(setInfo({ sessionUser: user })),
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),

});
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
