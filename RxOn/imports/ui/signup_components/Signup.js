import React, { Component } from "react";
import SignupForm from "./SignupForm";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Signup extends Component {

    render() {
        return (
            <div>
             
                <div>
                    <br />
                    <Button variant="contained" color="primary" to="/">
                        LOGIN
                    </Button>
                </div>
                
                <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 75 }}>
                <Typography variant="h2" gutterBottom>
                    SignUp Page
                </Typography>
                    <SignupForm />
                </div>
            </div>
        );
    }
}

export default Signup;