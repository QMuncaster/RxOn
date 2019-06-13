import React from 'react';
import { Router, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'
// import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Login from '../imports/ui/LoginPage';
import Patient from '../imports/ui/PatientPage';
import PatientProfile from '../imports/ui/PatientProfile';
import Navbar from "../imports/ui/Navbar";
import PharmacyProfile from '../imports/ui/PharmacyProfile';
import SignupPage from '../imports/ui/SignupPage';
import PatientPage from '../imports/ui/PatientPage';

// const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <div>
        <BrowserRouter>
        <Navbar/>
    
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/createaccount" component={Login}/>
            <Route exact path="/home" component={PatientPage}/>
            <Route exact path="/patient" component={Patient}/>
            <Route exact path="/patient/profile" component={PatientProfile}/>
            <Route exact path="/pharmacy/profile" component ={PharmacyProfile}/>
            <Route exact path="/signup" component = {SignupPage}/>
        </Switch>
    </BrowserRouter>
    </div>
);
