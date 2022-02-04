
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
import ProfileCard from '../components/entrepreneur/ProfileCard';
import RessourcesCard from '../components/entrepreneur/RessourcesCard';
import ApplicationsCard from '../components/entrepreneur/ApplicationsCard';
import PotentialsCard from '../components/entrepreneur/PotentialsCard';
import MatchesCard from '../components/entrepreneur/MatchesCard';
import AboutCard from '../components/entrepreneur/AboutCard';


let DashboardEntrepreneur = (props) => {

    let {data: {user: {fullName, image}}} = props

    return (
        <Fragment>
            <DashHead image={MontrealNight} name={fullName} title={'Dashboard'} profile="none"/>

            <Grid container component="main" 
                sx={{ height: '40vh'}} 
                spacing={5}  
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                >
                <Grid
                    container
                    item
                    xs={12} sm={12} md={6} lg={5}
                    direction="column"
                    justifyContent="center"
                >
                    <ProfileCard/>
                    {/* <ApplicationsCard/> */}
                    <MatchesCard/>
                </Grid>

                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="center"
                    xs={12} sm={12} md={4}
                >
                    <RessourcesCard/>
                    <PotentialsCard/>
                    {/* <AboutCard/>  */}
                </Grid>

                
            </Grid>
        </Fragment>
    )
}

DashboardEntrepreneur.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (DashboardEntrepreneur);