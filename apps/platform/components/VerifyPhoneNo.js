import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import {
  PopMessage, Fn,
} from '@abule-common/components';

const {
  formatPhoneNo, popAlert, ucFirst,
} = Fn;

const VerifyPhoneNo = ({
  fetchRequest,
  number,
  onClose = () => { },
  onSuccess = () => { },
}) => {
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [submitting, setSubmitting] = useState('');
  const timeOut = 180;
  const [timer, setTimer] = useState(timeOut);
  let count = timeOut;
  let Timer = null;
  const startTimer = () => {
    Timer = setInterval(() => {
      console.log('inside interval and timer is : ', timer);
      const newTimer = count - 1;
      if (newTimer === 0) {
        clearInterval(Timer);
      }
      count = newTimer;
      setTimer(newTimer);
    }, 1000);
  };
  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() => () => {
    clearInterval(Timer);
  }, []);

  const handleResend = async () => {
    try {
      await fetchRequest({
        url: `${process.env.REACT_APP_API}/auth/users/phone-verification`,
        method: 'POST',
        body: JSON.stringify({
          phoneNumber: formatPhoneNo(number),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      if (e.response.status === 400) {
        Router.push('/login');
      }
      // setState({ ...errors, submitting: false });

      console.log('got error: ', e);
    }
  };

  const submitToken = async () => {
    try {
      setSubmitting(true);
      await fetchRequest({
        url: `${process.env.REACT_APP_API}/auth/users/verify-otp`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otpCode: otp,
          phoneNumber: formatPhoneNo(number),
        }),
      });
      setSubmitting(false);
      clearInterval(Timer);

      onSuccess();
      /*  popAlert({
        title: ucFirst(lang.signUpSuccessful[preference.language]),
        description: `${lang.pleaseLogIn[preference.language]}.`,
      });
      Router.push(`${process.env.APP_URL}/sign-in`); */
      onClose();
    } catch (e) {
      /* if (e.response.status === 400) {
        setOtpError('invalid');
      }
      setSubmitting(false); */
      // setState({ ...errors, submitting: false });

      console.log('got error: ', e);
    }
  };

  const parseError = (field, type) => {
    if (field === 'otp') {
      switch (type) {
        case ('Invalid verification code'): return 'invalid code';
        case ('expired'): return 'code expired';
        default: return false;
      }
    }

    return false;
  };

  return (
    <PopMessage
      hideCloseIcon
      style={{ zIndex: '3' }}
      mainStyle={{ zIndex: '3' }}
      message={(
        <div id="verifyPhone">
          <div className="title">
            <p className="label">Verify Phone Number</p>
          </div>
          <p>We’ve sent an SMS to {formatPhoneNo(number)}.</p>
          <p>Please enter the one-time code below to verify your phone number.</p>
          <span
            className="second-action change-number"
            onClick={onClose}
          >Change number
          </span>

          <div className="otp-input">
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setOtpError(false);
              }}
              onFocus={(e) => e.target.select()}
            />
            {otpError && <span className="otp-error">{parseError('otp', otpError)}</span>}
          </div>

          <button
            type="button"
            className="btn btn-1"
            disabled={otp.length < 6}
            showLoader={submitting}
            onClick={submitToken}
          >
            VERIFY
          </button>
          {timer > 0
            ? <p id="small-text">try again in {timer} seconds</p>
            : (
              <span
                className="second-action"
                onClick={() => {
                  startTimer();
                  handleResend();
                }}
              >Resend code
              </span>

            )}
          <p className="helper-text">Your phone number will not be shown publicly.</p>
        </div>
      )}
      confirmButton={{
        show: false,
      }}
      cancelButton={{
        show: false,
      }}
      onCancel={() => {
        onClose();
      }}
    />

  );
};

export default VerifyPhoneNo;
