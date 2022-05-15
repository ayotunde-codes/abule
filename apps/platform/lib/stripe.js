import React from 'react';
import { popAlert } from '@abule-common/components';

export const nothing = '';
export const errorHandler = async ({ Stripe, error, onPaymentSuccess }) => {
  if (error.status === 400) {
    const errorData = error.data.data;
    const errorMessage = error.data.message;
    switch (errorMessage) {
      case ('authenticate card'): {
        try {
          const result = await Stripe.confirmCardPayment(errorData.clientSecret, /*  {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: 'Jenny Rosen',
              },
            },
          } */);
          if (result.paymentIntent) {
            // card was authenticated successfully
            if (onPaymentSuccess) onPaymentSuccess();
          } else {
            // error occured

          }
          console.log('confiirming card result', result);
          // alert('ok we confirmed card oh');
        } catch (err) {
          console.log('the error from confiirming card', err);
          // alert('error oh');
        }
        break;
      }
      case ('card declined'): {
        popAlert({
          title: 'Card Declined',
          description: 'This card was declined. Please try another one.',
          error: true,
        });
        break;
      }
      case ('insufficient funds'): {
        popAlert({
          title: 'Insufficient Funds',
          description: 'Please try another card.',
          error: true,
        });
        break;
      }
      case ('proccessing error'): {
        popAlert({
          title: 'Oops',
          description: (
            <>
              <p>An error was encountered while processing your request.</p>
              <p>please try again.</p>
            </>
          ),
          error: true,
        });
        break;
      }
      case ('invalid card'): {
        // popAlert({
        //   titile: 'Card Details Invalid',
        //   description: 'One or more card details are incorrect',
        //   error: true,
        // });
        break;
      }
      default: break;
    }
  } else {
    popAlert({
      title: `Failure${error}`,
      description: 'Your Payment was not successful, please try again',
      error: true,
    });
  }
};
