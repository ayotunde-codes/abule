import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Header from './Header';
import Footer from './Footer';
import Gallery from '../Gallery';
// import PopAlert from '../PopAlert';
import Fragment from './Fragment';
import AccessDeniedMessage from '../AccessDeniedMessage';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Payment from '../Payment';
import ToastAlert from '../ToastAlert';

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

          {props.gallery.items && (
            <Gallery gallery={props.gallery} />
          )}

          {/*   {(popAlert.title !== null || popAlert.description !== null)
          && (
            <PopAlert {...props} />
          )} */}

          {accessDenied.show && (
            <AccessDeniedMessage
              {...props}
              onClose={() => {
                props.closeAccessDenied();
              }}
            />
          )}

          {payment.show && (
            <Payment
              {...props}
              product={payment.product}
              onClose={() => {
                props.closePayment();
              }}
            />
          )}


          {auth.login.show && (
            <LogIn
              {...props}
            />
          )}

          {auth.signUp.show && (
            <SignUp
              {...props}
            />
          )}
          <ToastAlert />
        </main>

        {props.fragmentContent && (
          <Fragment {...props} />
        )}
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
