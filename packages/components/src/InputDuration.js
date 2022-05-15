import React from 'react';
import PropTypes from 'prop-types';
import { isEmail, isDescendant } from './Fn';

/**
  * It allows the user to create System Activity
  * @augments {Component<Props, State>}
  *
*/
class InputDuration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 15,
    };

    this.dropdown = null;
    this.handler = null;
    this.focusInput = this.focusInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate() {

  }

  focusInput(value = true) {
    this.setState(() => ({
      isFocused: value,
    }));

    const { props } = this;
    if (props.dropdown) {
      this.setState({ showDropdown: true }, () => {
        if (!this.handler) {
          this.handler = (event) => {
            if (!isDescendant(event.target, this.dropdown) && !isDescendant(event.target, this.inputBox)) {
              this.setState({ showDropdown: false });
              window.document.removeEventListener('click', this.handler);
              this.handler = null;
            }
          };

          window.document.addEventListener('click', this.handler);
          // } else {
        }
      });
    }
  }

  onFocus(e) {
    this.focusInput();
  }

  onBlur(e) {
    this.focusInput(false);
  }

  onChange(action) {
    const { state, props } = this;
    const { duration } = state;
    let durtn = props.value || duration;
    if (action === 'decrease') {
      durtn -= 15;
      durtn = durtn < 15 ? 15 : durtn;
    } else {
      durtn += 15;
      const maxDurn = 500
      durtn = durtn > maxDurn ? maxDurn : durtn;
    }

    this.setState(() => ({ duration: durtn }));
    props.onChange(durtn);
  }

  onKeyDown(e) {
    const { props } = this;
    if (e.key === 'Enter') {
      props.onEnterKey();
    }
  }

  render() {
    const { props } = this;
    const { state } = this;

    const Duration = props.value || state.duration;
    let duration = Math.floor(Duration / 60);
    if (duration === 0) {
      duration = `${Duration}mins`;
    } else {
      const mins = Duration % 60;
      duration = `${duration}hr${duration > 1 ? 's' : ''} ${mins > 0 ? `${mins}mins` : ''}`;
    }
    return (
      <div className="duration">
        <span className="">{props.label}</span>
        <div className={`duration-content btn btn-default bordered __pill ${props.className}`}>
          <button
            type="button"
            className="cntrl up fa icon-minus"
            onClick={() => {
              this.onChange('decrease');
            }}
          />
          <span>{duration}</span>
          <button
            type="button"
            className="cntrl up fa icon-add"
            onClick={() => {
              this.onChange('increase');
            }}
          />
        </div>
      </div>
    );
  }
}

InputDuration.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  globalClassName: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnterKey: PropTypes.func,
  onLoad: PropTypes.func,
  onChange: PropTypes.func,
  dropdown: PropTypes.object,
};

InputDuration.defaultProps = {
  label: '',
  className: '',
  globalClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  style: {},
  onFocus: () => { },
  onBlur: () => { },
  onEnterKey: () => { },
  onLoad: () => { },
  onChange: () => { },
  onKeyDown: () => { },
  dropdown: null,
};

export default InputDuration;
