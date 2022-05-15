import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  Fn,
  Dropdown, InputPicker, PopMessage,
} from '@abule-common/components';

import { updateHeader, setInfo } from '../../redux/settings/action';
import {
  AgeGroups, Utils,
} from '../../datastore';
import { AgeGroupIcons, Messages } from '../../public/data/assets';
import { setActivity } from '../../redux/view-activity/action';
import { updateEvents } from '../../redux/calendar/action';
import BuyCredit from '../BuyCredit';

const {
  addToTime, getUniqueValues, popPrompt, capitalize,
  ucFirst, milSecToYears, popAlert, milSecToHours, formatCalendarDates,
} = Fn;

class ActivityRegistration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kidsToAttend: [],
      kidsAttendingError: false,
      buyCredit: false,
      addedKidIds: [],
      removedKidIds: [],
    };

    this.banner = null;
    this._isMounted = false;
    this.timerHandler = null;
    this.registeredSuccessfully = this.registeredSuccessfully.bind(this);
    this.onKidSelect = this.onKidSelect.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const { activity, settings: { sessionUser } } = props;
    const userKidsAttendingId = [];
    const attendance = activity.attendance[props.event.date.getTime()].attendees;

    attendance.forEach((att) => {
      if (att.kid.userId === sessionUser.userId) {
        userKidsAttendingId.push(att.kidId);
      }
    });

    this.setState({
      kidsToAttend: userKidsAttendingId,
    });
  }

  componentDidUpdate() {
    const { props } = this;
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  registeredSuccessfully(awaitingActivity, calendarEvent, invitation, kidsAttending) {
    const { props, state } = this;
    const { activity, event } = props;
    const { date } = event;

    // const { settings: { sessionUser } } = props;

    try {
      const { addedKidIds, removedKidIds, kidsToAttend } = state;

      console.log({
        attendance: activity.attendance,
        kidsToAttend: state.kidsToAttend,
        addedKidIds,
        removedKidIds,
        awaitingActivity,
        calendarEvent,
        invitation,
        kidsAttending,
      });
      const attending = state.kidsToAttend.map((kidId) => ({
        kid: this.getUserKidById(kidId),
        kidId,
      }));
      // alert('hold');
      if (!awaitingActivity) {
        popAlert({
          title: 'Registration Successful',
          description: (
            <div id="createActivityConfirm">
              <p>You’re  all set for this activity:</p>
              <h3>{ucFirst(activity.name)}</h3>
              {/* <p>Add to ICS . Add to Google Calendar</p> */}
              <a
                href={`data:text/calendar; charset=utf-8,${encodeURIComponent(invitation)}`}
                className="anchor"
                download="invite.ics"
                target="_self"
                onClick={() => {
                  // download('invite.ics', invitation, '');
                }}
              >Add to ICS
              </a>
            </div>),
        });
      } else {
        popAlert({
          title: 'Update Successful',
          description: (
            <div id="createActivityConfirm">
              <p>
                {addedKidIds.length > 0 && (
                  <p className="kids-attending">
                    Added: {(addedKidIds.map((kidId, index) => (
                      `${ucFirst(this.getUserKidById(kidId).preferredName)}
                  ${addedKidIds.length > 1
                        && index < addedKidIds.length - 1
                        ? index === addedKidIds.length - 2 ? ' and ' : ', '
                        : ''}`
                    )))}
                  </p>
                )}
                {removedKidIds.length > 0 && (
                  <p className="kids-attending">
                    Removed: {(removedKidIds.map((kidId, index) => (
                      `${ucFirst(this.getUserKidById(kidId).preferredName)}
                  ${removedKidIds.length > 1
                        && index < removedKidIds.length - 1
                        ? index === removedKidIds.length - 2 ? ' and ' : ', '
                        : ''}`
                    )))}
                  </p>
                )}
              </p>
              <h3 style={{ marginBottom: '0px' }}>{ucFirst(activity.name)}</h3>
            </div>
          ),
        });
      }

      console.log('OLD ATTENDANCE', activity.attendance);
      // alert('reg success');
      const newAttendance = {
        ...activity.attendance,
        [date.getTime()]: {
          attendees: attending,
          length: activity.attendance[date.getTime()].length - (activity.attendance[date.getTime()].attendees.length - attending.length),
        },
      };
      console.log('NEW ATTENDANCE', newAttendance);

      props.setActivity({
        ...activity,
        attendance: newAttendance,
      });

      props.onSuccess({
        attending,
        calendarEvent,
        addedKidIds,
        removedKidIds,
      });

      if (addedKidIds && addedKidIds.length) {
        // alert('we emitting upadte');
        props.emitEvent({
          date,
          topic: 'activities',
          event: 'activity-registration-update',
          action: 'add-kids',
          activityId: activity.id,
          kidsId: addedKidIds,
        });
      }
      if (removedKidIds && removedKidIds.length) {
        // alert('we emitting upadte');
        props.emitEvent({
          date,
          topic: 'activities',
          event: 'activity-registration-update',
          action: 'remove-kids',
          activityId: activity.id,
          kidsId: removedKidIds,
        });
      }
    } catch (e) {
      console.log('the  error', e);
      // alert('got yeye error');
    }
  }

  async proceedToregistration() {
    const { props, state } = this;
    const { activity } = props;
    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/activities/${activity.id}/attendance`,
        method: 'POST',
        body: {
          kidIds: state.kidsToAttend,
          date: props.event.date,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return {
        ...data,
        kidsAttending: state.kidsToAttend,
      };
    } catch (erroRes) {
      console.log('MAIN VILLIAN', erroRes);
      // alert('main villian');
      Router.push(`${props.AppUrl}/`);
    }
  }

  onKidSelect(values) {
    const { props, state } = this;
    const { activity, kids, settings: { sessionUser } } = props;

    const addedKidIds = [];
    const removedKidIds = [];
    const attendance = activity.attendance[props.event.date.getTime()].attendees;

    // Compare old selection with new selection to get children added and removed
    const attendanceId = attendance.filter((att) => att.kid.userId === sessionUser.userId).map((att) => att.kidId);
    // Get kid IDs that were added
    values.forEach((kidId) => {
      if (!attendanceId.includes(kidId)) {
        addedKidIds.push(kidId);
      }
    });

    // Get kid IDs that were removed
    attendanceId.forEach((kidId) => {
      console.log('checking removed kids : ', { kidId, values });
      if (!values.includes(kidId)) {
        removedKidIds.push(kidId);
      }
    });

    this.setState({
      addedKidIds,
      removedKidIds,
      kidsToAttend: values,
      kidsAttendingError: false,
    });
  }

  getCreditToLoose({
    kidsLength,
  }) {
    const { props, state } = this;
    const { activity, event } = props;
    const { date } = event;
    const costToAttend = props.getActivityCredit(activity.duration);

    const subTotal = kidsLength * costToAttend;
    const MinServiceFee = props.getActivityMinServiceFee();
    let serviceFee = Number((costToAttend * (Utils.getValue('ActivityServiceFee') / 100))); // 10 percent
    serviceFee = serviceFee < MinServiceFee ? MinServiceFee : serviceFee;
    const totalServiceFee = serviceFee * kidsLength;

    let hourMark = 0;
    let timeDiff = new Date(date) - new Date(); // diff in minutes

    timeDiff = timeDiff < 0 ? 0 : milSecToHours(timeDiff);
    console.log('TIME DIFF IN HOUR', timeDiff, ' and its type is : ', typeof timeDiff);

    let refundRate = 0;
    let lossRate = 0;
    if (timeDiff > 48) { // greater than 48 hours
      refundRate = 100;
    } else if (timeDiff >= 24) { // in between 24 and 48 hours
      hourMark = 48;
      refundRate = 70;
    } else if (timeDiff >= 12) { // in between 12 and 24 hours
      hourMark = 24;
      refundRate = 50;
    } else if (timeDiff > 2) { // in between 2 and 12 hours
      hourMark = 12;
      refundRate = 30;
    } else {
      hourMark = 2;
      refundRate = 0;
    }
    console.log('REFUND RATE', refundRate);

    lossRate = 100 - refundRate;

    console.log('LOSS RATE', lossRate);
    console.log('COST ', costToAttend);

    const totalCreditToLose = ((lossRate / 100) * subTotal).toFixed(2);
    return {
      totalCreditToLose: Number(totalCreditToLose),
      totalServiceFee,
      hourMark,
    };
  }

  render() {
    const { props, state } = this;
    const {
      activity,
      kids,
      settings: {
        sessionUser,
      },
      event,
    } = props;
    const { date } = event;

    if (kids.length === 0) {
      popAlert({
        title: 'Oops! Can\'t register',
        description: 'To register for this activity, you need add a kid to your  profile.',
      });
      return '';
    }
    const MaxActivityAttendanceLen = Utils.getValue('MaxActivityAttendanceLen');
    const { kidsToAttend } = state;
    const otherKidsAttending = [];
    const userKidsAttendingId = [];
    const attendance = activity.attendance[props.event.date.getTime()].attendees;
    const awaitingActivity = attendance.length > 0;
    attendance.forEach((att) => {
      if (att.kid.userId !== sessionUser.userId) {
        otherKidsAttending.push(att);
      } else {
        userKidsAttendingId.push(att.kidId);
      }
    });

    console.log('the oher kids are', otherKidsAttending);
    const { seatsRemaining } = props;
    const getAgeGroupRange = (ageGroup) => {
      const result = [];
      const index = AgeGroups.allId.indexOf(ageGroup);
      if (index > -1) {
        if (index - 1 > -1) {
          result.push(AgeGroups.allId[index - 1]);
        }
        result.push(ageGroup);
        if (index + 1 < AgeGroups.allId.length) {
          result.push(AgeGroups.allId[index + 1]);
        }
      }
      console.log('trying to get age groups : ', {
        index, ageGroup, allAgeGroup: AgeGroups.allId, result,
      });
      return result;
    };
    let acceptedAgeGroups = [];

    activity.ageGroups.forEach((ageGroup) => {
      acceptedAgeGroups = [
        ...acceptedAgeGroups,
        ...getAgeGroupRange(ageGroup),
      ];
    });

    acceptedAgeGroups = getUniqueValues(acceptedAgeGroups);
    console.log('THE ACCEPTABLE AGE GROUPS ARE ', acceptedAgeGroups);
    const allowedKids = [];
    kids.forEach((kid) => {
      const age = milSecToYears(new Date() - new Date(kid.dob));
      const ageGroup = AgeGroups.getGroup(age).id;
      console.log('kid age is: ', { age, ageGroup });
      if (acceptedAgeGroups.includes(ageGroup)) {
        allowedKids.push(kid);
      }
    });

    console.log('the akinds information up here is : ', {
      allowedKids,
      kids: sessionUser.kids,
    });

    // test if user has enough credit to register the number of kids they want to register
    const costToAttend = props.getActivityCredit(activity.duration);
    const attendanceId = attendance.filter((att) => att.kid.userId === sessionUser.userId).map((att) => att.kidId);

    const userBalance = (sessionUser.creditBalance.purchased + sessionUser.creditBalance.earned + (costToAttend * attendanceId.length)) - sessionUser.creditBalance.held;

    const subTotal = kidsToAttend.length * costToAttend;
    const MinServiceFee = props.getActivityMinServiceFee();
    let serviceFee = Number((subTotal * (Utils.getValue('ActivityServiceFee') / 100)).toFixed(2)); // 10 percent
    serviceFee = serviceFee < MinServiceFee ? MinServiceFee : serviceFee;
    serviceFee = subTotal > 0 ? serviceFee : 0;
    const totalCost = Number((subTotal + serviceFee).toFixed(2));
    const insufficientFunds = totalCost > userBalance;
    const noChange = state.addedKidIds.length === 0 && state.removedKidIds.length === 0;
    const now = new Date();
    const activityEnded = addToTime(props.event.date, activity.duration * 60 * 1000) < now;
    const noKidsMessage = {
      one: 'sorry, your child does not meet the age criteria.',
      many: 'sorry, none of your children meet the age criteria.',
    };

    const attendanceDiff = (attendance.length - kidsToAttend.length);

    return (
      <>
        <PopMessage
          // show={state.initregistration}
          style={{ zIndex: '2' }}
          message={(
            <div id="registerKidForActivity">
              <div className="title">
                <h2>{!awaitingActivity && !activityEnded ? 'Register for' : ''} {ucFirst(activity.name)}</h2>
                ({formatCalendarDates([props.event.date])})
              </div>
              {
                activityEnded
                  ? <p>Who attended</p>
                  : (
                    <>
                      {allowedKids.length
                        ? <p>Who's attending?</p>
                        : <p className="sits-available">{noKidsMessage[kids.length > 1 ? 'many' : 'one']}</p>}
                    </>
                  )
              }
              <br />
              {!activityEnded && state.kidsAttendingError && <p className="error-msg">you need to select at least one child</p>}
              <div>
                <InputPicker
                  maxSelection={seatsRemaining + state.kidsToAttend.length}
                  values={state.kidsToAttend}
                  className={state.kidsAttendingError ? 'error' : ''}
                  options={allowedKids.map((kid) => ({
                    label: capitalize(kid.preferredName),
                    value: kid.id,
                  }))}
                  onChange={this.onKidSelect}
                />
              </div>
              {!activityEnded
                && (
                  <>
                    <div className="sits-available">
                      {/* {insufficientFunds ? "You don't have enough credits to register for this activity" : `Seats remaining: ${seatsRemaining}`} */}
                      {insufficientFunds ? "You don't have enough credits to register for this activity" : ''}
                    </div>
                    <div className="infos">
                      <p className="header">
                        <span className="info"> Summary </span>
                      </p>
                      <div className="info data">
                        <Dropdown
                          defaultPosition={{
                            y: 'top',
                            x: 'auto',
                          }}
                          controller={<span>{costToAttend.toFixed(2)} credits x {state.kidsToAttend.length} child{state.kidsToAttend.length > 1 ? 'ren' : ''}</span>}
                          content={(
                            <div className="info-data-pop-up">
                              <div className="content">
                                <p>Credits are based on a weighted system which varies depending on type of event.</p>
                                <a className="link">Learn more</a>
                              </div>
                            </div>
                          )}
                          onClose={() => {
                            // console.log('this.content is :', this.content);
                          }}
                        />
                        <span>{subTotal > 0 ? subTotal.toFixed(2) : subTotal} credits</span>
                      </div>
                      <div className="info data">
                        <Dropdown
                          defaultPosition={{
                            y: 'top',
                            x: 'auto',
                          }}
                          controller={<span>Service fee</span>}
                          content={(
                            <div className="info-data-pop-up">
                              <div className="content">
                                This helps us run our platform and offer great user experience.
                              </div>
                            </div>
                          )}
                          onClose={() => {
                            // console.log('this.content is :', this.content);
                          }}
                        />
                        <span>{serviceFee > 0 ? serviceFee.toFixed(2) : 0} credits</span>
                      </div>
                      <div className="info total">
                        <span>Total</span>
                        <span> {totalCost > 0 ? totalCost.toFixed(2) : 0} credits</span>
                      </div>
                    </div>
                  </>
                )}
            </div>
          )}
          confirmButton={insufficientFunds ? {
            show: insufficientFunds && !activityEnded,
            label: 'BUY CREDITS',
            onClick: async (closer, hideLoader) => {
              hideLoader();
              this.setState({
                buyCredit: true,
              });
            },
          } : {
            show: !activityEnded,
            label: awaitingActivity ? 'SAVE' : 'REGISTER',
            onClick: async (closer, hideLoader) => {
              if (!noChange) {
                if (state.kidsToAttend.length > 0) {
                  const proceedToUpdate = async () => {
                    try {
                      const {
                        calendarEvent, creditBalance, invitation, kidsAttending,
                      } = await this.proceedToregistration();
                      // const res = await this.proceedToregistration();
                      this.registeredSuccessfully(awaitingActivity, calendarEvent, invitation, kidsAttending);
                      props.setSessionUser({
                        ...sessionUser,
                        creditBalance,
                      });
                      closer();
                    } catch (err) {
                      console.log('COULDNT REGISTER KIDS BECAUSE', err);
                      popAlert({
                        title: Messages.requests.serverError.title,
                        description: Messages.requests.serverError.message,
                        error: true,
                      });
                      hideLoader();
                    }
                  };

                  // const totalCost = attendanceDiff * cost;
                  if (attendanceDiff > 0) {
                    const { totalCreditToLose, totalServiceFee, hourMark } = this.getCreditToLoose({ kidsLength: attendanceDiff });
                    popPrompt({
                      warning: true,
                      message: (
                        <div>
                          <p style={{
                            fontWeight: '600',
                            fontSize: '1.2em',
                          }}
                          >Are you sure you want to update this activity?
                          </p>
                          <br />
                          <div>{
                            totalCreditToLose > 0 ? (
                              <>
                                <p>You will lose {(totalCreditToLose + totalServiceFee).toFixed(2)} credits because you're unregistering {attendanceDiff} child{attendanceDiff > 1 ? 'ren' : ''} less than {hourMark} hours before the event.</p>
                              </>
                            )
                              : <p>Your credits will be fully refunded</p>
                          }
                          </div>
                        </div>
                      ),
                      confirmButton: {
                        label: 'YES',
                        onClick: async () => {
                          await proceedToUpdate();
                        },
                      },
                      cancelButton: {
                        label: 'NO',
                        onClick: (clser) => {
                          clser();
                          hideLoader();
                        },
                      },
                    });
                  } else {
                    // alert('guy no care');
                    await proceedToUpdate();
                  }
                } else {
                  hideLoader();
                  this.setState({
                    kidsAttendingError: Messages.forms.validationError.pickKid,
                  });
                }
                /// /////////////////////////////////////////////////////////////////
              } else {
                hideLoader();
              }
            },
            className: `btn btn-1 ${noChange ? 'hide' : ''}`,
          }}
          cancelButton={{
            show: awaitingActivity && !activityEnded,
            label: 'CANCEL',
            onClick: (closer, hideLoader) => {
              const { totalCreditToLose, hourMark, totalServiceFee } = this.getCreditToLoose({ kidsLength: attendance.length });
              popPrompt({
                id: 'activityCancelPrompt',
                warning: true,
                message: (
                  <div>
                    <p style={{
                      fontWeight: '600',
                      fontSize: '1.2em',
                    }}
                    >Are you sure you want to cancel this activity?
                    </p>
                    <br />
                    <div>{
                      totalCreditToLose > 0 ? (
                        <>
                          <p>
                            You will lose {(Number(totalCreditToLose + totalServiceFee)).toFixed(2)} credits because you're canceling less than {hourMark} hours before the event.
                          </p>
                        </>
                      )
                        : <p>Your credits will be fully refunded</p>
                    }
                    </div>
                  </div>
                ),
                confirmButton: {
                  label: 'YES',
                  onClick: async (clser) => {
                    const { date } = props.event;
                    try {
                      const data = await props.fetchRequest({
                        url: `${process.env.REACT_APP_API}/activities/${activity.id}/attendance?date=${date.getTime()}`,
                        method: 'DELETE',
                      });
                      closer();
                      console.log('AFTER DELETING REGIRSTATION : ', data);
                      // alert('we back');
                      props.setSessionUser({
                        ...sessionUser,
                        creditBalance: data.creditBalance,
                      });
                      popAlert({
                        title: 'Activity canceled',
                        description: (
                          <>
                            <p>{activity.name} has been canceled and removed from your calendar</p>
                            {/* <p>{totalCost - totalCreditToLose} credits has been released to your available credits</p> */}
                          </>),
                      });

                      const dateValue = date.getTime();
                      const oldAttendanceLength = activity.attendance[dateValue].attendees.length;
                      const newAttendance = {
                        ...activity.attendance,
                        [dateValue]: {
                          attendees: [],
                          length: activity.attendance[dateValue].length - oldAttendanceLength,
                        },
                      };
                      console.log('NEW ATTENDANCE', newAttendance);

                      props.setActivity({
                        ...activity,
                        attendance: newAttendance,
                      });

                      props.deleteCalendarEvents([{
                        activityId: activity.id,
                      }]);
                      props.emitEvent({
                        date,
                        topic: 'activities',
                        event: 'activity-registration-update',
                        action: 'remove-kids',
                        activityId: activity.id,
                        // kidsId: activity.attendance.map((att) => (att.kidId)),
                      });
                    } catch (e) {
                      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', e);
                      clser();
                      popAlert({
                        title: "Couldn\'t delete activity",
                        description: 'please try again',
                        error: true,
                      });
                    }
                  },
                },
                cancelButton: {
                  label: 'NO',
                  onClick: (clser) => {
                    clser();
                    hideLoader();
                  },
                },
                onClose: () => {
                  clser();
                  hideLoader();
                },
              });
            },

          }}
          onCancel={() => {
            const { props, state } = this;
            const { activity, sessionUser } = props;
            const { kidsToAttend } = state;

            /*  const addedKidIds = [];
          const attendanceId = activity.allAttendees.map((att) => (att.kidId));
          // Compare old selection with new selection to get children added and removed
          activity.allAttendees.forEach((att) => {
            if (att.kid.userId === sessionUser.userId) {
              addedKidIds.push(att.kid);
            }
          });

          const removedKidIds = [];
          // Get kid IDs that were added
          state.kidsToAttend.forEach((kidId) => {
            if (!attendanceId.includes(kidId)) {
              addedKidIds.push(kidId);
            }
          });

          // Get kid IDs that were removed
          attendanceId.forEach((kidId) => {
            console.log('checking removed kids : ', { kidId, kidsToAttend: state.kidsToAttend });
            if (!state.kidsToAttend.includes(kidId)) {
              removedKidIds.push(kidId);
            }
          }); */

            props.onClose();
          }}
        />

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
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(ActivityRegistration);
