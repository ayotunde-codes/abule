import {
  Fn,
} from '@abule-common/components';

import { actionTypes } from './action';

const { deleteIndex } = Fn;

const now = new Date();
const aWeek = new Date();
aWeek.setHours(aWeek.getHours() + (7 * 24));
const defaultDate = [
  {
    weekDay: now.getDay(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    year: now.getFullYear(),
  },
  {
    weekDay: aWeek.getDay(),
    month: aWeek.getMonth() + 1,
    day: aWeek.getDate(),
    year: aWeek.getFullYear(),
  },
];
export const initState = {
  events: [],
  date: defaultDate,
  loading: true,
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.CALENDAR_SET_PROPS: {
      return {
        ...state,
        ...action.props,
      };
    }
    case actionTypes.CALENDAR_UPDATE_DATE: {
      return {
        ...state,
        date: action.date,
      };
    }
    case actionTypes.CALENDAR_RESET_DATE: {
      return {
        ...state,
        date: defaultDate,
      };
    }
    case actionTypes.CALENDAR_UPDATE_EVENTS: {
      const events = {};
      const allEvents = [];
      const eventsId = [];
      const eventsActivityId = [];
      const eventsBarterRequestId = [];
      // first merge old and new events while replacing duplicates
      Object.values(state.events).forEach((event) => {
        console.log('ADDING EVENT TO ALL FATHER', event);
        allEvents.push(event);
        eventsId.push(event.id);
        eventsActivityId.push(event.activityId);
        eventsBarterRequestId.push(event.barterRequestId);
      });

      const getEventIndex = (event) => {
        const eventId = eventsId.indexOf(event.id);
        if (eventId > -1) {
          return eventId;
        }

        const eventActivityId = eventsActivityId.indexOf(event.activityId);
        if (eventActivityId > -1) {
          return eventActivityId;
        }

        const eventBarterRequestId = eventsBarterRequestId.indexOf(event.barterRequestId);
        if (eventBarterRequestId > -1) {
          return eventBarterRequestId;
        }

        return -1;
      };

      action.events.forEach((event) => {
        const eventIndex = getEventIndex(event);
        // console.log('EVENT UPDATE CHECKED :', { eventsId, event, eventIndex });
        if (eventIndex === -1) {
          console.log('better dont try me');
          if (action.action === 'add') {
            console.log('baba thanks man', event);

            allEvents.push(event);
            eventsId.push(event.id);
          }
        } else if (action.action === 'add') {
          allEvents[eventIndex] = event;
        } else if (action.action === 'remove') {
          deleteIndex(allEvents, eventIndex);
          deleteIndex(eventsId, eventIndex);
          deleteIndex(eventsActivityId, eventIndex);
          deleteIndex(eventsBarterRequestId, eventIndex);
        }
      });
      /*   // group events by event timestamp
      allEvents.forEach((event) => {
        // get the event date
        const getEventDate = () => {
          switch (event.type) {
            case ('user-input'): {
              return event.date;
            }
            case ('activity'): {
              return event.activity.date;
            }
            case ('barter'): {
              return event.barterRequest.date;
            }
            default: {
              return new Date();
            }
          }
        };
        const eventDate = getEventDate();
        if (!events[eventDate]) events[eventDate] = [event];
        else events[eventDate].push(event);
      }); */

      // sort by date
      const eventKeys = Object.keys(allEvents).sort((a, b) => {
        const scoreA = a;
        const scoreB = b;

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
        orderedEvent[key] = allEvents[key];
      });

      return {
        ...state,
        ...action.props,
        // events: orderedEvent,
        events: allEvents,
      };
    }
    default:
      return state;
  }
}

export default reducer;
