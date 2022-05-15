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

class InputWeekDays extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
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
      /// ////////////////////////////////
      newTime: {
        startHour: '12',
        startMinute: '00',
        startPeriod: 'AM',
        error: false,
      },
    };

    const days = {
      ...this.defaultState.days,
      ...props.values,
    };
    this.state = {
      ...this.defaultState,
      days: {
        sunday: days.sunday || [],
        monday: days.monday || [],
        tuesday: days.tuesday || [],
        wednesday: days.wednesday || [],
        thursday: days.thursday || [],
        friday: days.friday || [],
        saturday: days.saturday || [],
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
    this.inputWeekDays = null;
    this.updateNewTime = this.updateNewTime.bind(this);
    this.saveNewTime = this.saveNewTime.bind(this);
    this.removeDayTime = this.removeDayTime.bind(this);
    this.Dropdown = this.Dropdown.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.saveAndClose = this.saveAndClose.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
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
    const {
      days, newTime,
    } = state;
    const focusedDay = state.focusedDay || activeDays[0] || 'sunday';
    const {
      startHour, startMinute, startPeriod,
    } = newTime;

    this.setState({
      days: {
        ...days,
        ...(props.values || {}),
        [focusedDay]: [{
          time: {
            hour: startHour,
            minute: startMinute,
            period: startPeriod,
          },
        }],
      },
    }, () => {
      const { state: State } = this;
      this.props.onChange({
        days: State.days,
      });
    });
  }

  isAvailable() {
    const { days } = this.state;

    for (const key in days) {
      console.log('the key is : ', key);
      if (days[key].length > 0) {
        return true;
      }
    }

    return false;
  }

  getActiveDays() {
    const { props, state } = this;
    const { days: stateDays } = this.state;
    const days = {
      ...stateDays,
      ...(props.values || {}),
    };

    const activeDays = [];
    Object.keys(days).forEach((day) => {
      const timeLine = days[day];
      if (timeLine.length > 0) {
        activeDays.push(day);
      }
    });

    return activeDays;
  }

  removeDayTime() {
    const { props, state } = this;
    let { days } = state;
    const activeDays = this.getActiveDays();
    const focusedDay = state.focusedDay || activeDays[0] || 'sunday';

    days = {
      ...days,
      ...(props.values || {}),
      [focusedDay]: [],
    };
    this.setState({
      isAvailable: this.isAvailable(),
      days,
      focusedDay,
    }, () => {
      this.props.onChange({
        type: state.type,
        isAvailable: state.isAvailable,
        days,
      });
    });
  }

  reset() {
    this.setState(this.defaultState);
  }

  save() {
    const { state, props } = this;
    this.setState({ focusedDay: false });
    this.props.onChange({
      type: state.type,
      isAvailable: state.isAvailable,
      days: {
        ...state.days,
        ...(props.values || {}),
      },
    });
  }

  saveAndClose() {
    this.save();
    // alert('wana close');
    this.dropdown.hideDropdown();
  }

  Dropdown() {
    const { props, state } = this;
    const { days: stateDays, newTime, daysHeight } = state;
    const days = {
      ...stateDays,
      ...(props.values || {}),
    };
    const activeDays = this.getActiveDays(days);
    const focusedDay = state.focusedDay || activeDays[0] || 'sunday';
    const focusedTimeline = days[focusedDay];
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
                  className={`btn btn-default __pill thin bordered no-shadow${focusedDay === day ? ' focused' : ''}${isActive ? ' activee' : ''}`}
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
            {focusedTimeline.map((Time) => (
              Time.time && (
                <span className="time-item">
                  <span>
                    {doubNumb(Time.time.hour)}:{doubNumb(Time.time.minute)} {Time.time.period}
                  </span>
                  {!props.readOnly && (
                    <span
                      className="icon icon-cross"
                      onClick={() => {
                        this.removeDayTime();
                      }}
                    />
                  )}
                </span>
              )

            ))}
            {!props.readOnly && (props.maxTime === -1 || focusedTimeline.length < props.maxTime) && (
              <div className="new-time-item">
                <div className={`content ${newTime.error ? 'error' : ''}`}>
                  <p className="row-label">Start Time</p>
                  <div className="row">
                    <input
                      placeholder="hh"
                      value={newTime.startHour}
                      onChange={({ target: { value } }) => {
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

                  {/* <p className="row-label">Duration</p>
                <InputDuration
                  label=""
                  className="thin"
                  onChange={(value) => {
                    this.updateNewTime({ duration: value });
                  }}
                />
 */}
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

    const controller = (
      <button
        type="button"
        className={`btn btn-default no-shadow thin __pill bordered input-support-cntrl${isAvailable ? ' active' : ''}`}
      > {props.label}
      </button>
    );

    return (
      <div
        className="input-support"
        tabIndex={0}
        readOnly={!!props.readOnly}
        ref={(e) => {
          if (e) {
            this.inputWeekDays = e;
          }
          props.onLoad(this);
        }}
      >
        <Dropdown
          onLoad={(e) => {
            if (e && !this.dropdown) {
              this.dropdown = e;
            }
          }}
          controller={controller}
          content={<this.Dropdown />}
          onClose={this.save}
        />
      </div>
    );
  }
}

InputWeekDays.propTypes = {
  readOnly: PropTypes.BOOLEAN,
};

InputWeekDays.defaultProps = {
  readOnly: false,
  days: {},
  maxTime: -1,
  label: 'select week days',
  onChange: () => {

  },
  onLoad: () => {

  },
};


export default InputWeekDays;
