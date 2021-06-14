import React, { useState } from 'react';
import { Redirect } from 'react-router';

const Register = () => {
  const [username, setUserame] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [usernameErr, setUsernameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
 
  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:7890/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });
    const json = await res.json();
    const details = json.details;
    
    
    if(details === 'email already in use') {
      setEmailErr('email invalid');
    }
    
    if(details === 'username already in use') {
      setUsernameErr('username invalid');
    }
    if(details === 'created user') {
      setRedirect(true);
    }
  };

  

  if(redirect) {
    return <Redirect to={'/'} />; 
  }
  if(usernameErr === 'username invalid') {
    setUsernameErr('sorry that username is taken');
  }
  if(emailErr === 'email invalid') {
    setEmailErr('sorry that email is taken');
  }
  return (
    <>
      <p>This is the Registration Page!</p>
      <div>{usernameErr}{emailErr}</div>
      <form onSubmit={submit}>
        <input placeholder="name" onChange={e => setUserame(e.target.value)} />
        <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">click</button>
      </form>
    </>
  );
};

export default Register;
