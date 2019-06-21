import React from "react";
import { Switch } from "react-router";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
// import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Login from "../imports/ui/LoginPage";
import Patient from "../imports/ui/PatientPage";
import PatientProfile from "../imports/ui/PatientProfile";
import Navbar from "../imports/ui/Navbar";
import PharmacyProfile from "../imports/ui/PharmacyProfile";
import SignupPage from "../imports/ui/SignupPage";
import PatientPage from "../imports/ui/PatientPage";
import Login2 from "../imports/ui/login_components/Login";
// const browserHistory = createBrowserHistory();

export const renderRoutes = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login2} />
        <Route exact path="/createaccount" component={Login} />
        <Route exact path="/home" component={PatientPage} />
        <Route exact path="/patient" component={Patient} />
        <Route exact path="/patient/profile" component={PatientProfile} />
        <Route exact path="/pharmacy/profile" component={PharmacyProfile} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

// renderRoutes.propTypes = {
//   store: PropTypes.object.isRequired
// };
