import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import $ from 'jquery';
import {
  Fn,
  InputField, InputPicker, InputDatePicker, InputTime, SearchBar, InputLocation, PopMessage,
  InputSelectUser as RequestFindUserResult,
} from '@abule-common/components';
import Layout from '../general/Layout';

import {
  updateHeader, sessionUserAddKid, sessionUserUpdateKid, sessionUserDeleteKid,
} from '../../redux/settings/action';

import {
  Messages,
} from '../../public/data/assets';
import { ActivityFrequencies, ActivityTypes } from '../../datastore';
import PageLoader from '../general/PageLoader';
import SwitchPage from '../SwitchPage';

const {
  isEmpty, capitalize, parseTimeToGMT, ucFirst, popAlert,
} = Fn;
// import 'react-datepicker/dist/react-datepicker.css';

class RequestHelpForm extends React.Component {
  constructor(props) {
    super(props);

    this.defaultErrorState = {
      kidsToAttendError: false,
      dateError: false,
      frequencyError: false,
      eventTypeError: false,
      locationTypeError: false,
      streetAddressError: false,
      cityError: false,
      stateError: false,
      zipCodeError: false,
      location2TypeError: false,
      streetAddress2Error: false,
      city2Error: false,
      state2Error: false,
      zipCode2Error: false,
      descriptionError: false,
      locationSchoolKidError: false,
      location2SchoolKidError: false,
    };

    const bartering = Router.query.type;

    this.defaultState = {
      ...this.defaultErrorState,
      kidsToAttend: [],
      date: null,
      startHour: null,
      startMinute: null,
      startPeriod: null,
      duration: 15,
      frequency: '',
      eventType: '',
      locationId: '',
      locationType: '',
      streetAddress: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      location2Type: '',
      location2Id: '',
      streetAddress2: '',
      apartment2: '',
      city2: '',
      state2: '',
      zipCode2: '',
      description: '',

      /// ///////////////////////////////////////////////
      locationSchoolKid: '',
      location2SchoolKid: '',
      submitting: false,
      showLocation: !(bartering === 'tutoring'),
      showEventType: bartering === 'tutoring',
      showLocation2: bartering === 'driving',
      pickRecipients: false,
      proceedToSubmit: false,
      loading: false,
      errorMsg: false,
      bartering,
    };

    const { settings: { sessionUser } } = props;

    this.HomeLocation = {
      locationId: sessionUser.addressId,
      streetAddress: sessionUser.streetAddress,
      apartment: sessionUser.apartment,
      city: sessionUser.city,
      state: sessionUser.state,
      zipCode: sessionUser.zipCode,
    };

    this._isMounted = false;
    this.state = this.defaultState;
    this.parseActivityDate = this.parseActivityDate.bind(this);
    this.isValidDate = this.isValidDate.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.FrequencyField = this.FrequencyField.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    props.onPageLoad();

    if (props.editRequest) {
      this.setState({
        loading: true,
      });

      try {
        const data = await props.fetchRequest({
          url: `${process.env.REACT_APP_API}/barter/all/${props.requestId}`,
        });

        const date = new Date(data.date);
        let startHour = date.getHours();
        let startPeriod = 'AM';
        if (startHour >= 12) {
          startPeriod = 'PM';
          if (startHour > 12) {
            startHour -= 12;
          }
        }
        this.setState({
          loading: false,
          ...data,
          kidsToAttend: data.kids,
          date: {
            month: date.getMonth() + 1,
            day: date.getDate(),
            year: date.getFullYear(),
          },
          startHour,
          startMinute: date.getMinutes(),
          startPeriod,
          locationType: data.location || 'other',
          location2Type: data.location2 || 'other',
          showLocation: !(data.bartering === 'tutoring'),
          showEventType: data.bartering === 'tutoring',
          showLocation2: data.bartering === 'driving',
        });
      } catch (e) {
        this.setState({
          errorMsg: (
            <div id="barterRequestNotFound">
              <span>Barter request not found or has been deleted</span>
              <Link href="/">
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
      }
    }
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.onResize, false);
  }

  // eslint-disable-next-line react/sort-comp
  parseActivityDate(date, startHour, startMinute, startPeriod) {
    const { state } = this;
    const _date = date || state.date;
    if (_date) {
      const _startMinute = startMinute || state.startMinute;
      const _startPeriod = (startPeriod || state.startPeriod);
      let _startHour = parseInt(startHour || state.startHour, 10);
      if (_startHour < 1 || _startHour > 12
        || _startMinute < 0 || _startMinute > 59
        || !(['AM', 'PM'].includes(_startPeriod))) {
        return false;
      }
      _startHour = _startHour === 12 && _startPeriod === 'AM' ? 0 : _startHour;
      _startHour += _startPeriod === 'PM' && _startHour < 12 ? 12 : 0;
      const dateYear = _date.year;
      const dateMonth = _date.month;
      const numberDate = _date.day;

      console.log({
        dateYear,
        dateMonth,
        numberDate,
        hour: _startHour,
        _startMinute,
      });
      return new Date(dateYear, dateMonth - 1, numberDate, _startHour, _startMinute);
    }
    return false;
  }

  isValidDate(obj = {
    date: null, startHour: null, startMinute: null, startPeriod: null,
  }) {
    const { state } = this;
    const _date = obj.date || state.date;
    try {
      if (_date) {
        const _startHour = obj.startHour || state.startHour;
        const _startMinute = obj.startMinute || state.startMinute;
        const _startPeriod = obj.startPeriod || state.startPeriod;

        const dateTime = this.parseActivityDate(_date, _startHour, _startMinute, _startPeriod);
        console.log('date test objects : ', {
          _date,
          dateTime,
          Now: new Date(),
          evaluation: (new Date() < dateTime),
        });

        if (dateTime && dateTime.getTime()) {
          return new Date() < dateTime;
        }
      } else {
        console.log('didnt evevn make it ', {
          _date,
        });
      }

      return false;
    } catch (e) {
      console.log('unexpected err', e);
      return false;
    }
  }

  FrequencyField() {
    const { state } = this;
    return (
      <div id="frequency">
        <p className="form-label">Frequency <span className="error"> {state.frequencyError ? `: ${state.frequencyError}` : ''}</span></p>

        <InputPicker
          values={[state.frequency]}
          multichoice={false}
          className={state.frequencyError ? 'error' : ''}
          options={ActivityFrequencies.data.map((freq) => ({
            label: capitalize(freq.title),
            value: freq.id,
          }))}
          onChange={(values) => {
            this.setState({
              frequency: values[0],
              frequencyError: false,
            });
          }}
        />
      </div>
    );
  }

  setLocation(loc, extra) {
    this.setState({
      locationId: loc.locationId || '',
      streetAddress: loc.streetAddress || '',
      streetAddressError: false,
      apartment: loc.apartment || '',
      city: loc.city || '',
      cityError: false,
      state: loc.state || '',
      stateError: false,
      zipCode: loc.zipCode || '',
      zipCodeError: false,
      ...extra,
    });
  }

  setLocation2(loc, extra) {
    this.setState({
      location2Id: loc.locationId || '',
      streetAddress2: loc.streetAddress || '',
      streetAddress2Error: false,
      apartment2: loc.apartment || '',
      city2: loc.city || '',
      city2Error: false,
      state2: loc.state || '',
      state2Error: false,
      zipCode2: loc.zipCode || '',
      zipCode2Error: false,
      ...extra,
    });
  }

  EventType() {
    const { state } = this;
    return (
      <div id="activivtyTpes">
        <p className="form-label">Choose in-person or virtual event <span className="error"> {state.eventTypeError ? `: ${state.eventTypeError}` : ''}</span></p>
        <InputPicker
          values={[state.eventType]}
          multichoice={false}
          className={state.eventTypeError ? 'error' : ''}
          options={['virtual', 'in-person'].map((type) => ({
            label: capitalize(type),
            value: type,
          }))}
          onChange={(values) => {
            const eventType = values[0];
            this.setState({
              eventType,
              showLocation: eventType === 'in-person',
              eventTypeError: false,
            });
          }}
        />
      </div>
    );
  }

  Location(title = `${capitalize(this.state.bartering)} Location`) {
    const { state, props } = this;
    const { settings } = props;
    const { sessionUser } = settings;
    const { bartering } = state;
    const locations = ['home', 'other'];
    if (bartering === 'driving') {
      locations[1] = 'school';
      locations[2] = 'other';
    }
    return (
      <>
        {state.showLocation && (
          <div id="activivtyTpes">
            <p className="form-label">{title} <span className="error"> {state.locationTypeError ? `: ${state.locationTypeError}` : ''}</span></p>
            <InputPicker
              values={[state.locationType]}
              className={`${state.locationTypeError ? ' error' : ''}`}
              multichoice={false}
              options={locations.map((location) => ({
                label: location,
                value: location,
              }))}
              onChange={(values) => {
                const val = values[0];
                this.setState({
                  locationType: val,
                  locationTypeError: false,
                }, () => {
                  this.setLocation(val === 'home' ? this.HomeLocation : {});
                });
              }}
            />
          </div>
        )}
        {state.locationType === 'school' && (
          <div id="activivties">
            <p className="form-label">Select which kid's school <span className="error"> {state.locationSchoolKidError ? `: ${state.locationSchoolKidError}` : ''}</span></p>
            <InputPicker
              multichoice={false}
              values={[state.locationSchoolKid]}
              className={`${state.locationSchoolKidError ? ' error' : ''}`}
              options={sessionUser.kids.map((kid) => ({
                label: kid.preferredName,
                value: kid.id,
              }))}
              onChange={(values) => {
                const val = values[0];
                let kid = {};
                for (const k of sessionUser.kids) {
                  if (k.id === val) {
                    kid = k;
                    break;
                  }
                }
                this.setLocation({
                  locationId: kid.schoolId,
                  streetAddress: kid.schoolStreetAddress,
                  apartment: '',
                  city: kid.schoolCity,
                  state: kid.schoolState,
                  zipCode: kid.schoolZipCode,
                }, {
                  locationSchoolKid: val,
                  locationSchoolKidError: false,
                });
              }}
            />
          </div>
        )}
        {state.showLocation && locations.indexOf(state.locationType) > -1 && (
          <div id="activityLocation">
            <InputLocation
              type="text"
              label={(
                <>
                  Street Address  <span className="error"> {state.streetAddressError ? `: ${state.streetAddressError}` : ''}</span>
                </>
              )}
              readOnly={state.locationType !== 'other'}
              placeholder="street address"
              value={ucFirst(state.streetAddress)}
              className={`${state.streetAddressError !== false ? ' error' : ''}`}
              onChange={(value) => {
                this.setState({
                  locationId: '',
                  streetAddress: value,
                  city: '',
                  state: '',
                  zipCode: '',
                });
              }}
              onSelect={(value) => {
                console.log('PiCKED LOCATION', value);
                this.setState({
                  locationId: value.id,
                  streetAddress: value.formatted_address,
                  city: value.city,
                  state: value.state,
                  zipCode: value.zipCode,
                  streetAddressError: false,
                  cityError: false,
                  stateError: false,
                  zipCodeError: false,
                });
              }}
            />

            <InputField
              readOnly={state.locationType !== 'other'}
              type="text"
              label="Apt, Building, Suite, etc. (optional)"
              value={ucFirst(state.apartment)}
              placeholder="apt, building, suite, etc."
              onChange={(value) => {
                this.setState({
                  apartment: value,
                });
              }}
            />

            <InputField
              readOnly
              type="text"
              label={(
                <>
                  City  <span className="error"> {state.cityError ? `: ${state.cityError}` : ''}</span>
                </>
              )}
              placeholder="city"
              value={ucFirst(state.city)}
              className={`${state.cityError !== false ? ' error' : ''}`}
              onChange={(value) => {
                this.setState({
                  city: value,
                  cityError: isEmpty(value) ? false : state.cityError,
                });
              }}
            />

            <div className="double-field">
              <InputField
                type="text"
                label={(
                  <>
                    State  <span className="error"> {state.stateError ? `: ${state.stateError}` : ''}</span>
                  </>
                )}
                readOnly
                placeholder="state"
                value={ucFirst(state.state)}
                className={`${state.stateError !== false ? ' error' : ''}`}
                onChange={(value) => {
                  this.setState({
                    state: value,
                    stateError: isEmpty(value) ? false : state.stateError,
                  });
                }}
              />

              <InputField
                readOnly
                type="text"
                label={(
                  <>
                    Zip Code  <span className="error"> {state.zipCodeError ? `: ${state.zipCodeError}` : ''}</span>
                  </>
                )}
                placeholder="zip code"
                value={ucFirst(state.zipCode)}
                className={`${state.zipCodeError !== false ? ' error' : ''}`}
                onChange={(value) => {
                  this.setState({
                    zipCode: value,
                    zipCodeError: !isEmpty(value) ? false : state.zipCodeError,
                  });
                }}
              />
            </div>

          </div>
        )}
      </>
    );
  }

  Location2(title = `${capitalize(this.state.bartering)} Location`) {
    const { state, props } = this;
    const { settings } = props;
    const { sessionUser } = settings;
    const { bartering } = state;
    const locations = ['home', 'other'];
    if (bartering === 'driving') {
      locations[1] = 'school';
      locations[2] = 'other';
    }
    return (
      <>
        {state.showLocation && (
          <div id="activivtyTpes">
            <p className="form-label">{title} <span className="error"> {state.location2TypeError ? `: ${state.location2TypeError}` : ''}</span></p>
            <InputPicker
              values={[state.location2Type]}
              className={`${state.location2TypeError ? ' error' : ''}`}
              multichoice={false}
              options={locations.map((location) => ({
                label: location,
                value: location,
              }))}
              onChange={(values) => {
                const val = values[0];
                this.setState({
                  location2Type: val,
                  location2TypeError: false,
                }, () => {
                  this.setLocation2(val === 'home' ? this.HomeLocation : {});
                });
              }}
            />
          </div>
        )}
        {state.location2Type === 'school' && (
          <div id="activivties">
            <p className="form-label">Select which kid's school <span className="error"> {state.location2SchoolKidError ? `: ${state.location2SchoolKidError}` : ''}</span></p>
            <InputPicker
              multichoice={false}
              values={[state.location2SchoolKid]}
              className={`${state.location2SchoolKidError ? ' error' : ''}`}
              options={sessionUser.kids.map((kid) => ({
                label: kid.preferredName,
                value: kid.id,
              }))}
              onChange={(values) => {
                const val = values[0];
                let kid = {};
                for (const k of sessionUser.kids) {
                  if (k.id === val) {
                    kid = k;
                    break;
                  }
                }
                this.setLocation2({
                  locationId: kid.schoolId,
                  streetAddress: kid.schoolStreetAddress,
                  apartment: '',
                  city: kid.schoolCity,
                  state: kid.schoolState,
                  zipCode: kid.schoolZipCode,
                }, {
                  location2SchoolKid: val,
                  location2SchoolKidError: false,
                });
              }}
            />
          </div>
        )}
        {state.showLocation && locations.indexOf(state.location2Type) > -1 && (
          <div id="activityLocation">
            <InputLocation
              type="text"
              label={(
                <>
                  Street Address  <span className="error"> {state.streetAddress2Error ? `: ${state.streetAddress2Error}` : ''}</span>
                </>
              )}
              readOnly={state.location2Type !== 'other'}
              placeholder="street address"
              value={ucFirst(state.streetAddress2)}
              className={`${state.streetAddress2Error !== false ? ' error' : ''}`}
              onChange={(value) => {
                this.setState({
                  location2Id: '',
                  streetAddress2: value,
                  city2: '',
                  state2: '',
                  zipCode2: '',
                });
              }}
              onSelect={(value) => {
                console.log('PiCKED LOCATION', value);
                this.setState({
                  location2Id: value.id,
                  streetAddress2: value.formatted_address,
                  city2: value.city,
                  state2: value.state,
                  zipCode2: value.zipCode,
                  streetAddress2Error: false,
                  city2Error: false,
                  state2Error: false,
                  zipCode2Error: false,
                });
              }}
            />

            <InputField
              readOnly={state.location2Type !== 'other'}
              type="text"
              label="Apt, Building, Suite, etc. (optional)"
              value={ucFirst(state.apartment2)}
              placeholder="apt, building, suite, etc."
              onChange={(value) => {
                this.setState({
                  apartment2: value,
                });
              }}
            />

            <InputField
              readOnly
              type="text"
              label={(
                <>
                  City  <span className="error"> {state.city2Error ? `: ${state.city2Error}` : ''}</span>
                </>
              )}
              placeholder="city"
              value={ucFirst(state.city2)}
              className={`${state.city2Error !== false ? ' error' : ''}`}
              onChange={(value) => {
                this.setState({
                  city2: value,
                  city2Error: isEmpty(value) ? false : state.city2Error,
                });
              }}
            />

            <div className="double-field">
              <InputField
                type="text"
                label={(
                  <>
                    State  <span className="error"> {state.state2Error ? `: ${state.state2Error}` : ''}</span>
                  </>
                )}
                readOnly
                placeholder="state"
                value={ucFirst(state.state2)}
                className={`${state.state2Error !== false ? ' error' : ''}`}
                onChange={(value) => {
                  this.setState({
                    state2: value,
                    state2Error: isEmpty(value) ? false : state.state2Error,
                  });
                }}
              />

              <InputField
                readOnly
                type="text"
                label={(
                  <>
                    Zip Code  <span className="error"> {state.zipCode2Error ? `: ${state.zipCode2Error}` : ''}</span>
                  </>
                )}
                placeholder="zip code"
                value={ucFirst(state.zipCode2)}
                className={`${state.zipCode2Error !== false ? ' error' : ''}`}
                onChange={(value) => {
                  this.setState({
                    zipCode2: value,
                    zipCode2Error: !isEmpty(value) ? false : state.zipCode2Error,
                  });
                }}
              />
            </div>

          </div>
        )}
      </>
    );
  }

  validateForm() {
    const { props, state: State } = this;
    const { settings } = props;
    const { sessionUser } = settings;

    if (!State.submitting) {
      const {
        kidsToAttend,
        date,
        duration,
        frequency,
        eventType,
        locationId,
        locationType,
        streetAddress,
        city,
        state,
        zipCode,
        location2Type,
        location2Id,
        streetAddress2,
        city2,
        state2,
        zipCode2,
        startHour,
        startMinute,
        startPeriod,
        locationSchoolKid,
        location2SchoolKid,
        showEventType,
        showLocation,
        showLocation2,
      } = State;

      const fields = {
        duration,
        eventType,
        date: this.parseActivityDate(date, startHour, startMinute, startPeriod), // <== merges time and date into a date object or returns false
        kidsToAttend,
        frequency,
        locationType,
        locationId,
        location2Type,
        location2Id,
      };

      let isValid = true;
      const errors = {};

      const locationError = (forceError = false) => {
        if (isEmpty(state)) {
          isValid = false;
          errors.stateError = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.stateError = Messages.forms.validationError.invalidValue;
        }

        if (isEmpty(city)) {
          isValid = false;
          errors.cityError = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.cityError = Messages.forms.validationError.invalidValue;
        }

        if (isEmpty(streetAddress)) {
          isValid = false;
          errors.streetAddressError = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.streetAddressError = Messages.forms.validationError.invalidValue;
        }

        if (isEmpty(zipCode)) {
          isValid = false;
          errors.zipCodeError = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.zipCodeError = Messages.forms.validationError.invalidValue;
        }
      };

      const location2Error = (forceError = false) => {
        if (isEmpty(state2)) {
          isValid = false;
          errors.state2Error = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.state2Error = Messages.forms.validationError.invalidValue;
        }

        if (isEmpty(city2)) {
          isValid = false;
          errors.city2Error = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.city2Error = Messages.forms.validationError.invalidValue;
        }

        if (isEmpty(streetAddress2)) {
          isValid = false;
          errors.streetAddress2Error = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.streetAddress2Error = Messages.forms.validationError.invalidValue;
        }

        if (isEmpty(zipCode2)) {
          isValid = false;
          errors.zipCode2Error = Messages.forms.validationError.empty;
        } else if (forceError) {
          isValid = false;
          errors.zipCode2Error = Messages.forms.validationError.invalidValue;
        }
      };

      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        // console.log('validating activity form', { key, value });
        if (key === 'eventType' && showEventType) {
          if (isEmpty(value)) {
            isValid = false;
            errors[`${key}Error`] = Messages.forms.validationError.pickOne;
          } else {
            errors[`${key}Error`] = false;
          }
        }

        if (key === 'date') {
          if (!date || !this.isValidDate({
            date, startHour, startMinute, startPeriod,
          })) {
            isValid = false;
            errors[`${key}Error`] = 'invalid date or time';
          } else {
            errors[`${key}Error`] = false;
          }
        }

        if ([
          'kidsToAttend',
          'frequency',
        ].indexOf(key) > -1) {
          if (value === undefined || value.length === 0) {
            isValid = false;
            errors[`${key}Error`] = Messages.forms.validationError.pickOne;
          } else {
            errors[`${key}Error`] = false;
          }
        }

        if (key === 'locationType') {
          if (showEventType) {
            if (eventType === 'in-person') {
              if (isEmpty(locationType)) {
                isValid = false;
                errors.locationTypeError = Messages.forms.validationError.pickOne;
              } else if (locationType === 'other') {
                locationError();
              }
            }
          } else if (isEmpty(locationType)) {
            isValid = false;
            errors.locationTypeError = Messages.forms.validationError.pickOne;
          } else if (locationType === 'other' || locationType === 'school') {
            if (locationType === 'school') {
              if (isEmpty(locationSchoolKid)) {
                errors.locationSchoolKidError = Messages.forms.validationError.pickOne;
              }
            }
            locationError();
          }
        }

        if (key === 'location2Type' && showLocation2) {
          if (isEmpty(location2Type)) {
            isValid = false;
            errors.location2TypeError = Messages.forms.validationError.pickOne;
          } else if (location2Type === 'other' || location2Type === 'school') {
            if (location2Type === 'school') {
              if (isEmpty(location2SchoolKid)) {
                errors.location2SchoolKidError = Messages.forms.validationError.pickOne;
              }
            }

            location2Error();
          }
        }
      });

      console.log('COMPARING THEM GUYS : ', {
        location2Id,
        locationId,
      });
      if (!isEmpty(locationId) && !isEmpty(location2Id) && locationId === location2Id) {
        locationError(true);
        location2Error(true);
      }

      console.log('validation erros', errors);
      this.setState({
        ...this.defaultErrorState,
        ...errors,
      });

      if (isValid) {
        return true;
      }

      popAlert({
        title: Messages.forms.validationError.title,
        description: Messages.forms.validationError.message,
        error: true,
      });
      return false;
    }
  }

