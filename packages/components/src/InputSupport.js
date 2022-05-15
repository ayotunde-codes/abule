import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Dropdown from './Dropdown';

const doubNumb = (value) => `${`${value}`.length < 2 ? `0${value}` : value}`;
const normalizeTime = (val, min = 0, max = 59) => {
  let value = parseInt(val, 10);
  value = isNaN(value) ? 0 : value;
  // eslint-disable-next-line no-nested-ternary
  value = value < min ? min : value > max ? max : value;
  return doubNumb(value);
};

class InputSupport extends React.Component {
  constructor(props) {
    super(props);

    const { support } = props;
    this.defaultState = {
      isAvailable: false,
      days: {
        sunday: [
          /*  start: {
                hour: parseInt(startHour, 10),
                minute: parseInt(startMinute, 10),
                period: startPeriod,
              },
              end: {
                hour: parseInt(endHour, 10),
                minute: parseInt(endMinute, 10),
                period: endPeriod,
              }, */
        ],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
      },
      /// ///////////////////////////////
      newTime: {
        startHour: '12',
        startMinute: '00',
        startPeriod: 'AM',
        endHour: '12',
        endMinute: '00',
        endPeriod: 'PM',
        error: false,
      },
    };

    this.state = {
      ...this.defaultState,
      type: support.type,
      isAvailable: !!support.isAvailable,
      days: {
        sunday: support.days.sunday || [],
        monday: support.days.monday || [],
        tuesday: support.days.tuesday || [],
        wednesday: support.days.wednesday || [],
        thursday: support.days.thursday || [],
        friday: support.days.friday || [],
        saturday: support.days.saturday || [],
      },
      /// ///////////////////////////////
      daysHeight: null,
      focusedDay: false,
      newTime: this.defaultState.newTime,
    };
    /*
    */
    this._isMounted = false;
    this.days = null;
    this.dropdown = null;
    this.inputSupport = null;
    this.updateNewTime = this.updateNewTime.bind(this);
    this.saveNewTime = this.saveNewTime.bind(this);
    this.removeDayTime = this.removeDayTime.bind(this);
    this.Dropdown = this.Dropdown.bind(this);
    this.DropdownOld = this.DropdownOld.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.saveAndClose = this.saveAndClose.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
  }

