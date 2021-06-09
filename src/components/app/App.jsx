import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from '../../containers/WelcomePage/Welcome';
import Search from '../../containers/SearchPage/Search';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Details from '../../containers/DetailPage/Details';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={Welcome} />
        <Route exact path={'/search'} component={Search} />
        <Route exact path={'/dashboard'} component={Dashboard} />
        <Route exact path={'/details/:id'} component={Details} />
      </Switch>
    </Router>
  );
}
