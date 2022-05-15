import React from 'react';
import { connect } from 'react-redux';
import UpdatePassword from '../components/general/UpdatePassword';
import Layout from '../components/general/Layout';

class ResetPassword extends React.Component {
  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
    props.onPageLoad();
    const { settings } = props;
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
          <h1 className="content-title">Update Password</h1>
          <div className="content">
            <UpdatePassword {...props} />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
export default connect(mapStateToProps)(ResetPassword);
