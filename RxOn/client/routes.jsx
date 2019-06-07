import React from 'react'
import LoginPage from "../imports/ui/LoginPage";
import PatientPage from "../imports/ui/PatientPage";
import { mount } from 'react-mounter';

FlowRouter.route('/createaccount', {
    name: 'createaccount',
    action(){
        mount( App, {
            content: <LoginPage/>
        })
    }

});

FlowRouter.route('/patientpage', {
    name: 'PatientPage',
    action(){
        mount( App, {
            content: <PatientPage />
        })
    }
})
