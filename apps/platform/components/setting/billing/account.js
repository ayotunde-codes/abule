import Link from 'next/link';
import React, { useState } from 'react';

export default function AccountDetails() {
  const [state, setstate] = useState();
  return (
    <div className="billing-card account">
      <h4>Account Details</h4>
      <div className="billing-info">
        <div className="bank-details">
          <h5 className="bank-name">WELLS FARGO</h5>
          <h5 className="bank-routing">ROUTING NUMBER</h5>
          <p className="bank-code">1098376</p>
        </div>
        <div className="bank-details">
          <h5 className="bank-name username">TOYOSI BABALOLA</h5>
          <h5 className="bank-routing accnt">ACCOUNT NUMBER</h5>
          <p className="bank-code accnt-number">7892888</p>
        </div>
        <Link href="/account/edit-account">
          <button
            type="button"
            className="btn btn-glass no-shadow bordered __pill action-button"
          >
            Update Account
          </button>
        </Link>
      </div>
    </div>
  );
}
