import Link from 'next/link';
import React from 'react';
import AccountDetails from './account';
import CardDetails from './card';

export default function BillingPayment(props) {
  return (
    <div id="settingsPayment" className={`${props.className}`}>
      <CardDetails {...props} />
      {/* <AccountDetails /> */}
      {/* <div className="billing-card add-acc">
        <h4>Account Details</h4>
        <p>Add your bank account details for future payouts</p>
        <Link href="/account/edit-account">
          <button
            type="button"
            className="btn btn-glass no-shadow bordered __pill action-button"
          >
            Add Account
          </button>
        </Link>
      </div> */}
    </div>
  );
}
