
import React from "react";

import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';

const ErrorRoute = () => (

    <Grid container>
        <Grid item xs={12} sx={{textAlign: 'center', mt: 3}}>
            <h1>404 - Not Found!</h1>
            <Link to="/" className="goHome">
                <h3>Go Home</h3>
            </Link>
        </Grid>
    </Grid>

);


export default ErrorRoute;