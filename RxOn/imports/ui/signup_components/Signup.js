import React, { Component } from "react";
import SignupForm from "./SignupForm";
import Typography from '@material-ui/core/Typography';

class Signup extends Component {

    render() {
        return (
            <div>
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

export default Signup;