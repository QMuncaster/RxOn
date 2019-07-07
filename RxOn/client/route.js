import React from "react";
import { Switch } from "react-router";
import { Provider } from "react-redux";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';

// route components
import PatientProfile from "../imports/ui/PatientProfile";
import Navbar from "../imports/ui/Navbar";
import PharmacyProfile from "../imports/ui/PharmacyProfile";
import SignupPage from "../imports/ui/SignupPage";
import PatientPage from "../imports/ui/PatientPage";
import Login from "../imports/ui/login_components/Login";
import App from "../imports/ui/prescription_modal/App"
const history = createBrowserHistory();

// HANDLE AUTH FOR ROUTING
// Guide I followed:
// https://tylermcginnis.com/react-router-protected-routes-authentication/

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    // props is match, location, history, if we want to use in Component/Redirect
    Meteor.userId() ?
      <Component /> :
      <Redirect to='/login' />
  )
  } />
)

export const renderRoutes = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/app" component={App} />
        <PrivateRoute exact path="/" component={PatientPage} />
        <PrivateRoute exact path="/home" component={PatientPage} />
        <PrivateRoute exact path="/pharmacy/profile" component={PharmacyProfile} />
        <PrivateRoute exact path="/patient/profile" component={PatientProfile} />

        <Route exact path="/logout" render={() => {
          Meteor.logout((error) => {
            if (error) { alert(error) }
            history.push("/login");
          });
          return <Login />
        }} />

        <Route exact path="/login" render={() => (
          Meteor.userId() ?
            <Redirect to='/home' /> :
            <Login />
        )} />

        <Route exact path="/signup" component={SignupPage} />
        <Route render={() => (<h1>404 page not found</h1>)} />
      </Switch>
    </Router>
  </Provider>
);
