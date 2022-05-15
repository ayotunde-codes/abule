import React, { useEffect, useState } from 'react';
import {
  InputField
} from '@abule-common/components';

export default function Accounts({ type }) {
  const [state, setstate] = useState({
    header: '',
    title: '',
    desc: '',
    button: '',
  });
  useEffect(() => {
    switch (type) {
      case 'edit-account':
        setstate({
          header: 'Update Account',
          title: 'Account Details',
          desc: 'Update your bank account details to deposit your funds',
          button: 'UPDATE',
        });
        return;

      default:
        setstate({
          header: 'Add Account',
          title: 'Account Information',
          desc: 'Enter your bank account and routing number for payouts',
          button: 'SAVE',
        });
    }
  }, []);
  return (
    <div className="account-container page-container">
      <h2>{state.header}</h2>
      <div className="account-inputs">
        <h4>{state.title}</h4>
        <p>{state.desc}</p>
        <form className="account-form">
          <label htmlFor="Select Bank">
            <p className="account-label">Select Bank</p>
            <InputField classname="account-input" />
          </label>
          <label htmlFor="Routing Number">
            <p className="account-label">Routing Number</p>
            <InputField classname="account-input" />
          </label>
          <label htmlFor="Routing Number">
            <p className="account-label">Account Number</p>
            <InputField classname="account-input" />
          </label>
        </form>
      </div>
      <button className="btn btn-1 account-btn">{state.button}</button>
    </div>
  );
}
