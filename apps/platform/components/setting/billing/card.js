import React from 'react';
// import { useStripe, useElements } from "@stripe/react-stripe-js";

class CardDetails extends React.Component {
  constructor(props) {
    super(props);

    this.getCardIcon = this.getCardIcon.bind(this);
    this.doubDate = this.doubDate.bind(this);
  }

  componentDidMount() {

  }

  getCardIcon(card) {
    switch (card) {
      case ('visa'): {
        return 'fa-cc-visa';
      }
      case ('mastercard'): {
        return 'fa-cc-mastercard';
      }
      case ('discover'): {
        return 'fa-cc-discover';
      }

      default: return 'fa-cc-amex';
    }
  }

  doubDate(s) {
    const value = parseInt(s, 10);
    return `${`${value}`.length === 1 ? `0${value}` : value}`;
  }

  render() {
    const { state, props } = this;
    const { sessionUser } = props.settings;
    const { card } = sessionUser;
    return (
      <div className="billing-card card">
        <p>Pay with Card</p>
        {card ? (
          <div className={`billing-info ${card ? 'card-info' : 'add-card'}`}>
            <>
              <span className={`fa ${this.getCardIcon(card.brand)} card-type`} />
              <span className="billing-card-num">**********{card.last4}</span>
              <span className="">{this.doubDate(card.exp_month)}/{String(card.exp_year).substr(2)}</span>
            </>
          </div>
        )
          : ''}

        <button
          type="button"
          className="btn btn-1 no-shadow  action-button"
          onClick={() => {
            props.makePayment({
              product: {
                type: 'update-card',
              },
            });
          }}
        >
          Add Card
        </button>

      </div>
    );
  }
}
export default CardDetails;
