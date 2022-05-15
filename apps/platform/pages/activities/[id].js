import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import Head from 'next/head';
import $ from 'jquery';
import moment from 'moment';
import {
  Fn, PopMessage, InputDatePicker, ToolTipWrapper, InputField,
} from '@abule-common/components';
import Layout from '../../components/general/Layout';
import { updateHeader, setInfo } from '../../redux/settings/action';
import PageLoader from '../../components/general/PageLoader';
import {
  ActivityFrequencies, ActivityTypes, AgeGroups, Utils,
} from '../../datastore';
import { AgeGroupIcons, Messages } from '../../public/data/assets';
import { updateEvents } from '../../redux/calendar/action';
import ActivitySlideShow from '../../components/ActivitySlideShow';
import ActivityRegistration from '../../components/activities/registerForActivity';
import { setActivity } from '../../redux/view-activity/action';
import ActivityEvent from '../../components/activities/ActivityEvent';
import ActivityReview from '../../components/activities/ActivityReview';

const {
  addToTime, popAlert, popPrompt, capitalize, parseDuration, getWeekDay, padString,
  formatCalendarDates, trimString, getDatePositionInMonth, isEmpty, mobileCheck,
} = Fn;

class ViewActivity extends React.Component {
  constructor(props) {
    super(props);

    this.defaultFilter = {
      start: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
      ),
      end: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        new Date().getDate(),
        11,
        59,
      ),
    };

    this.state = {
      initregistration: false,
      broadcastMessageContent: '',
      broadcastMessageContentError: false,
      activityStarted: false,
      activityEnded: false,
      readMoreDescription: false,
      readMoreMaterialsNeeded: false,
      readMoreHostBio: false,
      activityEventDetails: false,
      filter: this.defaultFilter,
      showSharePopUp: false,
      showCopiedMessage: false,
      loading: true,
    };
    const { id } = Router.query;
    const { sessionUser } = props.settings;
    this.activityURL = `${process.env.FULL_APP_URL}/activities/${id}`;
    this.shareMessage = (
      `Hi
I think you should check out this activity on Abule
${this.activityURL}`
    );
    this.shareOptions = [
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
                  href: this.activityURL,
                  quote: this.shareMessage,
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
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.shareMessage)}`);
            },
          },
          {
            label: 'linkedIn',
            icon: 'fa fa-linkedin',
            onClick: () => {
              window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${this.activityURL}`);
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
              window.open(`mailto:?subject=Check%20out%20this%20activity%20on%20Abulé&body=${encodeURIComponent(this.shareMessage)}`);
            },
          },
          {
            label: 'whatsapp',
            icon: 'fa fa-whatsapp',
            onClick: () => {
              if (mobileCheck()) {
                window.open(`whatsapp://send?text=${encodeURIComponent(this.shareMessage)}`);
              } else {
                window.open(`https://web.whatsapp.com://send?text=${encodeURIComponent(this.shareMessage)}`);
              }
            },
          },
          {
            label: 'SMS',
            icon: 'fa fa-comment-o',
            onClick: () => {
              window.open(`sms:&body=${encodeURIComponent(this.shareMessage)}`);
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
                  link: this.activityURL,
                  quote: this.shareMessage,
                }, (response) => {
                  console.log('response gotten', response);
                });
              }
            },
          },
        ],
      },
    ];
    this.banner = null;
    this._isMounted = false;

    this.register = this.register.bind(this);
    this.getUserKidById = this.getUserKidById.bind(this);
    this.parseNote = this.parseNote.bind(this);
    this.sendMessageToParticipants = this.sendMessageToParticipants.bind(this);
    // this.activityDetailsHeader =
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { id } = Router.query;
    console.log({ ...Router });
    props.onPageLoad();
    const { sessionUser } = props.settings;
    props.fetchRequest({
      url: `${process.env.REACT_APP_API}/activities/${id}`,
      method: 'GET',
      checkUser: !!sessionUser,
    }).then((data) => {
      if (this._isMounted) {
        if (data.status === 'draft') {
          Router.push(`${props.AppUrl}/`);
        }
        props.setActivity(data);

        // subscribe to get updates on the activity registration
        /* if (!data.kidsAttending) {
          props.emitEvent({
            topic: 'activities',
            event: 'subscribe-to-one',
            activityId: data.id,
          });
        } */
        const { filter } = this.state;
        const startDate = new Date();
        // if (filter.start < startDate) {
        //   startDate = new Date(data.startDate);
        // }

        let endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate(),
          11,
          59,
        );
        if (filter.end > endDate) {
          endDate = new Date(data.endDate);
        }
        this.setState({
          loading: false,
          /*  filter: {
            start: startDate,
            end: endDate,
          }, */
        });

        $.ajaxSetup({ cache: true });
        $.getScript('https://connect.facebook.net/en_US/sdk.js', () => {
          window.FB.init({
            appId: process.env.FACEBOOK_APP_ID,
            version: 'v2.7', // or v2.1, v2.2, v2.3, ...
          });
        });
      }
    }).catch((erroRes) => {
      console.log('the ress', erroRes);
      // alert('we error');
      Router.push(`${props.AppUrl}/`);
    });

    (function (d) {
      const f = d.getElementsByTagName('SCRIPT')[0];
      const p = d.createElement('SCRIPT');
      p.type = 'text/javascript';
      p.async = true;
      p.src = '//assets.pinterest.com/js/pinit.js';
      f.parentNode.insertBefore(p, f);
    }(document));
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  componentWillUnmount() {
    this._isMounted = false;
    clearInterval(this.timerHandler);
  }

  getAgeGroupIcon(type) {
    return AgeGroupIcons[type];
  }

  getUserKidById(id) {
    const { state, props } = this;
    const { sessionUser } = props.settings;
    const { kids } = sessionUser;
    for (const kid of kids) {
      if (kid.id === id) {
        return kid;
      }
    }

    return false;
  }

  register(date) {
    const { props, state } = this;
    const { settings, viewActivity } = props;
    const { activity } = viewActivity;
    const { sessionUser, screen } = settings;
    const attendanceLength = activity.attendance[date.getTime()].length;
    const now = new Date();
    const activityStarted = now > date;
    const activityEnded = addToTime(date, activity.duration * 60 * 1000) < now;
    if (sessionUser) { // first thing will be
      if (attendanceLength < Utils.getValue('MaxActivityAttendanceLen')) {
        const event = {
          date,
          seatRemaining: Utils.getValue('MaxActivityAttendanceLen') - attendanceLength,
        };
        if (activityStarted && !activityEnded) {
          popPrompt({
            message: (
              <div>
                <p>This activity has already started.</p>
                <p>Are you sure you want to register for it?</p>
              </div>
            ),
            confirmButton: {
              label: 'YES',
              onClick: async (clser) => {
                if (!activityEnded) {
                  this.setState({
                    initregistration: event,
                  });
                }
                clser();
              },
            },
            cancelButton: {
              label: 'NO',
            },
          });
        } else {
          this.setState({
            initregistration: event,
          });
        }
      } else {
        popAlert({
          title: "Can't register",
          description: 'This activity has reached its maximum capacity',
          error: true,
        });
      }
    } else {
      props.showSignUp();
    }
  }

  getPositionInMonth(date) {
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

    for (let i = 0; i < firstDay; i += 1) {
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
        weekIndex += 1;
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
    return `${Week(weekIndex)} ${capitalize(day)}`;
  }

  normalBanner(awaitingActivity = false, isHost) {
    const { props, state } = this;
    const { activity } = props.viewActivity;
    const { settings: { sessionUser, screen } } = props;
    const { device } = screen;
    const { mediaUrls } = activity;
    const bottomTiles = mediaUrls;
    const topTile = mediaUrls.length === 2 ? null : mediaUrls[0];

    let awaitingActivityNoteMessage = state.activityEnded ? 'You attended this register' : "You're already registered for this activity.";
    if (isHost) {
      awaitingActivityNoteMessage = state.activityEnded ? 'You hosted this activity.' : "You're the host of this activity.";
    }

    const awaitingActivityNote = false && (
      <div id="awaitingActivityNote">
        <Link href={`${props.AppUrl}/calendar/activities/[id]`} as={`${props.AppUrl}/calendar/activities/${activity.id}`}>
          <a>
            {awaitingActivityNoteMessage}
            <span> Click here to view {!state.activityStarted && 'or update'} details.</span>
          </a>
        </Link>
      </div>
    );

    return (
      <>
        <div className="hmv-hero">
          {(awaitingActivity || isHost) && awaitingActivityNote}
          <div className="banner">
            <div className="main">
              <div className="right">
                {/* {topTile ? this.getMediaContent(topTile) : ''} */}
                <ActivitySlideShow
                  items={mediaUrls.map((media) => (media))}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  parseNote(text, readMore, onReadMore) {
    const textArr = text.split('\n');
    return textArr.map((row, index) => (
      isEmpty(row)
        ? <br />
        : (
          <p>{row}{index === textArr.length - 1 && readMore ? (
            <>
              ... <b className="link" onClick={onReadMore}>read more </b>
            </>
          ) : ''}
          </p>
        )
    ));
  }

  async addAttendance(dates) {
    const { props } = this;
    const { sessionUser } = props.settings;
    const { activity } = props.viewActivity;
    // alert('we in');
    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/activities/${activity.id}/attendance?dates=${dates.map((date) => date.getTime()).join(',')}`,
        method: 'GET',
        checkUser: !!sessionUser,
      });

      if (this._isMounted) {
        console.log('get an activity ', { data });
        props.setActivity({
          ...activity,
          ...data,
          attendance: {
            ...activity.attendance,
            ...data.attendance,
          },
        });
      }
    } catch (erroRes) {
      console.log('errror response error res', erroRes);
      alert('we getting');
      // Router.push(props.AppUrl+"/");
    }
  }

  getActivityEvents(startDate, endDate) {
    const { props, state } = this;
    const { activity } = props.viewActivity;
    const { settings: { sessionUser } } = props;
    const eventDates = [];
    const allDates = [];
    const frequency = ActivityFrequencies.find(activity.frequency);
    if (['one-time'].includes(frequency.title)) {
      activity.dates.forEach((date) => {
        date = new Date(date);
        if (date >= startDate && date <= endDate) {
          eventDates.push(date);
        }
      });
    } else if (['monthly'].includes(frequency.title)) {
      const log = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };
      activity.dates.forEach((date) => {
        const datePosition = getDatePositionInMonth(date, true);

        log[datePosition.day].push({
          date,
          weekIndex: datePosition.weekIndex,
        });
      });

      let newEventDate = startDate;

      while (newEventDate <= endDate) {
        const day = getWeekDay(newEventDate.getDay());

        if (log[day].length > 0) {
          const datePosition = getDatePositionInMonth(newEventDate, true);
          // check if date postion is requesed for
          for (const dP of log[day]) {
            if (dP.weekIndex === datePosition.weekIndex) {
              const dpDate = new Date(dP.date);
              // console.log('testing of the the date', { newEventDate, day, time: days[day] });
              eventDates.push(
                new Date(
                  newEventDate.getFullYear(),
                  newEventDate.getMonth(),
                  newEventDate.getDate(),
                  dpDate.getHours(),
                  dpDate.getMinutes(),
                ),
              );
              break;
            }
          }
        }
        newEventDate = new Date(
          newEventDate.getFullYear(),
          newEventDate.getMonth(),
          newEventDate.getDate() + 1,
          0,
          0,
        );
      }
    } else {
      // if weekly or bi-weekly
      const { days } = activity;
      const log = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
      };

      const test = new Date(activity.startDate);
      let newEventDate = new Date(test.getTime());
      while (newEventDate <= endDate) {
        // console.log('NEW', { UTC: newEventDate.toISOString(), newEventDate });
        const day = getWeekDay(newEventDate.getUTCDay());
        log[day] += 1;
        if (newEventDate >= startDate) {
          allDates.push(newEventDate);
          // console.log('the log day is : ', { day, log: log[day] });
          if (days[day] && (log[day] === 1 || log[day] % (frequency.interval / 7) === 0)) {
            const newEventDateClone = new Date(newEventDate.getTime());
            const timeZoneDiff = new Date(
              newEventDateClone.getUTCFullYear(),
              newEventDateClone.getUTCMonth(),
              newEventDateClone.getUTCDate(),
              0,
              0,
            ).getTimezoneOffset() / 60;
            /* console.log('yep we adding the log day is : ', {
              timeZoneDiff, date: newEventDate.toISOString(), day, log: log[day],
            }); */
            days[day].forEach((time) => {
              const hour = time.hour - timeZoneDiff;
              const { minute } = time;
              const eventDate = new Date(
                newEventDateClone.getUTCFullYear(),
                newEventDateClone.getUTCMonth(),
                newEventDateClone.getUTCDate(),
                hour,
                minute,
              );

              if (eventDate >= startDate && eventDate <= endDate) {
                // console.log('ADDING EVENT DATE', eventDate);
                eventDates.push(eventDate);
              }
            });
          }
        }
        if (log[day] === 1) {
          log[day] += 1;
        }
        // console.log('OLD', newEventDate);
        // console.log('OLD', newEventDate);
        const dub = (str) => padString(str, '0', 2);
        newEventDate = new Date(
          newEventDate.getFullYear(),
          newEventDate.getMonth(),
          newEventDate.getDate() + 1,
          0,
          0,
        );
        // newEventDate = new Date(`${newEventDate.getFullYear()}-${dub(newEventDate.getMonth())}-${dub(newEventDate.getDate())}T${dub(newEventDate.getHours())}:${dub(newEventDate.getMinutes())}:00.000Z`);
      }
    }
    // console.log('1 EVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV', eventDates);

    const fetchDatesAttendance = [];
    // get the list of dates that dont have coresponding attendance
    const attendanceDates = Object.keys(activity.attendance);
    eventDates.forEach((date) => {
      date = new Date(date);

      if (!attendanceDates.includes(`${date.getTime()}`)) {
        fetchDatesAttendance.push(date);
      }
    });

    if (fetchDatesAttendance.length > 0) {
      this.addAttendance(fetchDatesAttendance);
    }

    return eventDates;
  }

  async startVirtualEvent(date, isHost, callback = () => { }) {
    const { props, state } = this;
    const { settings: { sessionUser }, viewActivity } = props;
    const { activity } = viewActivity;
    const { meeting } = activity;
    const { attendees } = activity.attendance[date.getTime()];
    if (isHost) {
      if (attendees.length > 0) {
        try {
          const data = await props.fetchRequest({
            url: `${process.env.REACT_APP_API}/activities/${activity.id}/meeting`,
            method: 'POST',
          });
          /* this.setState({
              windowOpen: `/meeting/${data.meetingId}`,
            }); */
          Router.push(`${props.AppUrl}/meeting/[id]`, `${props.AppUrl}/meeting/${data.meetingId}`);
          // callback();
          // window.open(`/meeting/${data.meetingId}`, '_blank');

          props.emitEvent({
            topic: 'activities',
            event: 'activity-meeting-start',
            activityId: activity.id,
          });
        } catch (erroRes) {
          console.log('GGGGGGGGGGGGGGGGGGGGGGGGGGGG', erroRes);
          popAlert({
            title: "Couldn't start this event",
            description: 'please try again',
            error: true,
          });
        }
      } else {
        popAlert({
          title: 'Unable to start event',
          description: 'No one has registered for this activity',
          error: true,
        });
      }
    } else {
      // first get meeting id
      if (!meeting) {
        await this.addAttendance([new Date()]);
      }
      if (meeting && meeting.id) {
        window.open(`${props.AppUrl}/meeting/${meeting.id}`, '_blank');
      } else {
        popAlert({
          title: 'Unable to join event',
          description: 'Waiting on host to start the event',
          error: true,
        });
      }
    }
    callback();
  }

  ActivityEventDetails(date) {
    date = new Date(date);
    const { props, state } = this;
    const { activity } = props.viewActivity;
    const { attendees } = activity.attendance[date.getTime()];
    const formattedDate = formatCalendarDates([{
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }], {
      day: true,
    });

    let startHour = date.getHours();
    let startPeriod = 'AM';
    if (startHour > 12) {
      startHour -= 12;
      startPeriod = 'PM';
    }

    const TheEndDate = addToTime(date, activity.duration * 60 * 1000);
    let endHour = TheEndDate.getHours();
    let endPeriod = 'AM';
    if (endHour > 12) {
      endHour -= 12;
      endPeriod = 'PM';
    }

    let timestamp = date.toTimeString().split('(')[1];
    [timestamp] = timestamp.split(')');
    timestamp = timestamp.split(' ');
    if (timestamp[1]) {
      timestamp = `${timestamp[0][0]}${timestamp[1][0]}${timestamp[timestamp.length - 1][0]}`;
    } else {
      [timestamp] = timestamp;
    }
    const now = new Date();
    const activityEnded = addToTime(date, activity.duration * 60 * 1000) < now;

    return (
      <PopMessage
        style={{ zIndex: '2' }}
        message={(
          <div id="activityEventDetails">
            <div className="header">
              <div className="left">
                <p>{capitalize(getWeekDay(date.getDay()))}, {formattedDate.date}</p>
                <p>
                  {padString(startHour === 0 ? 12 : startHour, '0', 2)}:{padString(date.getMinutes(), '0', 2)}{startPeriod}
                  {' - '}
                  {padString(endHour === 0 ? 12 : endHour, '0', 2)}:{padString(TheEndDate.getMinutes(), '0', 2)}{endPeriod}
                  {' '}
                  {timestamp}
                </p>
              </div>
              <div className="right">
                {/*  <button
                  type="button"
                  className="btn btn-1"
                  onClick={() => {
                    this.startVirtualEvent(isHost);
                  }
                >START {/* startingVirtualEvent && <span className="icon icon-refresh spinner" />} *-/}
                </button> */}
              </div>
            </div>

            <div className="content">
              <div className="left">
                <p>participants</p>
                {attendees.length > 0 ? attendees.map((att) => {
                  const { kid } = att;
                  return (
                    <p>{capitalize(`${kid.firstName} ${kid.lastName}`)}</p>
                  );
                }) : (
                  <p className="hide">No one has registered yet</p>
                )}
              </div>

              <div className={`right${activityEnded ? ' hide' : ''}`}>
                <InputField
                  type="textarea"
                  placeholder="message your participants"
                  value={state.broadcastMessageContent}
                  label={state.broadcastMessageContentError !== false ? (
                    <div className="error">
                      {state.broadcastMessageContentError}
                    </div>
                  ) : ''}
                  className={state.broadcastMessageContentError === false ? '' : 'error'}
                  onChange={(value) => {
                    this.setState({
                      broadcastMessageContent: value,
                      broadcastMessageContentError: false,
                    });
                  }}
                />
                <button
                  type="button"
                  className="btn btn-glass no-shadow bordered"
                  onClick={() => {
                    this.sendMessageToParticipants(date);
                  }}
                >
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </div>
        )}
        confirmButton={{
          show: false,
          label: 'BUY CREDITS',
          onClick: async (closer, hideLoader) => {
            hideLoader();
            this.setState({
              buyCredit: true,
            });
          },
        }}
        cancelButton={{
          show: false,
          label: 'CLOSE',
          onClick: (closer) => {
            closer();
          },
        }}
        onCancel={() => {
          this.setState({
            activityEventDetails: false,
            broadcastMessageContent: '',
            broadcastMessageContentError: false,

          });
        }}
      />
    );
  }

  async sendMessageToParticipants(date) {
    const { state, props } = this;
    if (state.broadcastMessageContent.length > 0) {
      try {
        const { activity } = props.viewActivity;

        const { broadcastMessageContent } = state;
        const data = await props.fetchRequest({
          url: `${process.env.REACT_APP_API}/activities/${activity.id}/attendance/${date.getTime()}/message`,
          method: 'POST',
          body: JSON.stringify({
            message: broadcastMessageContent,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        props.emitEvent({
          topic: 'activities',
          event: 'activity-broadcast-message',
          activityId: activity.id,
          message: broadcastMessageContent,
        });

        this.setState({
          broadcastMessageContent: '',
          broadcastMessageContentError: false,
        });
        popAlert({
          title: 'Successful',
          description: 'Message sent to all participants',
        });
      } catch (err) {
        console.log('COULDNT SEND MESSAGE TO PARTICIPANTS BECAUSE', err);
      }
    } else {
      this.setState({
        broadcastMessageContentError: "message can't be empty",
      });
    }
  }

  showCopiedMessage() {
    this.setState({
      showCopiedMessage: true,
    });

    setTimeout(() => {
      this.setState({
        showCopiedMessage: false,
      });
    }, 2000);
  }

  render() {
    const { props, state } = this;
    const { activity } = props.viewActivity;
    const { settings } = props;
    const { sessionUser, screen } = settings;
    const { filter } = state;
    const activityApproved = activity.status === 'approved';
    const activityRejected = activity.status === 'rejected';
    // console.log('page oaded', props);
    if (state.loading) {
      return (
        <Layout
          {...props}
          header={{
            backButton: {
              show: true,
            },
          }}
        >
          <PageLoader />
        </Layout>
      );
    }
    const { host } = activity;
    const isHost = sessionUser.userId === activity.userId;
    // const awaitingActivity = activity.kidsAttending;

    // console.log('activity data', activity);
    const startDateValue = filter.start;
    /* if (startDateValue < new Date(activity.startDate)) {
      startDateValue = new Date(activity.startDate);
    } */
    const startDate = {
      year: startDateValue.getFullYear(),
      month: startDateValue.getMonth() + 1,
      day: startDateValue.getDate(),
    };

    let endDateValue = filter.end;
    if (endDateValue > new Date(activity.endDate)) {
      endDateValue = new Date(activity.endDate);
    }
    /* console.log('RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR', {
      endDateValue,
      startDateValue,
      activity: {
        start: activity.startDate,
        end: activity.endDate,
      },
    }); */
    const endDate = {
      year: endDateValue.getFullYear(),
      month: endDateValue.getMonth() + 1,
      day: endDateValue.getDate(),
    };

    // use startDateValue and endDateValue to get Events to show
    const eventDates = this.getActivityEvents(new Date(startDateValue), new Date(endDateValue));
    const shortenDescription = state.readMoreDescription
      ? { result: activity.description }
      : trimString(activity.description, 500);
    const shortenMaterialsNeeded = state.readMoreMaterialsNeeded
      ? { result: activity.materials }
      : trimString(activity.materials, 500);
    const shortenHostBio = state.readMoreHostBio
      ? { result: activity.hostBio }
      : trimString(activity.hostBio, 500);

    const showMore = new Date(endDateValue) < new Date(activity.endDate);
    let ActivityEventDates = () => (
      <div id="activityRegistration">
        <div className="content">

          <div className="filter">
            <p className="label">Select Date Range</p>
            <InputDatePicker
              pickRange
              minDate={new Date(activity.startDate)}
              maxDate={new Date(activity.endDate)}
              values={[startDate, endDate]}
              labelFormatter={formatCalendarDates}
              className=""
              onChange={(values) => {
                console.log('ON DATE CHANGE', {
                  startDate,
                  endDate,
                  values,
                });
                const strt = values[0];
                const ed = values[1] || strt;
                this.setState({
                  filter: values.length === 0 ? this.defaultFilter : {
                    start: new Date(strt.year, strt.month - 1, strt.day),
                    end: new Date(ed.year, ed.month - 1, ed.day),
                  },
                });
              }}
            />
          </div>
          <div className="times">
            {eventDates.map((date) => {
              const TheDate = new Date(date);
              const formattedDate = formatCalendarDates([{
                year: TheDate.getFullYear(),
                month: TheDate.getMonth() + 1,
                day: TheDate.getDate(),
              }], {
                day: true,
              });

              let startHour = TheDate.getHours();
              let startPeriod = 'AM';
              if (startHour > 12) {
                startHour -= 12;
                startPeriod = 'PM';
              }

              const TheEndDate = addToTime(TheDate, activity.duration * 60 * 1000);
              let endHour = TheEndDate.getHours();
              let endPeriod = 'AM';
              if (endHour > 12) {
                endHour -= 12;
                endPeriod = 'PM';
              }

              let timestamp = TheDate.toTimeString().split('(')[1];
              [timestamp] = timestamp.split(')');
              timestamp = timestamp.split(' ');
              if (timestamp[1]) {
                timestamp = `${timestamp[0][0]}${timestamp[1][0]}${timestamp[timestamp.length - 1][0]}`;
              } else {
                [timestamp] = timestamp;
              }

              const attendance = activity.attendance[TheDate.getTime()];
              const awaitingActivity = activity.userId !== sessionUser.userId && attendance && attendance.attendees.length;

              return (
                <ActivityEvent
                  {...props}
                  date={date}
                  register={this.register}
                  startVirtualEvent={(callback) => {
                    this.startVirtualEvent(date, isHost, callback);
                  }}
                  activityEventDetails={() => {
                    this.setState({
                      activityEventDetails: date,
                    });
                  }}
                />
              );
            })}

            {showMore && screen.width <= process.env.MOBILE_BREAKPOINT && (
              <div
                className="time mobile-show-more"
                onClick={() => {
                  this.setState({
                    filter: {
                      start: filter.start,
                      end: new Date(filter.end.getFullYear(), filter.end.getMonth() + 1, filter.end.getDate(), 11, 59),
                    },
                  });
                }}
              >
                <span className="icon icon-add" />
              </div>
            )}
          </div>
          {showMore && screen.width > process.env.MOBILE_BREAKPOINT
            && (
              <div className="show-more">
                <button
                  type="button"
                  className=" btn btn-glass bordered no-shadow"
                  onClick={() => {
                    this.setState({
                      filter: {
                        start: filter.start,
                        end: new Date(filter.end.getFullYear(), filter.end.getMonth() + 1, filter.end.getDate(), 11, 59),
                      },
                    });
                  }}
                >
                  SHOW MORE
                </button>
              </div>
            )}
        </div>
      </div>
    );

    const acivityReview = activity.status === 'rejected' || props.isAdminReview;
    if (acivityReview) {
      ActivityEventDates = () => (
        <ActivityReview
          {...props}
          activity={activity}
        />
      );
    }

    return (
      <Layout
        {...props}
        header={{
          backButton: {
            show: true,
          },
        }}
      >
        <Head>
          <script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: en_US</script>
          <script type="IN/Share" data-url="https://www.linkedin.com" />
        </Head>
        <a href={this.activityURL} data-pin-do="embedPin"> </a>
        {state.activityEventDetails && this.ActivityEventDetails(state.activityEventDetails)}
        {state.initregistration && (
          <ActivityRegistration
            {...props}
            activity={activity}
            event={state.initregistration}
            kids={sessionUser.kids}
            onSuccess={({
              allAttendees,
              attending,
              calendarEvent,
            }) => {
              props.updateCalendarEvents([calendarEvent]);
              if (state.activityStarted && activity.meeting) {
                popPrompt({
                  message: (
                    <div>
                      <p>Activity already started.</p>
                      <p>you want to join now?</p>
                    </div>
                  ),
                  confirmButton: {
                    label: 'YES',
                    onClick: async (clser) => {
                      window.open(`${props.AppUrl}/meeting/${activity.meeting.id}`, '_blank');

                      clser();
                    },
                  },
                  cancelButton: {
                    label: 'NO',
                    onClick: (clser) => {
                      Router.push(`${props.AppUrl}/activities`);
                      clser();
                    },
                  },
                  onClose: () => {
                    Router.push(`${props.AppUrl}/activities`);
                  },
                });
              }
            }}
            onClose={() => {
              this.setState({
                initregistration: false,
              });
            }}
          />
        )}

        <PopMessage
          show={state.showSharePopUp}
          // style={{ zIndex: '2' }}
          message={(
            <div id="showActivity">
              <p className="title">Share this activity</p>
              <div className="content">

                {this.shareOptions.map((group) => (

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
                        value={this.activityURL}
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
            this.setState({
              showSharePopUp: false,
            });
          }}
        />

        <div id="activity" className="">
          <div className="head-actions">
            {/* /ksjd */}
          </div>

          {this.normalBanner(false, isHost)}

          <div id="bottomContent">

            <div id="activityInformation">
              <section id="name">
                <div className="activity-type">
                  <div className="type">
                    <span className="icon icon-hmv-virtual-event" />
                    {ActivityTypes.find(activity.type).title}
                  </div>

                  <div className="actions">
                    <div
                      className="action"
                      onClick={() => {
                        this.setState({
                          showSharePopUp: true,
                        });
                      }}
                    >
                      <span
                        className="icon-share"

                      />
                      <span className="label">
                        share
                      </span>
                    </div>
                    {(activity.kidsAttending || isHost) && activityApproved && (
                      <a
                        href={`data:text/calendar; charset=utf-8,${encodeURIComponent(activity.invitation)}`}
                        className="add-to-ics"
                        download="invite.ics"
                        target="_self"
                      >
                        <div className="action">

                          <span className="icon-calendar-add" />
                          <span className="label">add to ics</span>
                        </div>
                      </a>
                    )}

                  </div>
                </div>
                <div className="activity-name">{activity.name}</div>
                <div className="host-location">{host.city}, {host.state}</div>
              </section>

              <section id="time">
                <div className="host">
                  <h5 className="title"> {ActivityTypes.find(activity.type).title} Activity hosted by {capitalize(host.firstName)}</h5>
                  <div
                    className="image avi"
                    onClick={(e) => {
                      if (sessionUser) {
                        Router.push(`${props.AppUrl}/profile/[id]`, `${props.AppUrl}/profile/${host.id}?go-back=true`);
                      } else {
                        props.showSignUp();
                      }
                    }}
                  >
                    <img src={host.imageThumbUrl} alt="" />
                  </div>
                </div>

                <div className="infos">
                  <div className="info">
                    <span className="icon icon-clock" />
                    <span className="text">
                      {parseDuration(activity.duration || 90)}
                    </span>
                  </div>

                  <div className="info">
                    <span className="icon icon-people" />
                    <span className="text">
                      Up to 15 people
                    </span>
                  </div>

                  <div className="info">
                    <span className="icon icon-monitor-mobile" />
                    <span className="text">
                      Join from your computer, phone, or tablet
                    </span>
                  </div>

                  <div className="info">
                    <span className="icon icon-volume-high" />
                    <span className="text">
                      Hosted in English
                    </span>
                  </div>
                </div>

                <div className="age-groups">
                  {(() => {
                    // alert("insed")
                    const ageGroupsJSX = [];
                    AgeGroups.data.forEach((ageGroup) => {
                      if (activity.ageGroups.includes(ageGroup.id)) {
                        ageGroupsJSX.push(
                          <div className="age-group">
                            <span className={`icon ${this.getAgeGroupIcon(ageGroup.value)}`} />
                            <span className="label">{`${ageGroup.start}-${ageGroup.end}`}</span>
                          </div>,
                        );
                      }
                    });
                    return ageGroupsJSX;
                  })()}
                </div>
              </section>

              <section>
                <h5 className="title">Description</h5>
                <div className="content">
                  {this.parseNote(
                    shortenDescription.result,
                    !state.readMoreDescription && shortenDescription.remaining > 0,
                    () => {
                      this.setState({ readMoreDescription: true });
                    },
                  )}
                </div>
              </section>

              <section id="howToParticipate">
                <h5 className="title">How to participate</h5>
                <div className="content">
                  <div className="info">
                    <span className="icon icon-monitor-mobile" />
                    <span className="label">Join a video call</span>
                    <span>
                      Activities are hosted directly on our platform. After you book, the event will be added to your calendar, join the activity from there when it begins. You'll also receive an email with a link to save the event.
                    </span>
                  </div>

                  <div className="info">
                    <span className="icon icon-people" />
                    <span className="label">Who can attend</span>
                    <span>
                      You may book a child for an activity that is one step above or below their age category. It is up to the discretion of the parent to ensure that a child is enrolled in an activity that is appropriate for them.
                    </span>
                  </div>
                </div>
              </section>

              {screen.width <= process.env.MOBILE_BREAKPOINT && !acivityReview && (
                <section>
                  {ActivityEventDates()}
                </section>
              )}

              {activity.materials.length > 0 && (
                <section>
                  <h5 className="title">What you'll need</h5>
                  <div className="content">
                    {this.parseNote(
                      shortenMaterialsNeeded.result,
                      !state.readMoreMaterialsNeeded && shortenMaterialsNeeded.remaining > 0,
                      () => {
                        this.setState({ readMoreMaterialsNeeded: true });
                      },
                    )}
                  </div>
                </section>
              )}

              <section id="aboutHost">
                <div className="head">
                  <div
                    className="image avi"
                    onClick={() => {
                      if (sessionUser) {
                        Router.push(`${props.AppUrl}/profile/[id]`, `${props.AppUrl}/profile/${host.id}?go-back=true`);
                      } else {
                        props.showSignUp();
                      }
                    }}
                  >
                    <img src={host.imageThumbUrl} alt="" />
                  </div>
                  <h5 className="title">Meet your host, {capitalize(host.firstName)}</h5>
                </div>
                <div className="content">
                  {this.parseNote(
                    shortenHostBio.result,
                    !state.readMoreHostBio && shortenHostBio.remaining > 0,
                    () => {
                      this.setState({ readMoreHostBio: true });
                    },
                  )}
                </div>
                {!isHost && sessionUser && (
                  <button
                    type="button"
                    className="btn btn-glass contact-host"
                    onClick={() => {
                      Router.push(`${props.AppUrl}/inbox/[id]`, `${props.AppUrl}/inbox/${activity.userId}`);
                    }}
                  >
                    Contact Host

                  </button>
                )}
              </section>

              <section id="thingsToKnow">
                <h5 className="title">Things to know</h5>
                <div className="content">
                  <div className="info">
                    <p className="head">How credits work</p>
                    <p>Payments for activities are made using credits. Credits can be purchased or earned.
                    </p>
                    <a
                      className="link"
                      href="https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/Abul%C3%A9+-+The+Blueprint.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      learn more
                    </a>
                  </div>
                  <div className="info">
                    <p className="head">Code of conduct</p>
                    <p>Participants are expected to be respectful to their peers and caregivers at all times.</p>
                    <a
                      className="link"
                      href="https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/Abul%C3%A9+-+The+Blueprint.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      learn more
                    </a>
                  </div>
                  <div className="info">
                    <p className="head">Cancellation policy</p>
                    <p>Any activity can be canceled and fully refunded
                      if canceled at least 48 hours before the activity starts.
                    </p>
                    <a
                      className="link"
                      href="https://hellomyvillage-bucket.s3.us-east-2.amazonaws.com/Abul%C3%A9+-+The+Blueprint.pdf"
                      target="_blank"
                      rel="noreferrer"
                    >
                      learn more
                    </a>
                  </div>
                </div>
              </section>

              {screen.width <= process.env.MOBILE_BREAKPOINT && acivityReview && (
                <section id="activityReview">
                  {ActivityEventDates()}
                </section>
              )}

              <div className="register">
                {!activityRejected && !state.activityEnded && isHost && (
                  <>
                    {(activityApproved || activityRejected) && !activity.hasAttendance && (
                      <button
                        type="button"
                        className="action-button btn btn-1"
                        onClick={() => {
                          Router.push(`${props.AppUrl}/edit-activity/[id]`, `${props.AppUrl}/edit-activity/${activity.id}`);
                        }}
                      >EDIT
                      </button>
                    )}
                    <button
                      type="button"
                      className="action-button btn btn-glass no-shadow bordered"
                      onClick={() => {
                        if (isHost) {
                          popPrompt({
                            message: (
                              <div>
                                <p>Are you sure you want to cancel this activity?</p>
                              </div>
                            ),
                            confirmButton: {
                              label: 'YES',
                              onClick: async (clser) => {
                                await props.fetchRequest({
                                  url: `${process.env.REACT_APP_API}/activities/${activity.id}`,
                                  method: 'DELETE',
                                });
                                clser();
                                popAlert({
                                  title: 'Activity deleted',
                                  description: 'Your participants will be notified of the cancellation.',
                                });
                                Router.push(`${props.AppUrl}/activities`);
                              },
                            },
                            cancelButton: {
                              label: 'NO',
                            },
                          });
                        }
                      }}
                    > CANCEL
                    </button>
                  </>
                )}
              </div>
              {/*  <div className="suggestions">
            <div className="header">
              <h5>YOU MIGHT BE INTERESTED IN</h5>
            </div>
            <div className="content">
              <ActivityPreview />
              <ActivityPreview />
              <ActivityPreview />
              <ActivityPreview />

            </div>
          </div> */}
            </div>
            {screen.width > process.env.MOBILE_BREAKPOINT && ActivityEventDates()}
          </div>
        </div>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({ viewActivity: state.viewActivity });
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
  updateCalendarEvents: (props) => dispatch(updateEvents(props)),
  setActivity: (props) => dispatch(setActivity(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity);
