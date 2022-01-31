
import React from "react";

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


let AuthRoute = (props) => {
    const authenticated = props.authenticated
    return authenticated ? <Navigate to='/home'/> : <Outlet/>   
}

const mapStateToProps = (state) => ({
    authenticated: state.data.authenticated
})

AuthRoute.propTypes = {
    data: PropTypes.object
}

export default connect(mapStateToProps)(AuthRoute);

