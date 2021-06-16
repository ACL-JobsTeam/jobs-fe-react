import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from '../../containers/Registration/Register';
import Login from '../../containers/Login/Login';
import Search from '../../containers/Search/Search';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Detail from '../../containers/Detail/Detail';
import { Redirect } from 'react-router-dom';




export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState('pending');


 

  function AuthRoute({ user, component: Component, path, ...props }) {
    const fetchUser = async () => { 
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/getuser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if(res.status === 200) {
        const userdata = await res.json();
       
        setUser(userdata.user.userName);
        setLoading('resolved');
      }
      if(res.status !== 200) {
        setLoading('rejected');
      }
      
     
          
    };

    fetchUser();
    if(!user && loading === 'rejected'){
      return <Redirect to="/"/>;
    } 
    return (
      <Route exact path={path} {...props}>
        <Component />
      </Route>
    );
  }

  return (
    <Router>
      <Switch>
        <Route exact path={'/'} render={(props) => <Login {...props} setLoading={setLoading}/>}/> 
        <Route exact path={'/register'} component={Register} />
        <AuthRoute path="/search" component={Search} user={user}/> 
        <AuthRoute path="/details/:id" component={Detail} user={user} />
        <AuthRoute path="/dashboard" component={Dashboard} user={user} />
        <div>401</div>
      </Switch>
    </Router>
  );
}
