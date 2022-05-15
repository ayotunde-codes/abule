import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';


const doubNumb = (value) => `${`${value}`.length < 2 ? `0${value}` : value}`;
const normalizeTime = (val, min = 0, max = 59) => {
  let value = parseInt(val, 10);
  value = isNaN(value) ? 0 : value;
  // eslint-disable-next-line no-nested-ternary
  value = value < min ? min : value > max ? max : value;
  return doubNumb(value);
};

class InputSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this._isMounted = false;
    this.getActiveDays = this.getActiveDays.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  onSelect(value) {
    this.setState({
      value,
    }, () => {
      this.props.onChange(value);
    });
  }

  render() {
    const { props, state } = this;
    const {
      isAvailable, type,
    } = state;
    const Value = props.value !== undefined ? props.value : state.value;

    const { options } = props;
    return (
      <div
        className={`input-select ${props.className}`}
        tabIndex={0}
        ref={(e) => {
          if (e) {
            this.inputWeekDays = e;
          }
          props.onLoad(this);
        }}
      >
        <div className="input-select-list">
          {options.map((option) => {
            const value = option.value !== undefined ? option.value : option.label;
            const active = Value === value ? ' active' : '';
            const disabled = option.disable ? ' disabled' : '';
            return (
              <div
                className={`input-select-item${active}${disabled}`}
                onClick={() => {
                  if (!option.disable) this.onSelect(value);
                }}
              >{option.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

InputSelect.propTypes = {
  readOnly: PropTypes.BOOLEAN,
};

InputSelect.defaultProps = {
  readOnly: false,
  days: {},
  maxTime: -1,
  label: 'select week days',
  onChange: () => {

  },
  onLoad: () => {

  },
};

export default InputSelect
