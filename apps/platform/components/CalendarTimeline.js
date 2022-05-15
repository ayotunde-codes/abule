import moment from 'moment';
import Router from 'next/router';
import React, { useState } from 'react';
import { Fn } from '@abule-common/components';
import { ActivityFrequencies } from '../datastore';

const {
  capitalize,
  getDatePositionInMonth,
  getWeekDay,
  lightenDarkenColor,
  milSecToMinutes,
  padString,
} = Fn;

function CalendarTimeline(props) {
  const { selectedDate = new Date() } = props;
  // const [selectedDate, updateSelectedData] = useState(new Date(2022, 2, 6));

  const [currentDate, updateCurrentData] = useState(new Date());
  const { events, dayViews } = props;
  console.log('the event in timeline', events);
  // const [earliestSelection] = useState(defaultEarliestSelection);
  const today = moment(selectedDate);
  // const [Today, setToday] = useState(today._id);
  const startWeek = today.startOf('week')._d;
  const Days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  let endWeek = null;
  const currentWeek = Days.map((day, index) => {
    const date = new Date(startWeek);
    date.setHours(index * 24);
    if (index === Days.length - 1) {
      endWeek = new Date(date);
      endWeek.setHours(23);
      endWeek.setMinutes(59);
      endWeek.setSeconds(59);
      endWeek.setMilliseconds(999);
    }
    return date;
  });

  // new
  const updateEventsInView = () => {
    const { settings } = props;
    // const { events, date: _date } = calendar;
    const eventsInView = {};
    const { sessionUser } = settings;

    const eventsId = [];
    const eventsActivityId = [];
    const eventsBarterRequestId = [];
    // first merge old and new events while replacing duplicates
    events.forEach((event) => {
      eventsId.push(event.id);
      eventsActivityId.push(event.activityId);
      eventsBarterRequestId.push(event.barterRequestId);
    });
    // const startDate = new Date(_date[0].year, _date[0].month - 1, _date[0].day, 0, 0);
    // const startDate = dayViews ? selectedDate : startWeek;
    const startDate = startWeek;

    // const endDate = _date.length === 2 ? new Date(_date[1].year, _date[1].month - 1, _date[1].day, 23, 59) : startDate;
    const endDate = endWeek;
    // const endDate = dayViews
    //   ? new Date(
    //       startDate.getFullYear(),
    //       startDate.getMonth() - 1,
    //       startDate.getDate(),
    //       23,
    //       59
    //     )
    //   : endWeek;
    // group events by event timestamp
    // alert(`endDate: ${endDate}`);
    const addEventToView = (date, event) => {
      if (!eventsInView[date]) eventsInView[date] = [event];
      else eventsInView[date].push(event);
    };
    events?.forEach((event) => {
      // get the event date
      const getEventDateFreq = () => {
        switch (event.type) {
          case 'user-input': {
            return {
              date: event.startDate,
              frequency: ActivityFrequencies.find(event.frequency).interval,
            };
          }
          case 'activity': {
            return {
              date: event.activity.date,
              frequency: ActivityFrequencies.find(event.activity.frequency)
                .interval,
            };
          }
          case 'barter': {
            return {
              date: event.barterRequest.date,
              frequency: ActivityFrequencies.find(event.barterRequest.frequency)
                .interval,
            };
          }
          default: {
            return { date: new Date(), frequency: '' };
          }
        }
      };

      // check if event falls in the date range user wants to see
      // now try to add reoccuring events
      console.log('SINDEEEEEEEEEEEEEEEEEEEEEEEEEE UPDATE EVENTS IN VIEW', {
        event,
      });
      if (['activity', 'user-input'].includes(event.type)) {
        // const { activity } = event;
        // const isHost = activity && sessionUser.userId === activity.userId;
        const frequency = ActivityFrequencies.find(event.frequency);
        console.log('this the frequency', { frequency });
        /* if (!isHost && activity) {
          // console.log({ activity });
          const eventDates = [];
          activity.attendance.forEach((att) => {
            if (
              !eventDates.includes(att.date)
              && new Date(att.date) >= startDate
              && new Date(att.date) <= endDate
            ) {
              eventDates.push(att.date);
            }
          });
          eventDates.forEach((date) => {
            addEventToView(date, event);
          });
        } else */ if (['one-time'].includes(frequency.title)) {
          event.dates.forEach((date) => {
            date = new Date(date);
            if (date >= startDate && date <= endDate) {
              addEventToView(date, event);
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
          event.dates.forEach((date) => {
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
                  addEventToView(
                    new Date(
                      newEventDate.getFullYear(),
                      newEventDate.getMonth(),
                      newEventDate.getDate(),
                      dpDate.getHours(),
                      dpDate.getMinutes(),
                    ),
                    event,
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
          const { days } = event;
          const log = {
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0,
            sunday: 0,
          };

          /// ////////////////////////////////////

          const test = new Date(event.startDate);
          const test2 = new Date(event.endDate);
          let newEventDate = new Date(test.getTime());
          const newEventDate2 = new Date(test2.getTime());
          console.log('the true color', newEventDate, newEventDate2);
          while (newEventDate <= newEventDate2) {
            // console.log('NEW', {
            //   UTC: newEventDate.toISOString(),
            //   newEventDate,
            // });
            const day = getWeekDay(newEventDate.getDay());
            console.log('INItIAL  log day is : ', {
              date: newEventDate,
              day,
              log: log[day],
              days,
              startDate,
              startWeek,
              endDate,
              endWeek,
            });
            log[day] += 1;
            if (newEventDate >= startDate) {
              // console.log('the log day is : ', { day, log: log[day] });
              if (
                days[day]
                && (log[day] === 1 || log[day] % (frequency.interval / 7) === 0)
              ) {
                const newEventDateClone = new Date(newEventDate.getTime());
                const timeZoneDiff = new Date(
                  newEventDateClone.getFullYear(),
                  newEventDateClone.getMonth(),
                  newEventDateClone.getDate(),
                  0,
                  0,
                ).getTimezoneOffset() / 60;
                console.log('yep we adding the log day is : ', {
                  timeZoneDiff,
                  date: newEventDate,
                  day,
                  log: log[day],
                  days,
                  startDate,
                  startWeek,
                  endDate,
                  endWeek,
                });
                days[day].forEach((Time) => {
                  // console.log({ time });
                  let { hour, minute } = Time;
                  // alert("hello, world bro");
                  hour -= timeZoneDiff;
                  // const { minute } = time;
                  const eventDate = new Date(
                    newEventDateClone.getFullYear(),
                    newEventDateClone.getMonth(),
                    newEventDateClone.getDate(),
                    hour,
                    minute,
                  );
                  console.log({
                    eventDate,
                    startDate,
                    endDate,
                    newEventDateClone,
                    hour,
                    minute,
                    Time,
                  });
                  if (eventDate >= startDate && eventDate <= endDate) {
                    console.log('ADDING EVENT DATE', eventDate);
                    addEventToView(eventDate, event);
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
            console.log('NEW EVENT DATE', newEventDate);
          }
        }
      } else {
        const { date: eventDate, frequency: eventFrequency } = getEventDateFreq();
        const eventDateObj = new Date(eventDate);
        let newEventDate = eventDateObj;
        while (newEventDate <= endDate) {
          if (newEventDate >= startDate && newEventDate <= endDate) {
            addEventToView(newEventDate, event);
          }
          if (!eventFrequency) break;
          newEventDate = new Date(
            newEventDate.setHours(eventFrequency * 24 + newEventDate.getHours()),
          );
        }
        // break;
      }
    });

    // sort by date
    const eventKeys = Object.keys(eventsInView);

    eventKeys.sort((a, b) => {
      const scoreA = new Date(a);

      const scoreB = new Date(b);

      if (scoreA < scoreB) {
        return -1;
      }
      if (scoreA > scoreB) {
        return 1;
      }
      return 0;
    });

    const orderedEvent = {};
    eventKeys.forEach((key) => {
      orderedEvent[key] = eventsInView[key];
    });

    return orderedEvent;
  };

  const rep = false;
  const orderedEvents = updateEventsInView();
  console.log('if it work we go to church', { orderedEvents }, 'i know');
  // console.table(getMonth());
  // console.log(getMonth());
  // console.table(rep);
  const pp = 'well';
  console.log(new Date(null, null, null, 2), 'checking this');

  console.log(today, startWeek, 'new log');

  const timeline = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };
  // currentWeek.forEach((date) => {
  //   const day = getWeekDay(date.getDay());
  //   timeline[day] = [];
  // });
  // useEffect(() => {
  //   console.log(currentWeek, 'this is the current week');
  // }, []);

  // console.log({ timeline, first: 'the first timeline' });
  Object.keys(orderedEvents).forEach((date) => {
    const day = getWeekDay(new Date(date).getDay());
    // console.log('pls whats the date', { date, type: typeof date, day });
    orderedEvents[date].forEach((event) => {
      let {
        startDate, endDate, duration, days,
      } = event;
      startDate = new Date(startDate);
      if (days && days[day].length > 0) {
        startDate = new Date(null, null, null, days[day][0].hour, days[day][0].minute);
      }
      // console.log('this the actual startDate', { startDate, endDate, duration });
      endDate = new Date(endDate);
      const newDate = new Date(null, null, null, startDate.getHours(), startDate.getMinutes() + duration);
      // const _endDate = endDate.getHours();
      // const _startDate = startDate.getHours();
      // console.log('the endDate', { endDate, startDate, newDate });
      // console.log('the _endDate', { _endDate, _startDate });
      timeline[day].push({
        ...event,
        end: { hour: newDate.getHours(), minute: newDate.getMinutes() },
        // end: { hour: endDate.getHours(), minute: endDate.getMinutes() },
        start: { hour: startDate.getHours(), minute: startDate.getMinutes() },
      });
    });
  });

  const timelineDays = Object.keys(timeline);
  const timelineData = {};
  timelineDays.forEach((day, index) => {
    const data = [];
    // console.log('so that we are informed', { timeline, day });
    timeline[day].forEach((timeRange) => {
      const dayData = {
        spanRight: 1,
        timeRange: JSON.stringify(timeRange),
      };
      // check if previous day
      if (timelineDays[index - 1]) {
        //  previous day timline data
        const prevDay = timelineDays[index - 1];
        const prevTimelineData = timelineData[prevDay];
        for (let i = 0; i < prevTimelineData.length; i += 1) {
          // check if previous day has a time range that matches the current time range in order to merge them
          if (prevTimelineData[i].timeRange === dayData.timeRange && !dayViews) {
            // if previous timeline had been merged then merge with the main timeline
            if (prevTimelineData[i].merged) {
              dayData.merged = prevTimelineData[i].merged;
              timelineData[prevTimelineData[i].merged.day][
                prevTimelineData[i].merged.index
              ].spanRight += 1;
            } else {
              // merge with previous timeline
              dayData.merged = {
                day: prevDay,
                index: i,
              };
              timelineData[prevDay][i].spanRight += 1;
            }
            // alert('we are to merge man');
            break;
          }
        }
      }
      data.push(dayData);
    });

    timelineData[day] = data;
  });
  const getTimeRangeData = (day, start, end, log) => {
    const rangeData = [];

    if (timelineData[day]) {
      timelineData[day].forEach((timeRange) => {
        if (!timeRange.merged) {
          const range = JSON.parse(timeRange.timeRange);
          const rangeStartHour = Number(range.start.hour);
          // if (rangeStartHour === 12 && range.start.period === 'AM') {
          //   rangeStartHour = 0;
          // } else if (rangeStartHour !== 12 && range.start.period === 'PM') {
          //   rangeStartHour += 12;
          // }
          const rangeStart = new Date(
            null,
            null,
            null,
            rangeStartHour,
            range.start.minute,
          );

          if (rangeStart >= start && rangeStart <= end) {
            rangeData.push({
              ...timeRange,
              timeRange: range,
            });
          }
          if (log) {
            console.log('QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ', {
              day,
              range,
              rangeStart,
              start,
              end,
              rangeStartHour,
            });
          }
        }
      });
    }

    return rangeData;
  };

  // const dayViews = true;
  // const dayViews = false;
  const day = getWeekDay(selectedDate.getDay());
  // const date = new Date().get
  const formatedSelectedDate = selectedDate.toLocaleDateString('en-US');
  const formatedCurrentDate = currentDate.toLocaleDateString('en-US');
  return (
    <div className="calendar-timeline-view">
      <div
        className="timeline"
        ref={(e) => {
          if (!timeline) {
            timeline = e;
          }
        }}
      >
        <div className="row week-days">
          <div />
          {!dayViews ? (
            <>
              {currentWeek.map((date) => {
                const day = getWeekDay(date.getDay());
                // const dateD = date.getDay();
                // const dateM = date.getMonth();
                // const dateY = date.getFullYear();
                // const dateV = dateY + dateM + dateD;

                // const selectedDateD = selectedDate.get();
                // const selectedDateM = selectedDate.getMonth();
                // const selectedDateY = selectedDate.getFullYear();
                // const selectedDateV = selectedDateY + selectedDateM + selectedDateD;
                const dateV = date.toLocaleDateString('en-US');
                const selectedDateV = currentDate.toLocaleDateString('en-US');
                // let date = new Date(startWeek);
                // date.setHours(index * 24);
                // console.log(dateV, 'finding the date', selectedDateV);

                return (
                  <div
                    className={`week-day
                      `}
                  >
                    <p
                      className={`weekday-bold ${dateV === selectedDateV ? 'red-color' : ''
                        }`}
                    >
                      {date.getDate()}
                    </p>

                    <span
                      className={` ${dateV === selectedDateV ? 'red-color' : ''
                        }`}
                    >
                      {capitalize(`${day[0]}${day[1]}${day[2]}`)}
                    </span>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="timeline-header">
              <p
                className={`weekday-bold  ${formatedSelectedDate === formatedCurrentDate
                  ? 'red-color'
                  : ''
                  } `}
              >
                {selectedDate.getDate()}
              </p>

              <span
                className={` ${formatedSelectedDate === formatedCurrentDate
                  ? 'red-color'
                  : ''
                  }`}
              >
                {capitalize(`${day[0]}${day[1]}${day[2]}`)}
              </span>
            </div>
          )}
        </div>

        {(() => {
          const data = [];

          for (let i = 0; i < 24; i += 1) {
            let time = i;
            let period = 'AM';
            if (time === 0) {
              time = 12;
            } else if (time >= 12) {
              period = 'PM';
              if (time > 12) {
                time -= 12;
              }
            }

            data.push(
              <div className="row">
                <div>
                  {time}
                  {period}
                </div>
                {dayViews ? (
                  <>
                    {Days
                      .filter((e) => e === getWeekDay(selectedDate.getDay()))
                      .map((day) => {
                        // console.log(day, "logged");
                        console.log({ day, this: 'this the log' });
                        const boxStartTime = new Date(null, null, null, i);
                        let log = false;
                        if (day === 'saturday' && i === 12) {
                          log = true;
                        }

                        const timeRangeData = getTimeRangeData(
                          day,
                          boxStartTime,
                          new Date(null, null, null, i + 1),
                          log,
                        );

                        if (log) {
                          console.log('time range data  : ', {
                            day,
                            boxStartTime,
                            timeRangeData,
                          });
                        }
                        return (
                          <div className="day">
                            {timeRangeData.map((timeRange, index) => {
                              // console.log({ timeRange, timeRangeData });
                              const range = timeRange.timeRange;
                              console.log(timeRange, 'this is time range data');
                              const rangeStartHour = Number(range.start.hour);
                              let startPeriod = 'AM';
                              if (
                                rangeStartHour > 12
                              ) {
                                // rangeStartHour = 0;
                                startPeriod = 'PM';
                              }
                              //  else if (
                              //   rangeStartHour !== 12
                              //   && range.start.period === 'PM'
                              // ) {
                              //   rangeStartHour += 12;
                              // }

                              const rangeStart = new Date(
                                null,
                                null,
                                null,
                                rangeStartHour,
                                range.start.minute,
                              );
                              const rangeEndHour = Number(range.end.hour);
                              const endPeriod = 'AM';
                              if (
                                rangeStartHour > 12
                              ) {
                                // rangeStartHour = 0;
                                startPeriod = 'PM';
                              }
                              // if (
                              //   rangeEndHour === 12
                              //   && range.end.period === 'AM'
                              // ) {
                              //   rangeEndHour = 0;
                              // } else if (
                              //   rangeEndHour !== 12
                              //   && range.end.period === 'PM'
                              // ) {
                              //   rangeEndHour = Number(rangeEndHour) + 12;
                              // }
                              const rangeEnd = new Date(
                                null,
                                null,
                                null,
                                rangeEndHour,
                                range.end.minute,
                              );
                              const diffInMinutes = milSecToMinutes(
                                rangeEnd - rangeStart,
                              );
                              console.log('the ranges are ', { rangeEnd, rangeStart, range });
                              const height = (diffInMinutes / 60) * 100;
                              const boxCovered = parseInt(height / 100, 10);
                              const gapFromBox = milSecToMinutes(
                                rangeStart - boxStartTime,
                              );

                              // if (earliestSelection.start > rangeStart) {
                              //   earliestSelection = {
                              //     day,
                              //     start: rangeStart,
                              //     selection: inedx,
                              //   };
                              // }
                              if (log) {
                                console.log({
                                  rangeStartHour,
                                  rangeStart,
                                  rangeEndHour,
                                  rangeEnd,
                                  boxStartTime,
                                });
                              }
                              return (
                                <div
                                  className="selection"
                                  tabIndex={0}
                                  style={{
                                    width: `calc(${timeRange.spanRight * 100
                                      }% + ${timeRange.spanRight}px)`,
                                    height: `calc(${height}% + ${boxCovered}px)`,
                                    top: `${(gapFromBox / 60) * 100}%`,
                                    background: `${!range.myEvent ? '#ebebeb' : ''
                                      }`,
                                    // maxWidth: '100%',

                                    // background: props.selectionColor || "",
                                  }}
                                  onClick={() => {
                                    Router.push(
                                      `${props.AppUrl}/calendar/${range.id}`,
                                    );
                                  }}
                                >
                                  <div className="kids">
                                    {range.kids.map((kid) => (
                                      <div
                                        className={`kid ${kid.color}`}
                                      />
                                    ))}
                                  </div>
                                  <div className="event-info">
                                    <p className="meeting-title">
                                      {range.title}
                                    </p>
                                    <p className="time-text">
                                      {range.start.hour}:{range.start.minute}
                                      {range.start.period} - {range.end.hour}:
                                      {range.end.minute}
                                      {range.end.period}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <>
                    {Days.map((d) => {
                      // console.log(d, "logged");
                      const boxStartTime = new Date(null, null, null, i);
                      let log = false;
                      // if (d === "saturday" && i === 12) {
                      //   log = true;
                      // }
                      if (d === 'sunday' && i === 12) {
                        log = true;
                      }

                      const timeRangeData = getTimeRangeData(
                        d,
                        boxStartTime,
                        new Date(null, null, null, i + 1),
                        log,
                      );

                      if (log) {
                        console.log('time range data  : ', {
                          d,
                          boxStartTime,
                          timeRangeData,
                        });
                      }
                      // console.log(timeRangeData, "the time range");
                      return (
                        <div>
                          {timeRangeData.map((timeRange, index) => {
                            const range = timeRange.timeRange;
                            console.log(timeRange, 'this is time range data');
                            let rangeStartHour = Number(range.start.hour);
                            if (
                              rangeStartHour === 12
                              && range.start.period === 'AM'
                            ) {
                              rangeStartHour = 0;
                            } else if (
                              rangeStartHour !== 12
                              && range.start.period === 'PM'
                            ) {
                              rangeStartHour += 12;
                            }

                            const rangeStart = new Date(
                              null,
                              null,
                              null,
                              rangeStartHour,
                              range.start.minute,
                            );
                            let rangeEndHour = Number(range.end.hour);
                            if (
                              rangeEndHour === 12
                              && range.end.period === 'AM'
                            ) {
                              rangeEndHour = 0;
                            } else if (
                              rangeEndHour !== 12
                              && range.end.period === 'PM'
                            ) {
                              rangeEndHour = Number(rangeEndHour) + 12;
                            }
                            const rangeEnd = new Date(
                              null,
                              null,
                              null,
                              rangeEndHour,
                              range.end.minute,
                            );

                            const diffInMinutes = milSecToMinutes(
                              rangeEnd - rangeStart,
                            );
                            const height = (diffInMinutes / 60) * 100;
                            const boxCovered = parseInt(height / 100, 10);
                            const gapFromBox = milSecToMinutes(
                              rangeStart - boxStartTime,
                            );

                            // if (earliestSelection.start > rangeStart) {
                            //   earliestSelection = {
                            //     d,
                            //     start: rangeStart,
                            //     selection: inedx,
                            //   };
                            // }
                            if (log) {
                              console.log({
                                rangeStartHour,
                                rangeStart,
                                rangeEndHour,
                                rangeEnd,
                                boxStartTime,
                              });
                            }
                            return (
                              <div
                                className="selection"
                                tabIndex={0}
                                style={{
                                  width: `${timeRange.spanRight * 100}%`,
                                  // width: `calc(${timeRange.spanRight * 100}% + ${
                                  //   timeRange.spanRight
                                  // }px)`,
                                  height: `calc(${height}% + ${boxCovered}px)`,
                                  top: `${(gapFromBox / 60) * 100}%`,
                                  background: `${!range.myEvent ? '#ebebeb' : ''
                                    }`,

                                  // background: props.selectionColor || "",
                                }}
                                onClick={() => {
                                  Router.push(
                                    `${props.AppUrl}/calendar/${range.id}`,
                                  );
                                }}
                              >
                                <div className="kids">
                                  {range.kids.map((kid) => (
                                    <div className={`kid ${kid.color}`} />
                                  ))}
                                </div>
                                <div className="event-info">
                                  <p className="meeting-title">{range.title}</p>
                                  <p className="time-text">
                                    {range.start.hour}:{range.start.minute}
                                    {range.start.period} - {range.end.hour}:
                                    {range.end.minute}
                                    {range.end.period}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>,
            );
          }

          return data;
        })()}

        {/* </div> */}
      </div>
    </div>
  );
}

export default CalendarTimeline;
