import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';

class AuthorizationRoute extends React.Component {
    
    render() {
        if (!localStorage.getItem("basicAuth"))
            return <Redirect to="/login" />;

        return <Redirect to="/home" />;
    }
}

export default withRouter(AuthorizationRoute);