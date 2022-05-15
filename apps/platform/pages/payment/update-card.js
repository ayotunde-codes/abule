import React from 'react';
import Router from 'next/router';
import { Fn } from '@abule-common/components';
import Payment from '../index';

const {
  popAlert,
} = Fn;

class UpdateCard extends React.Component {
  render() {
    const { props } = this;

    return (
      <Payment
        {...props}
        allowDefaultCard={false}
        product={{
          type: 'update-card',
        }}
        onPaymentSuccess={(data) => {
          console.log('data passed', data);
          alert('made it in');
          const { sessionUser } = props.settings;
          props.setSessionUser({
            ...sessionUser,
            card: data.card || sessionUser.card,
          });
          popAlert({
            title: 'Successful',
            description: 'Your card was updated successfully',
          });
          const { backPath } = Router.query;
          if (backPath) Router.push(backPath);
        }}
        submitButtonLabel="UPDATE"
      />
    );
  }
}
export default UpdateCard;
