
import React from "react";

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


let AuthRoute = (props) => {
    const authenticated = props.authenticated
    const type = props.type;

    if (authenticated) {
        if (type === 'entrepreneur'){
            return <Navigate to='/home'/>
        } else if (type === 'investor') {
            return <Navigate to='/dashboard'/>
        } else {
            return <Outlet/>
        }
    } else {
        return <Outlet/>
    }
}

// let AuthRoute = (props) => {
//     const authenticated = props.authenticated
//     return authenticated ? <Navigate to='/home'/> : <Outlet/>   
// }

const mapStateToProps = (state) => ({
    authenticated: state.data.authenticated,
    type: state.data.type
})

AuthRoute.propTypes = {
    data: PropTypes.object
}

export default connect(mapStateToProps)(AuthRoute);

