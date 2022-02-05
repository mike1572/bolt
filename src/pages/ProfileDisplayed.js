
import React, {useState, Fragment, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import {db} from '../firebaseConfig';
import {doc, getDoc } from 'firebase/firestore';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'
import {setBusinessesWanted } from '../redux/dataActions'

//MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Linked from '@mui/material/Link';
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import CorporateFareIcon from '@mui/icons-material/CorporateFare'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Container from '@mui/material/Container'
import MailIcon from '@mui/icons-material/Mail';

import CardLoading from '../components/investor/CardLoading'

function tocurrency(value) {
    value = (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return `${value}`;
}

let ProfileDisplayed = (props) => {

    const location = useLocation()

    let {data: {user: {matches}, type, chatId, businessesOfProfileWanted}} = props
    const [loading, setLoading] = useState(true)
    const [match, setMatch] = useState({})

    let getBusinesses = () => {

        // get the user busineses
        setMatch(matches.filter(element => element.id === chatId)[0])
        let data = matches.filter(element => element.id === chatId)[0]
        const promises = data.businesses.map(u => getDoc(doc(db, "businesses", u)))
        let businesses = []
        Promise.all(promises)
        .then(results => {
            results.map(docSnapshot => {
                let obj = docSnapshot.data()
                businesses.push(obj)
            });
            props.setBusinessesWanted(businesses)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })

    }

    let loadData = () => {
        setMatch(matches.filter(element => element.id === chatId)[0])
        setLoading(false)
    }



    useEffect(() => {
    
        setLoading(true)
        if (location !== undefined && location.pathname === '/profile'){
            if (type === 'investor') {
                getBusinesses()
            } else if (type === 'entrepreneur'){
                loadData()
            }            
        }
        setLoading(false)

    }, [location])
   
    let githubIcon; 
    if (match.github !== null && match.github !== undefined){
        
        githubIcon = (
            <Linked href={match.github} rel="noreferrer" target="_blank" style={{color: 'black', ml: 2}} >
                <Tooltip title={match.github} placement="bottom" arrow >
                    <GitHubIcon sx={{mr: 1, mb: 1}} fontSize="large" />  
                </Tooltip>
            </Linked>
        )
    } else {
        githubIcon = (
            <Fragment></Fragment>
        )
    }

    
    let facebookIcon; 

    if (match.facebook !== null && match.facebook !== undefined){
        
        facebookIcon = (
            <Linked href={match.facebook} rel="noreferrer" target="_blank" sx={{color: 'black', ml: 3}} >
                <Tooltip title={match.facebook} placement="bottom" arrow >
                    <FacebookIcon sx={{mr: 1, mb: 1}} fontSize="large" />  
                </Tooltip>
            </Linked>
        )
    } else {
        facebookIcon = (
            <Fragment></Fragment>
        )
    }

    let companyIcon;

    if (match.company !== null && match.company !== undefined){
        companyIcon = (
            <ListItem key="companyName" sx={{color: 'warning.main'}}>
                <CorporateFareIcon sx={{mr: 2}}/>
                <ListItemText primary={match.company} />
            </ListItem>
        )
    } else {
        companyIcon = (
            <Fragment></Fragment>
        )
    }

    let professionIcon;

    if (match.profession !== null && match.profession !== undefined){
        professionIcon = (
            <ListItem key="profession" sx={{color: 'warning.main'}}>
                <WorkIcon sx={{mr: 2}}/>
                <ListItemText primary={match.profession} />
            </ListItem>
        )
    } else {
        professionIcon = (
            <Fragment></Fragment>
        )
    }


    let linkedinIcon; 

    if (match.linkedin !== null && match.linkedin !== undefined){
        
        linkedinIcon = (
            <Linked href={match.linkedin} rel="noreferrer" target="_blank" sx={{color: type === "entrepreneur"? "white": 'black', ml: 1}} >
                <Tooltip title={match.linkedin} placement="bottom" arrow >
                    <LinkedInIcon sx={{mr: 1, mb: 1}} fontSize="large" />  
                </Tooltip>
            </Linked>
        )
    } else {
        linkedinIcon = (
            <Fragment></Fragment>
        )
    }

    let locationIcon; 
    if (match.location !== null && match.location !== undefined){
        locationIcon = (
            <ListItem key="company" sx={{color: 'warning.main'}}>
                <LocationOnIcon sx={{mr: 2}}/>
                <ListItemText primary={match.location} />
            </ListItem>
        )
    } else {
        locationIcon = (
            <Fragment></Fragment>
        )
    }

    let fundingStageIcon; 
    if (match.fundingStage !== null && match.fundingStage !== undefined){
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
                    match.fundingStage.map((element, i) => (
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
    if (match.typeOfBusiness !== null && match.typeOfBusiness !== undefined){
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
                    match.typeOfBusiness.map((element, i) => (
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
    if (match.industry !== null && match.industry !== undefined){
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
                    match.industry.map((element, i) => (
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
    if (match.funding !== null && match.mapActionsToPropsfunding !== undefined){
        fundingIcon = (

            <Fragment>
                <ListItem key="funding" sx={{color: 'warning.main'}}>
                    <AttachMoneyIcon sx={{mr: 2, mb: 1}}/>
                    <ListItemText primary={`${tocurrency(match.funding[0])} to ${tocurrency(match.funding[1])}`} />
                </ListItem>
            </Fragment>
         
        )
    } else {
        fundingIcon = (
            <Fragment></Fragment>
        )
    }

    let pitchIcon; 
    if (match.pitch!== null && match.pitch!== undefined){
        pitchIcon = (

            <ListItem key="pitch" sx={{color: 'warning.main', mt: 1, mb: 0, maxWidth: 290}}>
                <ListItemText>
                    <Typography justifyContent={'center'} textAlign={'center'} variant="body1">
                    <b><i>{`${match.pitch}`}</i></b>
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

            {
                loading ? (
                    <Fragment>

                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{mt: 5}}
                        >
                            <CardLoading/>
                        </Grid>

                    </Fragment>
                ): (
                    <Fragment>

                        {
                            type === 'entrepreneur' ? (
                                <Fragment>
                                    <Grid container spacing={3} 
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        sx={{mb: 5}}
                                    >
                                        <Grid item sx={{mb: 0}} xs={12} md={6} lg={5}>
                                        <Paper component="main" elevation={6} 
                                            style={{padding:  '0 15% 5% 15%'}} 
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
                                            <img src={match.image} alt="Profile Image" style={{
                                                width: 200, 
                                                height: 200, 
                                                objectFit: 'cover',
                                                maxWidth: '100%',
                                                borderRadius: '50%',
                                                marginTop: 45
                                            }} />   


                                                <List sx={{justifyContent: 'center'}} >
                                
                                                    <ListItem sx={{mb: 1, mt: 1}} key='profile'>
                                                        <Typography  sx={{m: 'auto', color: 'warning.main'}} fontSize={27}>
                                                            {match.fullName}
                                                        </Typography>
                                                    </ListItem>

                                                    {pitchIcon}
                                                    <ListItem key="email" sx={{color: 'warning.main'}}>
                                                        <EmailIcon sx={{mr: 2, mb: 1}}/>
                                                        <ListItemText primary={match.email} />
                                                    </ListItem>

                                                    { companyIcon }
                                                    { professionIcon }
                                                    { locationIcon }
                                                    {fundingIcon}
                                                    {fundingStageIcon}
                                                    {businessTypeIcon}
                                                    {industryIcon}

                                                    <ListItem sx={{mb: 1, mt: 1, mx: 14}} key='socials'>
                                                        {linkedinIcon}
                                                    </ListItem>
                                                                        
                                                </List>
                                            </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>

                                </Fragment>
                            ): (
                                <Fragment>

                                    <Grid container spacing={3} 
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                        sx={{mb: 5, mt: 2}}
                                    >

                                    <Grid item alignItems={'center'} justifyContent={'center'} sx={{mb: 5}} xs={12} sm={8} md={6} lg={5}>
                                        
                                    <Card sx={{ mx: 2, maxWidth: 550 }} raised>
                                        <CardContent>
                                            <Typography color="warning" variant="h6" sx={{ml: 1}}>
                                                Personal Details
                                            </Typography>
                                            <hr/>
                                            <CardHeader
                                            avatar={
                                                <Avatar alt={'Profile Image'} sx={{width: 70, height: 70}} src={match.image} aria-label="picture"/>
                                            }
                                            title={`${match.fullName}`}
                                            titleTypographyProps={{variant:'body1' }}
                                            subheader={
                                                <Typography>
                                                    {match.profession !== undefined ? (
                                                        <Fragment>
                                                            {match.profession}
                                                        </Fragment>
                                                    ) : (
                                                        <Fragment></Fragment>
                                                    ) 
                                                    }
                                                </Typography>
                                            }
                                            subheaderTypographyProps={{variant:'body1' }}
                                        />

                                            <List>
                                                <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                                                    <MailIcon sx={{mr: 2}}/>
                                                    <ListItemText primary={match.email}  />
                                                </ListItem> 
                                                <ListItem sx={{color: 'primary.main'}} >
                                                    <DriveFileRenameOutlineIcon sx={{mr: 2}}/>
                                                    <ListItemText primary={match.bio}  />
                                                </ListItem> 
                                               
                                               <ListItem sx={{ml: -3, mt: 1, mb: 1}}>
                                                    {facebookIcon}
                                                    {githubIcon}
                                                    {linkedinIcon}
                                               </ListItem>
                                            </List>

                                            <Typography color="warning" variant="h6" sx={{ml: 1, mb: 2}}>
                                                Business Details
                                            </Typography>

                                            {
                                                businessesOfProfileWanted.map((element, i) => (
                                                    <Fragment key={i}>
                                                        <hr style={{marginBottom: 20}}/>
                                                        <CardMedia
                                                            component='img'
                                                            height='100%'
                                                            src={element.image}
                                                            style={{position: 'relative', minHeight: '100%', maxHeight: 350 }}
                                                            alt="Company Logo" 
                                                        
                                                        />
                                                        
                                                        <List sx={{justifyContent: 'center'}}>
                                                            <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                                                                <BusinessIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={element.companyName}/>
                                                            </ListItem> 
                                                            <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                                                                <LocationOnIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={element.location} />
                                                            </ListItem> 
                                                            <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                                                                <PeopleOutlineOutlinedIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={element.employees} />
                                                            </ListItem> 
                                                            <ListItem sx={{mb: 1, color: 'primary.main'}} >
                                                                <CreditScoreIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={element.fundingStage} />
                                                            </ListItem>
                                                            <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                                                                <StoreOutlinedIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={
                                                                    <Typography>
                                                                        <i>Type: </i>{element.typeOfBusiness}
                                                                    </Typography>
                                                                } />
                                                            </ListItem>
                                                            <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                                                                <MonetizationOnOutlinedIcon sx={{mr: 2}}/>
                                                                <ListItemText primary={
                                                                    <Typography>
                                                                        <i>Amount Sought: </i>{tocurrency(element.funding[0])} to {tocurrency(element.funding[1])}
                                                                    </Typography>
                                                                } />
                                                            </ListItem> 
                                                            <ListItem sx={{mb: 1 ,color: 'primary.main'}}>
                                                                <ListItemText>
                                                                    <Typography textAlign={'center'} variant="body1" sx={{mb: 2}}>
                                                                        <b>Operating in</b>
                                                                    </Typography>
                                                                    <Container variant="body1" >
                                                                    {
                                                                        element.industry.map((industry, i) => (
                                                                            <Fragment key={i}>
                                                                                <Box sx={{backgroundColor: 'secondary.main', color: 'third.main', m: 2, p: 2, mx: '15%'}}>
                                                                                    <Typography textAlign="center">
                                                                                        {industry}
                                                                                    </Typography>
                                                                                    
                                                                                </Box>
                                                                                
                                                                            </Fragment>
                                                                        ) )
                                                                    }
                                                                    </Container>
                                                                </ListItemText>
                                                            </ListItem>
                                                            <ListItem sx={{mb: 1 ,color: 'primary.main'}}>
                                                                <ListItemText >
                                                                    <Typography justifyContent={'center'} textAlign={'center'} variant="body1">
                                                                    <i><b>{element.pitch}</b></i>
                                                                    </Typography>
                                                                </ListItemText>
                                                            </ListItem>
                                                        </List>
                                                        </Fragment>
                                                ))
                                            }


                                        </CardContent>
                                        
                                    </Card>
                                    </Grid>
                                    </Grid>
                                </Fragment>
                            )
                        }
                    </Fragment>

                )
            }

        </Fragment>
    )
}

ProfileDisplayed.propTypes = {
    data: PropTypes.object.isRequired,
    setBusinessesWanted: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    setBusinessesWanted 
}

export default connect(mapStateToProps, mapActionsToProps) (ProfileDisplayed);