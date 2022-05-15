import React from 'react';
import InputField from './InputField';

const defaultState = {
  show: false,
  showLoader: false,
  showCancelLoader: false,
  contentInserted: false,
};
class InputSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      min: props.min || 0,
      max: props.max || 100,
      start: props.min || 0,
      end: props.max || 100,
      startLabel: props.min || 0,
      endLabel: props.max || 100,
    };

    this.timeOut = null;
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange({ start, end }) {
    const { state, props } = this;
    if (!props.readOnly) {
      let hook = null;
      if (!start) {
        start = state.start;
        if (props.values) {
          start = props.values.start ? props.values.start : start;
        }
      } else {
        hook = 'start';
      }
      if (!end) {
        end = state.end;
        if (props.values) {
          end = props.values.end ? props.values.end : end;
        }
      } else {
        hook = 'end';
      }

      start = Number(start);
      end = Number(end);

      if (hook === 'start' && start > end) {
        start = end;
      }
      if (hook === 'end' && end < start) {
        end = start;
      }

      this.setState({
        start,
        startLabel: start,
        end,
        endLabel: end,
      });

      props.onChange({ start, end });
    }
  }

  render() {
    const { props } = this;
    const { state } = this;
    let { start } = state;
    let { end } = state;
    if (props.values) {
      start = props.values.start ? props.values.start : start;
      end = props.values.end ? props.values.end : end;
    }
    const min = props.min ? props.min : state.min;
    const max = props.max ? props.max : state.max;

    return (
      <div className="input-slider">
        <div className="sliders">

          <div className="start">
            <input
              type="range"
              min={min}
              max={max}
              value={start}
              className="slider"
              onChange={(e) => {
                this.onChange({
                  start: e.target.value,
                });
              }}
            />
          </div>
          {!props.hideMax && (
            <div className="end">
              <input
                type="range"
                min={min}
                max={max}
                value={end}
                className="slider "
                onChange={(e) => {
                  this.onChange({
                    end: e.target.value,
                  });
                }}
              />
            </div>
          )}
        </div>

        <div className="preview">
          <InputField
            // type="number"
            label={props.minPreviewLabel}
            value={start}
            onChange={(value) => {
              if (!props.readOnly) {
                this.setState({
                  startLabel: value,
                });

                this.onChange({
                  start: !isNaN(value) ? value : '',
                });
              }
            }}
            onBlur={() => {
              if (state.startLabel === '') {
                this.setState({
                  startLabel: start,
                });
              }
            }}
          />
          {!props.hideMax && (
            <InputField
              // type="number"
              label={props.maxPreviewLabel}
              value={end}
              onChange={(value) => {
                if (!props.readOnly) {
                  this.setState({
                    endLabel: value,
                  });

                  this.onChange({
                    end: !isNaN(value) ? value : '',
                  });
                }
              }}
              onBlur={() => {
                if (state.endLabel === '') {
                  this.setState({
                    endLabel: end,
                  });
                }
              }}
            />
          )}
        </div>
        {/* <div aria-hidden="true" style={{ marginTop: '5em' }}>
          <div className="_ztxgz4">
            <div className="_14j14ohv" />
            <div className="_ejkfvn">
              <button
                type="button"
                className="_x6yte0v"
                aria-valuemax="49"
                aria-valuemin="1"
                aria-valuenow="5"
                aria-disabled="false"
                data-handle-key="0"
                role="slider"
                tabIndex="0"
                theme="[object Object]"
                aria-valuetext="$5 USD"
                aria-label="Minimum Price"
                style={{
                  left: '19%',
                  position: 'absolute',
                }}
              >
                <div className="_194svrk" />
                <div className="_194svrk" />
                <div className="_194svrk" />
              </button>
              <button
                type="button"
                className="_x6yte0v"
                aria-valuemax="100"
                aria-valuemin="5"
                aria-valuenow="49"
                aria-disabled="false"
                data-handle-key="1"
                role="slider"
                tabIndex="0"
                theme="[object Object]"
                aria-valuetext="$49 USD"
                aria-label="Maximum Price"
                draggable
                style={{
                  left: '69.4917%',
                  position: 'absolute',
                }}
                onDragStart={(e) => {
                  console.log('on drag start eveny', { screenX: e.screenX, screenY: e.screenY });
                }}
                onDrag={(e) => {
                  console.log('on drag ', { screenX: e.screenX, screenY: e.screenY });
                }}
              >
                <div className="_194svrk" />
                <div className="_194svrk" />
                <div className="_194svrk" />
              </button>
            </div>
            <div
              className="_3ck9kxg"
              style={{
                left: '19%',
                width: '50.4917%',
              }}
            />
          </div>
        </div>
 */}
      </div>
    );
  }
}

InputSlider.defaultProps = {
  className: '',
  globalClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  hideMax: false,
  readOnly: false,
  style: {},
  onCancel: () => { },
  onChange: () => { },
  onKeyDown: () => { },
  minPreviewLabel: 'start',
  maxPreviewLabel: 'end',
};

export default InputSlider;
