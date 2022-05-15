import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, isElement } from './Fn';

const parseToHTML = (value) => {
  console.log('value to parse is ', value);
  let HTML = '';
  const valueArr = value.split('\n');
  valueArr.forEach((line) => {
    HTML += `<div class="line">${line}</div>`;
  });
  return HTML;
};

/**
  @param label The label of the input
*/
class PostTextView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      isEmpty: false,
      isFilled: false,
    };

    this.heroInput = null;
    this.heroInputField = null;
    this.wasFocused = false;
    this.caretPosition = 0;
    this.getCaretPostion = this.getCaretPostion.bind(this);
    this.setCaretPosition = this.setCaretPosition.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.validateValue = this.validateValue.bind(this);
  }

  onFocus() {
    const { props, state } = this;
    if (!state.isFocused) {
      if (props.multiLine) {
        this.caretPosition = this.getCaretPostion();
      }

      this.setState(() => ({
        isFocused: true,
      }));
      props.onFocus(this.getValue(), this.heroInput);
    } else {
      this.heroInputField.focus();
    }
  }

  onBlur() {
    this.wasFocused = false;

    this.setState(() => ({
      isFocused: false,
      ...this.validateValue(),
    }));
    this.props.onBlur(this.getValue(), this.heroInput);
  }

  onChange() {
    const { props } = this;

    this.wasFocused = true;
    const value = this.getValue();

    if (props.multiLine) {
      this.caretPosition = this.getCaretPostion();
    }
    this.setState(() => ({
      isFocused: false,
      ...this.validateValue(),
    }));

    if (!props.readOnly) {
      props.onChange(value, this.heroInput);
    }
  }

  onKeyDown(event) {
    const { props } = this;
    /* if (!props.multiLine) {
      if (event.keyCode === 13) { // <== on ENTER click
        event.preventDefault();
      }
    } */
    this.props.onKeyDown(event, this.getValue(), this.heroInput);
  }

  onPaste(event) {
    const { props } = this;
    if (props.multiLine) {
      event.preventDefault();
      let content = null;
      if (event.clipboardData) {
        content = (event.originalEvent || event).clipboardData.getData('text/plain'); document.execCommand('insertText', false, content);
      } else if (window.clipboardData) {
        content = window.clipboardData.getData('Text'); document.selection.createRange().pasteHTML(content);
      }
      this.caretPosition = this.getCaretPostion();
    }
  }

  getValue() {
    const { props } = this;
    if (props.multiLine) {
      const value = [];
      const lines = this.heroInputField.children;
      for (let i = 0; i < lines.length; i += 1) {
        // console.log('line value', lines[i].innerText);
        value.push(`${lines[i].innerText === '\n' ? '' : lines[i].innerText}`);
      }
      return value.join('\n');
    }
    return this.heroInputField.value;
  }

  getCaretPostion() {
    let caretOffset = 0;
    const doc = this.heroInputField.ownerDocument || this.heroInputField.document;
    const win = doc.defaultView || doc.parentWindow;
    const sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);

      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(this.heroInputField);

      preCaretRange.setEnd(range.endContainer, range.endOffset);
      let caretLineEl = range.endContainer;
      if (!isElement(caretLineEl)) caretLineEl = caretLineEl.parentNode;
      const caretPosInLineEl = range.endOffset;

      // Now we get caretLineEl index in its parent node list
      let caretLineElIndex = 0;
      for (let i = 0; i < this.heroInputField.children.length; i += 1) {
        if (this.heroInputField.children[i] === caretLineEl) {
          caretLineElIndex = i;
        }
      }

      for (let i = 0; i < this.heroInputField.children.length; i += 1) {
        if (i === caretLineElIndex) {
          caretOffset += caretPosInLineEl;
          break;
        } else {
          caretOffset += this.heroInputField.children[i].innerText.length;
          if (this.heroInputField.children[i].innerText !== '\n') {
            caretOffset += 1;
          }
        }
      }
    }
    return caretOffset;
  }

  setCaretPosition(pos = 0) {
    const range = document.createRange();
    const sel = window.getSelection();
    const getLine = () => {
      const lines = this.heroInputField.children;
      let coveredIndex = 0;
      let lineIndex = 0;
      let caretPos = 0;
      for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const lineLength = line.innerText.length;
        if (lineLength + coveredIndex >= pos) {
          caretPos = (lineLength + coveredIndex) > pos ? (lineLength + coveredIndex) - pos : pos;
          caretPos = pos - coveredIndex;
          lineIndex = i;
          break;
        } else {
          coveredIndex += lineLength + 1; // v== adding 1 for next line (a.k.a "<br>", "\n")
        }
      }

      return {
        line: lines[lineIndex].childNodes[0] || lines[lineIndex],
        pos: caretPos,
      };
    };

    const caret = getLine();
    range.setStart(caret.line, caret.pos);
    // range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  validateValue() {
    const { props } = this;
    const Empty = isEmpty(
      props.multiLine
        ? this.heroInputField.innerText
        : this.heroInputField.value,
    );

    return {
      isEmpty: !this.props.mandatory ? false : Empty,
      isFilled: !Empty,
    };
  }

  render() {
    const { state } = this;
    const { props } = this;

    const isEmptyClass = state.isEmpty ? ' Error' : '';
    const isFocusedClass = state.isFocused || this.wasFocused ? ' focused' : '';
    const mandatoryClass = props.mandatory ? ' mandatory' : '';
    let isFilledClass = state.isFilled ? ' not-empty' : '';
    if (typeof props.value === 'string') {
      isFilledClass = !isEmpty(props.value) ? ' not-empty' : '';
    }

    let extraClasses = '';
    extraClasses += isEmptyClass;
    extraClasses += isFilledClass;
    extraClasses += isFocusedClass;
    extraClasses += mandatoryClass;
    extraClasses += ` ${props.className}`;
    const className = `hero-input form-element${extraClasses}`;

    let inputField = (
      <input
        type={props.type}
        name={props.name}
        readOnly={props.readOnly}
        className="hero-input-field"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onInput={this.onChange}
        onKeyDown={this.onKeyDown}
        ref={(el) => {
          if (el) {
            this.heroInputField = el;
            if (typeof props.value === 'string') {
              this.heroInputField.value = props.value;
            }
          }
        }}
      />
    );

    if (props.multiLine) {
      inputField = (
        <div
          type={props.type}
          name={props.name}
          readOnly={props.readOnly}
          className="hero-input-field"
          contentEditable="true"
          data-multiline={props.multiLine}
          onClick={this.onFocus}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onInput={this.onChange}
          onKeyDown={this.onKeyDown}
          onPaste={this.onPaste}
          ref={(el) => {
            if (el) {
              this.heroInputField = el;
              if (props.value) {
                console.log({ parsetohtml: parseToHTML(props.value) });
                this.heroInputField.innerHTML = parseToHTML(props.value);
                if (this.wasFocused) {
                  // console.log('the value we getting from dude is : ', props.value);
                  const valueLength = props.value.length;
                  // console.log('caret position : ', this.caretPosition, 'value length : ', valueLength);

                  this.setCaretPosition(
                    this.caretPosition > valueLength
                      ? valueLength
                      : this.caretPosition,
                  );
                  this.wasFocused = false;
                }
              } else if (isEmpty(this.getValue())) {
                this.heroInputField.innerHTML = `<div class="taker placeholder">${props.placeholder}</div>`;
              }
            }
          }}
        />
      );
    }

    return (
      <div
        className={className}
        style={props.style}
        ref={(el) => { this.heroInput = el; }}
      >
        {inputField}
      </div>
    );
  }
}

PostTextView.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.any,
  type: PropTypes.string,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  multiLine: PropTypes.bool,
  mandatory: PropTypes.bool,
  style: PropTypes.object,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

PostTextView.defaultProps = {
  className: '',
  value: undefined,
  type: 'text',
  name: '',
  readOnly: false,
  multiLine: true,
  mandatory: false,
  style: {},
  onFocus: () => { },
  onBlur: () => { },
  onChange: () => { },
  onKeyDown: () => { },
};
export default PostTextView;
