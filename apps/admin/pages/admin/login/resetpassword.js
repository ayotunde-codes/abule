import Head from 'next/head';
import { useState } from 'react';
import axios from 'axios';

import { Fn } from '@abule-common/components';

const {
  isEmail, isEmpty, popMessage, popAlert,
} = Fn;

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isEmail(email)) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/admin/forgot-password`,
          { email },
        );
        if (res.status === 200) {
          return popMessage(
            `<div>
                            <img src='/icons/success-ico.svg' alt='icon'>
                            <span>Success</span> 
                            <div>Instruction on how to reset your <br/> password has been sent to your email</div>
                        </div>`,
            'adminApp_message',
          );
        }
        return popMessage(
          `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Your password has not been changed</div>
                    </div>`,
          'adminApp_message',
        );
      } catch (error) {
        return popMessage(
          `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Your password has not been changed</div>
                    </div>`,
          'adminApp_message',
        );
      }
    }
  };

  const onChange = (e) => {
    setEmail(e.target.value.trim());
  };
  return (
    <div className="adminApp_container">
      <Head>
        <title>Reset password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="root" className="adminApp_main">
        <img src="/logo_full.png" alt="logo" />
        <div className="adminApp_header">
          <h2>Reset password</h2>
          <p className="adminApp_text_gray adminApp_text_semibold">Enter your email below</p>
        </div>

        <form onSubmit={onSubmit} className="adminApp_form">
          <div className="adminApp_inputContainer">
            <label className="adminApp_text_gray adminApp_label adminApp_text_sm adminApp_text_bold" htmlFor="login_email">
              Email
            </label>
            <input
              className="adminApp_input"
              id="login_email"
              name="login_email"
              type="email"
              placeholder="Email Address"
              onChange={onChange}
              value={email}
              required
            />
          </div>

          <button type="submit" className="adminApp_formButton">RESET PASSWORD</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
