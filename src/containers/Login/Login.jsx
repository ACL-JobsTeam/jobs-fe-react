/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import style from './login.module.css';

const Login = ({ setLoading }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const user = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const userData = await user.json();
    const userStatus = userData.status;

    if (userStatus === 'success') {
      setLoading('resolved');
      setRedirect(true);
    }
    if (userStatus === 'failed') {
      setErr('invalid');
    }
  };

  if (redirect) {
    return <Redirect to="/dashboard" />;
  }
  if (err === 'invalid') {
    setErr('Incorrect username or password please try again!');
  }

  return (
    <div className={style.loginCtn}>
      <div className={style.wave}></div>
      <div className={style.header}>
        <h2 className={style.logo}>aspir.io</h2>
        <div className={style.subtitle}>
          <span>
            track job applications
            <br />
            from email to offer.
          </span>
        </div>
      </div>

      <nav className={style.nav}></nav>
      <div>
        <span className={style.error}>{err}</span>
      </div>
      <form onSubmit={submit} className={style.signupForm} autoComplete="off">
        <h3>Sign In To Your Account</h3>
        <section className={style.userInputs}>
          <div>
            <TextField
              id="outlined-basic"
              label="username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
              className={style.usernameInput}
            />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
          </div>
        </section>
        <section>
          <button type="submit" className={style.login}>
            Login
          </button>
          <Link to="/register">
            <button className={style.register}>Register</button>
          </Link>
        </section>
      </form>
    </div>
  );
};

Login.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default Login;
