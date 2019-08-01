import React, { Component } from "react";
import SignupForm from "./SignupForm";

class Signup extends Component {

render() {
    return (
        <div>
            <div>
                <h1>RxOn Signup</h1>
                <SignupForm />
            </div>
        </div>
    );
}
}

export default Signup;