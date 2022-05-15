/* eslint-disable class-methods-use-this */
import React from 'react';
import moment from 'moment';
import $ from 'jquery';
import InputField from './InputField';
import InputDuration from './InputDuration';
import {
  capitalize,
  getMonth, getWeekDay, isDate, isEmpty, padString, ucFirst,
} from './Fn';
// import { range } from "moment-range";
class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.weekdayshort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    this.initialState = {
      selectedDayOfMonth: null,
      showYearTable: false,
      showMonthTable: false,
      showDateTable: true,
      today: {
        year: moment()._d.getFullYear(),
        month: moment()._d.getMonth() + 1,
        day: moment()._d.getDate(),
        duration: 15,
      },
      selectedDates: [],
      showMobileTime: false,
    };

    let dateObject = moment();
    if (props.value[0]) {
      const [firstValue] = props.value;
      const defaultDateObject = moment();
      defaultDateObject.set('year', firstValue.year);
      defaultDateObject.set('month', firstValue.month - 1);
      defaultDateObject.set('date', firstValue.day);

      dateObject = defaultDateObject;
    } else if (isDate(props.defaultDate)) {
      const defaultDate = new Date(props.defaultDate);
      const defaultDateObject = moment();
      defaultDateObject.set('year', defaultDate.getFullYear());
      defaultDateObject.set('month', defaultDate.getMonth());
      defaultDateObject.set('date', defaultDate.getDate());

      dateObject = defaultDateObject;
    } else if (props.maxDate && new Date(props.maxDate).getTime()) {
      const maxDate = new Date(props.maxDate);
      const defaultDateObject = moment();
      defaultDateObject.set('year', maxDate.getFullYear());
      defaultDateObject.set('month', maxDate.getMonth());
      defaultDateObject.set('date', maxDate.getDate());

      dateObject = defaultDateObject;
    }

    this.state = {
      ...this.initialState,
      selectedDates: props.value || [this.initialState.today],
      dateObject,
      allmonths: moment.months(),
      contentWidth: 'auto',
      maxHeight: null,
      contentHeight: null,
    };

    this.YearTable = this.YearTable.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.MonthList = this.MonthList.bind(this);
    this.onHideDropDowon = this.onHideDropDowon.bind(this);
    this.resetDatePicker = this.resetDatePicker.bind(this);
  }

  onPrev() {
    const { props, state } = this;
    const { dateObject } = state;
    const minDate = props.minDate ? new Date(props.minDate) : false;
    const newDateObject = dateObject.clone();
    newDateObject.subtract(1, 'month').toDate();
    let valid = true;
    if (minDate && new Date(minDate.getFullYear(), minDate.getMonth()) > new Date(newDateObject._d.getFullYear(), newDateObject._d.getMonth())) {
      valid = false;
    }

    if (valid) {
      this.setState({
        dateObject: newDateObject,
        width: null,
        maxHeight: null,

      });
    }
  }

  onNext() {
    const { props, state } = this;
    const { dateObject } = state;
    const maxDate = props.maxDate ? new Date(props.maxDate) : false;
    const newDateObject = dateObject.clone();
    newDateObject.add(1, 'month').toDate();
    let valid = true;
    if (maxDate && new Date(maxDate.getFullYear(), maxDate.getMonth()) < new Date(newDateObject._d.getFullYear(), newDateObject._d.getMonth())) {
      valid = false;
    }

    if (valid) {
      this.setState({
        dateObject: newDateObject,
        width: null,
        maxHeight: null,

      });
    }
  }

  onYearChange(e) {
    this.setYear(e.target.value);
  }

  onDayClick(e, d, index) {
    const { state, props } = this;
    let { selectedDates } = this.state;
    let newSelectedDates = [];
    let isSelected = false;
    if (props.pickRange) {
      if (this.isSelectDate(d) !== false) {
        newSelectedDates = [d];
      } else {
        const newPick = [];
        newPick.push(d);
        if (selectedDates.length > 0) {
          newPick.push(selectedDates[selectedDates.length - 1]);
        }

        newPick.sort((a, b) => {
          const scoreA = new Date(a.year, a.month - 1, a.day);
          const scoreB = new Date(b.year, b.month - 1, b.day);

          if (scoreA < scoreB) {
            return -1;
          }
          if (scoreA > scoreB) {
            return 1;
          }
          return 0;
        });
        console.log('new pick is : ', newPick);
        newSelectedDates = newPick;
      }
    } else if (props.multichoice) {
      if (props.inputDuration || props.inputTime) {
        // sterilize the selection
        const selections = [...selectedDates];
        selectedDates = [];
        selections.forEach((date) => {
          let test = true;
          if (props.inputDuration && !date.duration) {
            test = false;
          }
          if (props.inputTime && !date.time) {
            test = false;
          }

          if (test) {
            selectedDates.push(date);
          }
        });
      }

      selectedDates.forEach((selectedDate) => {
        if (d.year === selectedDate.year && d.month === selectedDate.month && d.day === selectedDate.day) {
          isSelected = selectedDate;
        } else {
          newSelectedDates.push(selectedDate);
        }
      });

      if (props.inputDuration || props.inputTime || !isSelected) {
        newSelectedDates.push({
          duration: props.inputDuration ? 15 : null, // default duration
          ...(isSelected || d),
          index,
        });
      }
    } else {
      newSelectedDates = [{ ...d, index }];
    }

    const data = {
      selectedDates: newSelectedDates,
      showMobileTime: true,
    };

    this.setState(data, () => { });
    props.onChange(newSelectedDates);

    // this.props.onDayClick && this.props.onDayClick(e, d);
  }

  onMonthDaySelect(index) {
    const { state, props } = this;
    let { selectedDates } = this.state;
    const newSelectedDates = [];
    let isSelected = false;

    if (props.inputDuration || props.inputTime) {
      // sterilize the selection
      const selections = [...selectedDates];
      selectedDates = [];
      selections.forEach((date) => {
        let test = true;
        if (props.inputDuration && !date.duration) {
          test = false;
        }
        if (props.inputTime && !date.time) {
          test = false;
        }

        if (test) {
          selectedDates.push(date);
        }
      });
    }

    selectedDates.forEach((selectedDate) => {
      if (index === selectedDate.index) {
        isSelected = selectedDate;
      } else {
        newSelectedDates.push(selectedDate);
      }
    });

    if (props.inputDuration || props.inputTime || !isSelected) {
      newSelectedDates.push({
        duration: props.inputDuration ? 15 : null, // default duration
        index,
        ...(isSelected || {}),
      });
    }

    const data = {
      selectedDayOfMonth: index,
      selectedDates: newSelectedDates,
    };

    this.setState(data, () => { });
    props.onChange(newSelectedDates);

    // this.props.onDayClick && this.props.onDayClick(e, d);
  }

  onHideDropDowon() {
    const { props, state } = this;
    if (props.multichoice) {
      if (props.inputDuration || props.inputTime) {
        // sterilize the selection
        let { selectedDates } = state;
        const selections = [...selectedDates];
        selectedDates = [];
        selections.forEach((date) => {
          console.log('WE TESTING are ', date);

          let test = true;
          if (props.inputDuration && !date.duration) {
            test = false;
          }
          if (props.inputTime && !date.time) {
            test = false;
          }

          if (test) {
            selectedDates.push(date);
          }
        });
        this.setState({ selectedDates });
        this.props.onChange(selectedDates);
      }
    }
  }

  setMonth(monthIndex) {
    let dateObject = { ...this.state.dateObject };
    dateObject = moment(dateObject).set('month', monthIndex);
    this.setState({
      dateObject,
      width: null,
      maxHeight: null,
      showMonthTable: !this.state.showMonthTable,
      showDateTable: !this.state.showDateTable,
    });
  }

  getDates(startDate, stopDate) {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopD = moment(stopDate);
    while (currentDate <= stopD) {
      dateArray.push(moment(currentDate).format('YYYY'));
      currentDate = moment(currentDate).add(1, 'year');
    }
    return dateArray;
  }

  setYear(year) {
    let dateObject = { ...this.state.dateObject };
    dateObject = moment(dateObject).set('year', year);
    this.setState({
      dateObject,
      width: null,
      maxHeight: null,
      showDateTable: true,
      showYearTable: !this.state.showYearTable,
    });
  }

  showYearTable(e) {
    const showYearTable = !this.state.showYearTable;
    this.setState({
      showYearTable: !this.state.showYearTable,
      showMonthTable: false,
      showDateTable: !showYearTable,
    });
  }

  showMonth() {
    const showMonthTable = !this.state.showMonthTable;
    this.setState({
      showMonthTable,
      showYearTable: false,
      showDateTable: !showMonthTable,
    });
  }

  month() {
    return this.state.dateObject.format('MMMM');
  }

  firstDayOfMonth() {
    const { dateObject } = this.state;
    const firstDay = moment(dateObject)
      .startOf('month')
      .format('d'); // Day of week 0...1..5...6
    return firstDay;
  }

  year() {
    return this.state.dateObject.format('Y');
  }

  daysInMonth() {
    return this.state.dateObject.daysInMonth();
  }

  YearTable() {
    const { state, props } = this;
    const months = [];
    const minDate = props.minDate ? new Date(props.minDate) : false;
    const maxDate = props.maxDate ? new Date(props.maxDate) : false;

    const currentYear = parseInt(this.year(), 10);
    let startYear = 1900;
    let endYear = currentYear * 1.1;
    if (minDate && minDate.getFullYear() > startYear) {
      startYear = minDate.getFullYear();
    }

    if (maxDate && maxDate.getFullYear() >= startYear && maxDate.getFullYear() < endYear) {
      endYear = maxDate.getFullYear();
    }

    for (let year = startYear; year <= endYear; year += 1) {
      months.push(
        <button
          type="button"
          key={year}
          className={`calendar-month${currentYear === year ? ' current-month' : ''}`}
          ref={(e) => {
            if (e && currentYear === year) {
              e.focus();
            }
          }}
        >
          <span onClick={() => { this.setYear(year); }}>{year} </span>
        </button>,
      );
    }
    const rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    const yearlist = rows.map((d, i) => <div className="calendar-month-row">{d}</div>);

    return (
      <div>
        <div className="calendar-date-weekdays">
          <span> Select a Year </span>
        </div>
        <div className="calendar-months" style={{ maxHeight: this.state.contentHeight }}>
          {yearlist}
        </div>
      </div>
    );
  }

  MonthList() {
    const { state, props } = this;
    const monthsTitle = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = state.dateObject._d.getMonth();
    const currentYear = state.dateObject._d.getFullYear();
    const minDate = props.minDate ? new Date(props.minDate) : false;
    let maxDate = props.maxDate ? new Date(props.maxDate) : false;

    if (!(maxDate && (!minDate || maxDate.getFullYear() >= minDate.getFullYear()))) {
      maxDate = false;
    }

    const months = [];
    monthsTitle.forEach((month, index) => {
      let valid = true;
      if (minDate && minDate.getFullYear() === currentYear && minDate.getMonth() > index) {
        valid = false;
      }

      if (maxDate && maxDate.getFullYear() === currentYear && maxDate.getMonth() < index) {
        valid = false;
      }

      if (valid) {
        months.push(
          <button
            type="button"
            key={month}
            className={`calendar-month${currentMonth === index ? ' current-month' : ''}`}
            ref={(e) => {
              if (e && currentMonth === month) {
                e.focus();
              }
            }}
          >
            <span onClick={() => { this.setMonth(index); }}>{month}</span>
          </button>,
        );
      }
    });
    const rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });
    rows.push(cells);
    const monthlist = rows.map((d, i) => <div className="calendar-month-row">{d}</div>);

    return (
      <div>
        <div className="calendar-date-weekdays">
          <span> Select a Month </span>
        </div>
        <div className="calendar-months" style={{ maxHeight: this.state.contentHeight }}>
          {monthlist}
        </div>
      </div>
    );
  }

  isSelectDate(date) {
    const { selectedDates } = this.state;
    let index = -1;
    for (const selectedDate of selectedDates) {
      index += 1;
      if (
        selectedDate
        && date.year === selectedDate.year
        && date.month === selectedDate.month
        && date.day === selectedDate.day
      ) {
        return index;
      }
    }

    return false;
  }

  isSelectMonthDay(index) {
    // alert(`the index test is : ${index}`);
    const { selectedDates } = this.state;
    let counter = -1;
    for (const selectedDate of selectedDates) {
      counter += 1;
      if (selectedDate && index === selectedDate.index) {
        return counter;
      }
    }

    return false;
  }

  removeSelectedDate(date) {
    const { props } = this;
    const { selectedDates } = this.state;
    const newSelectedDates = [];
    for (const selectedDate of selectedDates) {
      if (
        !(
          selectedDate
          && date.year === selectedDate.year
          && date.month === selectedDate.month
          && date.day === selectedDate.day
        )
      ) {
        newSelectedDates.push(selectedDate);
      }
    }

    const data = {
      selectedDates: newSelectedDates,
      selectedDayOfMonth: null,
    };

    this.setState(data, () => { });
    props.onChange(newSelectedDates);
  }

  resetDatePicker() {
    this.setState({ ...this.initialState });
    this.props.onChange([]);
    this.props.onReset();
  }

  onTimeChange(date, data) {
    const { props, state } = this;
    const { selectedDates, selectedDayOfMonth } = state;
    const newSelectedDates = selectedDates.map((selectedDate) => {
      const isDate = (
        date.day === selectedDate.day
        && date.month === selectedDate.month
        && date.year === selectedDate.year
      );
      return ({
        ...selectedDate,
        ...(isDate ? data : {}),
      });
    });

    this.setState({
      selectedDates: newSelectedDates,
    }, () => {
      props.onChange(newSelectedDates);
    });
  }

  getPositionInMonth(index) {
    if (index === null) return false;

    // create blanks
    const daysInMonth = [];
    const rows = [];
    let cells = [];

    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      // daysInMonth.push(<td className="calendar-day empty">{""}</td>);
      daysInMonth.push(null);
    }

    for (let d = 1; d <= this.daysInMonth(); d += 1) {
      daysInMonth.push(d);
    }

    // divide the days into weeks
    daysInMonth.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === daysInMonth.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    let WeekIndex = 0;
    let DayIndex = 0;
    console.log('THE DAYS IN A MONTH IS : ', { daysInMonth, rows, index });
    rows.forEach((week, weekIndex) => {
      console.log('the week and index', { weekIndex, week });
      for (let dayIndex = 0; dayIndex < week.length; dayIndex += 1) {
        if (week[dayIndex] === index) {
          WeekIndex = weekIndex;
          DayIndex = dayIndex;
          break;
        }
      }
    });

    let weekIndex = 0;
    // after getting day index check its position
    for (let i = 1; i <= WeekIndex; i += 1) {
      const week = rows[i];
      console.log('WEEK IN HERE IS: ', week);
      if (week[DayIndex] !== null) {
        weekIndex++;
      }
    }

    console.log('INTHE END : ', { WeekIndex, weekIndex, DayIndex });
    const day = getWeekDay(DayIndex);
    // check if first row has the day

    const Week = (i) => {
      if ((this.daysInMonth() - index) < 7) {
        return 'last';
      }
      switch (i) {
        case (1): {
          return '1st';
        }
        case (2): {
          return '2nd';
        }
        case (3): {
          return '3rd';
        }
        default: {
          return `${i}th`;
        }
      }
    };
    return `${Week(weekIndex)} ${capitalize(day)}`;
  }

  render() {
    const { state, props } = this;
    const { dateObject, today, showMobileTime } = state;
    const currentMonth = dateObject._d.getMonth();
    const currentYear = parseInt(this.year(), 10);
    const weekdayshortname = this.weekdayshort.map((day) => <span key={day}>{day}</span>);
    const blanks = [];
    let rows = [];

    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      // blanks.push(<td className="calendar-day empty">{""}</td>);
      blanks.push(
        <td className="calendar-day __blank">
          <div><span /></div>
        </td>,
      );
    }

    const daysInMonth = [];
    const minDate = props.minDate ? new Date(props.minDate) : false;
    const maxDate = props.maxDate ? new Date(props.maxDate) : false;
    for (let d = 1; d <= this.daysInMonth(); d += 1) {
      const date = new Date(currentYear, currentMonth, d);
      let disable = false;
      let minDateTest = false;
      let maxDateTest = false;
      if (minDate) {
        minDateTest = date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      }
      if (maxDate) {
        maxDateTest = date > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      }
      if (minDateTest || maxDateTest) {
        disable = true;
      }

      const currentWeekDay = date.getDay();
      const currentDate = {
        weekDay: currentWeekDay,
        month: currentMonth + 1,
        day: d,
        year: currentYear,
      };
      const isCurrentDay = currentDate.day === today.day && currentDate.month === today.month && currentDate.year === today.year ? 'today' : '';
      const isSelected = this.isSelectDate(currentDate);
      const selectedClass = isSelected !== false ? ' selected-day ' : '';
      const disabledClass = disable ? ' disabled ' : '';
      let inRange = '';
      let pickRangeState = false;
      if (props.pickRange && state.selectedDates.length === 2) {
        pickRangeState = true;
      }
      if (pickRangeState) {
        let firstDate = state.selectedDates[0];
        let endDate = state.selectedDates[1];
        firstDate = new Date(firstDate.year, firstDate.month - 1, firstDate.day);
        endDate = new Date(endDate.year, endDate.month - 1, endDate.day);
        // console.log('comparing them values and ', { date, firstDate });

        if (date > firstDate && date < endDate) {
          inRange = ' in-range ';
        }
      }

      let rangeStart = '';
      let rangeEnd = '';
      if (pickRangeState && isSelected !== false && isSelected === 0) {
        rangeStart = ' range-start ';
      }
      if (pickRangeState && isSelected !== false && isSelected === 1) {
        rangeEnd = ' range-end ';
      }
      // const rangeEnd = props.pickRange && isSelected !== false && isSelected === 1 ? ' range-end ' : '';
      daysInMonth.push(
        <td
          key={d}
          className={`calendar-day ${inRange} ${rangeStart} ${rangeEnd} ${isCurrentDay} ${selectedClass} ${disabledClass}`}
          onClick={(e) => {
            if (!disable) this.onDayClick(e, currentDate, d);
            // alert(`actual position is : ${}`);
          }}
        >
          <div>
            <span> {d} </span>
          </div>
        </td>,
      );
    }
    const totalSlots = [...blanks, ...daysInMonth];
    rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        // let insertRow = cells.slice();
        rows.push(cells);
      }
    });

    const lastRow = rows[rows.length - 1];
    for (let i = lastRow.length; i < 7; i += 1) {
      lastRow.push(
        <td className="calendar-day __blank">
          <div><span /></div>
        </td>,
      );
    }
    rows[rows.length - 1] = lastRow;

    const daysinmonth = [];
    rows.forEach((d) => {
      if (d.length > 0) {
        daysinmonth.push(<tr className="calendar-days-row">{d}</tr>);
      }
    });

    const { selectedDates } = state;
    const lastSelectedDate = selectedDates.length > 0 ? selectedDates[selectedDates.length - 1] : false;
    const lastSelectedDateTime = lastSelectedDate.time;
    const lastSelectedDateHour = lastSelectedDateTime && lastSelectedDateTime.hour ? lastSelectedDateTime.hour : '';
    const lastSelectedDateMinute = lastSelectedDateTime && lastSelectedDateTime.minute ? lastSelectedDateTime.minute : '';
    const lastSelectedDatePeriod = lastSelectedDateTime && lastSelectedDateTime.period ? lastSelectedDateTime.period : 'AM';
    const lastSelectedDateDuration = lastSelectedDate.duration || 15;

    return (
      <div
        className="calendar-time-container"
        style={{ width: state.contentWidth }}
        ref={(e) => {
          if (e && !state.contentHeight) {
            this.setState({
              contentWidth: $(e).outerWidth(),
              contentHeight: $(e).outerHeight(),
            });
          }
        }}
      >
        <div
          className="datetime-calendar"
          ref={(e) => {
            if (e && state.maxHeight === null) {
              console.log('MAX HEIGHTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT', state.maxHeight);
              props.onLoad(this);
              this.setState({
                maxHeight: $(e).outerHeight(),
              });
            }
          }}
        >
          <div className="calendar-navi">
            <span
              onClick={(e) => {
                this.onPrev();
              }}
              className="calendar-button button-prev icon-arrow-left-2"
            />
            <div className="calendar-labels">
              <span
                onClick={(e) => {
                  this.showMonth();
                }}
                className="calendar-label"
              >
                <span> {this.month()} </span>
              </span>
              <span className="calendar-label" onClick={(e) => this.showYearTable()}>
                <span> {this.year()} </span>
              </span>
            </div>
            <span
              onClick={(e) => {
                this.onNext();
              }}
              className="calendar-button button-next icon-arrow-right-3"
            />

          </div>

          <div className={`calendar-date${this.state.showYearTable ? '' : ' hide'}`}>
            <this.YearTable props={this.year()} />
          </div>
          <div className={`calendar-date${this.state.showMonthTable ? '' : ' hide'}`}>
            <this.MonthList data={moment.months('MM')} />
          </div>

          {this.state.showDateTable && (
            <div className="calendar-date">
              <div className="calendar-date-weekdays datetime-container">{weekdayshortname}</div>
              <table
                className="calendar-day"
              >
                <tbody>{daysinmonth}</tbody>
              </table>
            </div>
          )}
          {props.showControls && (
            <div className="datetime-footer">
              <div className="datetime-container">
                <button
                  type="button"
                  className="btn btn-neutral _reset"
                  onClick={(e) => {
                    this.resetDatePicker();
                    // this.setState(this.initialState);
                  }}
                >Reset
                </button>
                <button
                  type="button"
                  className="btn btn-glass bordered _save"
                  onClick={(e) => {
                    props.onSave(e);
                  }}
                >Save
                </button>
              </div>
            </div>
          )}
        </div>

        {(props.inputTime || props.inputDuration) && (
          <div
            className={`calendar-time${lastSelectedDate && showMobileTime ? ' show' : ''}`}
            onClick={() => {
              if (window.innerWidth <= process.env.MOBILE_BREAKPOINT) {
                this.setState({
                  showMobileTime: false,
                });
              }
            }}
          >
            <div
              className={`time-content ${lastSelectedDate === false ? ' hide' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
            >
              <div className="_body-content">
                <div className="time-holder">
                  <p className="last-selected-date">
                    {props.daysSelector ? (
                      <>
                        {lastSelectedDate && this.getPositionInMonth(lastSelectedDate.index)}
                      </>
                    ) : (
                      <>
                        {lastSelectedDate !== false && (
                          `${ucFirst(getMonth(lastSelectedDate.month - 1))} ${lastSelectedDate.day}, ${lastSelectedDate.year}`
                        )}
                      </>
                    )}
                  </p>
                  <div className="time-holder-content">
                    {props.inputTime && (
                      <>
                        <div className="time-row-label"> {props.inputTimeLabel} </div>
                        <div className="time">
                          <InputField
                            type="number"
                            label=""
                            max={12}
                            placeholder="hh"
                            value={lastSelectedDateHour}
                            onBlur={(value) => {
                              let hour = value > 12 ? 12 : parseInt(value, 10);
                              hour = hour < 1 ? 1 : hour;

                              if (isEmpty(hour) || isNaN(hour)) {
                                hour = 12;
                              } else {
                                hour = padString(hour, '0', 2);
                              }
                              let minute = lastSelectedDateMinute;
                              if (!lastSelectedDateMinute) {
                                minute = '00';
                              }
                              this.onTimeChange(lastSelectedDate, {
                                time: {
                                  hour,
                                  minute,
                                  period: lastSelectedDatePeriod,
                                },
                              });
                            }}
                            onChange={(value) => {
                              this.onTimeChange(lastSelectedDate, {
                                time: {
                                  hour: value,
                                  minute: lastSelectedDateMinute,
                                  period: lastSelectedDatePeriod,
                                },
                              });
                            }}
                          />
                          <InputField
                            type="number"
                            label=""
                            placeholder="mm"
                            value={lastSelectedDateMinute}
                            onBlur={(value) => {
                              let minute = value > 59 ? 59 : parseInt(value, 10);
                              minute = minute < 0 ? 0 : minute;
                              if (isEmpty(minute) || isNaN(minute)) {
                                minute = '00';
                              } else {
                                minute = padString(minute, '0', 2);
                              }
                              this.onTimeChange(lastSelectedDate, {
                                time: {
                                  hour: lastSelectedDateHour,
                                  minute,
                                  period: lastSelectedDatePeriod,
                                },
                              });
                            }}
                            onChange={(value) => {
                              this.onTimeChange(lastSelectedDate, {
                                time: {
                                  hour: lastSelectedDateHour,
                                  minute: value,
                                  period: lastSelectedDatePeriod,
                                },
                              });
                            }}
                          />
                          <div
                            className="period"
                            onClick={() => {
                              this.onTimeChange(lastSelectedDate, {
                                time: {
                                  hour: lastSelectedDateHour,
                                  minute: lastSelectedDateMinute,
                                  period: lastSelectedDatePeriod === 'AM' ? 'PM' : 'AM',
                                },
                              });
                            }}
                          >
                            {lastSelectedDatePeriod}
                          </div>
                        </div>
                      </>
                    )}
                    {props.inputDuration && (
                      <>
                        <div className="time-row-label"> {props.inputDurationLabel} </div>
                        <InputDuration
                          label=""
                          value={lastSelectedDateDuration}
                          onChange={(value) => {
                            this.onTimeChange(lastSelectedDate, {
                              duration: value,
                            });
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="time-actions">
                  {window.innerWidth <= process.env.MOBILE_BREAKPOINT && (
                    <button
                      type="button"
                      className="btn btn-neutral no-shadow  __pill"
                      onClick={(e) => {
                        this.setState({
                          showMobileTime: false,
                        });
                      }}
                    >Save
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-glass no-shadow bordered __pill"
                    onClick={(e) => {
                      this.removeSelectedDate(lastSelectedDate);
                    }}
                  >Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
DatePicker.defaultProps = {
  value: [],
  onSave: () => { },
  onLoad: () => { },
  onChange: () => { },
  multichoice: false,
  minDate: null,
  maxDate: null,
  inputTime: false,
  inputTimeLabel: 'Time',
  inputDuration: false,
  inputDurationLabel: 'Duration',
  defaultDate: null,
};

export default DatePicker;
