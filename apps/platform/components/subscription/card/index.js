import React from 'react';
import {
  PopMessage
} from '@abule-common/components';

class SubscriptionCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      promptMessage: false,
    };
    this.onActionClick = this.onActionClick.bind(this);
    this.card = null;
    this.cardAction = null;
    this.onLoadCall = false;
  }

  async processPayment() {
    const { props, state } = this;
    const { settings, plan } = props;
    const { sessionUser } = settings;
    const onSuccess = (data) => {
      const newUser = {
        ...sessionUser,
      };

      if (data) {
        if (data.kids) {
          newUser.kids = data.kids;
        }

        if (data.creditBalance) {
          newUser.creditBalance = data.creditBalance;
        }

        if (data.subscription) {
          newUser.subscription = data.subscription;
          newUser.subscriptionId = data.subscription.id;
        }

        if (data.upcomingSubscription) {
          newUser.upcomingSubscription = data.upcomingSubscription;
        }
        props.setSessionUser(newUser);
      }
      props.onPaymentSuccess(data);
      this.setState({
        loading: false,
      });
    };

    // if the price is 0 then send the request
    if (plan.price > 0) {
      props.makePayment({
        product: {
          type: 'subscription',
          subscriptionPlanId: plan.id,
          quantity: 1,
        },
        onPaymentSuccess: (data) => {
          onSuccess(data);
        },
      });
    } else if (!state.loading) {
      this.setState({
        loading: true,
      });
      try {
        const data = await props.fetchRequest({
          url: `${process.env.REACT_APP_API}/payment/paymentGateway`,
          method: 'POST',
          body: JSON.stringify({
            product: {
              type: 'subscription',
              subscriptionPlanId: plan.id,
              quantity: 1,
            },
            useDefaultCard: true,
          }),
          headers: {
            'content-type': 'application/json',
          },
        });
        // alert('finished switchin');
        onSuccess(data);
      } catch (e) {
        // handle error here (create the error handler as an
        // helper function which will be called in this page and payment page)
        this.setState({
          loading: false,
        });
      }
    }
  }

  async onActionClick(next) {
    const { props, state } = this;
    const { settings, plan } = props;
    const { sessionUser } = settings;
    if (sessionUser.subscription) {
      const { subscriptionTier } = sessionUser.subscription.plan;
      let promptMessage = false;

      if (subscriptionTier.meta.features.includes('host-activities') && plan.subscriptionTier.alias === 'thePillars') {

      } else {
        if (subscriptionTier.alias === 'theWorks' && plan.subscriptionTier.alias === 'thePillars') {
          promptMessage = {
            title: <div>By switching to The Pillars, you will lose access to your kids profiles and the ability earn credits. <p style={{ marginTop: '1em' }}>Are you sure you want to switch?</p></div>,
          };
        }
        if (subscriptionTier.alias === 'thePillars' && plan.subscriptionTier.alias === 'theFoundation') {
          promptMessage = {
            title: 'By switching to The Foundation, you will lose the ability to earn credits. Therefore, you need to cash out your credits or it will be forfeited.',
            confirmLabel: 'CONTINUE',
            cancelLabel: 'CANCEL',
          };
        }
        if (subscriptionTier.alias === 'theFoundation' && plan.subscriptionTier.alias === 'thePillars') {
          promptMessage = {
            title: <div>By switching to The Pillars, you will lose access to your kids profiles, registered events, and the ability to use credits. However, your credits will be transferred.<p>Are you sure you want to switch?</p></div>,
            // confirmLabel: 'CONTINUE',
            // cancelLabel: 'CANCEL',
          };
        }
        if (promptMessage) {
          this.setState({
            promptMessage,
          });
        } else {
          this.processPayment();
        }
      }
    } else {
      this.processPayment();
    }
  }

  getCardFooter() {
    const { state, props } = this;
    const {
      plan,
      title,
      price,
      details,
      toggle,
      desc,
      button: propsButton,
      className,
      id,
      active,
      settings,
    } = props;

    const { sessionUser } = settings;

    const button = {
      label: 'SUBCRIBE',
      ...propsButton,
    };

    if (props.showActiveness) {
      if (active) {
        return (
          <div className="active-plan-note">
            you are currently on this plan.
          </div>
        );
      }

      if (sessionUser.upcomingSubscription && sessionUser.upcomingSubscription.plan.id === plan.id) {
        const date = new Date(sessionUser.subscription.expiresAt);
        let dateYear = `${date.getFullYear()}`;
        dateYear = `${dateYear[2]}${dateYear[3]}`;

        return (
          <div className="active-plan-note">
            you will be switched to this plan on {`${date.getMonth() + 1}/${date.getDate()}/${dateYear}`}
          </div>
        );
      }
    }
    const { subscriptionTier } = plan;

    return (
      <button
        type="button"
        className="btn btn-1 subscription-plan-card-button"
        onClick={this.onActionClick}
      >
        {button.label}
        {state.loading && <span className="icon icon-refresh spinner" />}
      </button>
    );
  }

  render() {
    const { props, state } = this;
    const {
      plan,
      title,
      price,
      details,
      toggle,
      desc,
      button: propsButton,
      className,
      id,
      active,
      settings,
    } = props;

    const { sessionUser } = settings;

    if (this.card && this.cardAction && !this.onLoadCall) {
      this.onLoadCall = true;
      props.onLoad({ card: this.card, cardAction: this.cardAction });
    }

    const { subscriptionTier } = plan;
    return (
      <div
        ref={(e) => {
          if (e && !this.card) {
            this.card = e;
          }
        }}
        className={`subscription-plan-card ${className}${active ? ' active-plan' : ''}`}
      >
        <div className="subscription-card-content">
          <h3 className="timberline-font space-header-text">{subscriptionTier.name}</h3>
          <div className="text-linedup">
            {subscriptionTier.meta.description.map((text, ind) => (
              <p key={ind} className="subscription-pricing-desc">
                {text}
              </p>
            ))}
          </div>
          <h3 className="sub-pricing-plan">
            ${plan.price}
          </h3>
          <ul className="subscription-plan-card-details">
            {subscriptionTier.meta.merits.map((merit, ind) => (
              <li key={ind}>{merit}</li>
            ))}
          </ul>
        </div>

        <div
          className="action"
          style={{ ...props.actionStyle }}
          ref={(e) => {
            if (e && !this.cardAction) {
              this.cardAction = e;
            }
          }}
        >
          {this.getCardFooter(props)}
        </div>
        {state.promptMessage && (
          <PopMessage
            {...props}
            style={{ zIndex: '3' }}
            mainStyle={{ zIndex: '3' }}
            message={(
              <div id="accessDeniedMessage">
                <div className="content">
                  {state.promptMessage.title}
                </div>
              </div>

            )}
            confirmButton={{
              label: state.promptMessage.confirmLabel || 'YES',
              onClick: async (closer, hideLoader) => {
                await this.processPayment();
                closer();
              },
            }}
            cancelButton={{
              show: true,
              label: state.promptMessage.cancelLabel || 'NO',
              onClick: async (closer, hideLoader) => {
                hideLoader();
                this.setState({
                  promptMessage: false,
                });
              },
            }}
            onCancel={() => {
              const { props, state } = this;
              this.setState({
                promptMessage: false,
              });
            }}
          />
        )}
      </div>
    );
  }
}

SubscriptionCards.defaultProps = {
  className: '',
  button: {

  },
  onPaymentSuccess: () => {

  },
  showActiveness: true,
  onLoad: () => {

  },
  actionStyle: {},
};

export default SubscriptionCards;
