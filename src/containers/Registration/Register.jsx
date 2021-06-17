import React, { useState } from 'react';
import { Redirect } from 'react-router';
import TextField from '@material-ui/core/TextField';
import '../Login/login.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [usernameErr, setUsernameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    );
    const json = await res.json();
    const details = json.details;

    if (details === 'email already in use') {
      setEmailErr('email invalid');
    }

    if (details === 'username already in use') {
      setUsernameErr('username invalid');
    }
    if (details === 'created user') {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to={'/'} />;
  }
  if (usernameErr === 'username invalid') {
    setUsernameErr('sorry that username is taken');
  }
  if (emailErr === 'email invalid') {
    setEmailErr('sorry that email is taken');
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
      <div className="nav">
        {usernameErr}
        {emailErr}
      </div>
      <form onSubmit={submit} className="signup-form register-form">
        <section className="user-inputs">
          <h3>Registration</h3>
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
              label="email"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              className="password-input"
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
          <button type="submit" className="register">
            Register
          </button>
        </section>
      </form>
    </div>
  );
};

export default Register;
