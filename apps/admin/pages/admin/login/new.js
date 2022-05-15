import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Fn } from '@abule-common/components';
import { allowAccess } from '../../../redux/admin/actions';

const {
  isEmpty, popMessage,
} = Fn;

const NewLogin = () => {
  const [formState, setFormState] = useState({
    password: '',
    confirmPassword: '',
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (
      formState.password !== formState.confirmPassword
      && !isEmpty(formState.password)
      && !isEmpty(formState.confirmPassword)) {
      setErrorState(true);
      setErrorMessage('Passwords do not match');
    } else {
      setErrorState(false);
      setErrorMessage('');
    }
  }, [formState.confirmPassword, formState.password]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formState;
    const { qlk, uvw, xyz } = router.query;
    const params = {};
    if (qlk) params.qlk = qlk;
    if (uvw) params.uvw = uvw;
    if (xyz) params.xyz = xyz;
    if (password === confirmPassword) {
      try {
        const { data, status } = await axios({
          method: 'POST',
          url: `${process.env.REACT_APP_API}/admin/set-new-password`,
          data: {
            password,
            confirmPassword,
          },
          params,
        });
        if (status === 200 || status === 202) {
          if (uvw) {
            dispatch(allowAccess(data.data));
            router.push('/admin/users');
            return;
          }
          popMessage(
            `<div>
                              <img src='/icons/success-ico.svg' alt='icon'>
                              <span>Success</span> 
                              <div>Password has been changed</div>
                          </div>`,
            'popMessage',
          );
          return setTimeout(() => router.push('/admin/login'), 5000);
        }
        return;
      } catch (e) {
        console.log(e);
        if (uvw) {
          setErrorState(true);
          setErrorMessage('Invite cannot be verified');
        } else {
          setErrorState(true);
          setErrorMessage('Password change failed');
        }
      }
    } else {
      setErrorState(true);
      setErrorMessage('Passwords do not match');
    }
  };

  return (
    <div className="adminApp_container">
      <Head>
        <title>Login - Set Password</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="root" className="adminApp_main">
        <img src="/logo_full.png" alt="logo" />
        <div className="adminApp_header">
          <h2>Log In</h2>
          <p className="adminApp_text_gray adminApp_text_semibold">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="adminApp_form">
          <div className="adminApp_inputContainer">
            <label className="adminApp_text_gray adminApp_label adminApp_text_sm adminApp_text_bold" htmlFor="password">
              New Password
            </label>
            <input
              className={`adminApp_input ${errorState ? 'adminApp_inputError' : ''}`}
              id="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              type="password"
              required
              placeholder="Password"
            />
          </div>

          <div className="adminApp_inputContainer">
            <label className="adminApp_label" htmlFor="confirmPassword">
              Confirm Password
              {
                errorState
                && (
                  <span>
                    <img src="/icons/error-ico.svg" alt="icon" />
                    <span>{errorMessage}</span>
                  </span>
                )
              }
            </label>
            <input
              className={`adminApp_input ${errorState ? 'adminApp_inputError' : ''}`}
              id="confirmPassword"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="adminApp_formButton">LOG IN</button>
        </form>
      </div>
    </div>
  );
};

export default NewLogin;
