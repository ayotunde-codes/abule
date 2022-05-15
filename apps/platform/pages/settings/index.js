import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../../components/general/Layout';
import BillingPayment from '../../components/setting/billing';
import Credit from '../../components/setting/history';
import General from '../../components/setting/general';
import Referrals from '../../components/setting/Referrals';
import Preferences from '../../components/setting/Preferences';

const _PATHS = [
  'account',
  // 'subscription',
  'payments',
  'history',
  'preferences',
  'send a gift',
  'refer a friend',
];

export default function Settingspro(props) {
  const [State, setstate] = useState('account');

  const state = !_PATHS.includes(State) ? 'account' : State;

  useEffect(() => {
    const url = new URL(window.location.href);
    const path = new URLSearchParams(url.search).get('page');
    const check = _PATHS.indexOf(path);
    if (check > -1) setstate(path);
    // getPlans();
  }, [window.location.href]);

  const SetCurrentComponent = (arg) => {
    switch (arg) {
      case 'payments':
        return (
          <BillingPayment
            {...props}
            className="settings-section-container"
          />
        );
      case 'history':
        return (
          <Credit
            {...props}
            className="settings-section-container"
          />
        );
      case 'preferences':
        return (
          <Preferences
            {...props}
            className="settings-section-container"
          />
        );
      case 'refer a friend':
        return (
          <Referrals
            {...props}
            className="settings-section-container"
          />
        );

      default:
        // case 'general':
        return (
          <General
            {...props}
            className="settings-section-container"
          />
        );
    }
  };

  return (
    <Layout {...props}>
      <div id="settings">
        <div className="settings-container  page-container">
          <h1 className="title">Settings</h1>
          <div className="settings-content">
            <div className="settings-menu">
              {/* <a className="fa fa-bars" /> */}
              <div className="settings-menu-container">
                {_PATHS.map((list, ind) => {
                  const listPath = list.toLocaleUpperCase();
                  return (
                    <div
                      key={ind}
                      onClick={() => setstate(list)}
                      className={`settings-menu-item ${list === state ? 'active' : ''}`}
                    >
                      <Link href={`?page=${listPath.toLowerCase()}`}>
                        <a>{listPath}</a>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="settings-section">
              <div className="setting-section-title">{state}</div>
              {SetCurrentComponent(state)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
