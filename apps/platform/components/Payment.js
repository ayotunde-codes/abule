import React from 'react';
import {
  Elements,
} from '@stripe/react-stripe-js';
import {
  InputField, PopMessage, Fn,
} from '@abule-common/components';

import { errorHandler } from '../lib/stripe';

const {
  isEmpty, popAlert, padString,
} = Fn;

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      cardNumber: '',
      expDate: '',
      cvc: '',
      cardNumberError: false,
      expDateError: false,
      cvcError: false,
      useDefaultCard: props.useDefaultCard,
    };

    this.state = {
      ...this.defaultState,
      loading: false,
    };

    this.fields = {
      cardNumber: null,
      expDate: null,
      cvc: null,
    };

    this._isMounted = false;

    // console.log('THE.STRIPE ELEMENT IS : ', props.stripe);
    console.log('STRIPE ELEMENT IS : ', Elements);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateCardInfo = this.updateCardInfo.bind(this);
    this.formatCardNumber = this.formatCardNumber.bind(this);
    this.formatExpDate = this.formatExpDate.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateCardInfo(props) {
    this.setState({
      useDefaultCard: false,
      ...props,
    });
  }

  resetForm() {
    this.setState({
      ...this.defaultState,
      useDefaultCard: true,
    });
  }

  formatCardNumber(number) {
    let pattern = [];
    if (number.length === 16) {
      pattern = [4, 4, 4, 4];
    } else {
      pattern = [4, 6];
    }

    let result = [[], [], [], []];
    // let sec = 0;
    let sec = 0;
    (`${number}`).split('').forEach((char) => {
      if (pattern[sec] && result[sec].length === pattern[sec]) {
        sec += 1;
      }
      result[sec].push(char);
    });
    result = result.map((section) => section.join(''));
    console.log('sresult before parsing it is : ', { result });
    let response = '';
    result.forEach((section) => {
      if (!isEmpty(section)) {
        response += (isEmpty(response) ? '' : ' ') + section;
      }
    });
    return response;
  }

  formatExpDate(number) {
    const pattern = [2, 2];

    let result = [[], []];
    // let sec = 0;
    let sec = 0;
    (`${number}`).split('').forEach((char) => {
      if (pattern[sec] && result[sec].length === pattern[sec]) {
        sec += 1;
      }
      result[sec].push(char);
    });
    result = result.map((section) => section.join(''));
    console.log('sresult before parsing it is : ', { result });
    let response = '';
    result.forEach((section) => {
      if (!isEmpty(section)) {
        response += (isEmpty(response) ? '' : '/') + section;
      }
    });
    return response;
  }

  parseCardNumber(number, maxLen = 16) {
    return (`${number}`).split('').filter((char) => !isEmpty(char) && !isNaN(char)).join('').slice(0, maxLen);
  }

  async handleSubmit(closer, hideLoader) {
    const { props, state } = this;
    if (!state.loading) {
      const { product, allowDefaultCard } = props;
      const { fetchRequest, settings } = props;
      const { sessionUser } = settings;
      const {
        cardNumber, expDate, cvc, useDefaultCard,
      } = state;
      const fields = { cardNumber, expDate, cvc };

      const parseFieldsError = (errors, extraState = {}, beforeState = {}) => {
        const errorKeys = Object.keys(errors);
        console.log('validation erros', errorKeys);
        const Errors = {};
        let firstError = false;
        errorKeys.forEach((key) => {
          const value = errors[key];
          if (!firstError && value !== false) {
            this.fields[key].focus();
            firstError = true;
          }

          Errors[`${key}Error`] = value;
        });

        this.setState({
          ...beforeState,
          ...Errors,
          ...extraState,
        });
      };

      const validate = () => {
        let isValid = true;
        if (useDefaultCard && allowDefaultCard && sessionUser.card) {
          return isValid;
        }
        const errors = {};
        Object.keys(fields).forEach((key) => {
          const value = fields[key];
          // console.log({ key, value }, { editProfile });
          if (key === 'cardNumber' && ![16, 15, 14].includes(value.length)) {
            isValid = false;
            errors[`${key}`] = 'invalid card number';
          } else if (key === 'expDate' && ![4].includes(value.length)) {
            isValid = false;
            errors[`${key}`] = 'invalid date';
          } else if (key === 'cvc' && ![3].includes(value.length)) {
            isValid = false;
            errors[`${key}`] = 'invalid CVC';
          }
        });

        parseFieldsError(errors);
        return isValid;
      };

      if (validate()) {
        try {
          this.setState({
            loading: true,
          });
          // send the payment method to backend and create user ther, then update user with payment method
          const data = await fetchRequest({
            url: `${process.env.REACT_APP_API}/payment/paymentGateway`,
            method: 'POST',
            body: JSON.stringify({
              cardNumber,
              expDate,
              cvc,
              product,
              useDefaultCard,
            }),
            headers: {
              'content-type': 'application/json',
            },
          });
          hideLoader();
          if (this._isMounted) {
            this.setState({
              ...this.defaultState,
              loading: false,
            });
            console.log('the data from testing subsc : ', data);
            switch (product.type) {
              case ('credit'): {
                if (data) {
                  console.log('data passed', { props, data });
                  const { sessionUser } = props.settings;
                  props.setSessionUser({
                    ...sessionUser,
                    ...data,
                  });
                }
                popAlert({
                  title: 'Successful',
                  description: `${product.amount / 5} credits have been added to your account`,
                });

                break;
                // Router.push(backPath || '/');
              }
              case ('update-card'): {
                if (data) {
                  console.log('data passed', { props, data });
                  const { sessionUser } = props.settings;
                  props.setSessionUser({
                    ...sessionUser,
                    ...data,
                  });
                }
                // popAlert({
                //   title: 'Successful',
                //   description: `${product.amount / 5} credits have been added to your account`,
                // });

                break;
              }
              case ('subscription'): {
                if (data) {
                  console.log('data passed', { props, data });
                  const { sessionUser } = props.settings;
                  props.setSessionUser({
                    ...sessionUser,
                    subscription: data.subscription || sessionUser.subscription,
                    subscriptionId: data.subscription.id || sessionUser.subscription.plan.id,
                    upcomingSubscription: data.upcomingSubscription || sessionUser.upcomingSubscription,
                  });
                }
                break;
              }
              default: break;
            }
            if (props.onPaymentSuccess) props.onPaymentSuccess(data);
            if (props.payment.onPaymentSuccess) props.payment.onPaymentSuccess(data);
            closer();
          }
        } catch (error) {
          hideLoader();

          if (this._isMounted) {
            this.setState({
              loading: false,
            });
            console.log(error);
            if (error.data.message === 'invalid card') {
              parseFieldsError(error.data.data, {}, {
                cardNumberError: false,
                expDateError: false,
                cvcError: false,
              });
            }
            errorHandler({
              error,
              Stripe: props.Stripe,
              onPaymentSuccess: props.onPaymentSuccess,
            });
          }
        }
      } else {
        hideLoader();
      }
    }
  }

  render() {
    const mandatory = '';
    const { props, state } = this;
    const { settings, product } = props;
    const { sessionUser } = settings;
    const { card } = sessionUser;

    const currentCardMonth = card ? padString(`${card.exp_month}`, '0', 2) : '';
    let currentCardYear = card ? `${card.exp_year}` : '';
    currentCardYear = card ? `${currentCardYear[2]}${currentCardYear[3]}` : '';
    console.log('user parsed card details', {
      month: currentCardMonth,
      year: currentCardYear,
    });

    const { submitButtonLabel } = props;
    const submitButtonLabelOnUpdate = props.submitButtonLabelOnUpdate || submitButtonLabel;
    const getBtnLabel = () => {
      switch (product.type) {
        case ('subscription'):
        case ('credit'): {
          return 'PAY NOW';
        }
        case ('update-card'): {
          return 'UPDATE';
        }
        default: {
          return 'SAVE';
        }
      }
    };
    const btnLabel = getBtnLabel();

    return (
      <PopMessage
        id="paymentGateway"
        style={{ zIndex: '3' }}
        mainStyle={{ zIndex: '3' }}
        message={(
          <div className="">
            <div className="payment-main-content">
              <div className="account-inputs">
                <h4 className="header">CARD DETAILS</h4>
                <form className="account-form">
                  <InputField
                    type="text"
                    label={(
                      <>
                        Card Number <span className="error"> {state.cardNumberError ? `: ${state.cardNumberError}` : mandatory}</span>
                      </>
                    )}
                    placeholder="0000 0000 0000 0000"
                    value={this.formatCardNumber(state.useDefaultCard && card ? `**********${card.last4}` : state.cardNumber)}
                    // className={`${state.cardNumber !== false ? ' error' : ''}`}
                    onLoad={(e) => {
                      if (e) {
                        this.fields.cardNumber = e.inputBox;
                      }
                    }}
                    onChange={(value) => {
                      this.updateCardInfo({
                        cardNumber: this.parseCardNumber(value),
                        cardNumberError: !isEmpty(value) ? false : state.cardNumberError,
                      });
                    }}
                  />

                  <div className="payment-card-details">
                    <InputField
                      type="text"
                      label={(
                        <>
                          Expiration Date <span className="error"> {state.expDateError ? `: ${state.expDateError}` : mandatory}</span>
                        </>
                      )}
                      placeholder="MM/YY"
                      value={this.formatExpDate(state.useDefaultCard && card ? `${currentCardMonth}${currentCardYear}` : state.expDate)}
                      // className={`${state.expDate !== false ? ' error' : ''}`}
                      onLoad={(e) => {
                        if (e) {
                          this.fields.expDate = e.inputBox;
                        }
                      }}
                      onChange={(value) => {
                        this.updateCardInfo({
                          expDate: this.parseCardNumber(value, 4),
                          expDateError: !isEmpty(value) ? false : state.expDateError,
                        });
                      }}
                    />

                    <InputField
                      type="text"
                      label={(
                        <>
                          CVC <span className="error"> {state.cvcError ? `: ${state.cvcError}` : mandatory}</span>
                        </>
                      )}
                      placeholder="123"
                      value={state.useDefaultCard && card ? '***' : state.cvc}
                      // className={`${state.cvc !== false ? ' error' : ''}`}
                      onLoad={(e) => {
                        if (e) {
                          this.fields.cvc = e.inputBox;
                        }
                      }}
                      onChange={(value) => {
                        this.updateCardInfo({
                          cvc: this.parseCardNumber(value, 3),
                          cvcError: !isEmpty(value) ? false : state.cvcError,
                        });
                      }}
                    />
                  </div>
                </form>
              </div>

              <div className="actions">

                {/* <button
                  type="button"
                  className="btn btn-1 account-btn"
                  onClick={this.handleSubmit}
                  disabled={state.loading}
                >{!state.useDefaultCard && card ? submitButtonLabelOnUpdate : submitButtonLabel}
                  {state.loading && <span className="icon-refresh icon spinner" /> }
                </button> */}
              </div>
            </div>
          </div>
        )}
        footer={(
          <div className="cards-platform">
            <div className="cards">
              <span className="card-platform fa fa-cc-visa" />
              <span className="card-platform fa fa-cc-mastercard" />
              <span className="card-platform fa fa-cc-amex" />
              <span className="card-platform fa fa-cc-discover" />
            </div>
            <p className="note">
              Powered by <span className="icon icon-hmv-stripe-logo" />
            </p>
          </div>
        )}
        confirmButton={{
          show: true,
          label: btnLabel,
          onClick: async (closer, hideLoader) => {
            await this.handleSubmit(closer, hideLoader);
          },
        }}
        cancelButton={{
          show: !state.useDefaultCard && card,
          label: 'RESET',
          onClick: (closer, hideLoader) => {
            this.resetForm();
            hideLoader();
          },
        }}
        onCancel={() => {
          const { props, state } = this;
          props.onClose();
          // alert('trying to cancel ');
        }}
      />

    );
  }
}
Payment.defaultProps = {
  useDefaultCard: true,
  allowDefaultCard: true,
  submitButtonLabel: 'PAY NOW',
};
export default Payment;
