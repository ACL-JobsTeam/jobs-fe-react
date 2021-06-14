/* eslint-disable max-len */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';


const Login = ({ setLoading }) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [err, setErr] = useState('');
  
  

  const submit = async (e) => {
    e.preventDefault();
    const user = await fetch('http://localhost:7890/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        username,
        password
      })
    });

    const userData = await user.json();
    const userStatus = userData.status;
    
    if(userStatus === 'success') {
      setLoading('resolved');
      setRedirect(true);
    }
    if(userStatus === 'failed') {
      setErr('invalid');
    }
  };
  
  if(redirect) {
    return <Redirect to="/dashboard" />;
  }
  if(err === 'invalid') {
    setErr('incorrect username or password please ty again');
    
  }
  
  return (
    <>
      <h1>{err}</h1>
      <h2>Login page</h2>
      <Link to="/dashboard">dashboard</Link>
      <form onSubmit={submit}>
        <input placeholder="username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">click me</button>
      </form>
    </>
  );
};




export default Login;
