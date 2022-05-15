import React from 'react';
import { connect } from 'react-redux';
import PasswordRecovery from '../components/general/PasswordRecovery';
import Layout from '../components/general/Layout';

class Auth extends React.Component {
  componentDidMount() {
    const { props } = this;
    props.onPageLoad();
  }

  componentDidUpdate() {
    const { props } = this;
    props.onPageUpdate();
  }

  render() {
    const { props } = this;

    return (
      <Layout {...props}>
        <div id="forgotPassword" className="auth-form is-page">
          <h1 className="content-title">Password Recovery</h1>
          <div className="content">
            <PasswordRecovery
              {...props}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
export default connect(mapStateToProps)(Auth);
