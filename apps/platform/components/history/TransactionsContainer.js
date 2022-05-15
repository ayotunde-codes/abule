import React, { useState } from 'react';
import moment from 'moment';
import { array } from 'prop-types';

const TransactionsContainer = ({ payments, subscriptions }) => {
  const [show, setShow] = useState(-1);

  const onClick = (id) => {
    if (id === show) {
      setShow(-1);
    } else {
      setShow(id);
    }
  };

  const returnTotalSum = (subscriptionAmount, paymentsList) => {
    const paymentsTotal = paymentsList.reduce((acc, cur) => acc + cur.amount / 100, 0);
    return subscriptionAmount + paymentsTotal;
  };

  return (
    <>
      <div className="transactions-container">
        {subscriptions.map((el, id) => (
          <>
            <div className="history-block">
              <div>
                <h4>BILLING PERIOD</h4>
                <p>
                  {moment(el.current_period_start * 1000).format('MM/DD/YYYY')} -&nbsp;
                  {moment(el.current_period_end * 1000).format('MM/DD/YYYY')}
                </p>
              </div>
              <div>
                <h4>TOTAL AMOUNT</h4>
                <p>$ {returnTotalSum(el.plan.amount / 100, payments[id])}.00</p>
              </div>
              <div
                onClick={() => onClick(id)}
                className="arrow-container"
              >
                <img style={{ transform: show !== id ? 'rotate(180deg)' : 'rotate(0deg)' }} alt="" src="/img/arrow-down.svg" />
              </div>
            </div>
            <div className="more-info" style={{ display: show !== id ? 'none' : 'flex' }}>
              <div className="more-info-left">
                <div>
                  <h4>TRANSACTION ID</h4>
                  <p>{el.id}</p>
                </div>
                <div>
                  <h4>DATE</h4>
                  <p>{moment(el.created * 1000).format('MM/DD/YYYY')}</p>
                </div>
                <div>
                  <h4>TYPE</h4>
                  <p>Subscrpition Fee - The Works</p>
                </div>
              </div>
              <div className="more-info-right">
                <div>
                  <h4>PAYMENT METHOD</h4>
                  <p>Stripe</p>
                </div>
                <div>
                  <h4>STATUS</h4>
                  <p>{el.status}</p>
                </div>
                <div>
                  <h4>AMOUNT</h4>
                  <p>$ {el.plan.amount / 100}.00</p>
                </div>
              </div>
            </div>
            {payments && payments[id] && payments[id].length && payments[id].map((paym) => (
              <div className="more-info" style={{ display: show !== id ? 'none' : 'flex' }}>
                <div className="more-info-left">
                  <div>
                    <h4>TRANSACTION ID</h4>
                    <p>{paym.id}</p>
                  </div>
                  <div>
                    <h4>DATE</h4>
                    <p>{moment(paym.created * 1000).format('MM/DD/YYYY')}</p>
                  </div>
                  <div>
                    <h4>TYPE</h4>
                    <p>Credit Purchase</p>
                  </div>
                </div>
                <div className="more-info-right">
                  <div>
                    <h4>PAYMENT METHOD</h4>
                    <p>Stripe</p>
                  </div>
                  <div>
                    <h4>STATUS</h4>
                    <p>{paym.status}</p>
                  </div>
                  <div>
                    <h4>AMOUNT</h4>
                    <p>$ {paym.amount / 100}.00</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ))}
        {!subscriptions.length && payments.flat(1).map((paym) => (
          <div className="more-info">
            <div className="more-info-left">
              <div>
                <h4>TRANSACTION ID</h4>
                <p>{paym.id}</p>
              </div>
              <div>
                <h4>DATE</h4>
                <p>{moment(paym.created * 1000).format('MM/DD/YYYY')}</p>
              </div>
              <div>
                <h4>TYPE</h4>
                <p>Credit Purchase</p>
              </div>
            </div>
            <div className="more-info-right">
              <div>
                <h4>PAYMENT METHOD</h4>
                <p>Stripe</p>
              </div>
              <div>
                <h4>STATUS</h4>
                <p>{paym.status}</p>
              </div>
              <div>
                <h4>AMOUNT</h4>
                <p>$ {paym.amount / 100}.00</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

TransactionsContainer.propTypes = {
  payments: array,
  subscriptions: array,
};

TransactionsContainer.defaultProps = {
  payments: [],
  subscriptions: [],
};

export default TransactionsContainer;
