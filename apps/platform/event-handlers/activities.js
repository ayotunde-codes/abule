import React from 'react';
import { setActivity, updateActivity } from '../redux/calendar-activity/action';
import { setActivity as setViewActivity, updateActivity as updateViewActivity } from '../redux/view-activity/action';
import { updateEvents } from '../redux/calendar/action';
import { addChatToConversation } from '../redux/inbox/action';

const calendarEventUpdate = async (data, dispatchEvent) => {
  const {
    calendarEvent,
  } = data;
  dispatchEvent(updateEvents([calendarEvent]));
};

const activityRegistrationUpdate = async (data, dispatchEvent, store) => {
  console.log('the new message gotten is : ', data);
  const {
    action,
    activityId,
    attendance,
    kidsId,
  } = data;
  const date = new Date(data.date);
  const { calendarActivity, viewActivity } = store;
  // const { activity } = calendarActivity;

  const updateActivityObject = (obj, name) => {
    const { activity } = obj;
    if (activity.id && activityId === activity.id) {
      // just update the attendance
      // alert('reg success');
      const dateValue = date.getTime();
      console.log('OLDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDS', { oldAttendance: activity.attendance, dateValue });

      const newAttendance = {
        ...activity.attendance,
        [dateValue]: attendance,
      };
      const newActivity = {
        ...activity,
        attendance: newAttendance,
      };

      console.log('WE UPDATING ACTIVITY OBJECT OF ', { obj, name, newActivity });
      const { allAttendees } = activity;
      // const newAttendance = [];
      // if (action === 'add-kids') {
      //   allAttendees = allAttendees.concat(kidsAttendance);
      //   const isUniqueAtt = (att) => {
      //     const newAttendanceIds = newAttendance.map((newAtt) => (newAtt.id));
      //     return !newAttendanceIds.includes(att.id);
      //   };
      //   // remove duplicates
      //   // newAttendance =
      //   allAttendees.forEach((att) => {
      //     if (isUniqueAtt(att)) {
      //       newAttendance.push(att);
      //     }
      //   });
      // } else if (action === 'remove-kids') {
      //   newAttendance = [];
      //   allAttendees.forEach((att) => {
      //     const attIndex = kidsId.indexOf(att.kid.id);
      //     if (attIndex === -1) {
      //       // medias.splice(index, 1);
      //       newAttendance.push(att);
      //     }
      //   });
      // }

      dispatchEvent(setViewActivity(newActivity));
    }
  };

  updateActivityObject(viewActivity, 'viewActivity');
};

const activityMeetingStart = async (data, dispatchEvent, store) => {
  console.log('the new message gotten is : ', data);
  const {
    activityId,
    meeting,
  } = data;
  // alert('we in');
  const { calendarActivity } = store;
  const { activity } = calendarActivity;
  if (activity.id && activityId === activity.id) {
    console.log('the meeting data : ', data);
    // alert('its same activity');
    dispatchEvent(updateActivity({
      meeting,
    }));
    dispatchEvent(updateViewActivity({
      meeting,
    }));
  }
};

export default {
  topic: 'activities',
  handler: (data, dispatchEvent, store) => {
    switch (data.event || '') {
      case ('calendar-event-update'): {
        calendarEventUpdate(data, dispatchEvent, store);
        break;
      }
      case ('activity-registration-update'): {
        // alert('came in right');
        console.log('NEW EVENT TO REGISTRATION', data);
        activityRegistrationUpdate(data, dispatchEvent, store);
        break;
      }
      case ('activity-meeting-start'): {
        // alert('came in right');
        activityMeetingStart(data, dispatchEvent, store);
        break;
      }
      default: break;
    }
  },
};
