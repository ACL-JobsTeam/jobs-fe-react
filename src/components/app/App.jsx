import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import Register from '../../containers/Registration/Register';
import Login from '../../containers/Login/Login';
import Search from '../../containers/Search/Search';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Detail from '../../containers/Detail/Detail';




export default function App() {
  
  
  
  return (
    <Router>
      <Switch>
        
        
        <Route exact path={'/'} component={Login} /> 
        <Route exact path={'/dashboard'} component={Dashboard} /> 
        <Route exact path={'/register'} component={Register} />
        <Route exact path={'/search'} component={Search} /> 
        <Route exact path={'/details/:id'} component={Detail} />
        
      </Switch>
    </Router>
  );
}
