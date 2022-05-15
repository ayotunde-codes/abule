import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  Fn,
  InputField, PopMessage, Dropdown,
} from '@abule-common/components';

import { updateHeader, setInfo } from '../redux/settings/action';
import { setActivity } from '../redux/calendar-activity/action';
import { updateEvents } from '../redux/calendar/action';
import { errorHandler } from '../lib/stripe';

const {
  popAlert, isEmpty, parseDuration,
} = Fn;

class BuyCredit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: '',
      amountError: false,
      loading: true,
    };

    this.banner = null;
    this._isMounted = false;
    this.timerHandler = null;
    this.attemptPayment = this.attemptPayment.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const { props } = this;
  }

  componentDidUpdate() {
    const { props } = this;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async attemptPayment(closer, hideLoader) {
    const { props, state } = this;
    const onPaymentSuccess = () => {
      popAlert({
        title: 'Successful',
        description: `${state.amount / 5} credits have been added to your account`,
      });
    };
    try {
      const data = await props.fetchRequest({
        url: `${process.env.REACT_APP_API}/payment/paymentGateway`,
        method: 'POST',
        body: JSON.stringify({
          product: {
            type: 'credit',
            amount: state.amount,
          },
          useDefaultCard: true,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });

      console.log('USER GOTTEN IS : ', data);
      const { settings } = props;
      const { sessionUser } = settings;
      props.setSessionUser({
        ...sessionUser,
        ...data,
      });
      onPaymentSuccess(data);
      closer();
    } catch (e) {
      console.log('the error gotten is : ', e);
      // handle error here (create the error handler as an
      errorHandler({
        error: e,
        Stripe: props.Stripe,
        onPaymentSuccess,
      });
      hideLoader();
    }
  }

  validateAmount() {
    let isValid = true;
    const { amount } = this.state;
    let amountError = false;
    if (!amount || isNaN(amount) || amount < 10) {
      isValid = false;
      amountError = amount < 10 ? "amount can\'t be less than $10" : 'invalid amount';
    }
    this.setState({
      amountError,
    });

    return isValid;
  }

  render() {
    const { props, state } = this;
    const { activity, kids, settings: { sessionUser } } = props;

    const creditValue = state.amount / 5;
    const activityDuration = props.getActivityCredit(creditValue, true);
    console.log('Router in here : ', Router);
    return (
      <>
        <PopMessage
          // show={state.initregistration}
          style={{ zIndex: '3' }}
          mainStyle={{ zIndex: '3' }}
          message={(
            <div id="buyCredit">
              <p className="title">How many credits do you want to purchase?</p>
              {state.amountError && <span className="error">{state.amountError}</span>}
              <div className="double-group">
                {/* <span className="icon ">$</span> */}
                <InputField
                  type="number"
                  placeholder="USD"
                  label="Amount ($)"
                  value={state.amount}
                  // className={`${editProfile.firstNameError !== false ? ' error' : ''}`}
                  onChange={(amount) => {
                    this.setState({
                      amount,
                      amountError: !isEmpty(amount) && amount > 10 ? false : state.amountError,
                    });
                  }}
                />
                <span className="icon icon-hmv-eqauls" style={{ fontSize: '1em' }} />
                {/* <span className="credit-value">
                  <span>{creditValue}</span>
                  <span>credits</span>
                </span> */}
                {/* <span className="icon ">$</span> */}
                <InputField
                  type="number"
                  readOnly
                  label="Credits"
                  value={creditValue}
                  // className={`${editProfile.firstNameError !== false ? ' error' : ''}`}
                  onChange={(amount) => {
                    this.setState({
                      amount,
                      amountError: !isEmpty(amount) && amount > 10 ? false : state.amountError,
                    });
                  }}
                />
              </div>

              <div className="infos">
                <p className="header">
                  <span className="info"> What you can do </span>
                </p>
                <div className="info data">
                  <Dropdown
                    defaultPosition={{
                      y: 'top',
                      x: 'auto',
                    }}
                    controller={<span>{creditValue} Credits on Activities</span>}
                    content={(
                      <div className="info-data-pop-up">
                        <div className="content">
                          <p>Credits are based on a weighted system which varies depending on type of event.</p>
                          <a className="link">Learn more</a>
                        </div>
                      </div>
                    )}
                    onClose={() => {
                      // console.log('this.content is :', this.content);
                    }}
                  />
                  <span>{parseDuration(activityDuration) || '0min'}</span>
                </div>
              </div>
              <span className="disclaimer">* Credits estimated per service type.</span>

            </div>
          )}
          confirmButton={{
            label: 'PAY NOW',
            onClick: async (closer, hideLoader) => {
              if (this.validateAmount()) {
                if (sessionUser.card) {
                  this.attemptPayment(closer, hideLoader);
                } else {
                  closer();
                  props.makePayment({
                    product: {
                      type: 'credit',
                      amount: state.amount,
                    },
                  });
                }
              } else {
                hideLoader();
              }
            },
          }}
          cancelButton={{
            show: true,
            label: 'UPDATE CARD',
            onClick: async (closer, hideLoader) => {
              console.log({ closer, hideLoader });
              // if (this.validateAmount()) {
              props.makePayment({
                product: {
                  type: 'update-card',
                },
              });
              // } else {
              hideLoader();
              // }
            },
          }}
          onCancel={() => {
            const { props, state } = this;
            props.onClose();
          }}
        />
      </>
    );
  }
}

BuyCredit.defaultProps = {
  onClose: () => {

  },
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});
const mapDispatchToProps = (dispatch) => ({
  updateHeader: (props) => dispatch(updateHeader(props)),
  setInfo: (props) => dispatch(setInfo(props)),
  setActivity: (props) => dispatch(setActivity(props)),
  updateCalendarEvents: (events) => dispatch(updateEvents(events)),
  deleteCalendarEvents: (events) => dispatch(updateEvents(events, {}, 'remove')),
});
export default connect(mapStateToProps, mapDispatchToProps)(BuyCredit);
