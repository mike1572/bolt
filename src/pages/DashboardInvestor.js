
import React, {useState, Fragment} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {db, storage, auth} from '../firebaseConfig';
import {setDoc, doc, updateDoc } from 'firebase/firestore';


import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'


//MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Linked from '@mui/material/Link';

import MontrealNight from '../images/montreal.jpg'
import DashHead from '../components/DashHead'


let DashboardInvestor = (props) => {

    let {data: {user: {fullName, image}}} = props


    return (
        <Fragment>

        <DashHead image={MontrealNight} name={fullName} title={'Dashboard'} profile="none"/>



        </Fragment>
    )
}

DashboardInvestor.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (DashboardInvestor);