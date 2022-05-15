import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import SignUp from '../components/general/SignUp';
import Layout from '../components/general/Layout';

class Auth extends React.Component {
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
        <SignUp
          {...props}
          accountType={Router.query['account-type'] && Router.query['account-type'] === 'caregiver' ? 'caregiver' : 'parent'}
          isPage
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
export default connect(mapStateToProps)(Auth);
