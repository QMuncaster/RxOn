import React from 'react';
import Typography from '@material-ui/core/Typography';
import ProfileView from './ProfileView';

class PatientProfile extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ paddingLeft: 150, paddingRight: 150, paddingTop: 75 }}>
                    <Typography variant="h3" gutterBottom>
                        Profile
                    </Typography>
                    <ProfileView />
                </div>
            </React.Fragment>
        );
    }
}

export default PatientProfile;
