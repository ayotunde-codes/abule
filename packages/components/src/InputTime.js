import React from "react";
import {
  isEmail,
  devalueString,
  isEmpty,
  isDescendant,
  padString,
} from "./Fn";
import InputField from "./InputField";

const doubTime = (s) => {
  const value = parseInt(s, 10);
  return `${`${value}`.length === 1 ? `0${value}` : value}`;
};

class InputTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: null,
      minute: null,
      period: "AM",
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
    console.log("validating time while : ", {
      hour,
      minute,
      period,
    });
    if (
      !isEmpty(hour) &&
      hour !== null &&
      !isNaN(hour) &&
      hour > 0 &&
      hour <= 12 &&
      !isEmpty(minute) &&
      minute !== null &&
      !isNaN(minute) &&
      minute >= 0 &&
      minute <= 59 &&
      (period === "AM" || period === "PM")
    ) {
      return true;
    }
    return false;
  }

  reset() {
    const resetData = {
      hour: null,
      minute: null,
      period: null,
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
    const Minute =
      props.minute || props.minute === null ? props.minute : state.minute;
    const Period =
      (props.period || props.period === null) && !isEmpty(props.period)
        ? props.period
        : state.period;
    const isValidTime = this.isValidTime(Hour, Minute, Period);
    const controller = (
      <button
        type="button"
        className={`input-time-button${isValidTime ? "" : " placeholder"}${state.error !== false ? " error" : ""
          } ${props.buttonClassName}`}
      >
        {isValidTime
          ? `${doubTime(Hour)} : ${doubTime(Minute)} ${Period}`
          : props.placeholder || "--:--: --"}
      </button>
    );

    // console.log('CAPITAL VALUES', { Hour, Minute });
    return (
      <div
        className={`input-time ${props.className}`}
        ref={(e) => {
          this.inputTime = e;
        }}
      >
        <div className="date-case">
          <InputField
            type="number"
            label=""
            max={12}
            placeholder="hh"
            value={Hour}
            onBlur={(value) => {
              let hour = value > 12 ? 12 : parseInt(value, 10);
              hour = hour < 1 ? 1 : hour;

              if (isEmpty(hour) || isNaN(hour)) {
                hour = 12;
              } else {
                hour = padString(hour, "0", 2);
              }
              let minute = Minute;
              if (!Minute) {
                minute = "00";
              }
              this.onChange({
                hour,
                minute,
                period: Period,
              });
            }}
            onChange={(value) => {
              this.onChange({
                hour: value,
                minute: Minute,
                period: Period,
              });
            }}
          />
          <span>:</span>
          <InputField
            type="number"
            label=""
            placeholder="mm"
            value={Minute}
            onBlur={(value) => {
              let minute = value > 59 ? 59 : parseInt(value, 10);
              minute = minute < 0 ? 0 : minute;
              if (isEmpty(minute) || isNaN(minute)) {
                minute = "00";
              } else {
                minute = padString(minute, "0", 2);
              }
              this.onChange({
                hour: Hour,
                minute,
                period: Period,
              });
            }}
            onChange={(value) => {
              this.onChange({
                hour: Hour,
                minute: value,
                period: Period,
              });
            }}
          />
        </div>
        <div className="period-type">
          <div
            className={`period ${Period === "AM" ? "active-period" : ""}`}
            onClick={() => {
              this.onChange({
                hour: Hour,
                minute: Minute,
                period: "AM",
              });
            }}
          >
            AM
          </div>
          <div
            className={`period ${Period === "PM" ? "active-period" : ""}`}
            onClick={() => {
              this.onChange({
                hour: Hour,
                minute: Minute,
                period: "PM",
              });
            }}
          >
            PM
          </div>
        </div>
      </div>
    );
  }
}

InputTime.defaultProps = {
  className: "",
  globalClassName: "",
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

export default InputTime;
