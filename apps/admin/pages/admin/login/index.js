import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';

import { Fn } from '@abule-common/components';
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import { allowAccess, denyAccess } from '../../../redux/admin/actions';

const {
    isEmail,
} = Fn;

const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [errorState, setErrorState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const admin = useSelector((state) => state.admin);

    const [formState, setFormState] = useState({
        login_email: '',
        login_password: '',
    });

    const handleChange = (e) => {
        const { value } = e.target;
        setFormState({
            ...formState,
            [e.target.name]: value,
        });
        if (errorState) {
            setErrorState(false);
            setErrorMessage('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEmail(formState.login_email)) {
                const res = await axios.post(`${process.env.REACT_APP_API}/admin/login`, {
                    email: formState.login_email.trim(),
                    password: formState.login_password,
                });
                console.log(res.data);
                if (res.data.data.token) {
                    dispatch(allowAccess(res.data.data));
                    admin.history === '' ? router.push('/admin/users') : router.push(admin.history);
                    return;
                }
                dispatch(denyAccess());
                return;
            }
        } catch (e) {
            dispatch(denyAccess());
            setErrorState(true);
            setErrorMessage('Admin could not be authenticated');
            console.log(e);
        }
    };

    return (
        <div className="adminApp_container">
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="adminApp_main">
                <img src="/logo_full.png" alt="logo" />
                <div className="adminApp_header">
                    <h2>Log In</h2>
                    <p className="adminApp_text_gray adminApp_text_semibold">Enter your email and password below</p>
                </div>

                <form onSubmit={handleSubmit} className="adminApp_form">
                    <div className="adminApp_inputContainer">
                        <label className="adminApp_label" htmlFor="login_email">
                            Email
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
                            id="login_email"
                            name="login_email"
                            value={formState.login_email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="adminApp_inputContainer">
                        <label className="adminApp_text_gray adminApp_label adminApp_text_sm adminApp_text_bold" htmlFor="login_password">
                            Password
                        </label>
                        <input
                            className={`adminApp_input ${errorState ? 'adminApp_inputError' : ''}`}
                            id="login_password"
                            name="login_password"
                            value={formState.login_password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <Link href="/admin/login/resetpassword">
                        <a className="adminApp_text_resetPassword">
                            Forgot password?
                        </a>
                    </Link>

                    <button type="submit" className="adminApp_formButton">LOG IN</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
