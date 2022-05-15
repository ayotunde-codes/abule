import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  Fn,
  PopMessage, InputDatePicker, InputField, InputDuration, InputPicker, InputTime,
  InputLocation, SearchBar, InputWeekDays, ToolTipWrapper,
} from '@abule-common/components';

import Layout from '../../components/general/Layout';

import CalendarTimeline from '../../components/CalendarTimeline';
import { ActivityFrequencies, Utils } from '../../datastore';
import UserConnectCard from '../../components/UserConnectCard';
import {
  resetDate, setProps, updateDate, updateEvents,
} from '../../redux/calendar/action';
import { setInfo, updateHeader } from '../../redux/settings/action';
import { Messages } from '../../public/data/assets';

const {
  capitalize,
  getMonth,
  getWeekDay,
  isDescendant,
  isEmpty,
  popAlert,
  ucFirst,
  mobileCheck,
} = Fn;
// import CalendarTimeline from "./../../../components/calendar/calendarTimeline";
const CalendarMain = (props) => {
  const { calendar, settings, fetchRequest } = props;
  const { sessionUser } = settings;
  const { events } = calendar;
  // const { kids } = sessionUser;
  const [selectedTribe, setSelectedTribe] = useState([]);
  const [iD, setID] = useState('');
  // const [timeline, setTimeline] = useState([]);
  const defaultNewEvent = {
    dateError: false,
    id: '',
    capacityError: false,
    startDateError: false,
    endDateError: false,
    startHour: null,
    startMinute: null,
    startPeriod: null,
    startHourError: false,
    startMinuteError: false,
    startPeriodError: false,
    title: '',
    titleError: false,
    description: '',
    descriptionError: false,
    duration: 60,
    capacity: 0,
    kids: [],
    kidsError: false,
    locationId: '',
    streetAddress: '',
    city: '',
    frequency: false,
    frequencyError: false,
    state: '',
    dates: [],
    date: [],
    startDate: [
      {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      },
    ],
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
    daysError: false,
    // dateError: false,
    zipCode: '',
    apartment: '',
    streetAddressError: false,
    cityError: false,
    stateError: false,
    zipCodeError: false,
  };
  // console.log('checking the events', events, typeof events, Array.isArray(events));

  events?.forEach((event) => {
    const { days } = event;
    if (days) {
      Object.keys(days)?.forEach((day) => {
        if (days[day] === null) {
          days[day] = [];
        }
      });
    }
    if (event.dates === null) {
      event.dates = [];
    }
  });
  // console.log('checking the new events', events, typeof events, Array.isArray(events));
  const [ViewChangerDropdown, setViewChangerDropdown] = useState(null);
  // let ViewChangerDropdown = null;
  // const ViewChangerDropdown = useRef(null);
  const allFriends = sessionUser.friends.all;
  const approvedFriends = sessionUser.friends.approved;

  const arrayVillage = [];
  const arrayVillageIds = [];
  Object.keys(allFriends).forEach((key) => {
    arrayVillage.push(allFriends[key]);
    arrayVillageIds.push(allFriends[key].userId);
  });
  const convertTime = (dates) => {
    // const time = moment(new Date(dates.year, dates.month, dates.day)).format('YYYY-MM-DDTHH:MM:SS.Z');
    const time = new Date(dates.year, dates.month - 1, dates.day, 0, 0).toISOString();
    return time;
  };
  const formatShareVillage = (values) => {
    const Ids = [];
    values.forEach((value) => {
      Ids.push(value.userId);
    });
    return Ids;
  };
  //
  // const parseActivityDate = (date, startHour, startMinute, startPeriod) => {
  //   const _date = date || state.date;
  //   if (_date) {
  //     const _startMinute = startMinute || state.startMinute;
  //     const _startPeriod = startPeriod || state.startPeriod;
  //     let _startHour = parseInt(startHour || state.startHour, 10);
  //     if (
  //       _startHour < 1
  //       || _startHour > 12
  //       || _startMinute < 0
  //       || _startMinute > 59
  //       || !['AM', 'PM'].includes(_startPeriod)
  //     ) {
  //       return false;
  //     }
  //     _startHour = _startHour === 12 && _startPeriod === 'AM' ? 0 : _startHour;
  //     _startHour += _startPeriod === 'PM' && _startHour < 12 ? 12 : 0;
  //     const dateYear = _date.year;
  //     const dateMonth = _date.month;
  //     const numberDate = _date.day;

  //     console.log({
  //       dateYear,
  //       dateMonth,
  //       numberDate,
  //       hour: _startHour,
  //       _startMinute,
  //     });
  //     return new Date(
  //       dateYear,
  //       dateMonth - 1,
  //       numberDate,
  //       _startHour,
  //       _startMinute,
  //     );
  //   }
  //   return false;
  // };
  //
  const parseActivityDates = (dates) => {
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
  };
  //
  const [state, UpdateState] = useState({
    ...defaultNewEvent,
    selectedDate: new Date(),
    duration: 15,
    activeDay: 0,
    showGrades: false,
    supportType: '',
    selectedTribeShare: [],
    friendGroups: [],
    createNewEvent: false,
    editEvent: false,
    dayView: true,
    // dayView: false,
    showPopMessage: false,
    viewBarterDetails: false,
    viewUserEvent: false,
    friendGroupshare: false,
    showDisplayView: false,
    savingNewEvent: false,
    deleteUserEvent: false,
    showSharePopUp: false,
    allFriends: arrayVillage,
    allFriendsIds: arrayVillageIds,
    selectedVillage: [],
    shareVillage: false,
  });
  // const isValidDate = (
  //   obj = {
  //     date: null,
  //     startHour: null,
  //     startMinute: null,
  //     startPeriod: null,
  //   },
  // ) => {
  //   const _date = obj.date || state.date[0];
  //   console.log('THE PROPS PASSED ARE : ', obj);
  //   try {
  //     if (_date) {
  //       const _startHour = obj.startHour || state.startHour;
  //       const _startMinute = obj.startMinute || state.startMinute;
  //       const _startPeriod = obj.startPeriod || state.startPeriod;

  //       const dateTime = parseActivityDate(
  //         _date,
  //         _startHour,
  //         _startMinute,
  //         _startPeriod,
  //       );
  //       console.log('date test objects : ', {
  //         _date,
  //         dateTime,
  //         Now: new Date(),
  //         evaluation: new Date() < dateTime,
  //       });

  //       if (dateTime && dateTime.getTime()) {
  //         return new Date() < dateTime;
  //       }
  //     } else {
  //       console.log('didnt evevn make it ', {
  //         _date,
  //       });
  //     }

  //     return false;
  //   } catch (e) {
  //     console.log('unexpected err', e);
  //     return false;
  //   }
  // };
  const selectedVillageShare = formatShareVillage(state.selectedVillage);

  const setState = (prop) => {
    UpdateState((prevState) => ({
      ...prevState,
      ...prop,
    }));
  };

  // state;

  const DisplayViewDropHandler = (event) => {
    if (
      ViewChangerDropdown
      && !isDescendant(event.target, ViewChangerDropdown)
    ) {
      setState({ showDisplayView: false });
      window.removeEventListener('click', DisplayViewDropHandler, false);
    }
  };
  const showDisplayViewChanger = () => {
    const { showDisplayView } = state;

    if (!showDisplayView) {
      setState({ showDisplayView: true });
      window.addEventListener('click', DisplayViewDropHandler, false);
    }
  };
  //
  const isValidWeekDays = (obj) => {
    for (const day of Object.keys(obj)) {
      if (obj[day].length > 0) {
        return true;
      }
    }
    return false;
  };

  //
  const isValidDate = (dateObj) => {
    if (!dateObj) return false;
    const date = new Date(dateObj.year, dateObj.month, dateObj.day);

    if (date && date.getDate()) {
      return date;
    }
    return false;
  };
  const displayView = (
    <button
      type="button"
      className="drop-cntrl-button nav-link"
      onClick={showDisplayViewChanger}
    >
      <span className="icon-hmv-chevron-down" />
    </button>
  );

  const validateForm = () => {
    // const { settings } = props;
    // const { sessionUser } = settings;

    if (!state.submitting) {
      const {
        title,
        description,
        kids,
        date,
        duration,
        frequency,
        locationId,
        streetAddress,
        city,
        // state,
        days,
        zipCode,
        startHour,
        startMinute,
        startPeriod,
      } = state;

      const fields = {
        title,
        locationId,
        // date: parseActivityDate(date, startHour, startMinute, startPeriod), // <== merges time and date into a date object or returns false
        duration,
        frequency,
        description,
        kids,
        date,
        days,
      };

      let isValid = true;
      const errors = {};

      const locationError = (forceError = false) => {
        // if (isEmpty(state)) {
        //   isValid = false;
        //   errors.stateError = Messages.forms.validationError.empty;
        // } else if (forceError) {
        //   isValid = false;
        //   errors.stateError = Messages.forms.validationError.invalidValue;
        // }

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

      Object.keys(fields).forEach((key) => {
        const value = fields[key];
        if (key === 'title') {
          if (isEmpty(value)) {
            isValid = false;
            errors[`${key}Error`] = Messages.forms.validationError.empty;
          } else {
            errors[`${key}Error`] = false;
          }
        } else if (key === 'description') {
          if (isEmpty(value)) {
            isValid = false;
            errors[`${key}Error`] = Messages.forms.validationError.empty;
          } else {
            errors[`${key}Error`] = false;
          }
        } else if (key === 'frequency') {
          if (!value) {
            isValid = false;
            errors[`${key}Error`] = Messages.forms.validationError.pickOne;
          }
        } else if (key === 'kids') {
          if (value.length < 1) {
            isValid = false;
            errors[`${key}Error`] = Messages.forms.validationError.pickOne;
          }
        } else if (key === 'date') {
          if (
            (
              !frequency
              || !['weekly', 'bi-weekly', 'daily'].includes(ActivityFrequencies.find(frequency).title)
            )
            && value.length === 0
          ) {
            isValid = false;
            errors[`${key}Error`] = 'select date';
          } else {
            parseActivityDates(value);
          }
        } else if (key === 'days') {
          if (
            (
              !frequency
              || ['weekly', 'bi-weekly', 'daily'].includes(ActivityFrequencies.find(frequency).title)
            )
            && !isValidWeekDays(value)
          ) {
            isValid = false;
            errors[`${key}Error`] = 'select day';
          }
        } else if ([
          'endDate',
          'startDate',
        ].indexOf(key) > -1 && (frequency && !['one-time'].includes(ActivityFrequencies.find(frequency).title))) {
          console.log('we comparing ', {
            validaDate: isValidDate(value[0]),
            date: new Date(),
          });
          if (!value[0]
            || !isValidDate(value[0])
            || (key === 'endDate' && isValidDate(value[0]) < new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              new Date().getDate() + 1, // added one day
            ))
          ) {
            isValid = false;
            errors[`${key}Error`] = Messages.forms.validationError.invalidValue;
          }
          if (
            fields.startDate[0] && fields.endDate && fields.endDate[0]
            && isValidDate(fields.startDate[0]) >= isValidDate(fields.endDate[0])
          ) {
            isValid = false;
            errors[`${'endDate'}Error`] = Messages.forms.validationError.invalidValue;
          }
        }
        //  if (key === 'endDate') {
        //   if (value.length < 1 && ['weekly', 'bi-weekly', 'daily', 'monthly'].includes(ActivityFrequencies.find(frequency).title)) {
        //     isValid = false;
        //     errors[`${key}Error`] = 'select endDate';
        //   }
        // }

        if (key === 'locationId') {
          // locationError();
        }
      });

      console.log('validation erros', errors);
      setState({
        // ...defaultErrorState,
        ...errors,
      });

      if (isValid) {
        return true;
      }
    }
    return false;
  };

  const toggleFriendGroupShow = (groupId) => {
    const friendGroups = [...state.friendGroups];
    for (let i = 0; i < friendGroups.length; i += 1) {
      const group = friendGroups[i];
      console.log('group vs groupId', {
        groupId,
        id: group.id,
      });
      if (group.id === groupId) {
        console.log('before', friendGroups[i]);
        friendGroups[i].show = !friendGroups[i].show;
        console.log('after', friendGroups[i]);
        break;
      }
    }

    setState({
      friendGroups,
    });
  };

  // location
  const Location = () => {
    const { settings } = props;
    const { sessionUser } = settings;

    return (
      <>
        <div id="activityLocation">
          <InputLocation
            type="text"
            label={(
              <>
                Location{' '}
                <span className="error">
                  {' '}
                  {state.streetAddressError
                    ? `: ${state.streetAddressError}`
                    : ''}
                </span>
              </>
            )}
            placeholder="location"
            value={ucFirst(state.streetAddress)}
            // value={state.streetAddress}
            // className={`${state.streetAddressError !== false ? ' error' : ''}`}
            onChange={(value) => {
              setState({
                locationId: '',
                streetAddress: value,
              });
            }}
            onSelect={(value) => {
              console.log('PiCKED LOCATION', value);
              setState({
                locationId: value.id,
                streetAddress: value.formatted_address,
                streetAddressError: false,
              });
            }}
          />
        </div>
      </>
    );
  };
  // frequency

  const FrequencyField = () => {
    const currentYear = new Date().getFullYear();
    const fields = {
      type: null,
      locationType: null,
      locationId: null,
      ageGroups: null,
      frequency: null,
      date: null,
      days: null,
      startDate: null,
      endDate: null,
    };
    const sortDates = (dates) => {
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
    };
    //
    const isNotEmptyDays = () => {
      // const { days } = state;
      const { days } = state;

      for (const day of Object.keys(days)) {
        if (days[day].length > 0) return true;
      }

      return false;
    };
    //
    const removeSelectedDay = (day) => {
      const { days } = state;
      alert('hello');
      console.log('are you been called');
      // const { days } = state;

      setState({
        days: {
          ...days,
          [day]: [],
        },
      });
    };
    //
    const getPositionInMonth = (date, returnJSON = false) => {
      const { index } = date;

      if (index === null) return false;
      const dateObject = moment();
      dateObject.set('year', date.year);
      dateObject.set('month', date.month - 1);
      dateObject.set('date', date.day);
      const DaysInMonth = dateObject.daysInMonth();
      const firstDay = moment(dateObject).startOf('month').format('d');

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
        if (DaysInMonth - index < 7) {
          return 'last';
        }
        switch (i) {
          case 1: {
            return '1st';
          }
          case 2: {
            return '2nd';
          }
          case 3: {
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
    };

    //
    const removeSelectedDate = (date) => {
      // const { props } = this;
      const { date: selectedDates } = state;
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

      setState({
        date: newSelectedDates,
      });
      // up;
    };
    return (
      <>
        <div className="frequency-select">
          <p className="form-label">
            Frequency:{' '}
            <span className="error">
              {state.frequencyError ? `: ${state.frequencyError}` : ''}
            </span>
          </p>

          <InputPicker
            values={[state.frequency]}
            multichoice={false}
            // className={state.frequencyError ? 'error' : ''}
            options={ActivityFrequencies.data.map((freq) => ({
              label: capitalize(freq.title),
              value: freq.id,
            }))}
            onChange={(values) => {
              setState({
                frequency: values[0],
                days: defaultNewEvent.days,
                // days: defaultState.days,
                date: defaultNewEvent.date,
                frequencyError: false,
              });
            }}
            onLoad={(e) => {
              if (e) {
                fields.frequency = e.pickers;
              }
            }}
          />
        </div>
        <div className="time-content">
          {state.frequency && (
            <div id="dayAndTime">
              <div className="content">
                {['one-time', 'monthly'].includes(
                  ActivityFrequencies.find(state.frequency).title,
                ) && (
                    <div className="dates option">
                      <span className="option-label">
                        {['monthly'].includes(
                          ActivityFrequencies.find(state.frequency).title,
                        )
                          ? 'Day'
                          : 'Date'}
                        <span className="error">
                          {state.dateError ? `: ${state.dateError}` : ''}
                        </span>
                      </span>
                      <InputDatePicker
                        multichoice
                        daysSelector={['monthly'].includes(
                          ActivityFrequencies.find(state.frequency).title,
                        )}
                        inputTime
                        inputTimeLabel="Start Time"
                        minDate={
                          ['monthly'].includes(
                            ActivityFrequencies.find(state.frequency).title,
                          )
                            ? null
                            : new Date()
                        }
                        values={state.date}
                        placeholder="Click to select"
                        labelFormatter={() => 'Click to select'}
                        className="preview thin"
                        onChange={(values) => {
                          setState({
                            date: values,
                            dateError:
                              values.length > 0 ? false : state.dateError,
                          });
                        }}
                        onLoad={(e) => {
                          if (e) {
                            fields.date = e.inputDate;
                          }
                        }}
                      />

                      {state.date.length > 0 && (
                        <div className="dates-preview">
                          {sortDates(state.date).map((date) => (!date ? (
                            ''
                          ) : (
                            <div className="date-preview">
                              {['monthly'].includes(
                                ActivityFrequencies.find(state.frequency).title,
                              ) ? (
                                <>
                                  <p className="text">
                                    {getPositionInMonth(date)} of every month
                                  </p>
                                  <p className="text last">
                                    {date.time
                                      && ` at ${date.time.hour}:${date.time.minute} ${date.time.period}`}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p className="text">
                                    {getWeekDay(date.weekDay)},{' '}
                                    {capitalize(getMonth(date.month - 1))}{' '}
                                    {` ${date.day}`}{' '}
                                    {` ${date.year === currentYear ? '' : date.year
                                      }`}
                                  </p>
                                  <p className="text last">
                                    {date.time
                                      && ` at ${date.time.hour}:${date.time.minute} ${date.time.period}`}
                                  </p>
                                </>
                              )}
                              <span
                                className="icon icon-cross"
                                onClick={() => {
                                  removeSelectedDate(date);
                                }}
                              />
                            </div>
                          )))}
                        </div>
                      )}
                    </div>
                  )}

                {['weekly', 'bi-weekly'].includes(
                  ActivityFrequencies.find(state.frequency).title,
                ) && (
                    <>
                      <div className="days option">
                        <span className="option-label">
                          Day
                          <span className="error">
                            {state.daysError ? `: ${state.daysError}` : ''}
                          </span>
                        </span>
                        <InputWeekDays
                          label="Click to select"
                          values={state.days}
                          maxTime={1}
                          onChange={(values) => {
                            // e.stopPropagation();
                            setState({
                              days: values.days,
                              daysError: false,
                            });
                          }}
                          onLoad={(e) => {
                            if (e) {
                              fields.days = e.inputWeekDays;
                              console.log('the days of the field : ', fields);
                            }
                          }}
                        />
                      </div>
                      {/* {false && ( */}
                      {isNotEmptyDays() && (
                        <div className="dates-preview">
                          {Object.keys(state.days).map((day) => state.days[day].map((log) => {
                            const { time, duration } = log;
                            console.log(
                              'the day props are : ',
                              day,
                              state.days[day],
                              log,
                            );

                            return (
                              <div className="date-preview">
                                <p className="text">
                                  Every{' '}
                                  {ActivityFrequencies.findByTitle('bi-weekly')
                                    .id === state.frequency
                                    ? 'other '
                                    : ''}{' '}
                                  {capitalize(day)}
                                </p>
                                <p className="text last">
                                  at {time.hour}:{time.minute} {time.period}
                                </p>
                                <span
                                  className="icon icon-cross"
                                  onClick={() => {
                                    removeSelectedDay(day);
                                  }}
                                />
                              </div>
                            );
                          }))}
                        </div>
                      )}
                    </>
                  )}

                {['daily'].includes(
                  ActivityFrequencies.find(state.frequency).title,
                ) && (
                    <>
                      <div
                        className="start-time option"
                      >
                        <span className="option-label">Start Time</span>
                        <InputTime
                          hour={state.startHour}
                          minute={state.startMinute}
                          period={state.startPeriod}
                          // className="preview"
                          // buttonClassName="preview"
                          onChange={({
                            hour: startHour,
                            minute: startMinute,
                            period: startPeriod,
                          }) => {
                            // let _days = days
                            const days = {
                              sunday: [],
                              monday: [],
                              tuesday: [],
                              wednesday: [],
                              thursday: [],
                              friday: [],
                              saturday: [],
                            };
                            Object.keys(days).forEach((day) => {
                              days[day] = [{ time: { hour: startHour, minute: startMinute, period: startPeriod } }];
                            });
                            // const updateDailyDays = () => {
                            //   const days = {
                            //     sunday: [],
                            //     monday: [],
                            //     tuesday: [],
                            //     wednesday: [],
                            //     thursday: [],
                            //     friday: [],
                            //     saturday: [],
                            //   };
                            //   Object.keys(days).forEach((day) => {
                            //     days[day] = [{ time: { hour: state.startHour, minute: state.startMinute, period: state.startPeriod } }];
                            //   });
                            //   return days;
                            // };
                            setState({
                              startHour,
                              startMinute,
                              startPeriod,
                              // days: updateDailyDays(),
                              days,
                              daysError: false,
                            });
                          }}
                        />
                      </div>
                    </>
                  )}
              </div>
            </div>
          )}
          {state.frequency
            && !['one-time'].includes(
              ActivityFrequencies.find(state.frequency).title,
            ) && (

              <div className="start-time">
                <p className="form-label">
                  Start Date{' '}
                  <span className="error">
                    {state.startDateError ? `: ${state.startDateError}` : ''}
                  </span>{' '}
                </p>
                <InputDatePicker
                  // minDate={new Date()}
                  values={state.startDate}
                  placeholder="Click to select"
                  // className={`preview thin ${state.dateError !== false ? ' error' : ''}`}
                  className="preview thin"
                  onChange={(values) => {
                    setState({
                      startDate: values,
                      startDateError: false,
                    });
                  }}
                  onLoad={(e) => {
                    if (e) {
                      fields.startDate = e.inputDate;
                    }
                  }}
                />
              </div>

            )}
          {state.frequency
            && !['one-time'].includes(
              ActivityFrequencies.find(state.frequency).title,
            ) && (
              <div className="end-time">
                <p className="form-label">
                  End Date{' '}
                  <span className="error">
                    {state.endDateError ? `: ${state.endDateError}` : ''}
                  </span>{' '}
                </p>
                <InputDatePicker
                  minDate={new Date()}
                  values={state.endDate}
                  placeholder="Click to select"
                  // className={`preview thin ${state.dateError !== false ? ' error' : ''}`}
                  className="preview thin"
                  onChange={(values) => {
                    setState({
                      endDate: values,
                      endDateError: false,
                      // dateError: this.isValidDate(values) ? false : state.dateError,
                    });
                  }}
                  onLoad={(e) => {
                    if (e) {
                      fields.endDate = e.inputDate;
                    }
                  }}
                />
              </div>
            )}

          {state.frequency && (
            <div id="activivtyDuration" className="calendar-duration">
              <p className="form-label">Duration </p>
              <InputDuration
                label=""
                value={state.duration}
                className=" thin"
                onChange={(value) => {
                  setState({
                    duration: value,
                  });
                }}
              />
            </div>
          )}
        </div>
      </>
    );
  };

  //

  //

  const editDate = (date) => {
    const format = (number) => {
      const formatedNumber = number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      return formatedNumber;
    };
    if (Array.isArray(date)) {
      const _date = date[0];
      const theDate = `${_date.year}-${format(_date.month)}-${format(
        _date.day,
      )}`;

      return theDate;
    }

    return false;
  };

  const createNewEvent = async (editEvent) => {
    const { settings } = props;
    const { sessionUser } = settings;
    setState({
      savingNewEvent: true,
    });
    const {
      id,
      title,
      description,
      kids,
      // dates,
      date,
      startDate,
      endDate,
      duration,
      frequency,
      locationId,
      // startHour,
      // startMinute,
      // startPeriod,
      days,
      // apartment,
      capacity,
    } = state;

    const fields = {
      id,
      title,
      locationId,
      // apartment,
      // startDate: parseActivityDate(date[0], startHour, startMinute, startPeriod), // <== merges time and date into a date object or returns false
      // startDate: convertTime(startDate[0]),
      startDate,
      endDate,
      // endDate: convertTime(endDate[0]),
      duration,
      // startTime,
      frequency,
      description,
      kids,
      // dates: [convertTime(startDate[0]), convertTime(endDate[0])],
      date,
      days,
      capacity: parseInt(capacity),
    };

    const form = new FormData();
    Object.keys(fields).forEach((key) => {
      const value = fields[key];
      if (value !== undefined && value !== null) {
        if (key === 'days') {
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
          form.dates = parseActivityDates(value);
        } else if (['startDate', 'endDate'].includes(key) && value.length > 0) {
          form[key] = new Date(value[0].year, value[0].month - 1, value[0].day);
        } else {
          form[key] = value;
        }
      }
    });
    const eventData = await props.fetchRequest({
      url: `${process.env.REACT_APP_API}/calendar`,
      method: 'POST',
      // method: editEvent ? "PATCH" : "POST",
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', eventData.id, '');
    setID(eventData.id);
    props.updateCalendarEvents([...props.calendar.events, eventData]);
    // setState({ id: eventData.id });
  };

  //

  //
  //
  const newEventForm = (editEvent) => {
    const { sessionUser, screen } = props.settings;
    const { device } = screen;

    let duration = Math.floor(state.duration / 60);
    if (duration === 0) {
      duration = `${state.duration}mins`;
    } else {
      const mins = state.duration % 60;
      duration = `${duration}hr${duration > 1 ? 's' : ''} ${mins > 0 ? `${mins}mins` : ''
        }`;
    }
    return (
      <PopMessage
        //   ref={(e) => {
        //     this.viewRequestPopMessage = e;
        //   }}
        message={(
          <div id="newCalendarEventForm" className="pop-message">
            {/*  <div className="closer">
                <span
                  className="icon icon-cross"
                  onClick={() => {
                    if (this.viewRequestPopMessage) {
                      this.viewRequestPopMessage.hide();
                    }
                  }}
                />
              </div> */}

            <div className="form">
              <h2 className="text-start">{editEvent ? 'Edit' : 'New'} Event</h2>
              <div className="form-container">
                <div className="forms">
                  <div className="form left">
                    <InputField
                      id="title"
                      // type="textarea"
                      label={(
                        <>
                          Title
                          <span className="error">
                            {' '}
                            {state.titleError ? `: ${state.titleError}` : ''}
                          </span>
                        </>
                      )}
                      placeholder="title"
                      value={ucFirst(state.title)}
                      maxLength={Utils.getValue('MaxActivityTitleLen')}
                      // className={`${state.titleError !== false ? ' error' : ''}`}
                      onChange={(value) => {
                        setState({
                          title: value,
                          titleError: isEmpty(value) ? state.titleError : false,
                        });
                      }}
                    />

                    {Location()}
                  </div>

                  <div className="form right">
                    {/* {screen.width > process.env.MOBILE_BREAKPOINT && this.Location()} */}
                    {/* <div id="dayAndTime" className="day-and-time"> */}

                    {/*  */}
                    {/* <FrequencyField /> */}
                    {FrequencyField()}

                    <div id="activivties" className="form">
                      <p className="form-label  text-start">
                        Need to Tag your Kid(s)? <span className="kid-error">{state.kidsError ? `: ${state.kidsError}` : ''}</span>
                      </p>
                      <InputPicker
                        values={state.kids}
                        options={sessionUser.kids.map((kid) => ({
                          label: capitalize(kid.preferredName),
                          value: kid.id,
                        }))}
                        onChange={(values) => {
                          setState({
                            kids: values,
                            kidsError: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="form">
                    <InputField
                      id="numberOfAttendee"
                      type="number"
                      label={(
                        <>
                          Max number of attendee
                          <span className="error">
                            {' '}
                            {state.capacityError
                              ? `: ${state.capacityError}`
                              : ''}
                          </span>
                        </>
                      )}
                      // placeholder="Any other thing you want us to know?"
                      value={state.capacity}
                      // className={`${state.descriptionError !== false ? ' error' : ''}`}
                      onChange={(value) => {
                        setState({
                          capacity: value,
                          capacityError: false,
                        });
                      }}
                    />
                  </div>
                  <div className="form">
                    <InputField
                      id="description"
                      type="textarea"
                      label={(
                        <>
                          Write a Brief Description
                          <span className="error">
                            {' '}
                            {state.descriptionError
                              ? `: ${state.descriptionError}`
                              : ''}
                          </span>
                        </>
                      )}
                      // placeholder="Any other thing you want us to know?"
                      value={ucFirst(state.description)}
                      // className={`${state.descriptionError !== false ? ' error' : ''}`}
                      onChange={(value) => {
                        setState({
                          description: value,
                          descriptionError: isEmpty(value)
                            ? state.descriptionError
                            : false,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        confirmButton={{
          label: 'SAVE',
          onClick: async (closer, hideLoader) => {
            if (!state.savingNewEvent) {
              const validation = validateForm();
              try {
                if (validation) {
                  await createNewEvent(editEvent);
                  console.log('guy work 0oopppyyy');
                  // setState(defaultNewEvent);
                  setState({
                    ...defaultNewEvent,
                    savingNewEvent: false,
                  });
                  popAlert({
                    title: 'Event created',
                    description: 'Do you want to share this event with others?',
                    confirmButton: {
                      onClick: (closer) => {
                        setState({
                          showPopMessage: true,
                        });
                        closer();
                      },
                      show: true,
                    },
                    cancelButton: {
                      onClick: (closer) => {
                        closer();
                      },
                      show: true,
                    },
                  });
                  closer();
                } else {
                  hideLoader();
                }
              } catch (e) {
                console.log(e);
                setState({
                  savingNewEvent: false,
                });
                hideLoader();
              }
            } else {
              hideLoader();
            }
          },
        }}
        onCancel={() => {
          setState({
            createNewEvent: false,
            editEvent: false,
          });
        }}
      />
    );
  };

  const TheAccordion = ({
    title, body, show, toggleShow,
  }) => (
    <div>
      <div
        className="accord-header"
        onClick={() => {
          console.log('woop');
          toggleShow(!show);
        }}
      >
        <div className="acc-title">{title}</div>
        {show ? <span>-</span> : <span>+</span>}
      </div>
      <div className={`acc-body ${show ? 'acc-open' : 'acc-closed'}`}>
        <div>{body}</div>
      </div>
    </div>
  );

  // validate form

  // useEffect(() => {
  //   props.onPageLoad();
  //   try {
  //     props.loadCalendar();
  //     // this.updateEventsInView();
  //   } catch (erroRes) {
  //     console.log(erroRes);
  //   }
  // }, []);
  // const newAccount = async () => {
  //   const eventData1 = await props.fetchRequest({
  //     url: `${process.env.REACT_APP_API}/calendar`,
  //     method: "POST",
  //     // method: editEvent ? "PATCH" : "POST",
  //     body: {
  //       title: "Hello World",
  //       locationId: "",
  //       description: "i am coming home",
  //       startDate: "2022-03-01",
  //       endDate: "2022-03-04",
  //       startTime: "12:00 pm",
  //       duration: 30,
  //       kids: ["0f025f94-e8b3-4223-8952-f2d8b165e902"],
  //       frequency: "f9959324-3df1-4e8e-9594-e0602ac9f1cd",
  //       capacity: 1,
  //     },
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // };
  // useEffect(() => {
  //   // const d = moment("2022-03-15T15:00:00.000Z");
  //   // console.log(d, "check the time");

  //   newAccount();
  // }, []);
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  console.log(props, 'this are the props');

  const sendToTribe = async (selected) => {
    const { selectedTribeShare } = state;
    const fields = {
      attendees: selected === 'tribe' ? selectedTribeShare : selectedVillageShare,
    };
    try {
      const share = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/calendar/${iD}/share`,
        method: 'POST',
        // method: editEvent ? "PATCH" : "POST",
        body: fields,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setState({
        tribeShare: false,
        shareVillage: false,
        showSharePopUp: true,
        selectedTribeShare: [],
        selectedVillageShare: [],
      });
    } catch (e) {
      console.log(e);
    }
  };

  const eventURL = `${process.env.FULL_APP_URL}/calendar/${iD}`;
  const shareMessage = (
    `Hi
 I think you should check out this event on Abule
 ${eventURL}`
  );
  const shareOptions = [
    {
      label: 'Social Media',
      options: [
        {
          label: 'facebook',
          icon: 'fa fa-facebook',
          onClick: () => {
            if (window.FB) {
              window.FB.ui({
                display: 'popup',
                method: 'share',
                href: eventURL,
                quote: shareMessage,
              }, (response) => {
                console.log('response gotten', response);
              });
            }
          },
        },
        {
          label: 'twitter',
          icon: 'fa fa-twitter',
          onClick: () => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`);
          },
        },
        {
          label: 'linkedIn',
          icon: 'fa fa-linkedin',
          onClick: () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${eventURL}`);
          },
        },
      ],
    },
    {
      label: 'Messaging & Email',
      options: [
        {
          label: 'email',
          icon: 'fa fa-envelope',
          onClick: () => {
            window.open(`mailto:?subject=Check%20out%20this%20activity%20on%20Abulé&body=${encodeURIComponent(shareMessage)}`);
          },
        },
        {
          label: 'whatsapp',
          icon: 'fa fa-whatsapp',
          onClick: () => {
            if (mobileCheck()) {
              window.open(`whatsapp://send?text=${encodeURIComponent(shareMessage)}`);
            } else {
              window.open(`https://web.whatsapp.com://send?text=${encodeURIComponent(shareMessage)}`);
            }
          },
        },
        {
          label: 'SMS',
          icon: 'fa fa-comment-o',
          onClick: () => {
            window.open(`sms:&body=${encodeURIComponent(shareMessage)}`);
          },
        },
        {
          label: 'messager',
          icon: 'fa fa-comment-o',
          onClick: () => {
            if (window.FB) {
              window.FB.ui({
                display: 'popup',
                method: 'send',
                link: eventURL,
                quote: shareMessage,
              }, (response) => {
                console.log('response gotten', response);
              });
            }
          },
        },
      ],
    },
  ];
  const { friendGroups, selectedDate } = state;
  return (
    <Layout {...props}>
      <div id="new-calendar" className="page-container">
        <div className="page-header">
          <div className="full-width">
            <h1 className="title">
              <p>Calendar</p>
            </h1>
            <div className="actions">
              <button
                type="button"
                className="action btn btn-black  btn-1"
                onClick={() => {
                  setState({
                    createNewEvent: true,
                  });
                }}
              >
                ADD NEW EVENT
              </button>
            </div>
          </div>
          <div className="kid-mobile full-width">
            <div className="ranking-opt">
              {sessionUser.kids.map((kid) => (
                <div className="indiv-rank">
                  <span className={`rank-color ${kid.color}`} />
                  <div className="text-rank">{kid.firstName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* / */}
        <div className="supports-timeline data-section">
          <div className="container">
            {!state.createNewEvent && (
              <div className="create-btn-mobile">
                <img
                  src="/images/plus.svg"
                  alt=""
                  onClick={() => {
                    setState({
                      createNewEvent: true,
                    });
                  }}
                />
              </div>
            )}
            <div className="heading">
              <div className="date-sec">
                <div
                  onClick={() => {
                    setState({
                      selectedDate: new Date(),
                    });
                  }}
                >
                  Today
                </div>
                <div className="change-day">
                  <button
                    type="button"
                    className="drop-cntrl-button nav-link"
                    onClick={async () => {
                      const removeADay = selectedDate;
                      if (state.dayView) {
                        removeADay.setHours(-24);
                      } else {
                        removeADay.setDate(removeADay.getDate() - 7);
                      }
                      await setState({
                        selectedDate: removeADay,
                      });
                    }}
                  >
                    <span className="icon-chevron-left" />
                  </button>
                  <button
                    type="button"
                    className="drop-cntrl-button nav-link"
                    onClick={async () => {
                      const addADay = selectedDate;
                      if (state.dayView) {
                        addADay.setHours(24);
                      } else {
                        addADay.setDate(addADay.getDate() + 7);
                      }
                      await setState({
                        selectedDate: addADay,
                      });
                    }}
                  >
                    <span className="icon-chevron-right" />
                  </button>
                </div>
                {/* <InputDatePicker
                  minDate={new Date()}
                  values={state.endDate}
                  placeholder="Click to select"
                    // className={`preview thin ${state.dateError !== false ? ' error' : ''}`}
                  className="no show"
                  onChange={(values) => {
                    setState({
                      endDate: values,
                      endDateError: false,
                      // dateError: this.isValidDate(values) ? false : state.dateError,
                    });
                  }}
                  onLoad={(e) => {
                    // if (e) {
                    //   fields.endDate = e.inputDate;
                    // }
                  }}
                /> */}
                {/* <CalendarTimeline /> */}
                {/* <Selectdate /> */}
              </div>
              <div className="ranking-opt">
                {sessionUser.kids.map((kid) => (
                  <div className="indiv-rank">
                    <span className={`rank-color ${kid.color}`} />
                    <div className="text-rank">{kid.firstName}</div>
                  </div>
                ))}
              </div>
              <div className="week-dropdown">
                <span>{state.dayView ? 'Day' : 'Week'}</span>
                {displayView && (
                  <div
                    className="drop-cntrl"
                    ref={(e) => {
                      setViewChangerDropdown(e);
                    }}
                  >
                    {displayView}
                    <div
                      className={`display-drop-list${state.showDisplayView ? ' show' : ''
                        }`}
                    >
                      <div className="drop-lists">
                        <p
                          className="drop-list"
                          onClick={() => setState({
                            dayView: false,
                            showDisplayView: false,
                          })}
                        >
                          Week
                        </p>
                        <p
                          className="drop-list"
                          onClick={() => {
                            setState({
                              dayView: true,
                              showDisplayView: false,
                            });
                          }}
                        >
                          Day
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div />
          {/* <NewTimeline
            timeline={{
              monday: [],
              tuesday: [],
              wednesday: [],
              thursday: [],
              friday: [],
              saturday: [],
              sunday: [],
            }}
            on
          /> */}
          <CalendarTimeline
            {...props}
            selectedDate={selectedDate}
            dayViews={state.dayView}
            // events={arrayOfEvent}
            events={events}
          />
        </div>
        {/*  */}
      </div>
      {/* </div> */}
      {state.createNewEvent && newEventForm()}
      {state.showPopMessage && (
        <PopMessage
          // show={state.initregistration}
          style={{ zIndex: '3' }}
          mainStyle={{ zIndex: '3' }}
          message={(
            <div id="shareEvent">
              <p className="title">Share this event with:</p>
              <div className="tribe-village-share container">
                <button
                  type="button"
                  className="btn  btn-2"
                  onClick={() => {
                    setState({
                      tribeShare: true,
                      friendGroups: [
                        ...approvedFriends.groups.map((group) => ({
                          ...group,
                          members: group.members.map(
                            (userId) => allFriends[userId],
                          ),
                          show: false,
                        })),
                        ...(approvedFriends.unassigned.length > 0
                          ? [
                            {
                              id: 'unassigned',
                              name: 'unassigned',
                              members: approvedFriends.unassigned.map(
                                (userId) => allFriends[userId],
                              ),
                              show: false,
                            },
                          ]
                          : []),
                      ],
                      showPopMessage: false,
                    });
                  }}
                >
                  TRIBE
                </button>
                <button
                  className="btn  btn-1"
                  onClick={() => {
                    setState({
                      shareVillage: true,
                      showPopMessage: false,
                    });
                  }}
                >VILLAGE
                </button>
              </div>
            </div>
          )}
          confirmButton={{
            // label: "TRIBE",

            // onclick: async () => {

            // },
            show: false,
          }}
          cancelButton={{
            show: false,
          }}
          onCancel={() => {
            // const { props, state } = this;
            setState({
              showPopMessage: false,
            });
            // onClose();
          }}
        />
      )}

      {state.tribeShare && (
        <PopMessage
          // show={state.initregistration}
          message={(
            <div id="shareToTribe">
              <div className="pop-message">
                <p className="title">Select tribe</p>
                <div className="search-case">
                  <SearchBar />
                </div>
                <div className="tribe-case">
                  {friendGroups.map((group) => {
                    const newArray = [];
                    group.members.forEach((e) => {
                      newArray.push(e.id);
                    });
                    return (
                      <div>
                        <TheAccordion
                          title={group.name}
                          show={group.show}
                          toggleShow={() => toggleFriendGroupShow(group.id)}
                          body={(
                            <div className="userConnect-wrap">
                              <div className="all-selection">
                                <div
                                  className="select-all nav-link"
                                  onClick={(e) => {
                                    // e.preventDefault();
                                    setSelectedTribe(newArray);
                                    setState({
                                      selectedTribeShare: newArray,
                                    });
                                  }}
                                >
                                  Select All
                                </div>
                                <div
                                  className="unselect-all nav-link"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setState({
                                      selectedTribeShare: [],
                                    });
                                  }}
                                >
                                  Unselect All
                                </div>
                              </div>
                              {group.members.map((tribeMember) => (
                                <UserConnectCard
                                  viewType="flat"
                                  // type={groupType}
                                  // as={!group.name ? 'unassigned' : ''}
                                  user={tribeMember}
                                  onClick={() => {
                                    console.log('raining');
                                    if (
                                      state.selectedTribeShare.includes(
                                        tribeMember
                                          .userId
                                        ,
                                      )
                                    ) {
                                      // alert("entered");
                                      const testArray = state.selectedTribeShare.filter(
                                        (e) => e !== tribeMember
                                          .userId
                                        ,
                                      );
                                      setState({
                                        selectedTribeShare: testArray,
                                      });
                                      // setSelectedTribe(testArray);
                                    } else {
                                      const testArray = state.selectedTribeShare;
                                      testArray.push(tribeMember
                                        .userId);
                                      setState({
                                        selectedTribeShare: testArray,
                                      });
                                    }
                                  }}
                                  // groupId={group.id || ''}viewType={viewType === 'rows' ? 'flat' : ''}
                                  // type={groupType}
                                  // as={!group.name ? 'unassigned' : ''}
                                  // user={user}
                                  searchTribe
                                  selected={state.selectedTribeShare.includes(
                                    tribeMember.userId,
                                  )}
                                  groupId={group.id || ''}
                                />
                              ))}
                            </div>
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {state.selectedTribeShare.length > 0 && (
                <div className="float-btn-case">
                  <button
                    type="button"
                    className="action btn btn-black btn-1"
                    onClick={async () => {
                      await sendToTribe('tribe');
                    }}
                  >Send
                  </button>
                </div>
              )}
            </div>
          )}
          confirmButton={{
            // label: "TRIBE",
            // onclick: async () => {
            //   try {
            //     await sendToTribe();
            //   } catch (e) {
            //     console.log(e);
            //   }
            // },
            show: false,
          }}
          cancelButton={{
            show: false,
          }}
          onCancel={() => {
            // const { props, state } = this;
            // onClose();
            setState({
              tribeShare: false,
            });
          }}
        />
      )}

      {/* share to village */}
      <PopMessage
        show={state.shareVillage}
        message={(
          <div id="shareToTribe">
            <div className="pop-message">
              <p className="title">Select from village</p>
              <div className="search-case">
                <SearchBar />
              </div>
              <div className="tribe-case">
                {state.selectedVillage.length > 0 && (<p className="sub-title">Selected</p>)}
                {state.selectedVillage.map((user) => (
                  <div>
                    <UserConnectCard
                      viewType="flat"
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      user={user}
                      onClick={() => {
                        const newArray = state.selectedVillage.filter((friend) => friend.userId !== user.userId);
                        setState({
                          allFriends: [...state.allFriends, user],
                          selectedVillage: newArray,
                        });
                      }}
                      // groupId={group.id || ''}viewType={viewType === 'rows' ? 'flat' : ''}
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      // user={user}
                      searchTribe
                      selected
                    />
                  </div>
                ))}
              </div>
              <div className="tribe-case">
                {state.allFriends.length > 0 && <p className="sub-title">Select from village</p>}
                {state.allFriends.map((user) => (
                  <div>
                    <UserConnectCard
                      viewType="flat"
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      user={user}
                      onClick={() => {
                        const newArray = state.allFriends.filter((friend) => friend.userId !== user.userId);
                        setState({
                          selectedVillage: [...state.selectedVillage, user],
                          allFriends: newArray,
                        });
                      }}
                      // groupId={group.id || ''}viewType={viewType === 'rows' ? 'flat' : ''}
                      // type={groupType}
                      // as={!group.name ? 'unassigned' : ''}
                      // user={user}
                      searchTribe
                    />
                  </div>
                ))}
              </div>
            </div>
            {state.selectedVillage.length > 0 && (
              <div className="float-btn-case">
                <button
                  type="button"
                  className="action btn btn-black btn-1"
                  onClick={async () => {
                    await sendToTribe('village');
                    // setState({
                    //   showSharePopUp: true,
                    // });
                  }}
                >Send
                </button>
              </div>
            )}
          </div>
        )}
        confirmButton={{
          // label: "TRIBE",
          // onclick: async () => {
          //   try {
          //     await sendToTribe();
          //   } catch (e) {
          //     console.log(e);
          //   }
          // },
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          // const { props, state } = this;
          // onClose();
          setState({
            shareVillage: false,
          });
        }}
      />
      {/* share out side tribe */}
      <PopMessage
        show={state.showSharePopUp}
        // style={{ zIndex: '2' }}
        message={(
          <div id="showActivity">
            <p className="title">Share with people outside your village</p>
            <div className="content">

              {shareOptions.map((group) => (

                <div className="group">
                  <div className="group-title">
                    <div className="label">{group.label}</div>
                    <span className="ruler" />
                  </div>
                  <div className="group-content">
                    {group.options.map((type) => (
                      <div
                        className="media-type"
                        onClick={() => {
                          if (type.onClick) {
                            type.onClick();
                          }
                        }}
                      >
                        <span className={`icon ${type.icon} ${type.label}`} />
                        <span className="name">{type.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="group">
                <div className="group-title">
                  <div className="label">Copy Link</div>
                  <span className="ruler" />
                </div>
                <div className="group-content single">
                  <div className="link-copier">
                    <input
                      readOnly
                      id="copyUrl"
                      value={eventURL}
                    />
                    <ToolTipWrapper
                      showToolTip={state.showCopiedMessage}
                      message="Copied!"
                    >
                      <abbr
                        title="copy to clipboard"
                        onClick={() => {
                          const link = document.getElementById('copyUrl');
                          link.select();
                          document.execCommand('copy');
                          this.showCopiedMessage();
                        }}
                      >
                        <button type="button">copy</button>
                      </abbr>
                    </ToolTipWrapper>

                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        )}
        confirmButton={{
          show: false,
        }}
        cancelButton={{
          show: false,
        }}
        onCancel={() => {
          setState({
            showSharePopUp: false,
          });
        }}
      />
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  calendar: state.calendar,
});
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
  updateCalendar: (props) => dispatch(setProps(props)),
  updateCalendarDate: (date) => dispatch(updateDate(date)),
  resetCalendarDate: () => dispatch(resetDate()),
  updateCalendarEvents: (events) => dispatch(updateEvents(events)),
  removeCalendarEvents: (events) => dispatch(updateEvents(events, {}, 'remove')),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarMain);
