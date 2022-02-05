

import React, {Fragment,  useState} from 'react'
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
import Link from '@mui/material/Link/'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

import DialogInvestorProfile from '../../components/investor/DialogInvestorProfile'
import DialogDelete from '../../components/entrepreneur/DialogDelete'
import DashHead from '../../components/DashHead';
import DialogAddBusiness from '../../components/entrepreneur/DialogAddBusiness'

import Startup from '../../images/montreal.jpg'


function tocurrency(value) {
    value = (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return `${value}`;
}

let InvestorProfile = (props) => {

    let [openDialog, setOpenDialog] = useState(false)

    let {data: {user: {fullName, image, email, profession, linkedin, 
        company, typeOfBusiness, fundingStage, pitch, industry, location, funding}, userId}
    } = props


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

    let companyIcon;

    if (company !== null && company !== undefined){
        companyIcon = (
            <ListItem key="companyName" sx={{color: 'warning.main'}}>
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

    let locationIcon; 
    if (location !== null && location !== undefined){
        locationIcon = (
            <ListItem key="company" sx={{color: 'warning.main'}}>
                <LocationOnIcon sx={{mr: 2}}/>
                <ListItemText primary={location} />
            </ListItem>
        )
    } else {
        locationIcon = (
            <Fragment></Fragment>
        )
    }

    let fundingStageIcon; 
    if (fundingStage !== null && fundingStage !== undefined){
        fundingStageIcon = (

            <Fragment>
                
                <Grid container key="fundingStage" sx={{color: 'warning.main'}}
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                >
                    <Typography sx={{color: 'white', mt: 3, mb: 2}} variant="h6">
                        Funding Stages of Interest
                    </Typography>
                {
                    fundingStage.map((element, i) => (
                        <Fragment key={i}>
                            <Grid  
                            alignItems='center'
                            justifyContent='center'
                            item xs={12} sm={10} md={6} key="fundingStage" sx={{color: 'warning.main', backgroundColor: 'success.main', height: 50, m: 1, p: 1, borderRadius: '12%'}}>
                            {element}
                            </Grid>
                        </Fragment>
                    ))
                }
                </Grid>
         
            </Fragment>
         
        )
    } else {
        fundingStageIcon = (
            <Fragment></Fragment>
        )
    }

    
    
    let businessTypeIcon; 
    if (typeOfBusiness !== null && typeOfBusiness !== undefined){
        businessTypeIcon = (

            <Fragment>
                
                     
                <Grid container key="typeOfBusiness" sx={{color: 'warning.main'}}
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                >
                    <Typography sx={{color: 'white', mt: 3, mb: 2}} variant="h6">
                        Types of Business of Interest
                    </Typography>
                {
                    typeOfBusiness.map((element, i) => (
                        <Fragment key={i}>
                            <Grid  
                            alignItems='center'
                            justifyContent='center'
                            item xs={10}  key="fundingStage" sx={{color: 'warning.main', backgroundColor: '#00838f', height: 50, m: 1, p: 1, borderRadius: '12%'}}>
                            {element}
                            </Grid>
                        </Fragment>
                    ))
                }
                </Grid>
         
            </Fragment>
         
        )
    } else {
        businessTypeIcon = (
            <Fragment></Fragment>
        )
    }

    let industryIcon; 
    if (industry !== null && industry !== undefined){
        industryIcon = (

            <Fragment>
    
                    <Grid container key="industry" sx={{color: 'warning.main'}}
                        alignItems='center'
                        justifyContent='center'
                        direction='column'
                    >
                        <Typography sx={{color: 'white', mt: 3, mb: 2}} variant="h6">
                            Industries of Interest
                        </Typography>
                    {
                        industry.map((element, i) => (
                            <Fragment key={i}>
                                <Grid  
                                alignItems='center'
                                justifyContent='center'
                                item xs={10}  key="fundingStage" sx={{color: 'warning.main', backgroundColor: 'success.main', height: 50, m: 1, p: 1, borderRadius: '12%'}}>
                                {element}
                                </Grid>
                            </Fragment>
                        ))
                    }
                    </Grid>
         
            </Fragment>
         
        )
    } else {
        industryIcon = (
            <Fragment></Fragment>
        )
    }


    let fundingIcon; 
    if (funding !== null && funding !== undefined){
        fundingIcon = (

            <Fragment>
                <ListItem key="funding" sx={{color: 'warning.main'}}>
                    <AttachMoneyIcon sx={{mr: 2, mb: 1}}/>
                    <ListItemText primary={`${tocurrency(funding[0])} to ${tocurrency(funding[1])}`} />
                </ListItem>
            </Fragment>
         
        )
    } else {
        fundingIcon = (
            <Fragment></Fragment>
        )
    }

    let pitchIcon; 
    if (pitch !== null && pitch !== undefined){
        pitchIcon = (

            <ListItem key="pitch" sx={{color: 'warning.main', mt: 1, mb: 0, maxWidth: 290}}>
                <ListItemText>
                    <Typography justifyContent={'center'} textAlign={'center'} variant="body1">
                    <b><i>{`${pitch}`}</i></b>
                    </Typography>
                </ListItemText>
            </ListItem>
         
        )
    } else {
        pitchIcon = (
            <Fragment></Fragment>
        )
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


                            {pitchIcon}

                            <ListItem sx={{mb: 1, mt: 1, mx: 14}} key='socials'>
                                {linkedinIcon}
                            </ListItem>
                            
                        
                            <ListItem sx={{mb: 1 ,color: 'warning.main'}} >
                                <AccountBoxIcon sx={{mr: 2}}/>
                                <ListItemText primary="Investor" />
                            </ListItem>    

                            <ListItem key="email" sx={{color: 'warning.main'}}>
                                <EmailIcon sx={{mr: 2, mb: 1}}/>
                                <ListItemText primary={email} />
                            </ListItem>

                           
                            { companyIcon }

                            
                            { professionIcon }

                            { locationIcon }

                            {fundingIcon}

                            {fundingStageIcon}

                            {businessTypeIcon}

                            {industryIcon}

                        
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




