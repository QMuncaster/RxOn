import React from 'react';
import { Switch } from 'react-router';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// route components
import Header from '../../ui/layouts/Header.js';
import PatientProfile from '../../ui/patient_components/PatientProfile';
import PatientPage from '../../ui/patient_components/PatientPage';
import Medications from '../../ui/patient_components/MedicationsPage';
import PharmacyProfile from '../../ui/pharmacist_components/PharmacyProfile';
import PrescriptionTable from '../../ui/pharmacist_components/PrescriptionTable';
import SignupPage from '../../ui/SignupPage';
import Login from '../../ui/login_components/Login';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes from '../../ui/mui_theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';

const history = createBrowserHistory();

// HANDLE AUTH FOR ROUTING
// Guide I followed:
// https://tylermcginnis.com/react-router-protected-routes-authentication/

const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route
      {...rest}
      render={props =>
         // props is match, location, history, if we want to use in Component/Redirect
         Meteor.userId() ? <Component /> : <Redirect to='/login' />
      }
   />
);

const theme = createMuiTheme({
   ...themes,
   typography: {
      useNextVariants: true,
   },
});

export const renderRoutes = ({ store }) => (
   <MuiThemeProvider theme={theme}>
      <Provider store={store}>
         <Router history={history}>
            <CssBaseline />
            {/*Putting header here for now, need to fix routes so that header shows
            at every page. React router allows for this*/}
            <Header />
            <Switch>
               <PrivateRoute exact path='/' component={PatientPage} />
               <PrivateRoute exact path='/home' component={PatientPage} />
               <PrivateRoute exact path='/pharmacy/profile' component={PharmacyProfile} />
               <PrivateRoute exact path='/pharmacy/table' component={PrescriptionTable} />
               <PrivateRoute exact path='/patient/profile' component={PatientProfile} />
               <PrivateRoute exact path='/playground' component={Medications} />
               <Route
                  exact
                  path='/logout'
                  render={() => {
                     Meteor.logout(error => {
                        if (error) {
                           alert(error);
                        }
                        history.push('/login');
                     });
                     return <Login />;
                  }}
               />
               <Route
                  exact
                  path='/login'
                  render={() => (Meteor.userId() ? <Redirect to='/home' /> : <Login />)}
               />
               <Route exact path='/signup' component={SignupPage} />
               <Route render={() => <h1>404 page not found</h1>} />
            </Switch>
         </Router>
      </Provider>
   </MuiThemeProvider>
);
