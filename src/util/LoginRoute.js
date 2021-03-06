
import React from "react";

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


let LoginRoute = (props) => {
    const authenticated = props.authenticated
    return authenticated ? <Outlet/>  : <Navigate to='/login'/>
}

const mapStateToProps = (state) => ({
    authenticated: state.data.authenticated
})

LoginRoute.propTypes = {
    data: PropTypes.object
}

export default connect(mapStateToProps)(LoginRoute);

