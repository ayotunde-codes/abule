import React, { useState } from 'react';
import Layout from '../components/Website/Layout';

import Footer from '../components/Website/Footer';
import { Fn, InputField, InputLocation } from "@abule-common/components";
const {
  FetchRequest, isEmail, isEmpty, isPhoneNumber, isZipCode, popAlert,
} = Fn

const ambassador = () => {
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    zipCode: '',
    city: '',
    state: '',
    communityCount: '',
    reason: '',
    submitting: false,
  });

  const updateState = (props) => {
    setState((value) => ({
      ...value,
      ...props,
    }));
  };

  let validForm = true;
  const stringCheck = [
    'firstName',
    'lastName',
    'email',
    'zipCode',
    'city',
    'state',
    'phoneNumber',
  ];

  for (let i = 0; i < stringCheck.length; i++) {
    if (isEmpty(state[stringCheck[i]])) {
      validForm = false;
      console.log('emptyString', stringCheck[i]);
    } else {
      if (stringCheck[i] === 'email') {
        if (!isEmail(state[stringCheck[i]])) {
          validForm = false;
          console.log('emptyemail');
        }
      }
      if (stringCheck[i] === 'zipCode') {
        if (!isZipCode(state[stringCheck[i]])) {
          validForm = false;
          console.log('emptyzipcode');
        }
      }
      if (stringCheck[i] === 'phoneNumber') {
        if (!isPhoneNumber(state[stringCheck[i]])) {
          validForm = false;
          console.log('emptyphone');
        }
      }
    }
  }

  return (
    <Layout>
      <main className="ambassadorGrid">
        <div className="webpage-container">
          <div className="amCol1">
            <img src="/images/amCol1.svg" alt="" className="amCol1Img" />
            <div className="amCol1Info">
              <h4 className="amTitle">Ambassador Program</h4>
              <p className="amParagraph">
                It takes a village to build a village and we are grateful that you are choosing to be a part of this journey with us. Of course being a leader comes with its perks. We’ll share more details when we get in touch with you.
              </p>
            </div>
          </div>
          <form className="amForm">
            <h4 className="amFormTitle">Tell us about you</h4>
            <div className="formGrid">
              <div className="formLeft">
                <div className="formRow1">
                  <InputField
                    label="First Name"
                    placeholder="first name"
                    value={state.firstName}
                    onChange={(value) => {
                      updateState({
                        firstName: value,
                      });
                    }}
                  />

                  <InputField
                    label="Last Name"
                    placeholder="last name"
                    value={state.lastName}
                    onChange={(value) => {
                      updateState({
                        lastName: value,
                      });
                    }}
                  />
                </div>

                <InputField
                  globalClassName="formRow2"
                  label="Email Address"
                  placeholder="email address"
                  value={state.email}
                  onChange={(value) => {
                    updateState({
                      email: value,
                    });
                  }}
                />
                <div className="formRow3">
                  <InputLocation
                    type="zipCode"
                    placeholder="select place"
                    value={state.zipCode}
                    label="zip Code"
                    className="formBlock"
                    onChange={(value) => {
                      updateState({
                        zipCode: value,
                        city: '',
                        state: '',
                      });
                    }}
                    onSelect={(value) => {
                      console.log('LOCATION ON SELECT : ', value);
                      updateState({
                        city: value.data_component.city,
                        state: value.data_component.state,
                        zipCode: value.data_component.zipCode,
                      });
                    }}
                  />

                  <InputField
                    label="city"
                    readOnly
                    placeholder="city"
                    value={state.city}
                  />

                  <InputField
                    label="state"
                    readOnly
                    placeholder="state"
                    value={state.state}
                  />
                </div>

                <InputField
                  globalClassName="formRow4"
                  label="How many people do you have in your community?"
                  placeholder="enter a number"
                  value={state.communityCount}
                  onChange={(value) => {
                    updateState({
                      communityCount: value,
                    });
                  }}
                />
              </div>

              <div className="formRight">
                <InputField
                  globalClassName="formRow5"
                  type="textarea"
                  label="Tell us why you think you'll make a good ambassador or tribe leader"
                  placeholder="tell us your story"
                  value={state.reason}
                  onChange={(value) => {
                    updateState({
                      reason: value,
                    });
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              className="submitBtn btn btn-1"
              onClick={async () => {
                updateState({ submitting: true });
                try {
                  await FetchRequest({
                    url: 'https://abule-api.herokuapp.com/api/v1/auth/users/ambassadors',
                    method: 'POST',
                    body: JSON.stringify({
                      firstName: state.firstName,
                      lastName: state.lastName,
                      email: state.email,
                      zipCode: state.zipCode,
                      city: state.city,
                      state: state.state,
                      communitySize: state.communityCount,
                      ambassadorCharacteristics: state.reason,
                    }),
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  });
                  popAlert({
                    title: 'Form submitted',
                    description: 'Your form submitted successfully',
                  });
                  updateState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    zipCode: '',
                    city: '',
                    state: '',
                    communityCount: '',
                    reason: '',
                    submitting: false,
                  });
                } catch (e) {
                  popAlert({
                    error: true,
                    title: 'Erorr',
                    description: 'Please make sure you filled all field then try again',
                  });
                  updateState({ submitting: false });
                }
              }}
            >Submit {state.submitting ? <span className="icon-refresh icon spinner" style={{ marginLeft: '.3em' }} /> : ''}
            </button>
          </form>

          <Footer />
        </div>
      </main>
    </Layout>
  );
};

export default ambassador;
