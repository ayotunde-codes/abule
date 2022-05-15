/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  Fn,
  InputField,
} from '@abule-common/components';

import SocialLogin from '../auth/SocialLogin';
import { setInfo } from '../../redux/settings/action';
import { Messages } from '../../public/data/assets';
import Fragment from './Fragment';

const {
  isEmpty, isEmail, popAlert,
} = Fn;

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailError: false,
      password: '',
      passwordError: false,
      formError: false,
      submitting: false,
      socialLogin: false,
    };

    this._isMounted = false;
    this.onEnterKey = this.onEnterKey.bind(this);
    this.form = this.form.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    const {
      'alert-status': alertStatus,
      'alert-title': alertTitle,
      'alert-message': alertMessage,
    } = Router.query;

    console.log({ alertStatus, alertMessage, query: Router.query });
    if (alertStatus || alertMessage || alertTitle) {
      popAlert({
        description: (
          <>
            <lottie-player
              autoplay
              // controls
              loop={alertStatus !== 'success'}
              mode="normal"
              src={alertStatus === 'success' ? 'https://assets3.lottiefiles.com/packages/lf20_y2hxPc.json' : 'https://assets8.lottiefiles.com/private_files/lf30_glnkkfua.json'}
              style={{
                width: '100%',
                maxWidth: '15em',
                margin: ' 0 auto',
              }}
            />
            <div style={{
              fontSize: '1.5em',
              marginBottom: '1.5em',
            }}
            >
              {alertMessage}
            </div>
          </>
        ),
        error: alertStatus === 'error',
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onEnterKey() {
    this.submitLogin();
  }

  submitLogin() {
    const { state, props } = this;

    if (!state.submitting && !state.socialLogin) {
      const { email, password } = state;

      const validate = () => {
        let isValid = true;
        const errors = {};

        if (!isEmail(email)) {
          isValid = false;
          errors.emailError = 'invalid email';
        } else errors.emailError = false;

        if (password.length < 6) {
          isValid = false;
          errors.passwordError = 'incorrect password';
        } else errors.passwordError = false;

        this.setState({ ...errors, formError: isValid ? false : state.formError });
        return isValid;
      };

      if (validate()) {
        console.log('says we valide and the props is : ', props);
        this.setState({ submitting: true });
        props.FetchRequest({
          url: `${process.env.REACT_APP_API}/auth/users/signin`,
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
            // authType: 'local',
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => {
            if (this._isMounted) {
              const { data } = res.data;

              localStorage.setItem('sessionUserToken', data.token);
              localStorage.setItem('sessionUserProfileId', data.id);
              props.setSessionUser({
                ...data,
              });
              window.heap.identify(data.userId);

              this.setState({ submitting: false });
              props.sessionStarted();

              if (data.isModified) {
                // Router.push('/');
              } else {
                Router.push(`${props.AppUrl}/onboarding`);
              }

              if (props.isPage) {
                Router.push(`${props.AppUrl}/`);
              } else {
                props.closeLogin();
              }
            }
          })
          .catch((erroRes) => {
            console.log('REAL WEID ERRO', erroRes);
            const error = erroRes.response.data;
            if (this._isMounted) {
              const errors = {
                submitting: false,
              };

              if (error.status === 400 || error.message === 'Invalid Credentials') {
                errors.emailError = '';
                errors.passwordError = '';
                errors.formError = 'Email or password incorrect';
              } else if (error.status === 401) {
                popAlert({
                  title: Messages.requests.userNotVerified.title,
                  description: Messages.requests.userNotVerified.message,
                  error: true,
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
    const { isPage } = props;
    return (
      <div
        className={`auth-form${isPage ? ' is-page' : ''}`}
        onClick={() => {
          if (!isPage) {
            props.closeLogin();
          }
        }}
      >
        <div className="content">
          <div className="form">
            <div
              className="fields"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="switch-action">
                Don’t have an account?{' '}
                <Link href={`${props.AppUrl}/signup`}>
                  <a
                    className="link"
                    onClick={(e) => {
                      if (!isPage) {
                        e.preventDefault();
                        props.showSignUp();
                      }
                    }}
                  >Sign Up
                  </a>
                </Link>
              </div>

              <SocialLogin
                {...props}
                onProcessing={() => {
                  this.setState({ socialLogin: true });
                }}
                onFinish={() => {
                  this.setState({ socialLogin: false });
                  if (!isPage) {
                    props.closeLogin();
                  }
                }}
              />

              <p className="or-divider">or</p>

              {state.formError ? <div className="error-jumbotrun">{state.formError}</div> : ''}

              <InputField
                type="text"
                label={(
                  <>
                    Email Address{' '}
                    {state.emailError ? <span className="error"> : {state.emailError}</span> : ''}
                  </>
                )}
                placeholder="email"
                value={state.email}
                className={`${state.emailError !== false ? ' error' : ''}`}
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
                    Password{' '}
                    {state.passwordError ? <span className="error"> : {state.passwordError}</span> : ''}
                  </>
                )}
                rightIcon={<span className="icon icon-finger-print" />}
                placeholder="password"
                value={state.password}
                className={`${state.passwordError !== false ? ' error' : ''}`}
                onEnterKey={this.onEnterKey}
                onChange={(value) => {
                  this.setState({
                    password: value,
                    passwordError: value.length >= 6 ? false : state.passwordError,
                  });
                }}
              />

              <p className="lower-msg">
                <Link href={`${props.AppUrl}/password-recovery`}>
                  <a className="link">Forgot password? </a>
                </Link>
              </p>
              <button
                type="button"
                className={`btn btn-1 proceed-btn${state.submitting || state.socialLogin ? ' disabled' : ''
                  }`}
                onClick={this.submitLogin}
              >
                <span> LOG IN </span>
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
            props.closeLogin();
          }}
        >{this.form()}
        </Fragment>
      )
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSessionUser: (user) => dispatch(setInfo({ sessionUser: user })),
});
export default connect(null, mapDispatchToProps)(LogIn);
