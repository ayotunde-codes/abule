import React from 'react';
// import Toggle from 'react-toggle';
import {
  PopMessage,
  Fn,
} from '@abule-common/components';
import { SubscriptionPlans } from '../datastore';
import SubscriptionCards from './subscription/card';

const {
  popAlert,
} = Fn;

class AccessDeniedMessage extends React.Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      showPlans: false,
    };

    this.state = {
      ...this.defaultState,
      cardActionHeight: 'auto',

    };

    this._isMounted = false;
    this.changeToggle = this.changeToggle.bind(this);
    this.onCardLoad = this.onCardLoad.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
            if (props.payment.onClick) props.payment.onClick();
            closer();
          }
        } catch (error) {
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

  changeToggle(e) {
    e.preventDefault();
    this.setState((prev) => ({
      toggle: !prev.toggle,
    }));
  }

  onCardLoad({ cardAction }) {
    const { state } = this;
    const { cardActionHeight } = state;
    const height = $(cardAction).outerHeight();

    if (cardActionHeight === 'auto' || height > cardActionHeight) {
      this.setState({
        cardActionHeight: height,
      });
    }
  }

  becomeCaregiver() {

  }

  render() {
    const { props, state } = this;
    const { settings, accessDenied, fetchRequest } = props;
    const { sessionUser } = settings;
    const { cardActionHeight } = state;

    const getData = () => {
      switch (accessDenied.type) {
        case ('not-caregiver'): {
          return {
            title: 'Switch to Caregiver Account',
            imageUrl: '/img/caregiver_2.png',
            // description: 'Tap into your inner creativity and share your talents with others. Earn credits when you host. Make money from your banked credits.',
            description: 'Inspire, nurture and share your wisdom with our children.',
            merits: [
              'Help families thrive',
              'Flexible schedule',
              'Earn credits for later use',
              'Income earning potential',
            ],
            btnLabel: 'CONTINUE',
            btnOnClick: async (closer, hideLoader) => {
              await props.switchUserToCaregiver();

              closer();
            },
            // description: 'Want in on the fun? Upgrade to The Works plan to enjoy the benefits of both hosting and attending activities. Your hard earned credits will be kept intact.',
          };
        }
        case ('create-kids-profiles'): {
          return {
            title: 'Upgrade to Create Kid\'s Profiles',
            imageUrl: '/img/special_needs_kids.png',
            description: 'To add a kid to your profile, upgrade to The Works plan.',
            // description: 'Want in on the fun? Upgrade to The Works plan to enjoy the benefits of both hosting and attending activities. Your hard earned credits will be kept intact.',
          };
        }
        case ('join-activities'): {
          return {
            title: 'Upgrade to Join Activities',
            imageUrl: '/img/music_lessons.png',
            description: 'Want in on the fun? Upgrade to The Works plan to enjoy the benefits of both hosting and attending activities. Your hard earned credits will be kept intact.',
            // description: 'Want in on the fun? Upgrade to The Works plan to enjoy the benefits of both hosting and attending activities. Your hard earned credits will be kept intact.',
          };
        }
        case ('request-help'):
        case ('offer-help'): {
          return {
            title: 'Upgrade to Barter',
            imageUrl: '/img/bartering.png',
            description: (
              <div>
                <p>Need help with a task?</p>
                Upgrade to The Works plan to request for help.
                Earn credits when you help others.
              </div>),
            merits: [
              'Pick-up/ Drop-offs',
              'Sitting',
              'Homework Help',
              'Tutoring',
            ],
            // description: 'Want in on the fun? Upgrade to The Works plan to enjoy the benefits of both hosting and attending activities. Your hard earned credits will be kept intact.',
          };
        }
        default: {
          return 'SAVE';
        }
      }
    };
    const data = getData();
    // const btnLabel = getBtnLabel();
    return (
      state.showPlans ? (
        <PopMessage
          // show={state.initregistration}
          style={{ zIndex: '3' }}
          mainStyle={{ zIndex: '3' }}
          message={(
            <div id="accessDeniedPlans">
              <div id="subscription" className="page-container">
                <div className="subscription-top">
                  <h2>SUBSCRIPTION PACKAGES</h2>
                  {/*  <p>
                    Choose a subscription tier that is best suited to your needs. You
                    may switch or cancel at any time.
                  </p> */}
                </div>
                <div className="subscription-toggle-content">
                  <div className="subscription-toggle">
                    <span>Monthly</span>
                    {/* <Toggle
                      checked={state.toggle}
                      icons={false}
                      onClick={this.changeToggle}
                      className="toggler"
                    /> */}
                    <span>Yearly</span>
                  </div>
                </div>
                <div className="subscription-pricing">
                  {SubscriptionPlans.findByCycleAlias(state.toggle ? 'yearly' : 'monthly').map((plan) => (
                    <SubscriptionCards
                      {...props}
                      actionStyle={{
                        height: cardActionHeight,
                      }}
                      onLoad={this.onCardLoad}
                      // showActiveness={false}
                      active={plan.id === sessionUser.subscription.plan.id}
                      plan={plan}
                      button={{
                        label: 'SWITCH',
                      }}
                      onPaymentSuccess={() => {
                        // alert('yes we done');
                        props.onClose();
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          confirmButton={{
            show: false,
          }}
          onCancel={() => {
            props.onClose();

            // this.setState({
            // showPlans: false,
            // });
          }}
        />
      )
        : (
          <PopMessage
            // show={state.initregistration}
            style={{ zIndex: '3' }}
            mainStyle={{ zIndex: '3' }}
            message={(
              <div id="accessDeniedMessage">
                <div className="content">
                  <div className="image">
                    <img src={data.imageUrl} alt="" />
                  </div>
                  <h4 className="header">{data.title}</h4>
                  <div className="description">
                    {data.description}
                  </div>
                  {data.merits && (
                    <div className="merits">
                      {data.merits.map((merit) => (
                        <div className="merit">
                          <span className="icon fa fa-check" />
                          <span>{merit}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            )}
            confirmButton={{
              label: data.btnLabel || 'VIEW PLANS',
              onClick: async (closer, hideLoader) => {
                if (data.btnOnClick) {
                  data.btnOnClick(closer, hideLoader);
                } else {
                  closer();
                }
              },
            }}
            onCancel={() => {
              const { props, state } = this;
              props.onClose();
              // alert('trying to cancel ');
            }}
          />
        )

    );
  }
}
AccessDeniedMessage.defaultProps = {
  useDefaultCard: true,
  allowDefaultCard: true,
  submitButtonLabel: 'PAY NOW',
};
export default AccessDeniedMessage;
