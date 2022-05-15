import Router from 'next/router';
import React from 'react';
import { Fn } from '@abule-common/components';

const {
  capitalize, getRelativeTime, padString,
} = Fn;

class MyActivity extends React.Component {
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
    const { props } = this;
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
    }
    return (
      <div
        className="my-activity"
        onClick={() => {
          if (activity.status === 'draft') {
            Router.push(`${props.AppUrl}/edit-activity/[id]`, `${props.AppUrl}/edit-activity/${activity.id}`);
          } else {
            Router.push(`${props.AppUrl}/activities/[id]`, `${props.AppUrl}/activities/${activity.id}`);
          }
        }}
      >
        <div className="holder">
          <div className="image">
            <img
              alt=""
              src={this.getThumb()}
            />
          </div>
          <div className="info">
            <p className="date">
              <span>{dateTime.M}/{dateTime.D}/{dateTime.Y}</span>
              <span>{padString(dateTime.h === 0 ? '12' : dateTime.h, '0', 2)}:{padString(dateTime.m, '0', 2)} {dateTime.p}</span>
            </p>
            <p className="name">
              <span>{activity.name}</span>
            </p>
            <p className="status">{(() => {
              switch (activity.status) {
                case ('approved'): {
                  return 'Published';
                }
                case ('rejected'): {
                  return activity.status;
                }
                case ('draft'): {
                  return 'Saved';
                }
                default: {
                  return 'In Review';
                }
              }
            })()}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default MyActivity;
