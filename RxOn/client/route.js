import React from 'react';
import { Router, Switch } from 'react-router';
import { BrowserRouter, Route } from 'react-router-dom'
// import createBrowserHistory from 'history/createBrowserHistory';

// route components
import Login from '../imports/ui/LoginPage';
import Patient from '../imports/ui/PatientPage';
import PatientProfile from '../imports/ui/PatientProfile';

// const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/createaccount" component={Login}/>
            <Route exact path="/patient" component={Patient}/>
            <Route exact path="/patient/profile" component={PatientProfile}/>
        </Switch>
    </BrowserRouter>
);