import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// route components
import Header from '../../ui/layouts/Header.js';
import PatientProfile from '../../ui/patient_components/PatientProfile';
import PatientList from '../../ui/pharmacist_components/PatientList';
import SignupPage from '../../ui/signup_components/Signup';
import HomeComponent from '../../ui/layouts/HomeComponent';
import Login from '../../ui/login_components/Login';

// Styling components
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import themes from '../../ui/mui_theme/theme';
import CssBaseline from '@material-ui/core/CssBaseline';


const history = createBrowserHistory();
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
        <Route
            exact
            path="/login"
            render={() => (Meteor.userId() ? <Redirect to="/home" /> : <Login />)}
        />
    </div>
);

const MainContainer = () => (
    <div className="main-container">
        <Header />
        {/* shared route, different component based on user */}
        <PrivateRoute exact path="/" component={HomeComponent} />
        <PrivateRoute exact path="/home" component={HomeComponent} />
        <PrivateRoute exact path="/profile" component={PatientProfile} />
        <PrivateRoute exact path="/patients" component={PatientList} />
    </div>
);

export const renderRoutes = ({ store }) => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router history={history}>
                <CssBaseline />
                <Switch>
                    <Route exact path="/login" component={LoginContainer} />
                    <Route
                        exact
                        path="/logout"
                        render={() => {
                            Meteor.logout(error => {
                                if (error) {
                                    alert(error);
                                }
                            });
                            return <Login />;
                        }}
                    />
                    <Route exact path="/signup" component={SignupPage} />
                    {/* Has to be at the very bottom*/}
                    <Route component={MainContainer} />
                </Switch>
            </Router>
        </Provider>
    </MuiThemeProvider>
);