  SelectRecipientType() {
    const { props, state: State } = this;
    const { settings } = props;
    const { sessionUser } = settings;

    return (
      <PopMessage
        show={State.initregistration}
        message={(
          <div id="createBarterSelectRecipientType">
            <p style={{ fontSize: '1.5em' }} className="title">Who do you want to send your request to</p>
            <br />
            <br />

            <button
              type="button"
              className=" btn btn-2"
              onClick={() => {
                this.submitForm('tribe');
              }}
            >TRIBE
            </button>
            <button
              type="button"
              className=" btn btn-3"
              onClick={() => {
                this.setState({
                  pickRecipients: true,
                  proceedToSubmit: false,
                });
              }}
            >PERSON(S)
            </button>
            <button
              type="button"
              className=" btn btn-5"
              onClick={() => {
                this.submitForm('village');
              }}
            >VILLAGE
            </button>
          </div>
        )}
        confirmButton={{
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          this.setState({
            proceedToSubmit: false,
          });
        }}
      />
    );
  }

  PickRecipients() {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;
    const suggestions = [
      { id: 'gdfljk' },
      { id: 'gdfljk' },
      { id: 'gdfljk' },
      { id: 'gdfljk' },
      { id: 'gdfljk' },
      { id: 'gdfljk' },
      { id: 'gdfljk' },
    ];
    const searchReult = [{
      id: 'gdfljk',
    }];
    return (
      <PopMessage
        show={state.initregistration}
        message={(
          <div id="finHelpPickerUsersPopUp">
            <SearchBar />
            <div className="results">
              <RequestFindUserResult
                title="Recommended Suggestions"
                result={suggestions}
              />
              <RequestFindUserResult
                title="Search Result"
                result={searchReult}
              />
            </div>
            <button
              type="button"
              className="btn btn-1"
              style={{ margin: '0px auto', marginTop: '2em', width: 'max-content' }}
            >FINISH
            </button>
          </div>
        )}
        confirmButton={{
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          this.setState({
            pickRecipients: false,
          });
        }}
      />
    );
  }

