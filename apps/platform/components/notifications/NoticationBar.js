import Router from 'next/router';
import React from 'react';

class NotificationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  getThumb() {
    const { props } = this;
    const { activity } = props;

    const { mediaUrls } = activity;

    let thumb = false;
    for (const media of mediaUrls) {
      const { type } = media;
      if (type === 'image') {
        thumb = `${media.url}`;
        break;
      }
    }
    return thumb || '/img/requests.png';
  }

  render() {
    /*  const { props } = this;
    const { activity } = props;

    const time = new Date(activity.updatedAt);
    const dateTime = {
      Y: time.getFullYear(),
      M: time.getMonth() + 1,
      D: time.getDate(),
      h: time.getHours(),
      m: time.getMinutes(),
      p: 'AM',
    };
    if (dateTime.h > 12) {
      dateTime.h -= 12;
      dateTime.p = 'PM';
    } */

    return (
      <div
        className="notification"
        onClick={() => {
        }}
      >
        <div className="info">
          <span className="user">@zainab</span> <span className="message">Posted in your community - Beat The Blues - Feeling like a deer caught in the headlights</span>
        </div>
        <span className="date-time">2 days ago</span>
      </div>

    );
  }
}
export default NotificationBar;
