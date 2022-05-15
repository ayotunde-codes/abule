import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { useRouter } from 'next/router';
import { Fn, InputField } from '@abule-common/components';

import Layout from '../components/general/Layout';

const {
  popAlert,
} = Fn;

const UpdatePassword = ({ fetchRequest, setSessionUser, ...props }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNew, setConfirmNew] = useState('');
  const [equal, setEqual] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setEqual(confirmNew === newPassword);
  }, [confirmNew, newPassword]);

  const onSubmit = async () => {
    if (equal) {
      if (newPassword.length < 6) {
        popAlert({
          title: 'Warning',
          description: 'New password must be at least 6 symbols',
          error: false,
        });
      } else {
        setLoading(true);
        try {
          const form = JSON.stringify({ oldPassword, newPassword });
          const data = await fetchRequest({
            url: `${process.env.REACT_APP_API}/reset-password`,
            method: 'PATCH',
            body: form,
            headers: { 'Content-Type': 'application/json' },
          });
          if (data.message && data.message.length) {
            setSessionUser(false);
            router.push(props.AppUrl`?alert-status=success&alert-title=Password changed successfully&alert-message=${data.message}`);
          }
        } catch (e) {
          console.log(e);
          if (e && e.data && e.data.status === 400) {
            popAlert({
              title: 'Error',
              description: e.data.message,
              error: true,
            });
          }
          setLoading(false);
        }
      }
    }
  };

  return (
    <Layout {...props}>
      <div id="forgotPassword" className="auth-form is-page update-password">
        <h1 className="content-title update-password-title">Update Password</h1>

        <div className="content">
          <div className="form forgot-password">
            <div className="fields">
              <div className="form-content">
                <InputField
                  type="password"
                  label={(
                    <>
                      Enter Current Password
                    </>
                  )}
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(value) => setOldPassword(value)}
                />
                <InputField
                  type="password"
                  label={(
                    <>
                      Enter New Password
                    </>
                  )}
                  placeholder="New password"
                  value={newPassword}
                  onChange={(value) => setNewPassword(value)}
                />
                <InputField
                  type="password"

                  label={(
                    <>
                      Confirm Password
                      <span className={equal ? 'success' : 'error'}>
                        {(newPassword.length
                          && confirmNew.length
                          && !equal)
                          ? ': password are not equal'
                          : ''}
                      </span>
                    </>
                  )}
                  placeholder="Confirm password"
                  value={confirmNew}
                  onChange={(value) => setConfirmNew(value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-1 proceed-btn"
                onClick={onSubmit}
              >
                <span> CONTINUE </span>
                {loading ? <span className="icon-refresh icon spinner" /> : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

UpdatePassword.propTypes = {
  fetchRequest: func.isRequired,
  setSessionUser: func.isRequired,
};

const mapStateToProps = ({ settings }) => ({ settings });

export default connect(mapStateToProps)(UpdatePassword);
