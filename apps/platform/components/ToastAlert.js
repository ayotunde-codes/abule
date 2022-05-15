import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { connect } from 'react-redux';
import { hideToastAlert, set } from '../redux/toast-alert/action';

const defaultState = {
  show: false,
  showLoader: false,
  showCancelLoader: false,
  contentInserted: false,
};
class ToastAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.toastAlert = null;
    this.timeOut = null;
    this.oldStamp = null;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const { props } = this;
    const { state } = this;

    const { toastAlert } = props;
    const { contentInserted } = state;
    const { content, stamp } = toastAlert;
    const animation = toastAlert.animation || 500;
    const timeout = toastAlert.timeout || 3000;

    if (content && contentInserted && stamp.getTime() !== this.oldStamp) {
      this.oldStamp = stamp.getTime();
      const height = $(this.toastAlert).outerHeight();
      const left = `calc(calc(100vw - ${$(this.toastAlert).outerWidth()}px) / 2)`;
      $(this.toastAlert).css({
        top: `-${height}px`,
        left,
      });

      const toastAlertTimeout = (timeStamp) => {
        if (this.timeOut) clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() => {
          if (stamp.getTime() === timeStamp.getTime()) {
            $(this.toastAlert).animate({ top: `-${height + 1}px` }, {
              duration: animation,
              complete: () => {
                props.hideToastAlert();
                clearTimeout(this.timeOut);
                this.timeOut = null;
                this.setState(defaultState);
              },
            });
          }
        }, timeout);
      };

      $(this.toastAlert).animate({ top: 0 }, {
        duration: animation,
        complete: () => {
          toastAlertTimeout(stamp);
        },
      });
    }

    return (
      <div
        className="hmv-toast-alert"
        ref={(e) => {
          if (e && !this.toastAlert) {
            this.toastAlert = e;
            this.setState({
              show: !!state.show,
            });
          }
        }}
      >
        <div
          className="hmv-toast-alert-content"
          ref={(e) => {
            if (e && content && !contentInserted) {
              this.setState({
                contentInserted: true,
              });
            }
          }}
        >

          {content}
        </div>
      </div>
    );
  }
}

ToastAlert.defaultProps = {
  className: '',
  globalClassName: '',
  value: undefined,
  options: [],
  mandatory: false,
  disabled: false,
  readOnly: false,
  style: {},
  onCancel: () => { },
  onChange: () => { },
  onKeyDown: () => { },
};
const mapStateToProps = (state) => ({
  toastAlert: state.toastAlert,
});
const mapDispatchToProps = (dispatch) => ({
  hideToastAlert: () => dispatch(hideToastAlert()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ToastAlert);