  componentDidUpdate() {
    const { props } = this;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateNewTime(values) {
    const { newTime } = this.state;

    this.setState({
      newTime: {
        ...newTime,
        error: false,
        ...values,
      },
    });
  }

  saveNewTime() {
    const { props, state } = this;
    const activeDays = this.getActiveDays();
    const { newTime } = state;
    const { support } = props;
    const { days } = support;
    const focusedDay = state.focusedDay || activeDays[0] || 'sunday';
    const {
      startHour, startMinute, startPeriod, endHour, endMinute, endPeriod,
    } = newTime;
    const timeInMins = (hour, minute, period) => {
      let Hour = parseInt(hour, 10);
      Hour = Hour === 12 && period === 'AM' ? 0 : Hour;
      Hour += period === 'PM' && Hour < 12 ? 12 : 0;
      return parseInt((Hour * 60) + minute, 10);
    };

    const newStart = { hour: startHour, minute: startMinute, period: startPeriod };
    const newEnd = { hour: endHour, minute: endMinute, period: endPeriod };
    const newStartInMins = timeInMins(startHour, startMinute, startPeriod);
    const newEndInMins = timeInMins(endHour, endMinute, endPeriod);

    const validateInputError = () => {
      if (newStartInMins < newEndInMins) {
        return false;
      }
      return 'invalid time range';
    };

    const validationError = validateInputError();
    if (!validationError) {
      // validate values position in the timeline
      let focusedTimeline = days[focusedDay];

      const parseTimeIntoTimeline = (timeline, time, pushTime = true) => {
        let timeFitted = false;
        const newFocusedTimeline = [];
        const timeStartInMins = timeInMins(time.start.hour, time.start.minute, time.start.period);
        const timeEndInMins = timeInMins(time.end.hour, time.end.minute, time.end.period);
        timeline.forEach((Time) => {
          let { start } = Time;
          let { end } = Time;
          const TimeStartInMins = timeInMins(Time.start.hour, Time.start.minute, Time.start.period);
          const TimeEndInMins = timeInMins(Time.end.hour, Time.end.minute, Time.end.period);

          if (timeStartInMins <= TimeStartInMins) {
            if (timeEndInMins >= TimeStartInMins) {
              timeFitted = true;
              start = time.start;
              if (timeEndInMins >= TimeEndInMins) {
                end = time.end;
              }
            }
          } else if (timeStartInMins <= TimeEndInMins) {
            timeFitted = true;

            if (timeEndInMins >= TimeEndInMins) {
              end = time.end;
            }
          }

          newFocusedTimeline.push({
            start,
            end,
          });
        });

        if (!timeFitted && pushTime) {
          newFocusedTimeline.push({
            start: time.start,
            end: time.end,
          });
        }

        return newFocusedTimeline;
        // return timeFitted ? parseTimeIntoTimeline() : true;
      };

      const optimizeTimeline = (timeline, focus = 0) => {
        // return timeline;
        const time = timeline[focus];
        if (time) {
          const newTimeline = parseTimeIntoTimeline(timeline, time);
          // if focus was the last time in the timeline
          console.log({ timeline, focus });
          if (focus === (timeline.length - 1)) {
            // remove duplicate values
            const Timeline = [];
            const isUniqueTime = (timee) => {
              for (const Time of Timeline) {
                console.log('CHECKING', { Time, timee, result: JSON.stringify(Time) === JSON.stringify(timee) });
                if (JSON.stringify(Time) === JSON.stringify(timee)) {
                  return false;
                }
              }
              return true;
            };

            newTimeline.forEach((timee) => {
              if (isUniqueTime(timee)) {
                Timeline.push(timee);
              } else {
                console.log('found a duplicate');
              }
            });

            Timeline.sort((a, b) => {
              const scoreA = timeInMins(a.start.hour, a.start.minute, a.start.period);
              const scoreB = timeInMins(b.start.hour, b.start.minute, b.start.period);

              if (scoreA < scoreB) {
                return -1;
              }
              if (scoreA > scoreB) {
                return 1;
              }
              return 0;
            });
            return Timeline;
          }

          // if time was successfuly fitted into another time
          const newFocus = newTimeline.length !== timeline.length ? 0 : focus + 1;

          return optimizeTimeline(newTimeline, newFocus);
        }
        return timeline;
      };

      focusedTimeline = parseTimeIntoTimeline(focusedTimeline, {
        start: newStart,
        end: newEnd,
      });

      this.props.onChange({
        type: support.type,
        isAvailable: true,
        days: {
          ...days,
          [focusedDay]: optimizeTimeline(focusedTimeline),
        },
      });
    } else {
      this.updateNewTime({
        error: validationError,
      });
    }
  }

  isAvailable() {
    const { days } = this.props.support;

    for (const key in days) {
      console.log('the key is : ', key);
      if (days[key].length > 0) {
        return true;
      }
    }

    return false;
  }

  getActiveDays() {
    const { days } = this.props.support;
    const activeDays = [];
    Object.keys(days).forEach((day) => {
      const timeLine = days[day];
      if (timeLine.length > 0) {
        activeDays.push(day);
      }
    });

    return activeDays;
  }

  removeDayTime(index) {
    const { props, state } = this;
    const { support } = props;
    const days = { ...support.days };
    const activeDays = this.getActiveDays();
    const focusedDay = state.focusedDay || activeDays[0] || 'sunday';
    const focusedTimeline = days[focusedDay].filter((time, i) => i !== index);
    console.log({
      oldDays: days[focusedDay], focusedTimeline,
    });
    this.setState({
      focusedDay,
    });
    props.onChange({
      isAvailable: this.isAvailable(),
      days: {
        ...days,
        [focusedDay]: focusedTimeline,
      },
    });
  }

  reset() {
    this.setState(this.defaultState);
  }

  save() {
    const { state } = this;
    this.setState({ focusedDay: false });
    /* this.props.onChange({
      type: state.type,
      isAvailable: state.isAvailable,
      days: state.days,
    }); */
  }

  saveAndClose() {
    this.save();
    console.log('DROPDOWN', this.dropdown);
    this.dropdown.hideDropdown();
  }

  Dropdown() {
    const { props, state } = this;
    const { days, newTime, daysHeight } = state;
    const activeDays = this.getActiveDays();
    const focusedDay = state.focusedDay || activeDays[0] || 'sunday';
    const focusedTimeline = props.support.days[focusedDay];

    return (
      <div className="input-support-dropdown ">
        <div
          className="input-support-content"
        >
          <div
            className="input-support-content-days"
            ref={(e) => {
              if (e && !this.days) {
                this.days = e;
                this.setState({
                  daysHeight: $(e).outerHeight(),
                });
              }
            }}
          >
            {Object.keys(days).map((day) => {
              const isActive = activeDays.indexOf(day) > -1;
              return (
                <div
                  className={`btn btn-default __pill thin bordered no-shadow${focusedDay === day ? ' focused' : ''}${isActive ? ' active' : ''}`}
                  onClick={() => {
                    this.setState({
                      focusedDay: day,
                      newTime: this.defaultState.newTime,
                    });
                  }}
                >{day}
                </div>
              );
            })}

          </div>

          <div
            className="input-support-content-time"
            style={{
              maxHeight: daysHeight ? `${daysHeight}px` : '',
            }}
          >

            <div>
              {focusedTimeline.map((timeRange, index) => {
                const { start, end } = timeRange;
                return (
                  <span className="time-item">
                    <span>
                      {doubNumb(start.hour)}:{doubNumb(start.minute)} {start.period} - {doubNumb(end.hour)}:{doubNumb(end.minute)} {end.period}
                    </span>
                    {!props.readOnly && (
                      <span
                        className="icon icon-cross"
                        onClick={() => {
                          this.removeDayTime(index);
                        }}
                      />
                    )}
                  </span>
                );
              })}
            </div>

            {!props.readOnly && (
              <div className="new-time-item">
                <div className={`content ${newTime.error ? 'error' : ''}`}>
                  <div>
                    <input
                      placeholder="hh"
                      value={newTime.startHour}
                      onChange={({ target: { value } }) => {
                        // alert(`the change: ${value}`);
                        this.updateNewTime({ startHour: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ startHour: normalizeTime(newTime.startHour, 1, 12) });
                      }}
                    />
                    {' : '}
                    <input
                      placeholder="mm"
                      value={newTime.startMinute}
                      onChange={({ target: { value } }) => {
                        this.updateNewTime({ startMinute: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ startMinute: normalizeTime(newTime.startMinute) });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-neutal thin period no-shadow bordered"
                      onClick={() => {
                        this.updateNewTime({ startPeriod: newTime.startPeriod === 'AM' ? 'PM' : 'AM' });
                      }}
                    >{newTime.startPeriod}
                    </button>
                  </div>
                  <span className="divider">To</span>
                  <div>
                    <input
                      placeholder="hh"
                      value={newTime.endHour}
                      onChange={({ target: { value } }) => {
                        this.updateNewTime({ endHour: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ endHour: normalizeTime(newTime.endHour, 1, 12) });
                      }}
                    />
                    {' : '}
                    <input
                      placeholder="mm"
                      value={newTime.endMinute}
                      onChange={({ target: { value } }) => {
                        this.updateNewTime({ endMinute: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ endMinute: normalizeTime(newTime.endMinute) });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-neutal thin period no-shadow bordered"
                      onClick={() => {
                        this.updateNewTime({ endPeriod: newTime.endPeriod === 'AM' ? 'PM' : 'AM' });
                      }}
                    >{newTime.endPeriod}
                    </button>
                  </div>
                </div>
                <span className="error-msg">{newTime.error || ''}</span>
                <button
                  type="button"
                  className="btn btn-default thin add-time-action no-shadow bordered"
                  onClick={this.saveNewTime}
                >
                  Save Time
                </button>
              </div>
            )}
          </div>
        </div>
        {!props.readOnly && !props.inline && (
          <div className="input-support-actions">
            <button
              type="button"
              className="no-shadow bordered __pill btn btn-neutral"
              onClick={this.reset}
            >RESET
            </button>
            <button
              type="button"
              className="no-shadow bordered __pill btn btn-default"
              onClick={this.saveAndClose}
            >SAVE
            </button>
          </div>
        )}
      </div>

    );
  }

  DropdownOld() {
    const { props, state } = this;
    const { days, newTime, daysHeight } = state;
    const activeDays = this.getActiveDays();
    const focusedDay = state.focusedDay || activeDays[0] || 'sunday';
    const focusedTimeline = days[focusedDay];
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
    return (
      <div className="input-support-dropdown">
        <div
          className="input-support-content"
        >
          <div
            className="input-support-content-days"
            ref={(e) => {
              if (e && !this.days) {
                this.days = e;
                this.setState({
                  daysHeight: $(e).outerHeight(),
                });
              }
            }}
          >
            {Object.keys(days).map((day) => {
              const isActive = activeDays.indexOf(day) > -1;
              return (
                <div
                  className={`btn btn-default __pill thin bordered no-shadow${focusedDay === day ? ' focused' : ''}${isActive ? ' active' : ''}`}
                  onClick={() => {
                    this.setState({
                      focusedDay: day,
                      newTime: this.defaultState.newTime,
                    });
                  }}
                >{day}
                </div>
              );
            })}

          </div>

          <div
            className="input-support-content-time"
            style={{
              maxHeight: daysHeight ? `${daysHeight}px` : '',
            }}
          >

            {focusedTimeline.map((timeRange, index) => {
              const { start, end } = timeRange;
              return (
                <span className="time-item">
                  <span>
                    {doubNumb(start.hour)}:{doubNumb(start.minute)} {start.period} - {doubNumb(end.hour)}:{doubNumb(end.minute)} {end.period}
                  </span>
                  {!props.readOnly && (
                    <span
                      className="icon icon-cross"
                      onClick={() => {
                        this.removeDayTime(index);
                      }}
                    />
                  )}
                </span>
              );
            })}

            {!props.readOnly && (
              <div className="new-time-item">
                <div className={`content ${newTime.error ? 'error' : ''}`}>
                  <div>
                    <input
                      placeholder="hh"
                      value={newTime.startHour}
                      onChange={({ target: { value } }) => {
                        // alert(`the change: ${value}`);
                        this.updateNewTime({ startHour: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ startHour: normalizeTime(newTime.startHour, 1, 12) });
                      }}
                    />
                    {' : '}
                    <input
                      placeholder="mm"
                      value={newTime.startMinute}
                      onChange={({ target: { value } }) => {
                        this.updateNewTime({ startMinute: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ startMinute: normalizeTime(newTime.startMinute) });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-neutal thin period no-shadow bordered"
                      onClick={() => {
                        this.updateNewTime({ startPeriod: newTime.startPeriod === 'AM' ? 'PM' : 'AM' });
                      }}
                    >{newTime.startPeriod}
                    </button>
                  </div>
                  <span className="divider">To</span>
                  <div>
                    <input
                      placeholder="hh"
                      value={newTime.endHour}
                      onChange={({ target: { value } }) => {
                        this.updateNewTime({ endHour: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ endHour: normalizeTime(newTime.endHour, 1, 12) });
                      }}
                    />
                    {' : '}
                    <input
                      placeholder="mm"
                      value={newTime.endMinute}
                      onChange={({ target: { value } }) => {
                        this.updateNewTime({ endMinute: value });
                      }}
                      maxLength={2}
                      onBlur={() => {
                        this.updateNewTime({ endMinute: normalizeTime(newTime.endMinute) });
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-neutal thin period no-shadow bordered"
                      onClick={() => {
                        this.updateNewTime({ endPeriod: newTime.endPeriod === 'AM' ? 'PM' : 'AM' });
                      }}
                    >{newTime.endPeriod}
                    </button>
                  </div>
                </div>
                <span className="error-msg">{newTime.error || ''}</span>
                <button
                  type="button"
                  className="btn btn-default thin add-time-action no-shadow bordered"
                  onClick={this.saveNewTime}
                >
                  Save Time
                </button>
              </div>
            )}
          </div>
        </div>

        {!props.readOnly && (
          <div className="input-support-actions">
            <button
              type="button"
              className="no-shadow bordered __pill btn btn-neutral"
              onClick={this.reset}
            >RESET
            </button>
            <button
              type="button"
              className="no-shadow bordered __pill btn btn-default"
              onClick={this.saveAndClose}
            >SAVE
            </button>
          </div>
        )}
      </div>

    );
  }

  render() {
    const { props, state } = this;
    const {
      isAvailable, type,
    } = state;
    const { showActive } = props;
    const controller = (
      <button
        type="button"
        className={`input-support-cntrl${showActive && isAvailable ? ' active' : ''}`}
      > {type}
      </button>
    );

    return (
      <div
        className={`input-support ${props.inline ? 'inline' : ''}`}
        readOnly={!!props.readOnly}
        ref={(e) => {
          this.inputSupport = e;
        }}
      >
        {props.inline
          ? <this.Dropdown />
          : (
            <Dropdown
              onLoad={(e) => {
                console.log('dropdown', e);
                // alert('dropdown ready');
                if (e && !this.dropdown) {
                  this.dropdown = e;
                }
              }}
              controller={props.controller ? props.controller : controller}
              content={<this.Dropdown />}
              onClose={() => {
                this.save();
                this.props.onCancel();
              }}
            />
          )}
      </div>
    );
  }
}

InputSupport.propTypes = {
  readOnly: PropTypes.BOOLEAN,
  showActive: PropTypes.BOOLEAN,
  inline: PropTypes.BOOLEAN,
};

InputSupport.defaultProps = {
  readOnly: false,
  showActive: true,
  inline: false,
  onCancel: () => { },
};

export default InputSupport;
