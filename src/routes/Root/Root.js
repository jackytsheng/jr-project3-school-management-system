import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Login from "../../components/Login";
import User from "./../User";

//TODO: handling jwt expire and redirect to login. need info about expiration.

export default () => (
  <Router basename={process.env.PUBLIC_URL + '/'}>
    <Switch>
      <Route path={process.env.PUBLIC_URL + "/login"} exact>
        <Login />
      </Route>
      <User />
    </Switch>
  </Router>
);