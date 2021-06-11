import React, {useState} from 'react';
import { Redirect } from 'react-router';

const Login = () => {

const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [redirect, setRedirect] = useState(false)

const submit = async (e) => {
  e.preventDefault()

   await fetch('http://localhost:7890/api/v1/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username,
      password
    })
  })

  setRedirect(true)
}
if(redirect) {
  return <Redirect to={'/'} /> }


 

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
