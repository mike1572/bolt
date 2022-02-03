



import React, {Fragment, useEffect, useState} from 'react'
import {db, storage, auth} from '../../firebaseConfig';
import {setDoc, doc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'
import {updateImage, editProfilePersonal} from '../../redux/dataActions'


import Linked from '@mui/material/Link';
//MUI
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip'
import WorkIcon from '@mui/icons-material/Work';
import Button from '@mui/material/Button';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link/'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';

import MontrealNight from '../../images/montreal.jpg'
import DashHead from '../../components/DashHead';
import MatchesCardInvestor from '../../components/investor/MatchesCardInvestor'

import DialogPersonalProfile from '../../components/entrepreneur/DialogPersonalProfile'
import Chat from '../../components/Chat'

let SocialInvestor = (props) => {

    let [openDialog, setOpenDialog] = useState(false)

    let {data: {user: {fullName, image, email, facebook, profession, github, linkedin, bio}, userId}} = props

    return (
        <Fragment>
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
                xs={12} sm={12} md={5} lg={5}
                direction="column"
                justifyContent="center"
            >
                <MatchesCardInvestor/>
            </Grid>

            <Grid
                container
                item
                direction="column"
                justifyContent="center"
                xs={12} sm={12} md={6}
            >
                <Chat/>
            </Grid>


        </Grid>
    </Fragment>
    )
}


SocialInvestor.propTypes = {
    data: PropTypes.object.isRequired,
    updateImage: PropTypes.func.isRequired,
    editProfilePersonal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data, 
})

const mapActionsToProps = {
    updateImage,
    editProfilePersonal
}

export default connect(mapStateToProps, mapActionsToProps) (SocialInvestor);







