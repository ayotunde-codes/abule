import Link from 'next/link';
import React from 'react';
import Router from 'next/router';
import { Fn, SlideShow } from '@abule-common/components';

const {
  padString, parseDuration, ucFirst,
} = Fn;

class CalendarEvent extends React.Component {
  constructor(props) {
    super(props);

    this.Event = this.Event.bind(this);
  }

  Event({ event, props }) {
    const { state } = this;
    const { sessionUser } = props.settings;
    let id = '';
    let title = '';
    let description = '';
    let duration = '';
    let kids = [];
    let isHost = false;
    let onClick = () => { };
    if (event.type === 'user-input') {
      id = event.id;
      title = event.title;
      description = event.description;
      duration = event.duration;
      kids = event.kids;/* .map((att) => att.kid); */
      onClick = () => {
        props.viewUserEvent(event);
      };
    } else if (event.type === 'activity') {
      const { activity } = event;
      id = activity.id;
      title = activity.name;
      description = activity.description;
      duration = activity.duration;
      onClick = () => { Router.push(`${props.AppUrl}/activities/[id]`, `${props.AppUrl}/activities/${id}`); };
      if (activity.userId === sessionUser.userId) {
        isHost = true;
      } else {
        const attendance = [];
        activity.attendance.forEach((att) => {
          if (att.date === props.time) {
            attendance.push(att);
          }
        });
        kids = attendance.map((att) => att.kid);
      }
    } else if (event.type === 'barter') {
      const { barterRequest } = event;
      console.log('barter request here is : ', barterRequest);
      id = barterRequest.id;
      description = barterRequest.description;
      duration = barterRequest.duration;
      kids = barterRequest.kids;
      if (barterRequest.bid[0].userId === sessionUser.userId) {
        isHost = true;
        title = `Your ${barterRequest.bartering} request`;
      } else {
        title = `${barterRequest.user.firstName}'s ${barterRequest.bartering} request`;
      }

      onClick = () => {
        props.viewBarterDetails(event);
      };
    }

    const date = new Date(props.time);
    let hour = date.getHours();
    let period = 'AM';
    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    }
    const timeHour = padString(hour, '0', 2);

    return (
      <div
        className={`event ${event.type}`}
        onClick={onClick}
      >
        <div className="details">
          <div className="left-details">
            <div className="top">
              <div className="left">
                <p className="title">{ucFirst(title)}</p>
                <div className="kid-indicators">
                  {kids && kids.map((kid) => <div className="kid-indicator" color={kid.color} />)}
                </div>
              </div>
              <div className="right" />
              <div className="description">{description} </div>
            </div>
            <div className="bottom">
              <div className={`host-label${isHost ? ' show' : ''}`}>
                Host
              </div>
            </div>
          </div>
          <div className="right-details">
            <div className="top">
              {timeHour === '00' ? '12' : timeHour}:{padString(date.getMinutes(), '0', 2)} {period}
            </div>
            <div className="bottom">
              <p className="duration">{parseDuration(duration)}</p>
            </div>
          </div>

        </div>
      </div>

    );
  }

  render() {
    const { props, state } = this;
    const date = new Date(props.time);
    let hour = date.getHours();
    let period = 'AM';
    if (hour >= 12) {
      period = 'PM';
      if (hour > 12) {
        hour -= 12;
      }
    }
    const timeHour = padString(hour, '0', 2);
    return (
      <div className="calendar-event-row">
        <div className={`time${props.dateLabel ? '' : ' hide'}`}>
          {props.dateLabel}
        </div>
        {/* <div className="events-holder">
          {props.events.map((event) => <this.Event event={event} props={props} />)}
        </div> */}
        <div className={`calendar-event-group${props.dateLabel ? ' date-label-mate' : ''}`}>
          <SlideShow
            className={`calendar-event-group-list events-holder ${`row-${props.events.length}`}`}
            controllerLeft={<span className="calendar-event-group-list-controller icon-arrow-left" />}
            controllerRight={<span className="calendar-event-group-list-controller icon-arrow-right" />}
            indicators={false}
            itemsClassName={`${`row-${props.events.length}`}`}
            /*  setControllerTop={(cntrlLeft) => {
              console.log({
                thumbHeight: state.thumbHeight,
                leftHeight: $(cntrlLeft).outerHeight(),
              });
              return ((state.thumbHeight - $(cntrlLeft).outerHeight()) / 2) + state.thumbHeightExtra;
            }} */
            items={props.events.map((event, index) => (
              {
                // label: 'the',
                content: (
                  <this.Event event={event} props={props} />
                ),
              }
            ))}
          />
        </div>
      </div>
    );
  }
}

export default CalendarEvent;
