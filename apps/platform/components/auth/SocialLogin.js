import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Router from 'next/router';
import { Fn } from '@abule-common/components';
import GoogleSignIn from './GoogleSignIn';
import AppleSignIn from './AppleSignIn';
import { setInfo } from '../../redux/settings/action';

const {
  capitalize,
} = Fn;

const socialLoginDefaultProps = {
  onSocialLoginConnecting: false,
  onSocialLoginVerified: false,
  onSocialLoginSignedIn: false,
  onSocialLoginFailed: false,
  socialLoginError: false,
  socialLoginType: '',
};

class SocialLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...socialLoginDefaultProps,
    };

    this._isMounted = false;
    this.onSignInSuccess = this.onSignInSuccess.bind(this);
    // this.onSignInFail = this.onSignInFail.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onSignInSuccess(tokenID, authType) {
    // alert('Failed to log in');
    const { state, props } = this;
    this.socialLoginUpdate({
      onSocialLoginVerified: true,
      socialLoginType: authType,
    });
    const { accountType } = props;

    console.log('says we valide and the props is : ', props);
    props.FetchRequest({
      url: `${process.env.REACT_APP_API}/auth/${authType}`,
      method: 'POST',
      body: JSON.stringify({
        tokenID,
        authType: capitalize(authType),
        accountType,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (this._isMounted) {
        console.log('SUCCESS', res);
        const { data } = res.data;
        localStorage.setItem('sessionUserToken', data.token);
        localStorage.setItem('sessionUserProfileId', (data.id));
        props.setSessionUser({
          ...data,
        });
        props.sessionStarted();

        this.socialLoginUpdate({
          onSocialLoginSignedIn: true,
          socialLoginType: authType,
        });

        if (data.isModified) {
          Router.push(`${props.AppUrl}/`);
        } else {
          Router.push(`${props.AppUrl}/onboarding`);
        }
      }
    }).catch((erroRes) => {
      const { data } = erroRes.response.data;
      console.log('our server login failed', Object.keys(erroRes), data);
      this.socialLoginUpdate({
        onSignInFail: true,
        socialLoginType: authType,
        socialLoginError: data,

      });
    });
  }

  socialLoginUpdate(data) {
    const { props } = this;
    const newProps = {
      ...socialLoginDefaultProps,
      ...data,
    };

    const {
      onSocialLoginFailed,
      onSocialLoginConnecting,
      onSocialLoginVerified,
      onSocialLoginSignedIn,
      socialLoginType,
    } = newProps;

    if ((onSocialLoginConnecting || onSocialLoginVerified || onSocialLoginFailed) && !onSocialLoginSignedIn) {
      props.onProcessing(newProps.socialLoginType);
    } else {
      props.onFinish(newProps.socialLoginType);
    }

    this.setState(newProps);
  }

  render() {
    const { state, props } = this;
    const {
      onSocialLoginFailed,
      onSocialLoginConnecting,
      onSocialLoginVerified,
      onSocialLoginSignedIn,
      socialLoginType,
      socialLoginError,
    } = state;
    return (
      <>
        <button
          id="googleSocialLogin"
          type="button"
          className="btn btn-glass bordered-black social-login"
          onClick={() => {
            console.log('WE VALID and connecting');
            this.socialLoginUpdate({
              onSocialLoginConnecting: true,
              socialLoginType: 'google',
            });
          }}
        ><span className="icon icon-google-color" /> {props.form === 'signUp' ? 'Sign Up' : 'Log In'} with Google
          <GoogleSignIn
            onSignInSuccess={(token) => {
              this.onSignInSuccess(token, 'google');
            }}
            onSignInFail={() => {
              this.socialLoginUpdate({
                onSocialLoginFailed: true,
                socialLoginType: 'google',
              });
            }}
          />
        </button>

        <button
          id="fbSocialLogin"
          type="button"
          className="btn btn-glass bordered-black social-login"
        ><span className="icon icon-apple-bold" /> {props.form === 'signUp' ? 'Sign Up' : 'Log In'} with Apple
          <AppleSignIn
            onSignInSuccess={(token) => {
              this.onSignInSuccess(token, 'apple');
            }}
            onSignInFail={() => {
              this.socialLoginUpdate({
                onSocialLoginFailed: true,
                socialLoginType: 'apple',
              });
            }}
          />
        </button>
        {(() => {
          if (
            (onSocialLoginConnecting
              || onSocialLoginVerified
              || onSocialLoginFailed
              || socialLoginError)
            && !onSocialLoginSignedIn
          ) {
            let message = (
              <>
                <h2>Ooops!</h2>
                <h5>There was an error signing you in with {socialLoginType}</h5>
              </>
            );
            let icon = 'icon-cross-circle error';
            let closer = '';

            if (onSocialLoginVerified || false) {
              message = <h5>Signing you in</h5>;
              icon = 'icon-refresh spinner';
            } else if (onSocialLoginConnecting) {
              icon = 'icon-refresh spinner';
              message = <h5>Connecting you to {socialLoginType}</h5>;
            } else {
              if (socialLoginError) {
                message = <h5>Couldn't create your account because this email isn't allowed</h5>;
              }
              closer = (
                <span
                  className="icon-cross closer"
                  onClick={() => {
                    this.socialLoginUpdate(socialLoginDefaultProps);
                  }}
                />
              );
            }

            return (
              <div id="socialLoginMessage">
                {closer}

                <span className={`icon ${icon}`} />
                <div className="message">{message}</div>
              </div>
            );
          }

          return '';
        })()}
      </>
    );
  }
}

SocialLogin.propTypes = {
  FetchRequest: PropTypes.func.isRequired,
  onProcessing: PropTypes.func,
  onFinish: PropTypes.func,
};

SocialLogin.defaultProps = {
  onProcessing: () => { },
  onFinish: () => { },
};

const mapDispatchToProps = (dispatch) => ({
  setSessionUser: (user) => dispatch(setInfo({ sessionUser: user })),
});
export default connect(null, mapDispatchToProps)(SocialLogin);
