import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppleLogin from 'react-apple-login';
import { Fn } from '@abule-common/components';

const {
  popAlert,
} = Fn;

class AppleSignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
    };

    this.onFinish = this.onFinish.bind(this);
  }

  onFinish(response) {
    // alert('Failed to log in');
    console.log('facebook00000000000000000000000 finifh as', response);
    alert(JSON.stringify(response));
    if (!response.error) {
      const { accessToken } = response;
      this.props.onSignInSuccess(accessToken, response);
    } else {
      let message = false;
      switch (response.error.error) {
        case ('popup_blocked_by_browser'): {
          message = 'Your browser is blocking the pop up';
          break;
        }
        default:
          break;
      }

      if (message) {
        popAlert({
          title: message,
        });
      }
      this.props.onSignInFail(response);
    }
  }

  render() {
    return (
      <button
        type="button"
        className="social-login-btn"
      >
        <AppleLogin
          usePopup
          clientId="io.abule.service"
          redirectURI="https://abule-api-test.herokuapp.com/api/v1/auth/apple"
          callback={this.onFinish}
        />
      </button>
    );
  }
}

AppleSignIn.propTypes = {
  onSignInSuccess: PropTypes.func,
  onSignInFail: PropTypes.func,
  onLoad: PropTypes.func,
};

AppleSignIn.defaultProps = {
  onSignInSuccess: () => { },
  onSignInFail: () => { },
  onLoad: () => { },
};

export default AppleSignIn;
