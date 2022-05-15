import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {
  isEmail, devalueString, isDescendant, getPosition, getCordinates, getCordinates_,
} from './Fn';

/**
  * It allows the user to create System Activity
  * @augments {Component<Props, State>}
  *
*/
class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      showDropdown: false,
      isFocused: false,
    };

    this.dropdown = null;
    this.handler = null;
    this.inputBox = null;
    this.cursorPosition = 0;
    this.focusInput = this.focusInput.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidUpdate() {
    const { props, state } = this;
    console.log('DUDE UPDATED');
    if (props.dropdown && state.isFocused && !state.showDropdown) {
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
        }
      });
    }
  }

  /*  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this;
    console.log({
      state, props: props.value, nextProps: nextProps.value, nextState,
    });

    return nextProps.value ? nextProps.value !== props.value : nextState.value !== state.value;
  } */

  focusInput(value = true) {
    this.setState(() => ({
      isFocused: value,
    }), () => {
      /*  const { props } = this;
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
      } */
    });
  }

  onFocus(e) {
    console.log('oon focussssssssssssssssssssssssssssssssss');
    this.focusInput();
    this.props.onBlur(this.state.value);
  }

  onBlur(e) {
    console.log('oon blurrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    this.focusInput(false);
    this.props.onBlur(this.state.value);
  }

  onChange(e) {
    const { props } = this;
    const { value, selectionStart } = e.target;
    this.cursorPosition = selectionStart;

    this.setState(() => ({ value }), () => {
      if (this.inputBox.selectionStart) {
        this.inputBox.selectionStart = this.cursorPosition;
      }
      props.onChange(value);
    });
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

    const maxLength = props.maxLength && !isNaN(props.maxLength) ? props.maxLength : "";
    let input = '';
    if (props.type === 'select') {
      let defaultValue = null;
      const options = [];
      let Value = null;
      const isPropValue = ([undefined, null].indexOf(props.value) === -1);
      /* option = {

      } */

      props.options.forEach((option, index) => {
        if (option.defaultValue) defaultValue = option.value;
        if (isPropValue && props.value === option.value) Value = props.value;

        options.push(
          <option
            value={option.value}
            key={`${option.value}${index}`}
            disabled={option.disabled}
          >{option.label || devalueString(option.value)}
          </option>,
        );
      });

      if (Value === null) {
        if (defaultValue) {
          Value = defaultValue;
        } else {
          Value = state.value;
        }
      }

      const isPlaceholder = Value === '-placeholder-';

      input = (
        <select
          value={Value}
          disabled={props.disabled}
          readOnly={props.readOnly}
          className={`input-element ${isPlaceholder ? ' placeholder' : ''}`}
          ref={(e) => { if (e && !this.inputBox) this.inputBox = e; }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        >{options}
        </select>
      );
    } else if (props.type === 'textarea') {
      const Value = [undefined, null].indexOf(props.value) === -1 || props.unControlled ? props.value : state.value;
      input = (
        <textarea
          value={Value}
          className={`input-element ${props.className}`}
          disabled={props.disabled}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          maxLength={maxLength}
          type={props.type}
          ref={(e) => { if (e && !this.inputBox) this.inputBox = e; }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      );
    } else {
      const Value = [undefined, null].indexOf(props.value) === -1 || props.unControlled ? props.value : state.value;
      input = (
        <input
          value={Value}
          className={`input-element ${props.className}`}
          disabled={props.disabled}
          readOnly={props.readOnly}
          placeholder={props.placeholder}
          maxLength={maxLength}
          type={props.type}
          ref={(e) => { if (e && !this.inputBox) this.inputBox = e; }}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
      );
    }

    return (
      <div
        id={props.id}
        ref={() => {
          props.onLoad(this);
        }}
        className={`input-field${state.isFocused ? '  focused' : ''} ${props.globalClassName}`}
      >
        {props.label
          && (
            <p className="label">
              <span> {props.label} </span>
            </p>
          )}
        <div className="input">
          {props.leftIcon || ''}
          {input}
          {props.rightIcon && <div className="right-icon">{props.rightIcon}</div>}
        </div>
        {props.dropdown
          && (
            <div
              ref={(e) => {
                if (e && !this.dropdown) this.dropdown = e;
              }}
              style={{
                maxWidth: this.inputBox ? `${$(this.inputBox).outerWidth()}px` : 'auto',
                minWidth: this.inputBox ? `${$(this.inputBox).outerWidth()}px` : 'auto',
                top: this.inputBox ? `${getCordinates_(this.inputBox).top + $(this.inputBox).outerHeight()}px` : 'auto',
              }}
              className={`input-field-dropdown${state.showDropdown ? '' : ' hide'}`}
            >
              {props.dropdown}
            </div>
          )}
      </div>
    );
  }
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  globalClassName: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  mandatory: PropTypes.bool,
  disabled: PropTypes.bool,
  unControlled: PropTypes.bool,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnterKey: PropTypes.func,
  onLoad: PropTypes.func,
  onChange: PropTypes.func,
  dropdown: PropTypes.object,
};

InputField.defaultProps = {
  className: '',
  globalClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  unControlled: false,
  readOnly: false,
  style: {},
  onFocus: () => { },
  onBlur: () => { },
  onEnterKey: () => { },
  onLoad: () => { },
  onChange: () => { },
  onKeyDown: () => { },
  dropdown: null,
  type: 'text',
};

export default InputField
