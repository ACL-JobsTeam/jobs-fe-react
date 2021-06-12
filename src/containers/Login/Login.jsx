import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const Login = () => {
const [redirect, setRedirect] = useState(false)
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')



const submit = async (e) => {
  e.preventDefault()

     await fetch('http://localhost:7890/api/v1/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify({
      username,
      password
    })

  })
  setRedirect(true)
}

if (redirect) {
  return <Redirect to='/dashboard' />
}

  return (
    <>
     <form onSubmit={submit}>
        <input placeholder="username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button type='submit'>click me</button>
      </form>
    </>
  );
};




export default Login;
