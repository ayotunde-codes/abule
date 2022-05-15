import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import LogIn from './LogIn';
import SignUp from './SignUp';
import ForgotPassword from './PasswordRecovery';
import SocialLogin from '../auth/SocialLogin';

const socialLoginDefaultProps = {
  onSocialLoginConnecting: false,
  onSocialLoginVerified: false,
  onSocialLoginSignedIn: false,
  onSocialLoginFailed: false,
  socialLoginType: '',
};

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeForm: 'logIn',
      ...socialLoginDefaultProps,
    };
  }

  render() {
    const { props, state } = this;
    const {
      onSocialLoginConnecting,
      onSocialLoginVerified,
      onSocialLoginSignedIn,
      onSocialLoginFailed,
      socialLoginType,
    } = state;
    return (
      <div id="authenticationBlock">
        <div className="content">
          <div className="container-left">
            <div id="authForms" data-form={state.activeForm}>
              <SignUp
                {...props}
                changeForm={(activeForm) => {
                  this.setState({ activeForm });
                }}
                onSocialLoginConnecting={(type) => {
                  this.setState({
                    ...socialLoginDefaultProps,
                    onSocialLoginConnecting: true,
                    socialLoginType: type,
                  });
                }}
                onSocialLoginVerified={(type) => {
                  this.setState({
                    ...socialLoginDefaultProps,
                    onSocialLoginVerified: true,
                    socialLoginType: type,
                  });
                }}
                onSocialLoginSignedIn={(type) => {
                  this.setState({
                    ...socialLoginDefaultProps,
                    onSocialLoginSignedIn: true,
                    socialLoginType: type,
                  });
                }}
                onSocialLoginFailed={(type) => {
                  this.setState({
                    ...socialLoginDefaultProps,
                    onSocialLoginFailed: true,
                    socialLoginType: type,
                  });
                }}
              />
              <LogIn
                {...props}
                changeForm={(activeForm) => {
                  this.setState({ activeForm });
                }}
              />
              <ForgotPassword
                {...props}
                changeForm={(activeForm) => {
                  this.setState({ activeForm });
                }}
              />
            </div>
          </div>

          <div className="container-right">
            <span className="icon-cross closer" />
          </div>
          {(() => {
            if (
              (onSocialLoginConnecting
              || onSocialLoginVerified
              || onSocialLoginFailed)
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
                message = <h5>Connecting you to {socialLoginType}</h5>;
                icon = 'icon-refresh spinner';
              } else {
                closer = (
                  <span
                    className="icon-cross closer"
                    onClick={() => {
                      this.setState(socialLoginDefaultProps);
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  // updateHeader: (props) => dispatch(updateHeader(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
