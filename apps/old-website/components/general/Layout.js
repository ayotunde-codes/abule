import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  componentDidMount() {
    if (this.props.website) {
      $('html').addClass('website');
    } else {
      $('html').removeClass('website');
    }
  }

  render() {
    const { props } = this;
    const {
      children,
      payment,
      accessDenied,
      dropdown,
      auth,
      footer,
    } = props;
    const { header } = props.settings;

    return (
      <>
        <Header
          {...props}
          {...props.header}
        />
        <main
          className=""
          style={{
            minHeight: `calc(60vh - ${header.height}px)`,
          }}
        >
          {children}


        </main>

        {footer && (<Footer {...props} />)}

      </>
    );
  }
}

Layout.defaultProps = {
  header: {},
  footer: true,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  gallery: state.gallery,
  popAlert: state.popAlert,
  payment: state.payment,
  accessDenied: state.accessDenied,
  dropdown: state.dropdown,
  auth: state.auth,
});
export default connect(mapStateToProps)(Layout);
