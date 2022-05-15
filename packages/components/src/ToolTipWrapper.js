import React from 'react';


class ToolTipWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reveal: true,
    };
  }

  render() {
    const { props } = this;
    const { state } = this;
    const reveal = props.showToolTip === null ? state.reveal : props.showToolTip;

    return (
      <div id={props.id} className={`tool-tip-wrapper${props.className}`}>
        {props.children}
        {reveal && (
          <div className="tool-tip">
            <div className="tool-tip-msg">{props.message}</div>
          </div>
        )}
      </div>
    );
  }
}

ToolTipWrapper.defaultProps = {
  className: '',
  globalClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  style: {},
  mainStyle: {},
  confirmButton: {
    label: 'CONTINUE',
    show: true,
    onClick: () => { },
  },
  cancelButton: {
    label: 'CANCEL',
    show: false,
    onClick: (closer) => { closer(); },
  },
  onCancel: () => { },
  onChange: () => { },
  onKeyDown: () => { },
};

export default ToolTipWrapper;
