import React, { useState } from "react";
import DatePicker from "../DatePicker";

export default function Selectdate({
  date,
  setDate,
  identify = "from",
  // toggleCalendar,
  // setToggle,
}) {
  const [toggle, setToggle] = useState(false);
  const getDate = (val) => {
    if (val) {
      setDate({ ...date, [identify]: val });
      setToggle(!toggle);
    }
  };
  return (
    <div className="calendar-date-container" >
      <div className="calendar-show-off" onClick={() => setToggle(!toggle)}>
        <h3 className="timberline-font">Monday</h3>
        <h5>{"September 15, 2020"}</h5>
      </div>
      {toggle && (
        <div
          className={`calendar-drop-down ${
            toggle ? "show-calendar" : "hide-calendar"
          }`}
        >
          <DatePicker onChange={getDate} />
        </div>
      )}
    </div>
  );
}

Selectdate.defaultProps = {
  day: { letd: "Monday" },
  setDate: (val) => console.log(val),
  identify: "yop",
  toggleCalendar: false,
  // setToggle: function (val) {
  //   Selectdate.defaultProps.toggleCalendar =
  //     Selectdate.defaultProps.toggleCalendar;
  // },
};
