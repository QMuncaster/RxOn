import React, { Component } from "react";
import SignupForm from "./SignupForm";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";

class Signup extends Component {

    handleReturn = () => {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 25}}>
                    <Button variant="contained" color="default" onClick={this.handleReturn}>
                        Return to Login
                    </Button>
                </div>

                <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 75 }}>
                <br />
                <Typography variant="h2" gutterBottom>
                    SignUp for RxOn
                </Typography>
                    <SignupForm />
                </div>
            </div>
        );
    }
}

export default withRouter(Signup);