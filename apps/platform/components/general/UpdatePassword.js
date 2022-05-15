import React from 'react';
import Router from 'next/router';
import {
  Fn,
  InputField,
} from '@abule-common/components';

const {
  popAlert,
} = Fn;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: Router.query.qlk,
      id: Router.query.xyz,
      newPassword: '',
      newPasswordError: false,
      confirmPassword: '',
      confirmPasswordError: false,
      newPasswordErrorServer: false,
      submitting: false,
    };

    this._isMounted = false;
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  submitLogin() {
    const { state, props } = this;

    if (!state.submitting) {
      const {
        newPassword, confirmPassword, token, id,
      } = state;

      const validate = () => {
        let isValid = true;
        const errors = {};

        if (newPassword.length < 6) {
          isValid = false;
          errors.newPasswordError = 'needs to be at least 6 characters';
        }

        if (confirmPassword !== newPassword) {
          isValid = false;
          errors.confirmPasswordError = 'passwords do not match';
        }

        this.setState(errors);
        return isValid;
      };

      if (validate()) {
        console.log('says we valide and the props is : ', props);
        this.setState({ submitting: true });
        props.FetchRequest({
          url: `${process.env.REACT_APP_API}/resetpassword?xyz=${id}&qlk=${token}`,
          method: 'POST',
          body: JSON.stringify({
            password: newPassword,
            confirmPassword,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (this._isMounted) {
            const { data } = res.data;
            popAlert({ title: 'Password Reset Successfully' });
            this.setState({ submitting: false });
            Router.push(`${props.AppUrl}/login`);
            props.showLogin();
          }
        }).catch((erroRes) => {
          console.log('the actual error is : ', erroRes);
          if (this._isMounted) {
            const { data, status } = erroRes.response;
            console.log('AAAAAA', { data, status });
            const { error, message } = data;
            const errors = {
              submitting: false,
            };

            /*  if (status === 409) {
              errors.newPasswordError = 'already attached to another account';
              errors.newPasswordErrorServer = true;
            } else {
            } */

            this.setState(errors);
          }
        });
      }
    }
  }

  render() {
    const { state } = this;

    return (
      <div className="form forgot-password">
        <div className="fields">
          <div className="form-content">
            <InputField
              type="password"
              label={(
                <>
                  New Password {state.newPasswordError ? <span className="error"> : {state.newPasswordError}</span> : ''}
                </>
              )}
              placeholder="new password"
              value={state.newPassword}
              className={`input${state.newPasswordErrorServer || state.newPasswordError ? ' error' : ''}`}
              onChange={(value) => {
                this.setState({
                  newPassword: value,
                  newPasswordError: value.length >= 6 ? false : state.newPasswordError,
                });
              }}
            />

            <InputField
              type="password"
              label={(
                <>
                  Confirm Password {state.confirmPasswordError ? <span className="error"> : {state.confirmPasswordError}</span> : ''}
                </>
              )}
              placeholder="confirm password"
              value={state.confirmPassword}
              className={`input${state.newPasswordErrorServer || state.confirmPasswordError ? ' error' : ''}`}
              onChange={(value) => {
                this.setState({
                  confirmPassword: value,
                  confirmPasswordError: this.state.newPassword === value ? false : 'passwords do not match',
                });
              }}
            />
          </div>

          <button
            type="button"
            className={`btn btn-1 proceed-btn${state.submitting ? ' disabled' : ''}`}
            onClick={this.submitLogin}
          >
            <span> CONTINUE </span>
            {state.submitting ? <span className="icon-refresh icon spinner" /> : ''}
          </button>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
