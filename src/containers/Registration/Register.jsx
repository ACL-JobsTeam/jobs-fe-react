import React, { useState } from 'react';
import { Redirect } from 'react-router';

const Register = () => {
  const [username, setUserame] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const submit = async (e) => {
    e.preventDefault()

     await fetch('http://localhost:7890/api/v1/auth/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

   setRedirect(true)
  }

  

  if(redirect) {
    return <Redirect to={'/login'} /> }
 
    return (
    <>
      <p>This is the Registration Page!</p>
      <form onSubmit={submit}>
        <input placeholder="name" onChange={e => setUserame(e.target.value)} />
        <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button type='submit'>click</button>
      </form>
    </>
  );
};

export default Register;
