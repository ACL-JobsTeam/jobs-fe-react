/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import './login.css';

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
    setErr('incorrect username or password please ty again');
  }

  return (
    <div className="login-ctn">
      <div className="box">
        <div className="wave -three"></div>
      </div>
      <div className="header">
        <h2 className="logo">aspir.io</h2>
        <div className="subtitle">
          <span>
            track job applications
            <br />
            from email to offer.
          </span>
        </div>
      </div>

      <nav className="nav">
        <Link to="/dashboard">dashboard</Link>
        <Link to="/search">search</Link>
      </nav>
      <div>
        <span className="error">{err}</span>
      </div>
      <form onSubmit={submit} className="signup-form" autoComplete="off">
        <h3>Sign In To Your Account</h3>
        <section className="user-inputs">
          <div>
            <TextField
              id="outlined-basic"
              label="username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
              className="username-input"
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
          <button type="submit" className="login">
            Login
          </button>
          <Link to="/register">
            <button className="register">Register</button>
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
