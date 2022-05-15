import React from 'react';
import { connect } from 'react-redux';
import LogIn from '../components/general/LogIn';
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
    const { props, state } = this;

    return (
      <Layout {...props}>
        <LogIn
          {...props}
          isPage
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({ settings: state.settings });
export default connect(mapStateToProps)(Auth);
