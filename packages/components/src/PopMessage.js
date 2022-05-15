import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import SweetAlert from 'react-bootstrap-sweetalert';

class PopMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reveal: true,
      showLoader: false,
      showCancelLoader: false,
    };

    this.inputTime = null;
    this.hide = this.hide.bind(this);
    this.hideLoader = this.hideLoader.bind(this);
    this.hideCancelLoader = this.hideCancelLoader.bind(this);
  }

  hide() {
    this.setState({ reveal: false });
    this.props.onCancel();
  }

  hideLoader() {
    this.setState({
      showLoader: false,
    });
  }

  hideCancelLoader() {
    this.setState({
      showCancelLoader: false,
    });
  }

  render() {
    const { props } = this;
    const { state } = this;
    const reveal = props.show === null ? state.reveal : props.show;

    let {
      confirmButton, cancelButton, title, message,
    } = props;
    confirmButton = {
      label: 'CONTINUE',
      show: true,
      onClick: () => { },
      className: '',
      ...confirmButton,
    };
    cancelButton = {
      label: 'CANCEL',
      show: false,
      onClick: (closer) => { closer(); },
      className: '',
      ...cancelButton,
    };

    return (
      <div
        className="hmv-pop-message"
        ref={(e) => { this.inputTime = e; }}
        style={props.mainStyle}
      >
        <SweetAlert
          show={reveal}
          showConfirm={false}
          customClass={`hmv-pop-message-pop-up ${props.rootClassName}`}
          class="hmv-pop-message"
          style={{
            overflow: '',
            padding: '',
            borderRadius: '',
            width: '',
            backgroundColor: '',
            zIndex: '',
            maxWidth: '',
            display: '',
            outline: '',
            margin: '',
            textAlign: '',
            position: '',
            flexDirection: '',
            justifyContent: '',
            ...props.style,
          }}
          onCancel={this.hide}
          openAnim={false}
        >
          <div id={props.id} className="hmv-pop-message-content">
            {!props.hideCloseIcon && (
              <span
                className="hmv-pop-message-closer icon-cross"
                onClick={() => { this.hide(); }}
              />
            )}

            {props.title && <h2 className="hmv-pop-message-title">{props.title}</h2>}
            {props.message}

            {(confirmButton.show || cancelButton.show) && (
              <div className="hmv-pop-message-actions">
                <button
                  type="button"
                  className={`hmv-pop-message-action ${confirmButton.className || 'btn btn-1'}`}
                  style={{ display: confirmButton.show ? null : 'none' }}
                  onClick={(e) => {
                    if (!state.showCancelLoader && !state.showLoader) {
                      this.setState({
                        showLoader: true,
                      });
                      confirmButton.onClick(() => {
                        this.hideLoader();
                        this.hide();
                      }, this.hideLoader);
                    }
                  }}
                > {confirmButton.label} {state.showLoader && <span className="hmv-pop-message-action-loader icon-refresh spinner" />}
                </button>

                <button
                  type="button"
                  style={{ display: cancelButton.show ? null : 'none' }}
                  className={`hmv-pop-message-action ${cancelButton.className || 'btn btn-glass bordered no-shadow'}`}
                  onClick={(e) => {
                    if (!state.showCancelLoader && !state.showLoader) {
                      this.setState({
                        showCancelLoader: true,
                      });
                      cancelButton.onClick(() => {
                        this.hideCancelLoader();
                        this.hide();
                      }, this.hideCancelLoader);
                    }
                  }}
                > {cancelButton.label} {state.showCancelLoader && <span className="hmv-pop-message-action-loader icon-refresh spinner" />}
                </button>
              </div>
            )}
            {props.footer && (
              <div className="hmv-pop-message-footer">
                {props.footer}
              </div>
            )}
          </div>
        </SweetAlert>
      </div>
    );
  }
}

PopMessage.defaultProps = {
  className: '',
  rootClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  hideCloseIcon: false,
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

export default PopMessage;
