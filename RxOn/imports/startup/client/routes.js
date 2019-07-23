import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// route components
import Header from '../../ui/layouts/Header.js';
import PatientProfile from '../../ui/patient_components/PatientProfile';
import MedicationsPage from '../../ui/patient_components/MedicationsPage';
import ImageUpload from '../../ui/patient_components/ImageUpload';
import PatientList from "../../ui/pharmacist_components/PatientList";
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
            Meteor.userId() ? <Component /> : <Redirect to="/login" />
        }
    />
);

const theme = createMuiTheme({
    ...themes,
    typography: {
        useNextVariants: true,
    },
});

const LoginContainer = () => (
    <div className="login-container">
        <Route exact path="/login" render={() => (Meteor.userId() ? <Redirect to="/home" /> : <Login />)} />
    </div>
);

const MainContainer = () => (
    <div className="main-container">
        <Header/>
        <PrivateRoute exact path="/" component={MedicationsPage} />
        <PrivateRoute exact path="/home" component={MedicationsPage} />
        <PrivateRoute exact path="/pharmacy/table" component={PrescriptionTable} />
        <PrivateRoute exact path="/patient/profile" component={PatientProfile} />
        <PrivateRoute exact path="/pharmacy/patients" component={PatientList} />
        <PrivateRoute exact path="/image-upload" component={ImageUpload} />
    </div>
);

export const renderRoutes = ({ store }) => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router history={history}>
                <CssBaseline />
                <Switch>
                    <Route exact path="/(login)" component={LoginContainer} />
                    <Route
                        exact
                        path="/logout"
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
                    <Route exact path="/signup" component={SignupPage} />
                    {/* Has to be at the very bottom*/}
                    <Route component={MainContainer}/>
                </Switch>
            </Router>
        </Provider>
    </MuiThemeProvider>
);
