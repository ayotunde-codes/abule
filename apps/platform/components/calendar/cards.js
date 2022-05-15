import React from "react";

export default function CalendarCards({
  isUser,
  isHost,
  kids,
  title,
  description,
  duration,
}) {
  /**
   * isUser - if the user created an event
   * isHost - if the user is hosting an activity
   */
  const Background = isUser ? "user-event" : isHost ? "user-host-event" : "";

  const Host = isHost && (
    <div className="host-icon">
    <div>
      <span>Host</span>
      <sapn className="host-icon-circle"></sapn>
    </div>
    </div>
  );

  const DisplayKids = kids.length && (
    <div className="event-kids">
      {kids.map((kid) => (
        <div
          className="kid-color"
          style={{ backgroundColor: kid.color }}
        ></div>
      ))}
    </div>
  );

  return (
    <div className={`user-event-container ${Background}`}>
      {Host}
      <div>
        <h4>{title}</h4>
      </div>
        {DisplayKids}
      <div className="event-description">
        <p>{description}</p>
      </div>
      <p className="event-duration">{duration}</p>
    </div>
  );
}


CalendarCards.defaultProps = {
    isUser:true,
    isHost:true,
    title:"the show must go on from yaba to ikeja",
    kids:[{color:"red"},{color:"green"},{color:"blue"},],
    description:"lorem ipsum as ipsum of the ipsom in oslo candada from uereka ipsum as ipsum ",
    duration:"15min"
}