import React from 'react';
import { connect } from 'react-redux';
import { Fn } from '@abule-common/components';
import { updateHeader, setInfo } from '../../redux/settings/action';
import {
  Utils,
} from '../../datastore';
import { setActivity } from '../../redux/view-activity/action';
import { updateEvents } from '../../redux/calendar/action';

const {
  capitalize, parseTimeToGMT, formatCalendarDates, getWeekDay, padString,
} = Fn;

class ActivityEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canStartActivity: false,
      canJoinActivity: false,
      startingActivity: false,
    };

    this.banner = null;
    this._isMounted = false;
    this.timerHandler = null;
    this.checkTime = this.checkTime.bind(this);
    this.stopLoader = this.stopLoader.bind(this);
  }

  componentDidMount() {
    this.timerHandler = setInterval(this.checkTime, 1000); // <== check every 40 secs
    this.checkTime();
  }

  componentDidUpdate() {
    const { props } = this;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  checkTime() {
    const { props, state } = this;
    const { activity } = props.viewActivity;
    const activityDateTime = parseTimeToGMT(props.date);
    // const activityEndTime = addToTime(activityDateTime, activity.duration * 60 * 1000); // <== convert duration from minutes to milliseconds
    const activityEndTime = parseTimeToGMT(addToTime(activityDateTime, activity.duration * 60 * 1000));
    const currentDateTime = parseTimeToGMT();

    let canStartActivity = false;
    let canJoinActivity = false;
    let activityEnded = true;

    if (activityEndTime > currentDateTime) {
      activityEnded = false;
      const diffInMilliseconds = activityDateTime - currentDateTime;
      const diffInSec = diffInMilliseconds / 1000;
      const diffInMinutes = diffInSec / 60;
      // alert(`the difference in time ${diffInMinutes}`);
      /* console.log({
        diffInMilliseconds,
        diffInSec,
        diffInMinutes,
      }); */
      // alert(`the difference in minute is : ${diffInMinutes}`);
      if (diffInMinutes <= Utils.getValue('VirtualActivityStartGrace')) {
        canStartActivity = true;
        if (diffInMinutes <= 0 /* && activity.meeting.id */) {
          canJoinActivity = true;
        }
      }
    }

    if (canStartActivity && canJoinActivity && activityEnded) {
      clearInterval(this.timerHandler);
    }

    this.setState({
      canStartActivity,
      canJoinActivity,
    });

    // console.log({
    //   activityDateTime,
    //   currentDateTime,
    // });
    // alert('checking timer');
  }

  stopLoader() {
    this.setState({
      startingActivity: false,
    });
  }

  render() {
    const { state, props } = this;
    const { date, viewActivity, settings } = props;
    const { sessionUser } = settings;
    const { activity } = viewActivity;

    const { canJoinActivity, canStartActivity, startingActivity } = state;
    const { host } = activity;
    const isHost = sessionUser.userId === activity.userId;

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
    } else if (startHour === 12) {
      startPeriod = 'PM';
    }

    const TheEndDate = addToTime(TheDate, activity.duration * 60 * 1000);
    let endHour = TheEndDate.getHours();
    let endPeriod = 'AM';
    if (endHour > 12) {
      endHour -= 12;
      endPeriod = 'PM';
    } else if (endHour === 12) {
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
    const now = new Date();
    const activityEnded = addToTime(date, activity.duration * 60 * 1000) < now;
    const creditPrice = props.getActivityCredit(activity.duration);
    return (
      <div className={`time${attendance ? '' : ' loading'}`}>
        <div className="left">
          <span>
            <b>
              {capitalize(getWeekDay(TheDate.getDay()))}, {formattedDate.date}
            </b>
          </span>
          <span>
            {padString(startHour === 0 ? 12 : startHour, '0', 2)}:{padString(TheDate.getMinutes(), '0', 2)}{startPeriod}
            {' - '}
            {padString(endHour === 0 ? 12 : endHour, '0', 2)}:{padString(TheEndDate.getMinutes(), '0', 2)}{endPeriod}
            {' '}
            {timestamp}
          </span>
          <span className="remaining-seats">
            {attendance
              ? (
                <>
                  {
                    activityEnded
                      ? 'past event'
                      : attendance.length === Utils.getValue('MaxActivityAttendanceLen')
                        ? 'Sold out'
                        : `${Utils.getValue('MaxActivityAttendanceLen') - attendance.length} seats left`

                  }
                </>
              )
              : '...loading'}
          </span>
        </div>
        <div className="right">
          <span><b>{creditPrice.toFixed(2)} credits</b> (${Number(props.creditToUsd(creditPrice).toFixed(2))}  USD) / child</span>
          {(() => {
            let label = 'Choose';
            let className = 'btn-black';
            let onClick = () => {
              props.register(new Date(date));
            };

            if (isHost) {
              if (canStartActivity) {
                label = 'Start';
                className = 'btn-1';
                onClick = () => {
                  this.setState({
                    startingActivity: true,
                  });
                  props.startVirtualEvent(this.stopLoader);
                };
                if (startingActivity) {
                  label = (
                    <>Start <span className="icon icon-refresh spinner" /></>
                  );
                }
              } else {
                label = 'Details';
                onClick = props.activityEventDetails;
              }
            } else if (activityEnded) {
              label = 'Details';
              // onClick = () => {};
            } else if (awaitingActivity) {
              label = 'Update';
              className = 'btn-glass no-shadow bordered';
              if (canJoinActivity) {
                label = 'Join';
                className = 'btn-1';
                onClick = () => {
                  this.setState({
                    startingActivity: true,
                  });
                  props.startVirtualEvent(this.stopLoader);
                };
                if (startingActivity) {
                  label = (
                    <>Start <span className="icon icon-refresh spinner" /></>
                  );
                }
              }
            } else if (!attendance) {
              label = <span className="icon icon-refresh spinner" />;
            } else if (Utils.getValue('MaxActivityAttendanceLen') === attendance.length) {
              label = 'Sold out';
              className = 'btn-default no-shadow';
              onClick = () => {
              };
            }

            return (
              <button
                type="button"
                className={`btn ${className}${activityEnded ? ' past' : ''}`}
                onClick={onClick}
              > {label}
              </button>
            );
          })()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
  setActivity: (props) => dispatch(setActivity(props)),
  updateCalendarEvents: (events) => dispatch(updateEvents(events)),
  deleteCalendarEvents: (events) => dispatch(updateEvents(events, {}, 'remove')),

});
export default connect(mapStateToProps, mapDispatchToProps)(ActivityEvent);
