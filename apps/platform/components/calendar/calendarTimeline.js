import React from "react";
import CalendarCards from "./cards";

/**
 *
 * @param {time} time - gets the current time
 * @param {data} data - gets the data to populate
 * @return {{defaultprops:{time:string, data:object}}} data - gets the data to populate
 */

export default function CalendarTimeline({ time, data }) {
  return (
    <div className="card-timeline">
      <div className="time"><h3>{time}</h3></div>
      <div className="event-display">
        {data?.map((events, ind) => (
          <CalendarCards isHost={ind%2 == 0 ? true : false}/>
        ))}
      </div>
    </div>
  );
}

CalendarTimeline.defaultProps = {
    time:'9:00 AM',
    data:[0] 
}
