import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class GoogleSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
    };

    this.onSignInSuccess = this.onSignInSuccess.bind(this);
    this.onSignInFail = this.onSignInFail.bind(this);
  }

  onSignInSuccess(response) {
    // alert('Failed to log in');
    console.log('google success as', response);
    const { tokenId } = response;
    this.props.onSignInSuccess(tokenId, response);
  }

  onSignInFail(response) {
    // alert('Failed to log out');
    console.log('google failed as', { ...response });
    if (response.error !== 'idpiframe_initialization_failed') {
      this.props.onSignInFail(response);
    }
  }

  render() {
    return (
      <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={this.onSignInSuccess}
        onFailure={this.onSignInFail}
        // cookiePolicy="single_host_origin"
        // responseType="code,token"
        onAutoLoadFinished={this.props.onLoad}
        className="social-login-btn"
        style={{}}
      />
    );
  }
}

GoogleSignIn.propTypes = {
  onSignInSuccess: PropTypes.func,
  onSignInFail: PropTypes.func,
  onLoad: PropTypes.func,
};

GoogleSignIn.defaultProps = {
  onSignInSuccess: () => {},
  onSignInFail: () => {},
  onLoad: () => {},
};

export default GoogleSignIn;
