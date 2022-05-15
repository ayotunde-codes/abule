import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import $ from 'jquery';
import moment from 'moment';
import {
  Fn,
  InputField, InputPicker, InputDatePicker, InputWeekDays, InputDuration,
} from '@abule-common/components';
import Layout from '../components/general/Layout';

import {
  resetInfo, saveChanges, setSupport, setInfo,
  setInfo as setSettingInfo,
} from '../redux/edit-profile/action';
import { Messages } from '../public/data/assets';
import {
  ActivityFrequencies, Categories, AgeGroups, ActivityTypes, Utils,
} from '../datastore';

const {
  ucFirst,
  isEmpty,
  isDate,
  capitalize,
  popAlert,
  delay,
  getMonth,
  getWeekDay,
  padString,
  parseDateToDateObj,
  popPrompt,
} = Fn;

const defaultState = {
  id: null,
  name: '',
  nameError: false,
  hostBio: '',
  hostBioError: false,
  materials: '',
  materialsError: false,
  description: '',
  descriptionError: false,
  type: '',
  typeError: false,
  locationType: '',
  locationId: '',
  streetAddress: '',
  locationIdError: false,
  apartment: '',
  loc: '',
  city: '',
  cityError: false,
  state: '',
  stateError: false,
  zipCode: '',
  zipCodeError: false,
  date: [],
  startDate: [{
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  }],
  endDate: [],
  days: {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  },
  dateError: false,
  startHour: null,
  startMinute: null,
  startPeriod: null,
  duration: 15,
  frequency: false,
  frequencyError: false,
  category: [],
  categoryError: false,
  ageGroups: [],
  ageGroupsError: false,
  photos: [],
  photosError: false,
  /// ///////////////////////////////////////////////
  submitting: false,
};
class HostActivity extends React.Component {
  constructor(props) {
    super(props);

    defaultState.type = ActivityTypes.findByTitle('virtual').id;
    // defaultState.frequency = ActivityFrequencies.findByTitle('one-time').id;
    this.state = {
      ...defaultState,
      screenHeight: window.innerHeight,
      disableNext: false,
      disablePrevious: false,
      showWelcomeNote: false,
      showKidWelcomeNote: false,
      showKidFinishNote: false,
      activeStep: 0,
      formType: 'profile',
    };

    this._isMounted = false;
    this.fields = {
      name: null,
      hostBio: null,
      materials: null,
      description: null,
      type: null,
      locationType: null,
      locationId: null,
      ageGroups: null,
      frequency: null,
      date: null,
      days: null,
      startDate: null,
      endDate: null,
      category: null,
      photos: null,
    };
    this.minMedia = 3;
    this.maxMedia = 5;
    this.photoDragging = false;
    this.meidaInputPicker = null;
    this.startTime = null;
    this.formActions = null;
    this.startTimeToolTip = null;
    this.submitChanges = this.submitChanges.bind(this);
    this.photosPickHandler = this.photosPickHandler.bind(this);
    this.onWindowsUpdate = () => {
      this.setState({
        screenHeight: window.innerHeight,
      });
    };
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { isEditActivity, settings } = props;
    const { sessionUser } = settings;
    window.addEventListener('resize', this.onWindowsUpdate);

    props.onPageLoad();
    if (isEditActivity) {
      const activity = { ...props.Activity };
      const dates = [];
      if (activity.dates) {
        activity.dates.map((date) => {
          const dateObj = new Date(date);
          const value = {
            year: dateObj.getFullYear(),
            month: dateObj.getMonth() + 1,
            index: dateObj.getDate(),
            day: dateObj.getDate(),
            duration: null,
            weekDay: dateObj.getDay(),
            time: {
              hour: dateObj.getHours() < 1 ? 12 : dateObj.getHours(),
              minute: padString(dateObj.getMinutes(), '0', 2),
              period: 'AM',
            },
          };

          if (value.time.hour > 12) {
            value.time.hour -= 12;
            value.time.period = 'PM';
          }

          value.time.hour = padString(value.time.hour, '0', 2);
          dates.push(value);
        });
      }
      const days = {};
      const daysPatch = {};
      if (activity.days) {
        const d = new Date()/* toISOString */;
        const offset = (d.getTimezoneOffset() * 60) * 1000;
        Object.keys(activity.days).forEach((day) => {
          const times = activity.days[day] || [];

          const newTimes = days[day] || [];
          times.forEach((time) => {
            let timeHour = time.hour;
            let dateObj = new Date();
            dateObj.setUTCHours(time.hour);
            // adjust date object till day matches the desired day
            while (true) {
              if (getWeekDay(dateObj.getUTCDay()) === day) {
                break;
              }
              dateObj = new Date(`${dateObj.getUTCFullYear()}-${dateObj.getUTCMonth() + 1}-${dateObj.getUTCDate() + 1} ${timeHour}:${time.minute}:00.000 +00:00`);
            }
            console.log('date object', dateObj);
            timeHour = dateObj.getHours();
            const realDay = getWeekDay(dateObj.getDay());
            const value = {
              time: {
                hour: timeHour,
                minute: padString(time.minute, '0', 2),
                period: 'AM',
              },
            };

            if (timeHour < 1) {
              value.time.hour = 12;
            } else if (value.time.hour >= 12) {
              console.log(';we adding pm', value);
              value.time.hour = value.time.hour > 12 ? value.time.hour - 12 : value.time.hour;
              value.time.period = 'PM';
            }

            value.time.hour = padString(value.time.hour, '0', 2);
            if (realDay === day) {
              newTimes.push(value);
            } else if (daysPatch[realDay]) {
              daysPatch[realDay].push(value);
            } else {
              daysPatch[realDay] = [value];
            }
          });
          days[day] = newTimes;
        });
      }

      // console.log({ days, daysPatch });
      // merge and sort days
      Object.keys(daysPatch).forEach((day) => {
        days[day] = days[day].concat(daysPatch[day]);
      });

      const photos = activity.mediaUrls.map((media) => {
        const me = '';
        return {
          oldValue: true,
          preview: media.url,
          id: media.id,
          file: {
            type: 'image/jpeg',
          },
          uploaded: true,
          uploading: false,
          error: null,
          assemblyId: '',
        };
      });
      this.setState({
        id: activity.id,
        name: activity.name,
        hostBio: activity.hostBio,
        materials: activity.materials,
        description: activity.description,
        type: activity.type,
        locationType: activity.locationType,
        locationId: activity.locationId,
        streetAddress: activity.streetAddress,
        apartment: activity.apartment,
        city: activity.city,
        state: activity.state,
        startDate: [parseDateToDateObj(activity.startDate)],
        endDate: [parseDateToDateObj(activity.endDate)],
        zipCode: activity.zipCode,
        frequency: activity.frequency,
        category: activity.category,
        ageGroups: activity.ageGroups,
        duration: activity.duration,
        days,
        date: dates,
        photos,
      });
    }
    /* popAlert({
      title: 'Activity Submitted',
      description: (
        <div>
          <p>Your activity has been submitted for review.</p>
          <p>We will notify you of the status via email within the next</p>
          <p>48 hours.</p>
        </div>
      ),
    }); */
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.onWindowsUpdate, false);
  }

  async processMediaFile(media) {
    const { props, state } = this;
    let mediaAssemblyId = null;
    let mediaError = null;
    let photos = state.photos.map((Media) => {
      if (media.id === Media.id) {
        Media.uploading = true;
      }
      return Media;
    });
    this.setState({ photos });
    try {
      const { assemblyId, assembly } = await props.processFiles('activity-media', [media.file]);
      mediaAssemblyId = assemblyId;
    } catch (e) {
      mediaError = true;
      console.log('THERE WAS AN UNFORTUNATE ERROR WHILE PROCESSINIG FILES', e);
    }
    photos = this.state.photos.map((Media) => {
      if (media.id === Media.id) {
        Media.uploaded = true;
        Media.uploading = false;
        Media.error = mediaError;
        Media.assemblyId = mediaAssemblyId;
      }
      return Media;
    });
    this.setState({ photos });
  }

  async photosPickHandler(event) {
    const { state, props } = this;
    const { target } = event;
    const { files } = target;
    const space = this.maxMedia - state.photos.length;
    // console.log({ maxMedia: this.maxMedia, length: this.state.photos.length, space });
    const arr = [];
    const imageTypes = [
      'image/gif',
      'image/jpg',
      'image/jpeg',
      'image/png',
      'image/webp',
    ];
    const videoTypes = [
      'video/mp4',
      'video/quicktime',
      'video/MP2T',
      'video/3gpp',
      'video/x-msvideo',
    ];

    if (space > 0) {
      for (const file of files) {
        if (arr.length < space) {
          if (
            imageTypes.includes(file.type)
            || videoTypes.includes(file.type)
          ) {
            if ((imageTypes.includes(file.type) && file.size < 10485760) // <== 10mb
              || (videoTypes.includes(file.type) && file.size < 52428800)) { // <== 50mb
              await delay(1000);
              const id = Date.now();
              // alert(`the value id of file accepted is : ${id}, the name of the file is : ${file.name}`);

              arr.push({
                preview: URL.createObjectURL(file),
                file,
                id,
                uploaded: false,
                uploading: false,
              });
            } else {
              popAlert({
                title: 'File too large',
                description: "Videos can't be more than 50mb and images can't be more than 10mb",
                error: true,
              });
            }
          } else {
            // alert(`you selected an unacceptable file type (${file.type})`);
          }
        } else break;
      }

      if (arr.length > 0) {
        // alert(`every id at the end of the day is : ${arr.map((a) => (a.id)).join(',')}`);
        this.setState((prev) => ({
          photos: [...prev.photos, ...arr],
          photosError: false,
        }));
      } else {
        // alert('you didnt select any acceptable file');
      }
    } else {
      // alert('you have already uploaded the maximum amount of media acceptable');
    }
    target.value = null;
  }

  parseActivityDates(dates) {
    const { state } = this;
    const _dates = dates;
    if (_dates) {
      const result = [];
      _dates.forEach((dateObj) => {
        if (dateObj && dateObj.year && dateObj.month && dateObj.day && dateObj.time) {
          // eslint-disable-next-line prefer-const
          let { minute, hour, period } = dateObj.time;
          hour = Number(hour);
          hour += period === 'PM' && hour < 12 ? 12 : 0;
          console.log('first hour', { hour });
          hour = hour > 11 && period === 'AM' ? 0 : hour;

          const date = new Date(
            dateObj.year,
            dateObj.month - 1,
            dateObj.day,
            hour,
            minute,
          );

          console.log('AFTER PARSE : ', {
            dateObj, hour, date, duration: dateObj.duration,
          });
          result.push(date);
        }
      });

      // console.log({
      //   dateYear,
      //   dateMonth,
      //   numberDate,
      //   hour: _startHour,
      //   _startMinute,
      // });
      return result;
    }
    return false;
  }

  isValidDate(dateObj) {
    if (!dateObj) return false;
    const date = new Date(dateObj.year, dateObj.month, dateObj.day);

    if (date && date.getDate()) {
      return date;
    }
    return false;
  }

  isValidWeekDays(obj) {
    for (const day of Object.keys(obj)) {
      if (obj[day].length > 0) {
        return true;
      }
    }
    return false;
  }

  positionMedia(newIndex) {
    if (this.photoDragging !== false) {
      const { props, state } = this;
      const { photos } = state;
      // reordeer the list
      const newPhotos = [];
      photos.forEach((media, index) => {
        if (index !== this.photoDragging) {
          if (newIndex > this.photoDragging) newPhotos.push(media);
          if (newPhotos.length === newIndex) {
            newPhotos.push(photos[this.photoDragging]);
          }
          if (newIndex < this.photoDragging) newPhotos.push(media);
        }
      });

      this.setState({
        photos: newPhotos,
      }, () => {
        this.photoDragging = newIndex;
      });
    }
  }

  sortDates(dates) {
    const parseDate = (date) => new Date(date.year, date.month, date.date);

    dates.sort((a, b) => {
      const scoreA = parseDate(a);
      const scoreB = parseDate(b);

      if (scoreA < scoreB) {
        return -1;
      }
      if (scoreA > scoreB) {
        return 1;
      }
      return 0;
    });
    return dates;
  }

  removeSelectedDate(date) {
    const { props } = this;
    const { date: selectedDates } = this.state;
    const newSelectedDates = [];
    for (const selectedDate of selectedDates) {
      if (
        !(
          selectedDate
          && date.year === selectedDate.year
          && date.month === selectedDate.month
          && date.day === selectedDate.day
        )
      ) {
        newSelectedDates.push(selectedDate);
      }
    }

    this.setState({
      date: newSelectedDates,
    });
  }

  removeSelectedDay(day) {
    const { days } = this.state;

    this.setState({
      days: {
        ...days,
        [day]: [],
      },
    });
  }

  isNotEmptyDays() {
    const { days } = this.state;

    for (const day of Object.keys(days)) {
      if (days[day].length > 0) return true;
    }

    return false;
  }

  getPositionInMonth(date, returnJSON = false) {
    const { index } = date;

    if (index === null) return false;
    const dateObject = moment();
    dateObject.set('year', date.year);
    dateObject.set('month', date.month - 1);
    dateObject.set('date', date.day);
    const DaysInMonth = dateObject.daysInMonth();
    const firstDay = moment(dateObject)
      .startOf('month')
      .format('d');

    // create blanks
    const daysInMonth = [];
    const rows = [];
    let cells = [];

    for (let i = 0; i < firstDay; i++) {
      // daysInMonth.push(<td className="calendar-day empty">{""}</td>);
      daysInMonth.push(null);
    }

    for (let d = 1; d <= DaysInMonth; d += 1) {
      daysInMonth.push(d);
    }

    // divide the days into weeks
    daysInMonth.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === daysInMonth.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let WeekIndex = 0;
    let DayIndex = 0;
    console.log('THE DAYS IN A MONTH IS : ', { daysInMonth, rows, index });
    rows.forEach((week, weekIndex) => {
      console.log('the week and index', { weekIndex, week });
      for (let dayIndex = 0; dayIndex < week.length; dayIndex += 1) {
        if (week[dayIndex] === index) {
          WeekIndex = weekIndex;
          DayIndex = dayIndex;
          break;
        }
      }
    });

    let weekIndex = 0;
    // after getting day index check its position
    for (let i = 1; i <= WeekIndex; i += 1) {
      const week = rows[i];
      console.log('WEEK IN HERE IS: ', week);
      if (week[DayIndex] !== null) {
        weekIndex++;
      }
    }

    console.log('INTHE END : ', { WeekIndex, weekIndex, DayIndex });
    const day = getWeekDay(DayIndex);
    // check if first row has the day

    const Week = (i) => {
      if ((DaysInMonth - index) < 7) {
        return 'last';
      }
      switch (i) {
        case (1): {
          return '1st';
        }
        case (2): {
          return '2nd';
        }
        case (3): {
          return '3rd';
        }
        default: {
          return `${i}th`;
        }
      }
    };

    if (returnJSON) {
      return {
        day,
        weekIndex,
      };
    }
    return `${Week(weekIndex)} ${capitalize(day)}`;
  }

  swapProfileContent(dir, steps) {
    // alert('you clicked');
    const newActiveStep = this.state.activeStep + (dir === 'backward' ? -1 : 1);
    if (steps[newActiveStep]) {
      this.setState({
        swappingProfileContentLeft: dir === 'backward',
        swappingProfileContentRight: dir !== 'backward',
      }, () => {
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

  getMinDOB() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - AgeGroups.maxAge);
    return date;
  }

  async submitForm(fields, finish) {
    const { state, props } = this;
    const { settings, isEditActivity } = props;
    const { sessionUser } = props.settings;

    const {
      duration,
      hostBio,
      materials,
      description,
      name,
      type,
      frequency,
      category,
      ageGroups,
      photos,
      locationType,
      locationId,
      date,
      days,
      startDate,
      endDate,
    } = state;

    console.log(this.fields);
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
        if (key === 'interests') {
          extraState.interestsErrorBad = true;
        }
        Errors[`${errorKey}Error`] = value;
        // }
      });
      this.setState({
        ...Errors,
        ...extraState,
      });
    };

    const validate = () => {
      let isValid = true;
      const errors = {};
      const noEmptyField = [
        'hostBio',
        'description',
        'name',
      ];
      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        // console.log({ key, value }, { editProfile });
        if (noEmptyField.indexOf(key) > -1) {
          if (isEmpty(value)) {
            isValid = false;
            errors[`${key}`] = 'can\'t be empty';
          } else if ([
            'hostBio',
            'description',
          ].indexOf(key) > -1) {
            console.log('the  value', { value, min: Utils.getValue('MinActivityDescriptionLen') });
            if (value.length < Utils.getValue('MinActivityDescriptionLen')) {
              isValid = false;
              errors[`${key}`] = `needs to be at least ${Utils.getValue('MinActivityDescriptionLen')} characters long`;
            }
          }
        } else if (key === 'frequency') {
          if (!value) {
            isValid = false;
            errors[`${key}`] = Messages.forms.validationError.pickOne;
          }
        } else if (key === 'date') {
          if (
            (
              !frequency
              || !['weekly', 'bi-weekly'].includes(ActivityFrequencies.find(frequency).title)
            )
            && value.length === 0
          ) {
            isValid = false;
            errors[`${key}`] = 'select date';
          } else {
            this.parseActivityDates(value);
          }
        } else if (key === 'days') {
          if (
            (
              !frequency
              || ['weekly', 'bi-weekly'].includes(ActivityFrequencies.find(frequency).title)
            )
            && !this.isValidWeekDays(value)
          ) {
            isValid = false;
            errors[`${key}`] = 'select day';
          }
        } else if ([
          'endDate',
          'startDate',
        ].indexOf(key) > -1 && (frequency && !['one-time'].includes(ActivityFrequencies.find(frequency).title))) {
          console.log('we comparing ', {
            validaDate: this.isValidDate(value[0]),
            date: new Date(),
          });
          if (!value[0]
            || !this.isValidDate(value[0])
            || (key === 'endDate' && this.isValidDate(value[0]) < new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate() + 1, // added one day
            ))
          ) {
            isValid = false;
            errors[`${key}`] = Messages.forms.validationError.invalidValue;
          }
          if (
            fields.startDate[0] && fields.endDate && fields.endDate[0]
            && this.isValidDate(fields.startDate[0]) >= this.isValidDate(fields.endDate[0])
          ) {
            isValid = false;
            errors[`${'endDate'}`] = Messages.forms.validationError.invalidValue;
          }
        } else if ([
          'category',
          'ageGroups',
          'type',
        ].indexOf(key) > -1) {
          if (value === undefined || value.length === 0) {
            isValid = false;
            errors[`${key}`] = Messages.forms.validationError.pickOne;
          }

          if (key === 'type' && ActivityTypes.find(value).requireLocation) {
            if (isEmpty(locationType)) {
              isValid = false;
              errors.locationType = Messages.forms.validationError.pickOne;
            } else if (locationType === 'other') {
              if (isEmpty(locationId)) {
                isValid = false;
                errors.locationId = 'can\'t be empty';
              }
            }
          }
        } else if (key === 'photos') {
          let gotImage = false;
          let isError = false;
          if (value !== undefined) {
            if (value.length < this.minMedia) {
              isValid = false;
              errors[`${key}`] = `You need a minimum of ${this.minMedia} files`;
            }
            for (const media of value) {
              console.log({ media });
              if (media.file.type.split('/')[0] === 'image') {
                gotImage = true;
              }

              if (media.error) {
                isError = 'remove unaccepted file or reload';
              }
            }
          }

          if (!gotImage) {
            isValid = false;
            errors[`${key}`] = 'Thumbnail image required';
          } else if (isError) {
            errors[key] = isError;
          }
        } else if (key === 'photoAssemblyId' && isEmpty(value) && isEmpty(editProfile.imageUrl)) {
          isValid = false;
          errors[key] = 'Select a display image';
        }
      });

      parseFieldsError(errors);
      return isValid;
    };

    const proceedToSubmit = async (callback = () => { }) => {
      this.setState({
        submitting: true,
      });

      const form = {
        submitActivity: finish,
      };
      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        if (value !== undefined && value !== null) {
          if (key === 'photos') {
            form.media = value.map((media) => (
              media.oldValue ? {
                id: media.id,
              } : media.assemblyId));
          } else if (key === 'days') {
            const newValue = {
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
              sunday: [],
            };
            console.log('THE DAY NOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
            const getRep = (Day) => {
              let day = 1;
              while (true) {
                const now = new Date();
                const d = new Date(now.getFullYear(), now.getMonth(), day, 0, 0);
                console.log('we inside ', { d, day });
                if (Day.toLowerCase() === getWeekDay(d.getDay()).toLowerCase()) {
                  return d;
                }
                day += 1;
              }
            };

            for (const day of Object.keys(value)) {
              value[day].forEach((_time, index) => {
                const rep = getRep(day);
                console.log('THE DAY ', { day, _time });
                let { hour, minute, period } = _time.time;
                hour = parseInt(hour, 10);
                if (hour === 12 && period === 'AM') {
                  hour = 0;
                }
                if (period === 'PM' && hour !== 12) {
                  hour += 12;
                }

                rep.setHours(hour);
                rep.setMinutes(minute);
                console.log('the date rep is: ', rep);

                newValue[getWeekDay(rep.getUTCDay())].push({
                  time: {
                    hour: rep.getUTCHours(),
                    minute: rep.getUTCMinutes(),
                  },
                });
              });
            }
            form[key] = newValue;
          } else if (key === 'date') {
            form.dates = this.parseActivityDates(value);
          } else if (['startDate', 'endDate'].includes(key) && value.length > 0) {
            const hour = key === 'startDate' ? 0 : 23;
            const minute = key === 'startDate' ? 0 : 59;
            form[key] = new Date(value[0].year, value[0].month - 1, value[0].day, hour, minute);
          } else {
            form[key] = value;
          }
        }
      });

      try {
        const data = await props.fetchRequest({
          url: `${process.env.REACT_APP_API}/activities${state.id ? `/${state.id}` : ''}`,
          method: state.id ? 'PATCH' : 'POST',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        callback();
        if (this._isMounted) {
          if (finish) {
            this.setState(defaultState);
            popAlert({
              title: 'Activity Submitted Successfully',
              description: (
                <div id="createActivityConfirm">
                  <p>Your activity has been submitted for review.</p>
                  <br />
                  <p>It may take up to 1-5 business days to complete the process.</p>
                  <br />
                  <p style={{ width: 'max-content', paddingLeft: '1em' }}>
                    <b>STATUS CHECK :</b>
                  </p>
                  <ul style={{ width: 'max-content' }}>
                    <li style={{ width: 'max-content', marginBottom: '.5em' }}>
                      visit your <a href="/my-hub/activities" className="anchor">My Hub</a> page
                    </li>
                    <li style={{ width: 'max-content' }}>
                      We'll send you an email notification
                    </li>
                  </ul>

                </div>),
            });
            Router.push(`${props.AppUrl}/my-hub/activities`);
          } else {
            this.setState({
              ...data,
              submitting: false,
            });
          }

          // props.updateCalendarEvents([calendarEvent]);

          return true;
        }
      } catch (erroRes) {
        console.log('the actual error is : ', erroRes);
        if (this._isMounted) {
          const { data, status } = erroRes;
          const { error, message } = data;
          callback();

          if (status === 500) {
            popAlert({
              title: Messages.requests.serverError.title,
              description: Messages.requests.serverError.message,
              error: true,
            });
          } else if (message === 'Activity time overlap') {
            popAlert({
              title: 'Ooops',
              description: 'Couldn\'t create this activity because you are already hosting an activity during the same period',
              error: true,
            });
          } else {
            Router.push(`${props.AppUrl}/`);
          }

          this.setState({
            submitting: false,
          });
          return false;
        }
      }
    };

    if (validate()) {
      if (finish) {
        const credits = props.getActivityCredit(duration);
        popPrompt({
          message: (
            <div id="createActivityConfirm">
              <p>You’re  all set to host this activity:</p>
              <h3>{capitalize(name)}</h3>
              <p>Number of credits you'll earn per child: </p>
              <h4 className="" style={{ margin: '0', lineHeight: '1' }}>{credits}</h4>
            </div>
          ),
          confirmButton: {
            onClick: (closer) => {
              if (!this.state.submitting) {
                console.log('FIELDS TO SUBMIT', { fields });
                return proceedToSubmit(closer);
              }
            },
          },
        });
      } else {
        return proceedToSubmit();
      }
    } else {
      return false;
    }
  }

  async submitChanges() {
    const { state: State, props } = this;
    const { settings, isEditActivity } = props;
    const { screen } = settings;
    const { device } = screen;
    console.log('submitting : ', State.submitting);
    if (!State.submitting) {
      const {
        duration,
        hostBio,
        materials,
        description,
        name,
        type,
        frequency,
        category,
        ageGroups,
        photos,
        locationType,
        locationId,
        date,
        days,
        startDate,
        endDate,
      } = State;

      const fields = screen.width > process.env.MOBILE_BREAKPOINT ? {
        name,
        description,
        category,
        ageGroups,
        hostBio,
        frequency,
        date,
        days,
        startDate,
        endDate,
        // date: this.parseActivityDates(), // <== merges time and date into a date object or returns false
        type,
        locationType,
        locationId,
        materials,
        photos,
        duration,
      } : {
        name,
        description,
        hostBio,
        category,
        ageGroups,
        frequency,
        date,
        days,
        startDate,
        endDate,
        // date: this.parseActivityDates(), // <== merges time and date into a date object or returns false
        type,
        locationType,
        locationId,
        materials,
        photos,
        duration,
      };

      const parseFieldsError = (errors, extraState = {}) => {
        const errorKeys = Object.keys(errors);
        console.log('validation erros', errorKeys);
        const Errors = {};
        let firstError = false;
        errorKeys.forEach((key) => {
          const value = errors[key];
          // alert(key);
          const extras = ['usernameMsg'];
          if (!extras.includes(key) && !firstError && value !== false) {
            console.log('THE KEY TO FOCUS IS : ', key);
            this.fields[key].focus();
            firstError = true;
          }

          const errorKey = key;
          /* if (key === 'photo') {
            errorKey = 'image';
          } */

          if (extras.includes(key)) {
            Errors[key] = value;
          } else {
            Errors[`${errorKey}Error`] = value;
          }
        });
        this.setState({
          ...Errors,
          ...extraState,
        });
      };

      const validate = () => {
        let isValid = true;
        const errors = {};

        Object.keys(fields).forEach((key) => {
          const value = fields[key];
          // console.log('validating activity form', { key, value });
          if ([
            'hostBio',
            'description',
            'name',
          ].indexOf(key) > -1) {
            if (isEmpty(value)) {
              isValid = false;
              errors[`${key}`] = 'can\'t be empty';
            } else if ([
              'hostBio',
              'description',
            ].indexOf(key) > -1) {
              if (value.length < Utils.getValue('MinActivityDescriptionLen')) {
                isValid = false;
                errors[`${key}`] = `needs to be at least ${Utils.getValue('MinActivityDescriptionLen')} characters long`;
              }
            }
          }

          if (key === 'frequency') {
            if (!value) {
              isValid = false;
              errors[`${key}`] = Messages.forms.validationError.pickOne;
            }
          }

          if (key === 'date') {
            if (
              (
                !frequency
                || !['weekly', 'bi-weekly'].includes(ActivityFrequencies.find(frequency).title)
              )
              && value.length === 0
            ) {
              isValid = false;
              errors[`${key}`] = 'select date';
            } else {
              this.parseActivityDates(value);
            }
          }

          if (key === 'days') {
            if (
              (
                !frequency
                || ['weekly', 'bi-weekly'].includes(ActivityFrequencies.find(frequency).title)
              )
              && !this.isValidWeekDays(value)
            ) {
              isValid = false;
              errors[`${key}`] = 'select day';
            }
          }

          if ([
            'endDate',
            'startDate',
          ].indexOf(key) > -1 && (frequency && !['one-time'].includes(ActivityFrequencies.find(frequency).title))) {
            console.log('we comparing ', {
              validaDate: this.isValidDate(value[0]),
              date: new Date(),
            });
            if (!value[0]
              || !this.isValidDate(value[0])
              || (key === 'endDate' && this.isValidDate(value[0]) < new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate() + 1, // added one day
              ))
            ) {
              isValid = false;
              errors[`${key}`] = Messages.forms.validationError.invalidValue;
            }
            if (
              fields.startDate[0] && fields.endDate && fields.endDate[0]
              && this.isValidDate(fields.startDate[0]) >= this.isValidDate(fields.endDate[0])
            ) {
              isValid = false;
              errors[`${'endDate'}`] = Messages.forms.validationError.invalidValue;
            }
          }

          if ([
            'category',
            'ageGroups',
            'type',
          ].indexOf(key) > -1) {
            if (value === undefined || value.length === 0) {
              isValid = false;
              errors[`${key}`] = Messages.forms.validationError.pickOne;
            }

            if (key === 'type' && ActivityTypes.find(value).requireLocation) {
              if (isEmpty(locationType)) {
                isValid = false;
                errors.locationType = Messages.forms.validationError.pickOne;
              } else if (locationType === 'other') {
                if (isEmpty(locationId)) {
                  isValid = false;
                  errors.locationId = 'can\'t be empty';
                }
              }
            }
          }

          if (key === 'photos') {
            let gotImage = false;
            let isError = false;
            if (value !== undefined) {
              if (value.length < this.minMedia) {
                errors[`${key}`] = `You need a minimum of ${this.minMedia} files`;
              }
              for (const media of value) {
                console.log({ media });
                if (media.file.type.split('/')[0] === 'image') {
                  gotImage = true;
                }

                if (media.error) {
                  isError = 'remove unaccepted file or reload';
                }
              }
            }

            if (!gotImage) {
              isValid = false;
              errors[`${key}`] = 'Thumbnail image required';
            } else if (isError) {
              errors[key] = isError;
            }
          }
        });

        console.log('validation erros', errors);
        parseFieldsError(errors);
        return isValid;
      };

      const proceedToSubmit = async (callback) => {
        this.setState({
          submitting: true,
        });

        const form = new FormData();
        Object.keys(fields).forEach((key) => {
          const value = fields[key];
          if (value !== undefined && value !== null) {
            if (key === 'photos') {
              form.media = value.map((media) => (
                media.oldValue ? {
                  id: media.id,
                } : media.assemblyId));
            } else if (key === 'days') {
              const newValue = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
              };
              console.log('THE DAY NOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');
              const getRep = (Day) => {
                let day = 1;
                while (true) {
                  const now = new Date();
                  const d = new Date(now.getFullYear(), now.getMonth(), day, 0, 0);
                  console.log('we inside ', { d, day });
                  if (Day.toLowerCase() === getWeekDay(d.getDay()).toLowerCase()) {
                    return d;
                  }
                  day += 1;
                }
              };

              for (const day of Object.keys(value)) {
                value[day].forEach((_time, index) => {
                  const rep = getRep(day);
                  console.log('THE DAY ', { day, _time });
                  let { hour, minute, period } = _time.time;
                  hour = parseInt(hour, 10);
                  if (hour === 12 && period === 'AM') {
                    hour = 0;
                  }
                  if (period === 'PM' && hour !== 12) {
                    hour += 12;
                  }

                  rep.setHours(hour);
                  rep.setMinutes(minute);
                  console.log('the date rep is: ', rep);

                  newValue[getWeekDay(rep.getUTCDay())].push({
                    time: {
                      hour: rep.getUTCHours(),
                      minute: rep.getUTCMinutes(),
                    },
                  });
                });
              }
              form[key] = newValue;
            } else if (key === 'date') {
              form.dates = this.parseActivityDates(value);
            } else if (['startDate', 'endDate'].includes(key) && value.length > 0) {
              form[key] = new Date(value[0].year, value[0].month - 1, value[0].day);
            } else {
              form[key] = value;
            }
          }
        });

        try {
          await props.fetchRequest({
            url: `${process.env.REACT_APP_API}/activities${isEditActivity ? `/${props.activity.id}` : ''}`,
            method: isEditActivity ? 'PATCH' : 'POST',
            body: JSON.stringify(form),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          callback();
          if (this._isMounted) {
            this.setState(defaultState);
            popAlert({
              title: 'Activity Submitted Successfully',
              description: (
                <div id="createActivityConfirm">
                  <p>Your activity has been submitted for review.</p>
                  <br />
                  <p>It may take up to 1-5 business days to complete the process.</p>
                  <br />
                  <p style={{ width: 'max-content', paddingLeft: '1em' }}>
                    <b>STATUS CHECK :</b>
                  </p>
                  <ul style={{ width: 'max-content' }}>
                    <li style={{ width: 'max-content', marginBottom: '.5em' }}>
                      visit your <a href="/my-hub/activities" className="anchor">My Activities</a> page
                    </li>
                    <li style={{ width: 'max-content' }}>
                      We'll send you an email notification
                    </li>
                  </ul>

                </div>),
            });

            // props.updateCalendarEvents([calendarEvent]);

            Router.push(`${props.AppUrl}/`);
          }
        } catch (erroRes) {
          console.log('the actual error is : ', erroRes);
          if (this._isMounted) {
            const { data, status } = erroRes;
            const { error, message } = data;
            callback();

            if (status === 500) {
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            } else if (message === 'Activity time overlap') {
              popAlert({
                title: 'Ooops',
                description: 'Couldn\'t create this activity because you are already hosting an activity during the same period',
                error: true,
              });
            } else {
              Router.push(`${props.AppUrl}/`);
            }

            this.setState({
              submitting: false,
            });
          }
        }
      };

      if (validate()) {
        const credits = props.getActivityCredit(duration);
        /*  PopPrompt({
          message: (
            <div id="createActivityConfirm">
              <p>You’re  all set to host this activity:</p>
              <h3>{capitalize(name)}</h3>
              <p>Number of credits you'll earn per child: </p>
              <h4 className="" style={{ margin: '0', lineHeight: '1' }}>{credits}</h4>
            </div>
          ),
          confirmButton: {
            onClick: (closer) => {
              if (!this.state.submitting) {
                console.log('FIELDS TO SUBMIT', { fields });
                proceedToSubmit(closer);
              } else {
                // alert('no go area');
              }
            },
          },
        }); */
      } else {

      }
    }
  }

  activityNameInfo() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      question: 'Name your Activity',
      fields: [
        <InputField
          type="text"
          label={(
            <>
              Add a Title<span className="error"> {state.nameError ? `: ${state.nameError}` : ''}</span>
            </>
          )}
          maxLength={Utils.getValue('MaxActivityTitleLen')}
          value={ucFirst(state.name)}
          onChange={(value) => {
            this.setState({
              name: value,
              nameError: !isEmpty(value) ? false : state.nameError,
            });
          }}
          onLoad={(e) => {
            if (e) {
              this.fields.name = e.inputBox;
            }
          }}
        />,
        <InputField
          type="textarea"
          maxLength={Utils.getValue('MaxActivityDescriptionLen')}
          label={(
            <>
              Write a Brief Description<span className="error"> {state.descriptionError ? `: ${state.descriptionError}` : ''}</span>
            </>
          )}
          value={ucFirst(state.description)}
          onChange={(value) => {
            this.setState({
              description: value,
              descriptionError: isEmpty(value) ? state.descriptionError : false,
            });
          }}
          onLoad={(e) => {
            if (e) {
              this.fields.description = e.inputBox;
            }
          }}
        />,
        <div id="activivtyTpes">
          <p className="form-label">Activity Type <span className="error">{state.typeError ? `: ${state.typeError}` : ''}</span> </p>
          <InputPicker
            values={[state.type]}
            multichoice={false}
            /*  options={ActivityTypes.data.map((type) => ({
              label: capitalize(type.title),
              value: type.id,
            }))} */
            options={[{
              label: capitalize(ActivityTypes.findByTitle('virtual').title),
              value: ActivityTypes.findByTitle('virtual').id,
            }]}
            onChange={(values) => {
              /* this.setState({
                type: values[0],
                typeError: false,
              }); */
            }}
            onLoad={(e) => {
              if (e) {
                this.fields.type = e.pickers;
              }
            }}
          />
        </div>,
      ],
      validation: () => this.submitForm({
        name: state.name,
        description: state.description,
      }),
    };
  }

  activityCategoryAndAgeGroup() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;

    return {
      question: 'Category and Age Group',
      fields: [
        <div>
          <p className="form-label">Select a Category  <span className="error"> {state.categoryError ? `: ${state.categoryError}` : ''}</span></p>
          <InputPicker
            multichoice={false}
            values={[state.category]}
            // className={state.categoryError ? 'error' : ''}
            options={Categories.data.map((interest) => ({
              label: interest.title,
              value: interest.id,
            }))}
            onChange={(values) => {
              this.setState({ category: values[0], categoryError: false });
            }}
            onLoad={(e) => {
              if (e) {
                this.fields.category = e.pickers;
              }
            }}
          />
        </div>,
        <div id="ageGroup">
          <p className="form-label">Choose Age Groups <span className="error">{state.ageGroupsError ? `: ${state.ageGroupsError}` : ''}</span></p>
          <InputPicker
            values={state.ageGroups}
            // className={state.ageGroupsError ? 'error' : ''}
            options={AgeGroups.data.map((interest) => ({
              label: `${interest.start} - ${interest.end}`,
              value: interest.id,
            }))}
            onChange={(values) => {
              if (values.length > 1) {
                values.sort((a, b) => {
                  const scoreA = AgeGroups.find(a).start;
                  const scoreB = AgeGroups.find(b).start;

                  if (scoreA < scoreB) {
                    return -1;
                  }
                  if (scoreA > scoreB) {
                    return 1;
                  }
                  return 0;
                });

                const maxAge = AgeGroups.find(values[values.length - 1]).end;
                const minAge = AgeGroups.find(values[0]).start;

                // fill in the gap
                values = [];
                const ageGroups = AgeGroups.data;
                ageGroups.forEach((ageGroup) => {
                  if (ageGroup.start >= minAge && ageGroup.end <= maxAge) {
                    values.push(ageGroup.id);
                  }
                });
              }
              this.setState({
                ageGroups: values,
                ageGroupsError: false,
              });
            }}
            onLoad={(e) => {
              if (e) {
                this.fields.ageGroups = e.pickers;
              }
            }}
          />
        </div>,
      ],
      validation: () => this.submitForm({
        category: state.category,
        ageGroups: state.ageGroups,
      }),
    };
  }

  activityTiming() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const maxDOB = new Date();
    const currentYear = new Date().getFullYear();

    return {
      question: 'When will it happen ?',
      fields: [
        <>
          <div>
            <p className="form-label">Frequency <span className="error">{state.frequencyError ? `: ${state.frequencyError}` : ''}</span></p>

            <InputPicker
              values={[state.frequency]}
              multichoice={false}
              // className={state.frequencyError ? 'error' : ''}
              options={ActivityFrequencies.data.map((freq) => ({
                label: capitalize(freq.title),
                value: freq.id,
              }))}
              onChange={(values) => {
                this.setState({
                  frequency: values[0],
                  days: defaultState.days,
                  date: defaultState.date,
                  frequencyError: false,
                });
              }}
              onLoad={(e) => {
                if (e) {
                  this.fields.frequency = e.pickers;
                }
              }}
            />
          </div>

          {state.frequency
            && (
              <div id="dayAndTime">
                <div className="content">
                  {['one-time', 'monthly'].includes(ActivityFrequencies.find(state.frequency).title) && (
                    <div className="dates option">
                      <span className="option-label">
                        {['monthly'].includes(ActivityFrequencies.find(state.frequency).title)
                          ? 'Day'
                          : 'Date'}
                        <span className="error">{state.dateError ? `: ${state.dateError}` : ''}</span>
                      </span>
                      <InputDatePicker
                        multichoice
                        daysSelector={['monthly'].includes(ActivityFrequencies.find(state.frequency).title)}
                        inputTime
                        inputTimeLabel="Start Time"
                        minDate={['monthly'].includes(ActivityFrequencies.find(state.frequency).title) ? null : new Date()}
                        values={state.date}
                        placeholder="Click to select"
                        labelFormatter={() => 'Click to select'}
                        className="preview thin"
                        onChange={(values) => {
                          this.setState({
                            date: values,
                            dateError: values.length > 0 ? false : state.dateError,
                          });
                        }}
                        onLoad={(e) => {
                          if (e) {
                            this.fields.date = e.inputDate;
                          }
                        }}
                      />

                      {state.date.length > 0 && (
                        <div className="dates-preview">
                          {this.sortDates(state.date).map((date) => (
                            !date ? ''
                              : (
                                <div className="date-preview">
                                  {['monthly'].includes(ActivityFrequencies.find(state.frequency).title)
                                    ? (
                                      <>
                                        <p className="text">
                                          {this.getPositionInMonth(date)} of every month
                                        </p>
                                        <p className="text last">
                                          {date.time && ` at ${date.time.hour}:${date.time.minute} ${date.time.period}`}
                                        </p>
                                      </>
                                    )
                                    : (
                                      <>
                                        <p className="text">
                                          {getWeekDay(date.weekDay)}, {capitalize(getMonth(date.month - 1))} {` ${(date.day)}`} {` ${date.year === currentYear ? '' : date.year}`}
                                        </p>
                                        <p className="text last">
                                          {date.time && ` at ${date.time.hour}:${date.time.minute} ${date.time.period}`}
                                        </p>
                                      </>
                                    )}
                                  <span
                                    className="icon icon-cross"
                                    onClick={() => {
                                      this.removeSelectedDate(date);
                                    }}
                                  />
                                </div>
                              )
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {['weekly', 'bi-weekly'].includes(ActivityFrequencies.find(state.frequency).title) && (
                    <>
                      <div className="days option">
                        <span className="option-label">
                          Day
                          <span className="error">{state.daysError ? `: ${state.daysError}` : ''}</span>
                        </span>
                        <InputWeekDays
                          label="Click to select"
                          values={state.days}
                          maxTime={1}
                          onChange={(values) => {
                            this.setState({
                              days: values.days,
                              daysError: false,
                            });
                          }}
                          onLoad={(e) => {
                            if (e) {
                              this.fields.days = e.inputWeekDays;
                              console.log('the days of the field : ', this.fields);
                            }
                          }}
                        />
                      </div>
                      {this.isNotEmptyDays() && (
                        <div className="dates-preview">
                          {Object.keys(state.days).map((day) => state.days[day].map((log) => {
                            const { time, duration } = log;
                            console.log('the day props are : ', day, state.days[day], log);

                            return (
                              <div className="date-preview">
                                <p className="text">
                                  Every {ActivityFrequencies.findByTitle('bi-weekly').id === state.frequency ? 'other ' : ''} {capitalize(day)}
                                </p>
                                <p className="text last">
                                  at {time.hour}:{time.minute} {time.period}
                                </p>
                                <span
                                  className="icon icon-cross"
                                  onClick={() => {
                                    this.removeSelectedDay(day);
                                  }}
                                />
                              </div>
                            );
                          }))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          {state.frequency && !['one-time'].includes(ActivityFrequencies.find(state.frequency).title)
            && (
              <div id="startEndTime">
                <div className="start-time">
                  <p className="form-label">Start Date <span className="error">{state.startDateError ? `: ${state.startDateError}` : ''}</span> </p>
                  <InputDatePicker
                    // minDate={new Date()}
                    values={state.startDate}
                    placeholder="Click to select"
                    // className={`preview thin ${state.dateError !== false ? ' error' : ''}`}
                    className="preview thin"
                    onChange={(values) => {
                      this.setState({
                        startDate: values,
                        startDateError: false,
                      });
                    }}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.startDate = e.inputDate;
                      }
                    }}
                  />
                </div>
                <div className="end-time">
                  <p className="form-label">End Date <span className="error">{state.endDateError ? `: ${state.endDateError}` : ''}</span> </p>
                  <InputDatePicker
                    minDate={new Date()}
                    values={state.endDate}
                    placeholder="Click to select"
                    // className={`preview thin ${state.dateError !== false ? ' error' : ''}`}
                    className="preview thin"
                    onChange={(values) => {
                      this.setState({
                        endDate: values,
                        endDateError: false,
                        // dateError: this.isValidDate(values) ? false : state.dateError,
                      });
                    }}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.endDate = e.inputDate;
                      }
                    }}
                  />
                </div>
              </div>
            )}
        </>,
        <div id="activivtyDuration">
          <p className="form-label">Duration </p>
          <InputDuration
            label=""
            value={state.duration}
            className=" thin"
            onChange={(value) => {
              this.setState({
                duration: value,
              });
            }}
          />
        </div>,
      ],
      validation: () => {
        const { dob } = editProfile;
        /*

        if (dob) {
          if (dob.year) {
            dob = new Date(`${dob.year}/${dob.month}/${dob.day}`);
          } else {
            dob = new Date(dob);
          }
        } */
        return this.submitForm({
          frequency: state.frequency,
          date: state.date,
          days: state.days,
          startDate: state.startDate,
          endDate: state.endDate,
          duration: state.duration,
        });
      },

    };
  }

  activityAboutHost() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const maxDOB = new Date();

    return {
      question: 'About the Host',
      fields: [
        <InputField
          type="textarea"
          maxLength={Utils.getValue('MaxActivityDescriptionLen')}
          label={(
            <>
              Tell the Participants more About you <span className="error"> {state.hostBioError ? `: ${state.hostBioError}` : ''}</span>
            </>
          )}
          // placeholder="Any other thing you want us to know?"
          value={ucFirst(state.hostBio)}
          // className={`${state.hostBioError !== false ? ' error' : ''}`}
          onChange={(value) => {
            this.setState({
              hostBio: value,
              hostBioError: isEmpty(value) ? state.hostBioError : false,
            });
          }}
          onLoad={(e) => {
            if (e) {
              this.fields.hostBio = e.inputBox;
            }
          }}
        />],
      validation: () => this.submitForm({
        hostBio: state.hostBio,
      }),

    };
  }

  activityMaterials() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const maxDOB = new Date();

    return {
      optional: true,
      question: 'Materials needed',
      fields: [
        <InputField
          type="textarea"
          maxLength={Utils.getValue('MaxActivityDescriptionLen')}
          label={(
            <>
              What your participants will need for this activity <span className="error"> {state.materialsError ? `: ${state.materialsError}` : ''}</span>
            </>
          )}
          // placeholder="Any other thing you want us to know?"
          value={ucFirst(state.materials)}
          // className={`${state.materialsError !== false ? ' error' : ''}`}
          onChange={(value) => {
            this.setState({
              materials: value,
              materialsError: isEmpty(value) ? state.materialsError : false,
            });
          }}
          onLoad={(e) => {
            if (e) {
              this.fields.materials = e.inputBox;
            }
          }}
        />],
      validation: () => this.submitForm({
        materials: state.materials,
      }),

    };
  }

  activityMeida() {
    const { props, state } = this;
    const { settings, editProfile, isEditProfilePage } = props;
    const { profileDisplayDragOver } = state;
    const previewHeight = $('#displayImage .drop-box .preview').outerHeight();
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

    const setImage = async (files) => {
      const space = this.maxMedia - state.photos.length;
      // console.log({ maxMedia: this.maxMedia, length: this.state.photos.length, space });
      const arr = [];
      const imageTypes = [
        'image/gif',
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp',
      ];
      const videoTypes = [
        'video/mp4',
        'video/quicktime',
        'video/MP2T',
        'video/3gpp',
        'video/x-msvideo',
      ];

      if (space > 0) {
        // alert('inside set image theres space');
        for (const file of files) {
          if (arr.length < space) {
            if (
              imageTypes.includes(file.type)
              || videoTypes.includes(file.type)
            ) {
              if ((imageTypes.includes(file.type) && file.size < 10485760) // <== 10mb
                || (videoTypes.includes(file.type) && file.size < 52428800)) { // <== 50mb
                await delay(1000);
                const id = Date.now();
                // alert(`the value id of file accepted is : ${id}, the name of the file is : ${file.name}`);

                arr.push({
                  preview: URL.createObjectURL(file),
                  file,
                  id,
                  uploaded: false,
                  uploading: false,
                });
              } else {
                popAlert({
                  title: 'File too large',
                  description: "Videos can't be more than 50mb and images can't be more than 10mb",
                  error: true,
                });
              }
            } else {
              // alert(`you selected an unacceptable file type (${file.type})`);
            }
          } else break;
        }

        if (arr.length > 0) {
          // alert(`every id at the end of the day is : ${arr.map((a) => (a.id)).join(',')}`);
          this.setState((prev) => ({
            photos: [...prev.photos, ...arr],
            photosError: false,
          }));
        } else {
          // alert('you didnt select any acceptable file');
        }
      } else {
        // alert('you have already uploaded the maximum amount of media acceptable');
      }
      if (this.meidaInputPicker) {
        this.meidaInputPicker.value = null;
      }
    };

    const imagePickHandler = async (event) => {
      const value = event.target.files;
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

      const value = files;
      if (value) {
        setImage(value);
      }
      // this.uploadFiles(ev);
    };

    return {
      id: 'displayImageForm',
      question: (
        <>
          <span>Upload media</span>
          <span className="help-info">you can drag and drop into the grey area</span>
        </>
      ),
      fields: [
        <div id="displayImage">
          {state.photosError && <div className="Error">{state.photosError}</div>}
          <div className="drop-box">

            {!profileDisplayDragOver && (
              <button
                type="button"
                className="btn btn-glass bordered-black no-shadow inline"
                style={{
                  zIndex: 2,
                  position: 'relative',
                }}
                onClick={(e) => {
                  // if (!submissionFile) this.pickFile(e);
                }}
              >
                <span className="fas fa-cloud-upload-alt icon" />
                <span>SELECT PICTURES /  VIDEOS</span>
                <input
                  multiple
                  type="file"
                  className="picker"
                  onChange={imagePickHandler}
                  onClick={(e) => { e.stopPropagation(); }}
                  alt=""
                  ref={(e) => {
                    if (e && !this.meidaInputPicker) {
                      this.meidaInputPicker = e;
                    }
                  }}
                />
              </button>
            )}
            <div className="preview">
              {state.photos.map((media, index) => {
                if (!media.uploaded && !media.uploading) {
                  this.processMediaFile(media);
                }

                const dragEnter = () => {
                  if (![false, index].includes(this.photoDragging)) {
                    this.positionMedia(index);
                  }
                };
                return (
                  <div
                    draggable
                    className={`media-preview${media.uploaded ? '' : ' uploading'}${media.error ? ' error' : ''}`}
                    onDragStart={(event) => {
                      console.log('drag started');
                      this.photoDragging = index;
                    }}
                    onDragEnd={() => {
                      console.log('drag ended');
                      this.photoDragging = false;
                    }}
                    onTouchStart={() => {
                      this.photoDragging = index;
                      console.log('the touch started :', index);
                    }}
                    onTouchEnd={() => {
                      console.log('the touch ended:', index);
                      dragEnter();
                      this.photoDragging = false;
                    }}
                  >
                    <span
                      className="icon fa fa-times-circle"
                      onClick={() => {
                        this.setState((prev) => {
                          const { photos } = prev;
                          photos.splice(index, 1);
                          return ({ photos });
                        });
                      }}
                      onDragEnter={dragEnter}
                      onDrop={dragEnter}
                    />
                    {media.file.type.split('/')[0] === 'video'
                      ? (
                        <>
                          <video
                            src={media.preview}
                            className="media"
                            onDragEnter={dragEnter}
                            onTouchStart={() => {
                            }}
                            onDrop={dragEnter}
                          />
                          <span
                            className="icon-play-circle icon center"
                            onDragEnter={dragEnter}
                            onDrop={dragEnter}
                          />
                        </>
                      )
                      : (
                        <>
                          <img
                            src={media.preview}
                            className="media"
                            alt=""
                            draggable={false}
                            onDragEnter={dragEnter}
                            onDrop={dragEnter}
                          />
                          {/* <span className="icon-play-circle icon center" /> */}
                        </>
                      )}
                    <span className="icon-refresh2 icon loading" />
                  </div>
                );
              })}

            </div>
            {profileDisplayDragOver
              && (
                <div className="drop-content">
                  <span className="icon fa fa-cloud-download" />
                  <p>{/* Drag & */} drop files here</p>
                </div>
              )}
            <div
              className="drop-container"
              onDrop={onUploadDrop}
              onDragOver={onUploadDragOver}
              onDragLeave={onUploadDragLeave}
            />
          </div>
        </div>,
      ],
      validation: () => this.submitForm({
        photos: state.photos,
      }, true),
    };
  }

  async moveForward(steps) {
    const { props, state } = this;
    const { settings } = props;
    const { sessionUser } = settings;

    const {
      formType,
      activeStep,
      validating,
      disableNext,
    } = state;

    if (!disableNext) {
      const finish = () => {
        if (steps[activeStep + 1]) {
          console.log('sayning e see am', { total: steps.length, next: activeStep + 1 });

          this.swapProfileContent('forward', steps);
        } else if (formType === 'profile') {
          if (sessionUser.kids.length < Utils.getValue('MaxProfileKids')) {
            this.setState({
              formType: 'kid-profile',
              activeStep: 0,
              showKidWelcomeNote: true,
            });
          } else {
            this.setState({
              formType: 'referral',
              activeStep: 0,
              showKidFinishNote: true,
            });
          }
        } else if (formType === 'kid-profile') {
          this.setState({
            formType: 'referral',
            activeStep: 0,
            showKidFinishNote: true,
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
    const {
      activeStep,
      validating,
      swappingProfileContentLeft,
      swappingProfileContentRight,
      disableNext,
      disablePrevious,
    } = state;

    const steps = [
      this.activityNameInfo(),
      this.activityCategoryAndAgeGroup(),
      this.activityTiming(),
      this.activityAboutHost(),
      this.activityMaterials(),
      this.activityMeida(),
    ];

    const { settings } = props;
    const { screen, header } = settings;
    const { device, width } = screen;
    const contentFitScreen = width <= process.env.IPAD_MINI_BREAKPOINT ? `${(state.screenHeight - header.height)}px` : `calc(100vh - ${(header.height * 1.8)}px)`;
    const contentContainerPaddingBottom = width <= process.env.IPAD_MINI_BREAKPOINT && this.formActions ? $(this.formActions).outerHeight() : '0px';
    const progress = Number((((activeStep + 1) / steps.length) * 100).toFixed(0));
    const hideProgress = !!steps[activeStep].hideProgress;
    return (
      <Layout
        {...props}
        header={{
          // hideNavList: true,
        }}
        footer={{
          show: false,
        }}
      >
        <div
          id="hostActivity"
          className="is-page"
          style={{
            minHeight: contentFitScreen,
            maxHeight: contentFitScreen,
            // maxHeight: device === 'iPad-mini' ? `calc(100vh - ${header.height}px)` : '',
          }}
        >
          <div className="content">
            <div
              className="form-container"
            >
              <div className="form">
                <div className="fields">
                  <div className="progress-bar">
                    {!hideProgress && (
                      <div
                        className="progress"
                        style={{
                          width: `${progress + 1}%`,
                        }}
                      />
                    )}
                    <div className="left-block" />
                    <div className="right-block" />
                    <div className="center-block" />
                  </div>

                  <div className="QandA">
                    <div className="head">
                      <div />
                      {/* {!hideProgress && <span className="progress-label">{progress}% complete</span>} */}
                      <div className="skip">
                        <span
                          style={{ visibility: steps[activeStep].optional ? '' : 'hidden' }}
                          onClick={() => {
                            this.moveForward(steps);
                          }}
                        >Skip
                        </span>
                      </div>
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
                      <span
                        className={`action previous${steps[activeStep - 1] ? '' : ' hide'}${disablePrevious ? ' disabled' : ''}`}
                        onClick={() => {
                          if (steps[activeStep - 1] && !disablePrevious) {
                            this.swapProfileContent('backward', steps);
                          }
                        }}
                      >
                        PREVIOUS
                      </span>
                      <button
                        type="button"
                        className={`action btn btn-1${disableNext ? ' disabled' : ''}`}
                        onClick={() => {
                          this.moveForward(steps);
                        }}
                      >
                        {steps[activeStep + 1] ? 'NEXT' : 'FINISH'} {validating && <span className="icon icon-refresh spinner" />}
                      </button>
                    </div>

                  </div>
                </div>
                <div className="img">
                  <img src="/img/requests.png" />
                </div>
              </div>
            </div>
          </div>
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
  resetFormState: (props) => { dispatch(resetInfo(props)); },
  setSupport: (support) => { dispatch(setSupport(support)); },
  setFirstSession: () => dispatch(setSettingInfo({ firstSession: true })),

});
export default connect(mapStateToProps, mapDispatchToProps)(HostActivity);
