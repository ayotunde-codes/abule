import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/general/Layout';

const CashOut = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="cash-out page-container">
        <h1>Cash Out</h1>

        <div className="cash-out-container">
          <div className="details-container">
            <div>
              <h3>DETAILS</h3>
            </div>
            <div>
              <div className="credits">
                <h2>BILLING PERIOD</h2>
                <h2>JULY 28 - AUGUST 28</h2>
                <div className="credits-container">
                  <div className="left-side">
                    <div>
                      <h3>Cashable Hours</h3>
                      <h3 className="timberline-font">185</h3>
                    </div>
                    <div>
                      <h3>Transaction Fee</h3>
                      <h3 className="timberline-font">12.50</h3>
                    </div>
                  </div>
                  <div className="right-side">
                    <div>
                      <h3>Cashable Amount</h3>
                      <h3 className="timberline-font">125.00</h3>
                    </div>
                    <div>
                      <h3>Deposit Amount</h3>
                      <h3 className="timberline-font">112.50</h3>
                    </div>
                  </div>
                </div>
                <div>
                  <p>*U.S. Dollars</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pm-container">
            <div>
              <h3>PAYMENT METHOD</h3>
            </div>
            <div>
              <h2>SELECT A DEPOSIT ACCOUNT</h2>
              <div className="btns-container">
                <button
                  type="button"
                  className="btn btn-3 proceed-btn"
                >
                  <span> PAYPAL </span>
                  {/* {editProfile.submitting ? <span className="icon-refresh icon spinner" /> : ''} */}
                </button>
                <button
                  type="button"
                  className="btn btn-1 proceed-btn"
                >
                  <span> VENMO </span>
                  {/* {editProfile.submitting ? <span className="icon-refresh icon spinner" /> : ''} */}
                </button>
                <button
                  type="button"
                  className="btn btn-negative proceed-btn"
                >
                  <span> CASH APP </span>
                  {/* {editProfile.submitting ? <span className="icon-refresh icon spinner" /> : ''} */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CashOut;
