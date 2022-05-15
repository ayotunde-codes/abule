/* eslint-disable max-len */
import React from 'react';
import $ from 'jquery';
import {
  isEmail, devalueString, isEmpty, stripExcessString, popAlert,
} from './Fn';

const scrollAmount = 60;
class InputPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values || [],
      extras: props.customValues || [],
      newValue: props.selected,
      newValueFocus: false,
      newValueWidth: 0,
      scrollLeft: 0,
      newValueCopy: '',
    };

    this.maxExtras = props.maxExtras;
    this.newValueMaxLen = props.maxLen;
    this.newValueCopy = null;
    this.pickers = null;
    this.inputPickerItems = null;
    this.moveSlideInterval = null;
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.saveNewValue = this.saveNewValue.bind(this);
  }

  onChange(value, morePayLoad = {}, callback = () => { }) {
    const { state, props } = this;
    let values = [
      ...(props.values ? props.values : state.values),
    ];
    const extras = props.customValues || state.extras;

    if (value) {
      const indexOf = values.indexOf(value);
      if (this.props.multichoice) {
        if (indexOf > -1) {
          // remove from values
          values.splice(indexOf, 1);
        } else {
          // add to values
          if (!isNaN(props.maxSelection) && props.maxSelection !== null) {
            if (props.maxSelection === 1) {
              values = [value];
            } else if (values.length < props.maxSelection) {
              values = [...values, value];
            }
          } else {
            values = [...values, value];
          }
        }
      } else {
        values = [value];
      }
    }

    this.setState({
      values,
      extras,
      ...morePayLoad,
    }, () => {
      callback(this.state);
      this.props.onChange(this.state.values, this.state.extras);
    });
  }

  save() {
    const { state, props } = this;

    this.props.onSave(this.state.values, this.state.extras);
  }

  reset() {
    const values = [];
    this.setState({
      values,
    }, () => {
      this.props.onReset(values, values);
    });
  }

  removeExtra(value) {
    const { state, props } = this;
    const extras = props.customValues || state.extras;
    const newExtras = [];

    extras.forEach((extra) => {
      if (extra !== value) {
        newExtras.push(extra);
      }
    });

    this.onChange(false, {
      extras: newExtras,
    });
  }

  saveNewValue() {
    const { props } = this;
    const { newValue, newValueFocus } = this.state;
    const extras = props.customValues || this.state.extras || [];

    // check if option doesn't exist
    let options = props.options.map((option) => option.value || option.label);
    try {
      options = [
        ...options,
        ...extras,
      ];
    } catch (e) {
      console.log(e);
    }
    console.log({ options, newValue });
    if (newValue && !isEmpty(newValue) && extras.length < this.maxExtras && options.indexOf(newValue) === -1) {
      if (props.test) {
        if (props.test(newValue)) {
          if (newValue !== props.myEmail) {
            this.onChange(false, {
              newValue: null,
              newValueWidth: 0,
              newValueFocus: extras.length >= this.maxExtras - 1 ? false : newValueFocus,
              extras: [...extras, newValue],
            });
          } else {

          }
        }
      } else {
        this.onChange(false, {
          newValue: null,
          newValueWidth: 0,
          newValueFocus: extras.length >= this.maxExtras - 1 ? false : newValueFocus,
          extras: [...extras, newValue],
        });
      }
    } else if (newValueFocus) {
      this.setState({
        newValueFocus: false,
      });
    }
  }

  checkClass() {
    const { props } = this;
    const { activeType } = props;

    switch (activeType) {
      case ('black'): return 'checked-black';
      case ('secondary'): return 'checked-secondary';
      case ('checked'): return 'checked';
      case ('empty'): return '';
      default: return 'checked-ring';
    }
  }

  moveSlide(dir) {
    console.log('insede the guy');
    if (this.inputPickerItems) {
      let { scrollLeft } = this.inputPickerItems;
      if (dir === 'left') {
        scrollLeft = this.inputPickerItems.scrollLeft - scrollAmount;
      }
      if (dir === 'right') {
        scrollLeft = this.inputPickerItems.scrollLeft + scrollAmount;
      }
      this.setState({
        scrollLeft: scrollLeft < 0 ? 0 : scrollLeft,
      });
      this.inputPickerItems.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }

  selectOption(option, value) {
    const { props } = this;
    if (!option.disallow) {
      if (option.extraValue) {
        this.removeExtra(value);
      } else if (!props.readOnly) {
        this.onChange(value, {}, (State) => {
          if (option.onSelect) {
            const Values = State.values;
            option.onSelect(Values.indexOf(value) > -1);
          }
        });
      }
    }
  }

  render() {
    const { props } = this;
    const { state } = this;

    const { options } = props; // [{value, label, onSelect}]
    const values = props.values ? props.values : state.values;
    const extras = props.customValues || state.extras;
    const { scrollLeft } = state;
    const fullWidth = this.inputPickerItems ? this.inputPickerItems.scrollWidth : 0;
    const allOptions = [];

    options.forEach((option) => {
      if (!option.disabled) {
        const value = option.value || option.label;
        const checked = values.indexOf(value) > -1;
        allOptions.push({
          ...option,
          checked,
        });
      }
    });

    extras.forEach((value) => {
      allOptions.push({
        extraValue: true,
        value,
        label: value,
        checked: true,
      });
    });

    if (extras.length < this.maxExtras && props.allowExtras) {
      allOptions.push({
        newValue: true,
        value: '12345678910', // <==  imaginary value to affect calculation
      });
    } else {
      // this.newValueCopy = null;
    }

    let optionRows = [allOptions];
    if (props.direction === 'right') {
      optionRows = [[]];
      // rearrange the options into rows
      // first get the total characters in the option
      let totalChar = 0;
      allOptions.forEach((option) => {
        const value = option.value || option.label;
        totalChar += value.length;
      });
      // get the stop length for each row (gotten from the number of rows limit)
      const rowCharLimit = Math.ceil(totalChar / props.rowCount);
      let row = 0;
      let prevRowCount = totalChar;
      let rowCount = 0;
      allOptions.forEach((option) => {
        const valueCount = (option.value || option.label).length;
        // giving it the flexibility to go past the rowCharLimit but no row shall be longer the the row above it
        const lessThanPredecessor = (rowCount + valueCount) < prevRowCount;
        const lessThanLimit = rowCount < rowCharLimit;
        const isLastRow = row === props.rowCount;
        if (optionRows[row] && ((lessThanLimit && lessThanPredecessor) || isLastRow)) {
          rowCount += valueCount;
          optionRows[row].push(option);
        } else {
          row += 1;
          prevRowCount = rowCount;
          rowCount = 0;
          optionRows[row] = [option];
        }
      });
    }
    return (
      <div
        tabIndex={0}
        ref={(e) => {
          if (e && !this.pickers) this.pickers = e;
          props.onLoad(this);
        }}
        id={props.id}
        className={`input-picker ${`direction-${props.direction}`} ${props.className}`}
      >
        {props.label && (
          <p className="input-picker-label">
            <span> {props.label} </span>
            {props.direction === 'right' && (
              <div className="sliders">
                <span
                  className={`icon left icon-arrow-left-2${scrollLeft <= 0 ? ' -in-active' : ''}`}
                  onMouseDown={() => {
                    this.moveSlideInterval = setInterval(() => { this.moveSlide('left'); }, 60);
                  }}
                  onMouseUp={() => {
                    clearInterval(this.moveSlideInterval);
                  }}
                />
                <span
                  // className="icon right icon-arrow-right-3"
                  className={`icon right icon-arrow-right-3${(scrollLeft + scrollAmount) >= fullWidth ? ' -in-active' : ''}`}
                  onMouseDown={() => {
                    this.moveSlideInterval = setInterval(() => { this.moveSlide('right'); }, 60);
                  }}
                  onMouseUp={() => {
                    clearInterval(this.moveSlideInterval);
                  }}
                />
              </div>
            )}
          </p>
        )}

        <div
          className="input-picker-items"
          ref={(e) => {
            if (e && !this.inputPickerItems) {
              this.inputPickerItems = e;
            }
          }}
        >
          {optionRows.map((row) => (
            <div
              className="input-picker-items-row"
            >
              {
                row.map((option, id) => {
                  if (option.newValue) {
                    return (
                      <button
                        type="button"
                        className={`input-picker-item _new${state.newValueFocus ? ' focused' : ''}`}
                        onClick={() => {
                          if (!props.readOnly) {
                            // this.onChange();
                            // if (option.onSelect) option.onSelect(value);
                          }
                        }}
                      >
                        <input
                          className="text"
                          style={{ minWidth: `${state.newValueWidth}px` }}
                          maxLength={this.newValueMaxLen}
                          onFocus={() => {
                            this.setState({
                              newValueFocus: true,
                            });
                          }}
                          onBlur={() => {
                            this.setState({
                              newValueFocus: false,
                            });
                          }}
                          onChange={({ target }) => {
                            const { value } = target;
                            let newValue = stripExcessString(value, ' ');
                            newValue = isEmpty(value) ? '' : newValue;
                            this.setState({
                              newValue,
                              newValueCopy: newValue.replace(/ /g, '-'),
                            }, () => {
                              console.log({ newValue, width: $(this.newValueCopy).innerWidth() });
                              this.setState({
                                newValueWidth: (
                                  1 // <== extra to make it fit well
                                  + parseInt($(target).css('padding-left').split('px')[0], 10)
                                  + parseInt($(target).css('padding-right').split('px')[0], 10)
                                  + $(this.newValueCopy).innerWidth()
                                ),
                              });
                            });
                          }}
                          onKeyDown={({ key }) => {
                            if (key === 'Enter') {
                              this.saveNewValue();
                            }
                          }}
                          placeholder="Add"
                          value={state.newValue || ''}
                        />
                        <span
                          className="new-copy"
                          ref={(e) => {
                            this.newValueCopy = e;
                          }}
                        >{state.newValueCopy}
                        </span>
                        {state.newValue
                          ? <span className="icon-check icon active" onClick={this.saveNewValue} />
                          : <span className="icon-add icon placeholder" />}
                      </button>
                    );
                  }

                  const value = option.value || option.label;
                  return (
                    <div
                      className="input-picker-item-container"
                    >
                      {['radio', 'checkbox'].includes(props.type) && (
                        <input
                          type={props.type}
                          checked={!!option.checked}
                          className=""
                          onClick={() => {
                            this.selectOption(option, value);
                          }}
                        />
                      )}
                      <button
                        type="button"
                        tabIndex={0}
                        key={id}
                        {...(option.props || {})}
                        className={`input-picker-item ${option.className || ''}${option.checked ? ` ${this.checkClass()}` : ''}${option.hideLabelBorder ? ' hide-border' : ''}`}
                        onClick={() => {
                          this.selectOption(option, value);
                        }}
                        data-disallow={option.disallow}
                      >{option.label}
                      </button>
                    </div>
                  );
                })
              }
            </div>
          ))}
        </div>

        {props.controls && (
          <div className="input-picker-actions">
            <button
              type="button"
              className="no-shadow bordered __pill btn btn-neutral"
              onClick={this.reset}
            >RESET
            </button>
            <button
              type="button"
              className="no-shadow bordered __pill btn btn-default"
              onClick={this.save}
            >SAVE
            </button>
          </div>
        )}
      </div>
    );
  }
}

InputPicker.defaultProps = {
  className: '',
  activeType: '',
  direction: 'inline',
  values: false,
  controls: false,
  allowExtras: false,
  options: [],
  maxSelection: null,
  mandatory: false,
  readOnly: false,
  multichoice: true,
  style: {},
  onChange: () => { },
  onLoad: () => { },
  onSave: () => { },
  onReset: () => { },
  selected: null,
  maxLen: 15,
  maxExtras: 3,
  rowCount: 1,
  textTransform: 'capitalize',
  test: false,
  myEmail: '',
};
export default InputPicker;
