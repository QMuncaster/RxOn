import React from "react";
import { Switch } from "react-router";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';

// route components
import Login from "../imports/ui/LoginPage";
import Patient from "../imports/ui/PatientPage";
import PatientProfile from "../imports/ui/PatientProfile";
import Navbar from "../imports/ui/Navbar";
import PharmacyProfile from "../imports/ui/PharmacyProfile";
import SignupPage from "../imports/ui/SignupPage";
import PatientPage from "../imports/ui/PatientPage";
import Login2 from "../imports/ui/login_components/Login";
import App from "../imports/ui/prescription_modal/App"
const history = createBrowserHistory();

const unauthenticated = ['/', '/signup'];

export const handleAuthChange = (authenticated) => {
  const path = history.location.pathname;
  const requiresAuth = !unauthenticated.includes(path);
  if (requiresAuth && !authenticated) {
    history.replace('/login');
  }
};

// this code will autorun whenever theres a change to user id
Tracker.autorun(() => {
  const authenticated = !!Meteor.userId();
  handleAuthChange(authenticated);
});

export const renderRoutes = ({ store }) => (
  <Provider store={store}>
    <Router history = {history}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/app" component={App} />
        <Route exact path="/login" component={Login2} />
        <Route exact path="/createaccount" component={Login} />
        <Route exact path="/home" component={PatientPage} />
        <Route exact path="/patient" component={Patient} />
        <Route exact path="/patient/profile" component={PatientProfile} />
        <Route exact path="/pharmacy/profile" component={PharmacyProfile} />
        <Route exact path="/signup" component={SignupPage} />
        {/* <PrivateRoute authed={this.state.authed} exact path="/patient/profile" component={PatientProfile} /> */}
      </Switch>
    </Router>
  </Provider>
);