  async submitForm(postTo) {
    const { state: State, props } = this;
    console.log('submitting : ', State.submitting);
    if (!State.submitting) {
      const {
        kidsToAttend,
        date,
        duration,
        frequency,
        eventType,
        locationId,
        locationType,
        location2Type,
        location2Id,
        description,
        startHour,
        startMinute,
        startPeriod,
        bartering,
        location2SchoolKid,
        locationSchoolKid,
      } = State;

      this.setState({
        submitting: true,
      });

      try {
        const data = await props.fetchRequest({
          url: `${process.env.REACT_APP_API}/barter${props.editRequest ? `/all/${props.requestId}` : `/${bartering}`}`,
          method: props.editRequest ? 'PATCH' : 'POST',
          body: JSON.stringify({
            postTo,
            duration,
            eventType,
            date: parseTimeToGMT(this.parseActivityDate(date, startHour, startMinute, startPeriod)), // <== merges time and date into a date object or returns false
            kids: kidsToAttend,
            frequency,
            locationType,
            locationId,
            locationSchoolKid,
            location2Type,
            location2Id,
            location2SchoolKid,
            description,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (this._isMounted && data) {
          console.log('datat we get is ', data);
          // if()
          this.setState(this.defaultState);
          if (props.editRequest) {
            popAlert({
              title: 'Request Updated Successfully',
            });
            Router.back();
          } else {
            popAlert({
              title: 'Post Successful',
              description: (
                <>
                  <p style={{ marginBottom: '2em' }}>Number of credit used per child:</p>
                  <h2 className="timberline-font" style={{ margin: '0', lineHeight: '1' }}>{props.getActivityCredit(duration)}</h2>
                </>
              ),
            });
            Router.push('/');
          }
        }
      } catch (erroRes) {
        console.log('the actual error is : ', erroRes);
        if (this._isMounted) {
          const { data, status } = erroRes;
          const { error, message } = data;

          if (status === 400) {
            let errors = {};
            if (message.location) {
              errors = {
                ...errors,
                streetAddressError: false,
                cityError: false,
                stateError: false,
                zipCodeError: false,
              };
            }
            if (message.location2) {
              errors = {
                ...errors,
                streetAddress2Error: false,
                city2Error: false,
                state2Error: false,
                zipCode2Error: false,
              };
            }

            this.setState({
              submitting: false,
              ...errors,
            });

            popAlert({
              title: Messages.forms.validationError.title,
              description: Messages.forms.validationError.message,
              error: true,
            });
          } else {
            Router.push('/');
          }
        }
      }
    }
  }

  render() {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;
    const {
      bartering, showEventType, showLocation2, showLocation,
    } = state;

    if (state.loading) {
      return (
        <Layout {...props}>
          <PageLoader inline />
        </Layout>
      );
    }

    let duration = Math.floor(state.duration / 60);
    if (duration === 0) {
      duration = `${state.duration}mins`;
    } else {
      const mins = state.duration % 60;
      duration = `${duration}hr${duration > 1 ? 's' : ''} ${mins > 0 ? `${mins}mins` : ''}`;
    }

    return (
      <Layout {...props}>
        <div id="findHelp">
          <SwitchPage
            label="Back"
            direction="left"
            onClick={() => {
              Router.back();
            }}
          />
          {
            state.errorMsg || (
              <>
                <div className="page-header">
                  <div className="left">
                    <h1 className="title">{bartering}</h1>
                    <h3 className="sub-title">Details</h3>
                  </div>
                </div>

                <div className="form-container hmv-element" type={bartering}>
                  <div className="forms">
                    <div className="form left">
                      <div id="activivties">
                        <p className="form-label">Select which kid(s) you need help with  <span className="error"> {state.kidsToAttendError ? `: ${state.kidsToAttendError}` : ''}</span></p>
                        <InputPicker
                          values={state.kidsToAttend}
                          className={`${state.kidsToAttendError ? ' error' : ''}`}
                          options={sessionUser.kids.map((kid) => ({
                            label: kid.preferredName,
                            value: kid.id,
                          }))}
                          onChange={(values) => {
                            this.setState({
                              kidsToAttend: values,
                              kidsToAttendError: false,
                            });
                          }}
                        />
                      </div>

                      <div id="dayAndTime">
                        <p className="form-label">
                          <>
                            Pick a Date & Time <span className="error"> {state.dateError ? `: ${state.dateError}` : ''}</span>
                          </>
                        </p>

                        <div className="content">
                          <div className="day option">
                            <span className="option-label">Date</span>
                            <InputDatePicker
                              // multichoice
                              minDate={Date.now()}
                              values={[state.date]}
                              className={`preview thin ${state.dateError !== false ? ' error' : ''}`}
                              onChange={(date) => {
                                if (date) {
                                  this.setState({
                                    date: date[0],
                                    dateError: this.isValidDate({ date: date[0] }) ? false : state.dateError,
                                  });
                                }
                              }}
                            />
                          </div>

                          <div className="start-time option" ref={(e) => { this.startTime = e; }}>
                            <span className="option-label">Start Time</span>
                            <InputTime
                              hour={state.startHour}
                              minute={state.startMinute}
                              period={state.startPeriod}
                              className="preview"
                              buttonClassName={`preview${state.dateError !== false ? ' error' : ''}`}
                              onChange={({ hour: startHour, minute: startMinute, period: startPeriod }) => {
                                this.setState({
                                  startHour,
                                  startMinute,
                                  startPeriod,
                                  dateError: this.isValidDate({ startHour, startMinute, startPeriod }) ? false : state.dateError,
                                });
                              }}
                            />
                          </div>

                          <div className="duration option">
                            <span className="option-label">Duration</span>
                            <div className="preview btn btn-default bordered __pill thin">
                              <button
                                type="button"
                                className="cntrl up fa icon-minus"
                                onClick={() => {
                                  const durtn = state.duration - 15;
                                  this.setState({ duration: durtn < 15 ? 15 : durtn });
                                }}
                              />
                              <span>{duration}</span>
                              <button
                                type="button"
                                className="cntrl up fa icon-add"
                                onClick={() => {
                                  this.setState({ duration: state.duration + 15 });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {bartering !== 'driving' && this.FrequencyField()}

                      {showLocation2 && this.Location2(bartering === 'driving' ? 'Pick-up Location' : null)}

                    </div>

                    <div className="form right">

                      {bartering === 'driving' && this.FrequencyField()}
                      {showEventType && this.EventType()}
                      {this.Location(bartering === 'driving' ? 'Drop-off Location' : undefined)}
                    </div>
                  </div>
                  <InputField
                    id="description"
                    type="textarea"
                    label={(
                      <>
                        Write a Brief Description<span className="error"> {state.descriptionError ? `: ${state.descriptionError}` : ''}</span>
                      </>
                    )}
                    // placeholder="Any other thing you want us to know?"
                    value={ucFirst(state.description)}
                    className={`${state.descriptionError !== false ? ' error' : ''}`}
                    onChange={(value) => {
                      this.setState({
                        description: value,
                        descriptionError: isEmpty(value) ? state.descriptionError : false,
                      });
                    }}
                  />
                </div>

                <div className="actions">
                  <button
                    type="button"
                    className={`btn btn-1 proceed-btn${state.submitting ? ' disabled' : ''}`}
                    // onClick={this.submitForm}
                    onClick={() => {
                      if (this.validateForm()) {
                        this.setState({ proceedToSubmit: true });
                      }
                    }}
                  >
                    <span> POST </span>
                    {state.submitting ? <span className="icon-refresh icon spinner" /> : ''}
                  </button>
                </div>
                {state.proceedToSubmit && this.SelectRecipientType()}
                {state.pickRecipients && this.PickRecipients()}
              </>
            )
          }
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  sessionUserAddKid: (kid) => dispatch(sessionUserAddKid(kid)),
  sessionUserUpdateKid: (kidId, props) => dispatch(sessionUserUpdateKid(kidId, props)),
  sessionUserDeleteKid: (kidId) => dispatch(sessionUserDeleteKid(kidId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RequestHelpForm);
