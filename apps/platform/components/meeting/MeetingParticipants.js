/* eslint-disable class-methods-use-this */
import React from 'react';
import {
  Dropdown
} from '@abule-common/components';
// import { range } from "moment-range";

class MeetingParticipants extends React.Component {
  constructor(props) {
    super(props);
    this.weekdayshort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    this.state = {
      dates: null, // [
      //   {
      //     month: new Date().getMonth() + 1,
      //     day: new Date().getDate(),
      //     year: new Date().getFullYear(),
      //   }
      // ]
    };

    this.preview = null;
    this.inputDate = null;
    this.dropdown = null;
  }

  formatInputValue(value) {
    return value ? `${value.month}/${value.day}/${value.year}` : '';
  }

  isDates(dates) {
    try {
      if (Array.isArray(dates)) {
        for (const date of dates) {
          if (date) {
            return true;
          }
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  render() {
    const { state, props } = this;
    const { ref } = props;
    const { dates } = state;
    const defaultDate = [{
      weekDay: new Date().getDay(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      year: 1999,
    }];

    console.log('the min date is : ', new Date(props.minDate));
    const Dates = props.values || dates;
    let label = props.placeholder || 'mm/dd/yyyy';
    let placeholder = '';
    if (this.isDates(Dates)) {
      label = Dates.map((d) => (props.labelFormatter
        ? props.labelFormatter(d)
        : this.formatInputValue(d))).join(' , ');
    } else {
      placeholder = 'placeholder';
    }
    const { participants } = props;
    console.log('participants here aer :', participants);
    alert('participants here aer :');
    const participantsId = Object.keys(participants);
    const content = (
      <div id="ongoingMeetingParticipants" className="">
        <div className="head">
          <p>Participants</p>
        </div>
        <div className="content">
          {participantsId.map((participantId) => {
            const participant = participants[participantId];
            console.log('A participant is new : ', { participantId, participant, participants });
            alert('found a participant');
            return (
              <div className="participant item">
                <span>{participant.firstName} {participant.lastName}</span>
                <span className="actions">
                  <span className="action icon-hmv-mic" />
                  <span className="action icon-hmv-video-fill" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div
        tabIndex={0}
        className="input-date"
        ref={(e) => {
          if (e && !this.inputDate) {
            this.inputDate = e;
          }
          props.onLoad(this);
        }}
      >

        <Dropdown
          readOnly={props.readOnly}
          ref={(e) => {
            this.dropdown = e;
          }}
          showDropdown={props.show}
          defaultPosition={{ y: 'top' }}
          controller={props.controller}
          content={content}
          onClose={props.onClose}
        />
      </div>
    );
  }
}

MeetingParticipants.defaultProps = {
  values: [],
  participants: {},
  autoClose: false,
  showControls: true,
  onSave: () => { },
  onClose: () => { },
  onLoad: () => { },
  multichoice: false,
  readOnly: false,
  show: false,
  controller: '',
};

export default MeetingParticipants;
