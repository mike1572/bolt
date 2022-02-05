

import React, {Fragment,useState} from 'react'
import {db, storage} from '../../firebaseConfig';
import {doc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'
import {updateImage, editProfilePersonal, deleteBusinessDialog} from '../../redux/dataActions'

//MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip'
import WorkIcon from '@mui/icons-material/Work';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link/'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import DialogAddBusiness from '../../components/entrepreneur/DialogAddBusiness'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';


import DialogPersonalProfile from '../../components/entrepreneur/DialogPersonalProfile'
import DialogDelete from '../../components/entrepreneur/DialogDelete'
import DashHead from '../../components/DashHead';
import Startup from '../../images/montreal.jpg'


function tocurrency(value) {
    value = (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return `${value}`;
}

let EntrepreneurProfile = (props) => {

    let [openDialog, setOpenDialog] = useState(false)

    let {data: {user: {fullName, image, email, facebook, profession, github, linkedin, bio, businesses}, userId}} = props

    let handleImageChange = (event) => {
        // select first file in the array
        const image = event.target.files[0]

        if (image !== undefined){

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

    }

    let handleEditImage = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }

    let handleEditClick = () => {
        props.editProfilePersonal(true)
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
                    <Typography variant="body1">
                    <b><i>{`${bio}`}</i></b>
                    </Typography>
                </ListItemText>
            </ListItem>
        )
    } else {
        bioIcon = (
            <Fragment></Fragment>
        )
    }


    let githubIcon; 

    if (github !== null && github !== undefined){
        
        githubIcon = (
            <Link href={github} rel="noreferrer" target="_blank" style={{color: 'white'}} >
                <Tooltip title={github} placement="bottom" arrow >
                    <GitHubIcon sx={{mr: 1, mb: 1}} fontSize="large" />  
                </Tooltip>
            </Link>
        )
    } else {
        githubIcon = (
            <Fragment></Fragment>
        )
    }

    

    let linkedinIcon; 

    if (linkedin !== null && linkedin !== undefined){
        
        linkedinIcon = (
            <Link href={linkedin} rel="noreferrer" target="_blank" sx={{color: 'white', ml: 3}} >
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


    let facebookIcon; 

    if (facebook !== null && facebook !== undefined){
        
        facebookIcon = (
            <Link href={facebook} rel="noreferrer" target="_blank" sx={{color: 'white', ml: 3}} >
                <Tooltip title={facebook} placement="bottom" arrow >
                    <FacebookIcon sx={{mr: 1, mb: 1}} fontSize="large" />  
                </Tooltip>
            </Link>
        )
    } else {
        facebookIcon = (
            <Fragment></Fragment>
        )
    }

    let handleDelete = (event) => {
        props.deleteBusinessDialog(true, event.target.name)
    }

    return (

        <Fragment>
          
            <DashHead image={Startup} title='Profiles' display="none"  />
            <DialogAddBusiness/>
            <DialogDelete/>
            <DialogPersonalProfile open={openDialog}/>
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
                        <Typography variant='h5' sx={{color: 'warning.main', mt: 5, mb: 4}}>Personal Profile</Typography>

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
                                <ListItemText primary="Entrepreneur" />
                            </ListItem>    

                            <ListItem key="email" sx={{color: 'warning.main'}}>
                                <EmailIcon sx={{mr: 2}}/>
                                <ListItemText primary={email} />
                            </ListItem>

                            { professionIcon }
                            { bioIcon }

                            <ListItem key="socials">
                                {githubIcon}
                                {linkedinIcon}
                                {facebookIcon}
                            </ListItem>

                        </List>
                        <Button onClick={handleEditClick} variant="contained" sx={{mt: 5, color: 'warning.main', border: 'solid 1px white'}}>Edit</Button>
                    </Box>
                </Paper>
            </Grid>
            
            {
                businesses.map((business, i) => (
                    <Fragment key={i}>
                        <Grid item sx={{mb: 5}} xs={12} md={6} lg={5}>
                            <Paper component="main" elevation={6} 
                                style={{margin: '25px auto 0 auto', padding:  '0 15% 5% 15%'}} 
                                sx={{backgroundColor: 'success.main'}}
                                >
                                <Box
                                sx={{
                                    marginTop: 6,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    
                                }}
                                >
                                  
                                    <Typography variant='h5' sx={{color: 'warning.main', mt: 5, mb: 4}}>Business Profile</Typography>

                                    <img src={business.image} alt="Profile Image" style={{
                                        width: 200, 
                                        height: 200, 
                                        objectFit: 'cover',
                                        maxWidth: '100%',
                                        borderRadius: '5%'
                                    }} />   
                                
                            
                                    <List sx={{justifyContent: 'center'}} >
                                        
                                        <ListItem sx={{mb: 1, mt: 1}} key='profile'>
                                            <Typography  sx={{m: 'auto', color: 'warning.main'}} fontSize={27}>
                                                {business.companyName}
                                            </Typography>
                                        </ListItem>

                                        <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                            <AccountBalanceIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`Funding Stage: ${business.fundingStage}`} />
                                        </ListItem>    

                                        <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                            <WorkIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`Type of Business: ${business.typeOfBusiness}`} />
                                        </ListItem>    

                                        <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                            <QuestionMarkIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`${business.reason}`} />
                                        </ListItem>   

                                        <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                            <PeopleIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`Workforce: ${business.employees}`} />
                                        </ListItem> 

                                        <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                            <AttachMoneyIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`${tocurrency(business.funding[0])} to ${tocurrency(business.funding[1])}`} />
                                        </ListItem> 

                                        <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                            <LocationOnIcon sx={{mr: 2}}/>
                                            <ListItemText primary={`${business.location}`} />
                                        </ListItem> 
                                      
                                        <ListItem sx={{mb: 1 ,color: 'warning.main'}}>
                                            <RecordVoiceOverIcon sx={{mr: 2}}/>
                                            <Box sx={{m: 1, px: 2, borderRadius: '5px',}}>
                                                <Typography>
                                                    <b><i>{`${business.pitch}`}</i></b>
                                                </Typography>
                                            </Box>
                                        </ListItem>

                                        <ListItem key="industries">
                                            <Grid container
                                                alignItems="center"
                                            >
                                            {
                                                business.industry.map((industry, j) => (
                                                    <Grid item key={j} xs={12} sx={{m: 1, backgroundColor: '#e0f7fa', p: 1, borderRadius: '5px'}}
                                                    alignItems="center"
                                                    justifyContent={'center'}
                                                    >
                                                        <Typography variant='body1'>{industry}</Typography>
                                                    </Grid>
                                                ))
                                            }
                                            </Grid>
                                        </ListItem>

                                    </List>
                                    <Button name={business.id} onClick={handleDelete} variant="contained" sx={{backgroundColor: 'darkred', border: 'solid 1px white'}}>Delete Profile</Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Fragment>
                ))
            }
        </Grid>

        </Fragment>
    )
}


EntrepreneurProfile.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps) (EntrepreneurProfile);







