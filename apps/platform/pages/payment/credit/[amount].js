import React from 'react';
import Router from 'next/router';
import { Fn } from '@abule-common/components';
import Payment from '../../index';
import { SubscriptionPlans } from '../../../datastore';

const {
  popAlert,
} = Fn;

class SubscriptionPayment extends React.Component {
  render() {
    const { props } = this;
    const { amount, backPath } = Router.query;
    console.log('router is : ', Router.query);
    return (
      <Payment
        {...props}
        submitButtonLabelOnUpdate="UPDATE AND PAY NOW"
        product={{
          type: 'credit',
          amount,
        }}
        productDetails={(
          <>
            <table>
              <tbody>
                <tr>
                  <td>Product</td>
                  <td>Credits</td>
                </tr>
                <tr>
                  <td>Value</td>
                  <td>{amount / 5}</td>
                </tr>
                <tr>
                  <td>Total Price</td>
                  <td>${amount}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
        onPaymentSuccess={(data) => {
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
            description: `${amount / 5} credits have been added to your account`,
          });

          Router.push(backPath || `${props.AppUrl}/`);
        }}
      />
    );
  }
}
export default SubscriptionPayment;
