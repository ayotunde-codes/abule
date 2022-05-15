import React from 'react';

import Dropdown from './Dropdown';

const doubTime = (s) => {
  const value = parseInt(s, 10);
  return `${`${value}`.length === 1 ? `0${value}` : value}`;
};

class PopInputTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: null,
      minute: null,
      period: 'AM',
      error: false,
    };

    this.inputTime = null;
    this.dropdown = null;
    this.close = this.close.bind(this);
    this.reset = this.reset.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange({ hour, minute, period }) {
    const time = {
      hour,
      minute,
      period: period || period === null ? period : this.state.period,
    };
    this.setState(time);

    this.props.onChange(time);
  }

  isValidTime(hour, minute, period) {
    console.log('validating time while : ', {
      hour,
      minute,
      period,
    });
    if ((!isEmpty(hour) && hour !== null && !isNaN(hour) && hour > 0 && hour <= 12)
      && (!isEmpty(minute) && minute !== null && !isNaN(minute) && minute >= 0 && minute <= 59)
      && (period === 'AM' || period === 'PM')
    ) {
      return true;
    }
    return false;
  }

  reset() {
    const resetData = {
      hour: null,
      minute: null,
      period: 'AM',
    };
    this.setState(resetData);
    this.props.onChange(resetData);
  }

  close() {
    this.dropdown.hideDropdown();
  }

  render() {
    const { props } = this;
    const { state } = this;

    const Hour = props.hour || props.hour === null ? props.hour : state.hour;
    const Minute = props.minute || props.minute === null ? props.minute : state.minute;
    const Period = props.period || props.period === null ? props.period : state.period;
    const isValidTime = this.isValidTime(Hour, Minute, Period);
    const controller = (
      <button
        type="button"
        className={`pop-input-time-button${isValidTime ? '' : ' placeholder'}${state.error !== false ? ' error' : ''} ${props.buttonClassName}`}
      >{isValidTime ? `${doubTime(Hour)} : ${doubTime(Minute)} ${Period}` : props.placeholder || '--:--: --'}
      </button>
    );

    const content = (
      <div className="pop-input-time-drop">
        <div className="row">
          <div className="col hour">
            <span>hour</span>
            <input
              type="number"
              max={12}
              placeholder="hh"
              value={Hour || ''}
              onBlur={({ target: { value } }) => {
                let hour = value > 12 ? 12 : parseInt(value, 10);
                hour = hour < 1 ? 1 : hour;

                if (isEmpty(hour) || isNaN(hour)) {
                  hour = 12;
                } else {
                  hour = doubTime(hour);
                }
                let minute = Minute;
                if (!Minute) {
                  minute = '00';
                }
                this.onChange({ hour, minute });
              }}
              onChange={({ target: { value: hour } }) => {
                this.onChange({ hour, minute: Minute, period: Period });
              }}
            />
          </div>
          <div className="col minute">
            <span>minute</span>
            <input
              placeholder="mm"
              type="number"
              value={Minute || ''}
              onBlur={({ target: { value } }) => {
                let minute = value > 59 ? 59 : parseInt(value, 10);
                minute = minute < 0 ? 0 : minute;
                if (isEmpty(minute) || isNaN(minute)) {
                  minute = '00';
                } else {
                  minute = doubTime(minute);
                }
                this.onChange({
                  hour: Hour,
                  minute,
                });
              }}
              onChange={({ target: { value: minute } }) => {
                this.onChange({ hour: Hour, minute, period: Period });
              }}
            />
          </div>
          <div className="col period">
            <span>period</span>
            <button
              type="button"
              className={`btn bordered __pill thin col period${Period === 'AM' ? ' active' : ''}`}
              onClick={() => {
                this.onChange({ hour: Hour, minute: Minute, period: Period === 'AM' ? 'PM' : 'AM' });
              }}
            >{Period}
            </button>

          </div>
        </div>
        {/*  <div className="row periods">

          <button
            type="button"
            className={`btn bordered __pill thin col period${Period === 'PM' ? ' active' : ''}`}
            onClick={() => {
              this.onChange({ hour: Hour, minute: Minute, period: 'PM' });
            }}
          >PM
          </button>
        </div> */}
        <div className="pop-input-time-actions">
          <button
            type="button"
            className="no-shadow bordered __pill btn btn-neutral"
            onClick={this.reset}
          >RESET
          </button>
          <button
            type="button"
            className="no-shadow bordered __pill btn btn-default"
            onClick={this.close}
          >SAVE
          </button>
        </div>
      </div>
    );

    // console.log('CAPITAL VALUES', { Hour, Minute });
    return (
      <div
        className={`pop-input-time ${props.className}`}
        ref={(e) => { this.inputTime = e; }}
      >
        <Dropdown
          ref={(e) => {
            this.dropdown = e;
          }}
          controller={controller}
          content={content}
        />
      </div>
    );
  }
}

PopInputTime.defaultProps = {
  className: '',
  globalClassName: '',
  buttonClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  style: {},
  onFocus: () => { },
  onBlur: () => { },
  onChange: () => { },
  onKeyDown: () => { },
};

export default PopInputTime;
