


import React, {Fragment, useEffect, useState} from 'react'
import {db, storage, auth} from '../../firebaseConfig';
import {setDoc, doc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'
import {updateImage, editProfilePersonal, deleteBusinessDialog} from '../../redux/dataActions'


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

import DialogInvestorProfile from '../../components/investor/DialogInvestorProfile'
import DialogDelete from '../../components/entrepreneur/DialogDelete'
import DashHead from '../../components/DashHead';

import Startup from '../../images/montreal.jpg'

import DialogAddBusiness from '../../components/entrepreneur/DialogAddBusiness'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';


function tocurrency(value) {
    value = (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return `${value}`;
}

let InvestorProfile = (props) => {

    let [openDialog, setOpenDialog] = useState(false)

    let {data: {user: {fullName, image, email, facebook, profession, github, linkedin, bio, businesses, 
        company, typeOfBusiness, fundingStage, pitch, industr, location, funding}, userId}
    } = props


    // TODO
    // display in profile

    // type of business interested
    // funding stage interested
    // location 
    // funding budget
    // industry interested
    // pitch




    let handleImageChange = (event) => {
        // select first file in the array
        const image = event.target.files[0]
        // send to server

        console.log(image)

        let storageRef = ref(storage, `images/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on(
            "state_changed",
            snapshot => {}, 
            error => {
                console.log(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    updateDoc(doc(db, "users", userId), {
                        image: downloadURL      
                    })
                    .then(() => {
                        props.updateImage(downloadURL)
                    })
                });
            }
        )

    }

    let handleEditImage = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }

    let handleEditClick = () => {
        props.editProfilePersonal(true)
    }

    let companyIcon;

    if (company !== null && company !== undefined){
        companyIcon = (
            <ListItem key="company" sx={{color: 'warning.main'}}>
                <CorporateFareIcon sx={{mr: 2}}/>
                <ListItemText primary={company} />
            </ListItem>
        )
    } else {
        companyIcon = (
            <Fragment></Fragment>
        )
    }

    let professionIcon;

    if (profession !== null && profession !== undefined){
        professionIcon = (
            <ListItem key="profession" sx={{color: 'warning.main'}}>
                <WorkIcon sx={{mr: 2}}/>
                <ListItemText primary={profession} />
            </ListItem>
        )
    } else {
        professionIcon = (
            <Fragment></Fragment>
        )
    }


    let bioIcon;
    if (bio !== null && bio !== undefined){
        bioIcon = (
            <ListItem key="bio" sx={{mt: 2, color: 'warning.main'}}>
                <ListItemText>
                    <Typography variant="body1">" {bio} "</Typography>
                </ListItemText>
            </ListItem>
        )
    } else {
        bioIcon = (
            <Fragment></Fragment>
        )
    }


    let linkedinIcon; 

    if (linkedin !== null && linkedin !== undefined){
        
        linkedinIcon = (
            <Link href={linkedin} rel="noreferrer" target="_blank" sx={{color: 'white', ml: -1}} >
                <Tooltip title={linkedin} placement="bottom" arrow >
                    <LinkedInIcon sx={{mr: 1, mb: 1}} fontSize="large" />  
                </Tooltip>
            </Link>
        )
    } else {
        linkedinIcon = (
            <Fragment></Fragment>
        )
    }


    let handleDelete = (event) => {
        props.deleteBusinessDialog(true, event.target.name)
    }

    return (

        <Fragment>
          
            <DashHead image={Startup} title='Profile' display="none" profile="none" />
            <DialogAddBusiness/>
            <DialogDelete/>
            <DialogInvestorProfile open={openDialog}/>
            <Grid container spacing={3} 
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
            <Grid item sx={{mb: 5}} xs={12} md={6} lg={5}>
                <Paper component="main" elevation={6} 
                    style={{margin: '25px auto 0 auto', padding:  '0 15% 5% 15%'}} 
                    sx={{backgroundColor: 'primary.main'}}
                    >
                    <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        
                    }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                            <AccountCircle />
                        </Avatar> */}
                        <Typography variant='h5' sx={{color: 'warning.main', mt: 5, mb: 4}}>Investor Profile</Typography>

                        <img src={image} alt="Profile Image" style={{
                            width: 200, 
                            height: 200, 
                            objectFit: 'cover',
                            maxWidth: '100%',
                            borderRadius: '50%'
                        }} />   
                        <input type='file' id="imageInput" hidden="hidden" onChange={handleImageChange} />

                        <Tooltip title="Edit Picture" placement="top" arrow>
                            <Button 
                                sx={{color: 'secondary.main', borderRadius: '50px', position: 'absolute', mt: 34.3, ml: 15}} 
                                onClick={handleEditImage} 
                            >
                                <EditIcon />
                            </Button>
                        </Tooltip>
                        <List sx={{justifyContent: 'center'}} >
                            
                            <ListItem sx={{mb: 1, mt: 1}} key='profile'>
                                <Typography  sx={{m: 'auto', color: 'warning.main'}} fontSize={27}>
                                    {fullName}
                                </Typography>
                            </ListItem>

                            <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                <AccountBoxIcon sx={{mr: 2}}/>
                                <ListItemText primary="Investor" />
                            </ListItem>    

                            <ListItem key="email" sx={{color: 'warning.main'}}>
                                <EmailIcon sx={{mr: 2}}/>
                                <ListItemText primary={email} />
                            </ListItem>

                            { companyIcon }
                            { professionIcon }
                            { bioIcon }


                            <ListItem key="socials">
                              
                                {linkedinIcon}
                             
                            </ListItem>

    
                        </List>
                        <Button onClick={handleEditClick} variant="contained" sx={{mt: 5, color: 'warning.main', border: 'solid 1px white'}}>Edit</Button>
                    </Box>
                </Paper>
            </Grid>
            
        </Grid>

        </Fragment>
    )
}


InvestorProfile.propTypes = {
    data: PropTypes.object.isRequired,
    updateImage: PropTypes.func.isRequired,
    editProfilePersonal: PropTypes.func.isRequired,
    deleteBusinessDialog: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data, 
})

const mapActionsToProps = {
    updateImage,
    editProfilePersonal,
    deleteBusinessDialog
}

export default connect(mapStateToProps, mapActionsToProps) (InvestorProfile);







