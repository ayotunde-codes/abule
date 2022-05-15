import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {
  Fn,
  InputField,
} from '@abule-common/components';

import SocialLogin from '../auth/SocialLogin';
import { Messages } from '../../public/data/assets';
import Fragment from './Fragment';

const {
  isEmpty, isEmail, popAlert,
} = Fn;

const defaultState = {
  email: '',
  emailError: false,
  password: '',
  passwordError: false,
  emailErrorServer: false,
  submitting: false,
  socialLogin: false,
  termsAndCondition: true,
  termsAndConditionError: false,
  showTerms: false,
  showPrivacy: false,
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultState,
      referral: Router.query.referer,
    };

    this._isMounted = false;
    this.googleSignIn = null;
    this.facebookSignIn = null;

    this.submitLogin = this.submitLogin.bind(this);
    this.onEnterKey = this.onEnterKey.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onEnterKey() {
    this.submitLogin();
  }

  submitLogin(accountType) {
    const { state, props } = this;

    if (!state.submitting && !state.socialLogin) {
      const { email, password, referral } = state;

      const validate = () => {
        let isValid = true;
        const errors = {};

        if (!isEmail(email)) {
          isValid = false;
          errors.emailError = 'invalid email';
        } else errors.emailError = false;

        if (password.length < 6) {
          isValid = false;
          errors.passwordError = 'needs to be at least 6 characters';
        } else errors.passwordError = false;

        if (!state.termsAndCondition) {
          isValid = false;
          errors.termsAndConditionError = true;
        } else errors.termsAndConditionError = false;

        this.setState(errors);
        return isValid;
      };

      if (validate()) {
        const { props } = this;
        console.log('says we valide and the props is : ', props);
        this.setState({ submitting: true });
        const body = {
          email,
          password,
          authType: 'local',
          accountType,
        };

        if (referral && referral.length) {
          body.referer = this.state.referral;
        }

        props.FetchRequest({
          url: `${process.env.REACT_APP_API}/auth/users/signup`,
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (this._isMounted) {
            // const { data } = res.data;
            this.setState({ ...defaultState });
            popAlert({
              title: 'Sign Up Success',
              description: 'Please check your email to confirm your account.',
            });
            localStorage.removeItem('sessionUserToken');
            localStorage.removeItem('sessionUserProfileId');
          }
        }).catch((erroRes) => {
          console.log('the actual error is : ', erroRes);
          if (this._isMounted) {
            const { data, status } = erroRes.response;
            console.log('AAAAAA', { data, status });
            const { data: error, message } = data;
            const errors = {
              submitting: false,
            };

            if (status === 409) {
              errors.emailError = 'already attached to another account';
              errors.emailErrorServer = true;
            } else if (status === 400) {
              Object.keys(error).forEach((element) => {
                errors[`${element}Error`] = error[element];
              });
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

  form() {
    const { props, state } = this;
    let { isPage, accountType, auth } = props;
    if (auth && auth.signUp.props && auth.signUp.props.accountType) {
      accountType = auth.signUp.props.accountType;
    }
    // if (accountType === 'caregiver') alert('yes you trying to create caregiver account');

    return (
      <div
        className={`auth-form${isPage ? ' is-page' : ''}`}
        onClick={() => {
          if (!isPage) {
            props.closeSignUp();
          }
        }}
      >
        <div className="content">
          <div className="form sign-up">
            <div
              className="fields"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="switch-action">Already have an account?{' '}
                <Link href={`${props.AppUrl}/login`}>
                  <a
                    className="link"
                    onClick={(e) => {
                      if (!isPage) {
                        e.preventDefault();
                        props.showLogin();
                      }
                    }}
                  >Log In
                  </a>
                </Link>
              </div>

              <SocialLogin
                {...props}
                accountType={accountType}
                form="signUp"
                onProcessing={() => {
                  this.setState({ socialLogin: true });
                }}
                onFinish={() => {
                  this.setState({ socialLogin: false });
                  if (!isPage) {
                    props.closeSignUp();
                  }
                }}
              />

              <p className="or-divider">or</p>

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
                onEnterKey={this.onEnterKey}
                onChange={(value) => {
                  this.setState({
                    email: value,
                    emailError: isEmail(value) ? false : state.emailError,
                  });
                }}
              />

              <InputField
                type="password"
                label={(
                  <>
                    Password {state.passwordError ? <span className="error"> : {state.passwordError}</span> : ''}
                  </>
                )}
                placeholder="password"
                value={state.password}
                onEnterKey={this.onEnterKey}
                className={`input ${state.passwordError !== false ? ' error' : ''}`}
                onChange={(value) => {
                  this.setState({
                    password: value,
                    passwordError: value.length >= 6 ? false : state.passwordError,
                  });
                }}
              />

              <p id="termsAndCondition" style={{ color: state.termsAndConditionError ? 'red' : '' }}>
                By clicking Sign up, you agree to our <a className="link" href="/terms" target="_blank">terms</a> and <a className="link" href="/privacy" target="_blank">privacy</a>.
              </p>
              <button
                type="button"
                className={`btn btn-1 proceed-btn${state.submitting || state.socialLogin ? ' disabled' : ''}`}
                onClick={() => {
                  this.submitLogin(accountType);
                }}
              >
                <span> SIGN UP </span>
                {state.submitting ? <span className="icon-refresh icon spinner" /> : ''}
              </button>
            </div>
            <div className="img">
              <img src="/img/happy_family.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { props, state } = this;
    const { settings } = props;
    const { screen } = settings;
    const { device } = screen;

    return (
      screen.width > process.env.MOBILE_BREAKPOINT || props.isPage ? this.form() : (
        <Fragment
          {...props}
          onClose={() => {
            props.closeSignUp();
          }}
        >{this.form()}
        </Fragment>
      )
    );
  }
}

SignUp.defaultProps = {
  accountType: 'parent',
};

export default SignUp;
