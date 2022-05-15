/* eslint-disable class-methods-use-this */
import React from 'react';
import DatePicker from './DatePicker';
import Dropdown from './Dropdown';
// import { range } from "moment-range";

class InputDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.weekdayshort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    this.state = {
      dates: [], // [
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
    this.content = null;
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
    const defaultDateValue = new Date();
    const defaultDate = [{
      weekDay: defaultDateValue.getDay(),
      month: defaultDateValue.getMonth() + 1,
      day: defaultDateValue.getDate(),
      year: 1999,
    }];

    // console.log('the min date is : ', new Date(props.minDate));
    const Dates = props.values || dates;
    let hidePlaceholder = false;
    let label = (() => {
      if (props.placeholder) {
        return props.placeholder;
      }

      if (props.placeholder === '') {
        hidePlaceholder = true;
      }

      return 'mm/dd/yyyy';
    })();

    let placeholder = '';
    if (this.isDates(Dates)) {
      hidePlaceholder = false;
      label = props.labelFormatter(Dates);
    } else {
      placeholder = 'placeholder';
    }
    let controller = (
      <div
        readOnly={props.readOnly}
        ref={(e) => {
          if (e && !this.preview) {
            this.preview = e;
          }
        }} // necessary
        style={{ margin: 0 }}
        className={`input-date-preview btn btn-default bordered  '__pill' ${placeholder} ${props.className}`}
      >
        <span
          style={{
            margin: 0,
            visibility: hidePlaceholder ? 'hidden' : '',
          }}
        >
          {label}
        </span>
        <span className="icon icon-arrow-down-1" />
      </div>
    );

    if (props.controller) {
      controller = props.controller({ placeholder, className: props.className, hidePlaceholder })
    }

    const content = (
      <DatePicker
        defaultDate={props.defaultDate}
        daysSelector={props.daysSelector}
        inputTime={props.inputTime}
        inputTimeLabel={props.inputTimeLabel}
        inputDuration={props.inputDuration}
        inputDurationLabel={props.inputDurationLabel}
        multichoice={props.multichoice}
        pickRange={props.pickRange}
        minDate={props.minDate}
        maxDate={props.maxDate}
        value={Dates}
        showControls={props.showControls}
        preview={this.preview}
        onLoad={(e) => {
          if (e) {
            this.content = e;
          }
        }}
        onChange={(values) => {
          this.setState({
            dates: values.length > 0 ? values : defaultDate,
          });

          props.onChange(values);
          if (props.autoClose) {
            this.dropdown.hideDropdown();
          }
        }}
        onReset={() => {
          // this.dropdown.rese();
          // if (this.content) this.content.resetDatePicker();
          this.dropdown.hideDropdown();
          props.onReset();
        }}
        onSave={(event) => {
          // this.hideDatePicker(event, true);
          if (this.content) this.content.onHideDropDowon();
          this.dropdown.hideDropdown();
          props.onSave();
        }}
      />
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
          onLoad={(e) => {
            this.dropdown = e;
          }}
          controller={props.defaultIcon ? props.defaultIcon : controller}
          content={content}
          onClose={() => {
            console.log('this.content is :', this.content);
            if (this.content) {
              this.content.onHideDropDowon();
            }
            props.onClose();
          }}
        />
      </div>
    );
  }
}

InputDatePicker.defaultProps = {
  values: [],
  autoClose: false,
  showControls: true,
  onReset: () => { },
  onSave: () => { },
  onChange: () => { },
  className: '',
  onLoad: () => { },
  onClose: () => { },
  daysSelector: null,
  labelFormatter: (Dates) => {
    const formatInputValue = (value) => (value ? `${value.month}/${value.day}/${value.year}` : '');
    return Dates.map((d) => (formatInputValue(d))).join(' , ');
  },
  multichoice: false,
  pickRange: false,
  readOnly: false,
  defaultDate: null
};

export default InputDatePicker;
