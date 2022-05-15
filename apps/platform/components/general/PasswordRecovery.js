import React from 'react';
import {
  Fn,
  InputField,
} from '@abule-common/components';

import { Messages } from '../../public/data/assets';

const {
  isEmpty, isEmail, popAlert,
} = Fn;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      emailErrorServer: false,
      submitting: false,
      resent: 0,
      timer: {
        minutes: 0,
        seconds: 59,
      },
    };

    this._isMounted = false;
    this.timerHandler = null;
    this.startTimerCount = this.startTimerCount.bind(this);
    this.timerCount = this.timerCount.bind(this);
    this.sendToken = this.sendToken.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  startTimerCount() {
    this.setState(() => ({
      timer: {
        minutes: 4,
        seconds: 59,
      },
    }));
    this.timerHandler = setInterval(this.timerCount, 1000);
  }

  timerCount() {
    const { state } = this;
    let seconds = state.timer.seconds - 1;
    let { minutes } = state.timer;

    if (seconds === 0) {
      seconds = 59;
      minutes -= 1;
      if (minutes === -1) clearInterval(this.timerHandler);
    }

    this.setState(() => ({
      timer: {
        minutes,
        seconds,
      },
    }));
  }

  sendToken() {
    const { state, props } = this;

    if (!state.submitting) {
      const { email } = state;

      const validate = () => {
        let isValid = true;
        const errors = {};

        if (!isEmail(email)) {
          isValid = false;
          errors.emailError = 'invalid email';
        }

        this.setState(errors);
        return isValid;
      };

      if (validate()) {
        console.log('says we valide and the props is : ', props);
        this.setState({ submitting: true });
        props.FetchRequest({
          url: `${process.env.REACT_APP_API}/forgotPassword`,
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (this._isMounted) {
            // const { data } = res.data;
            popAlert({
              title: 'Password Recovery',
              description: (
                <>
                  A link to reset your password was sent to <b>{email}</b>
                </>
              ),
            });
            this.setState({ submitting: false, resent: state.resent + 1 });
            this.startTimerCount();
          }
        }).catch((erroRes) => {
          const error = erroRes.response.data;
          if (this._isMounted) {
            const errors = {
              submitting: false,
            };
            console.log('REAL WEID ERRO', error);

            if (error.status === 404) {
              errors.emailError = 'not attached to any account';
            } else {
              popAlert({
                title: Messages.requests.serverError.title,
                description: Messages.requests.serverError.message,
                error: true,
              });
            }

            this.setState(errors);
          }
        });
      }
    }
  }

  render() {
    const { props, state } = this;
    const { seconds } = state.timer;
    const { minutes } = state.timer;
    let allowSendToken = false;
    let timer = '';
    if (state.resent > 0) {
      if (minutes === -1) {
        allowSendToken = true;
      } else {
        const secondsArr = `${seconds}`.split('');
        if (!secondsArr[1]) {
          secondsArr.unshift(0);
        }

        timer = <span className="timer">{minutes} : {secondsArr.join(' ')}</span>;
      }
    } else {
      allowSendToken = true;
    }

    return (
      <div className="form forgot-password ">
        <div className="fields">
          <div className="form-content">
            <InputField
              type="text"
              label={(
                <>
                  Email Address {state.emailError ? <span className="error"> : {state.emailError}</span> : ''}
                </>
              )}
              placeholder="email"
              value={state.email}
              className={`input ${state.emailError !== false ? ' error' : ''}`}
              onChange={(value) => {
                this.setState({
                  email: value,
                  emailError: isEmail(value) ? false : state.emailError,
                });
              }}
              onEnterKey={() => {
                if (allowSendToken) this.sendToken();
              }}
            />
          </div>

          <button
            type="button"
            className={`btn btn-1 proceed-btn${state.submitting || !allowSendToken ? ' disabled' : ''}`}
            onClick={() => {
              if (allowSendToken) this.sendToken();
            }}
          >
            <span> {state.resent > 0 ? 'Resend' : 'Send'} Email <span className="timer">{timer}</span></span>
            {state.submitting ? <span className="icon-refresh icon spinner" /> : ''}
          </button>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
