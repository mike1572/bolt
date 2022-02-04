
import React, {Fragment, useEffect} from 'react'

import PropTypes from 'prop-types';

import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import {db, storage, auth} from '../../firebaseConfig';

import {useNavigate} from 'react-router-dom'

// Redux
import {connect } from 'react-redux'
import {updateChatID, addOneMatch} from '../../redux/dataActions'

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
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import DialogAddBusiness from '../../components/entrepreneur/DialogAddBusiness'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PeopleIcon from '@mui/icons-material/People';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Box from '@mui/material/Box'
import { Container } from '@mui/material';

function tocurrency(value) {
    value = (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return `${value}`;
}


let Recommendation = (props) => {

    const navigate = useNavigate();

    let {data: {user: {fullName, image, matches}, userId, recommendations, loadingRecommendations}, dataInputed, type} = props


    let addMatch = (event) => {
        console.log(matches)
        console.log(event.target.name)

        let matchId = event.target.name

        console.log(dataInputed.user)

        let aMatch = matches.filter(element => element.id === dataInputed.user.id)
        console.log(aMatch)
        // props.storeMatch(event.target.name, type)

        if (aMatch.length === 0){
            updateDoc(doc(db, "users", userId), {
                matches: arrayUnion(matchId)
            })
            .then(() => {
                updateDoc(doc(db, "users", matchId), {
                    matches: arrayUnion(userId)
                })
                .then(() => {

                    navigate('/messages')
                    console.log(matchId)
                    props.addOneMatch({
                        id: dataInputed.user.id,
                        email: dataInputed.user.email, 
                        bio: dataInputed.user.bio, 
                        businesses: dataInputed.user.businesses, 
                        facebook: dataInputed.user.facebook, 
                        fullName: dataInputed.user.fullName, 
                        github:dataInputed.user.github, 
                        image: dataInputed.user.image, 
                        linkedin: dataInputed.user.linkedin, 
                        profession:dataInputed.user.profession, 
                    })
                    props.updateChatID(matchId)


                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch((err) => {
                console.log(err)
            })

        } else {
            navigate('/messages')
            console.log(matchId)
            props.updateChatID(matchId)
        }

    }

    return (
        <Grid item alignItems={'center'} justifyContent={'center'} sx={{mb: 5}} xs={12} sm={8} md={6} lg={5}>
            <Card sx={{ mx: 2, maxWidth: 550 }} raised>
                <CardHeader
                    avatar={
                        <Avatar alt={'Profile Image'} src={dataInputed.user.image} aria-label="picture"/>
                    }
                    title={`${dataInputed.user.fullName}`}
                    titleTypographyProps={{variant:'body1' }}
                    subheader={
                        <Typography>
                            {dataInputed.user.profession !== undefined ? (
                                <Fragment>
                                    {dataInputed.user.profession}
                                </Fragment>
                            ) : (
                                <Fragment></Fragment>
                            ) 
                            }
                        </Typography>
                    }
                    subheaderTypographyProps={{variant:'body1' }}
                />
                <CardMedia
                    component='img'
                    height='100%'
                    src={dataInputed.image}
                    style={{position: 'relative', minHeight: '100%', maxHeight: 350 }}
                    alt="Company Logo" 
                
                />

                <CardContent>
                    <Typography color="warning" variant="h6" sx={{ml: 1}}>
                        Business Details
                    </Typography>
                    <hr/>
                    <List sx={{justifyContent: 'center'}}>
                        <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                            <BusinessIcon sx={{mr: 2}}/>
                            <ListItemText primary={dataInputed.companyName}/>
                        </ListItem> 
                        <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                            <LocationOnIcon sx={{mr: 2}}/>
                            <ListItemText primary={dataInputed.location} />
                        </ListItem> 
                        <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                            <PeopleOutlineOutlinedIcon sx={{mr: 2}}/>
                            <ListItemText primary={dataInputed.employees} />
                        </ListItem> 
                        <ListItem sx={{mb: 1, color: 'primary.main'}} >
                            <CreditScoreIcon sx={{mr: 2}}/>
                            <ListItemText primary={dataInputed.fundingStage} />
                        </ListItem>
                        <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                            <StoreOutlinedIcon sx={{mr: 2}}/>
                            <ListItemText primary={
                                <Typography>
                                    <i>Type: </i>{dataInputed.typeOfBusiness}
                                </Typography>
                            } />
                        </ListItem>
                        <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                            <MonetizationOnOutlinedIcon sx={{mr: 2}}/>
                            <ListItemText primary={
                                <Typography>
                                    <i>Amount Sought: </i>{tocurrency(dataInputed.funding[0])} to {tocurrency(dataInputed.funding[1])}
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
                                    dataInputed.industry.map((industry, i) => (
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
                                <i><b>{dataInputed.pitch}</b></i>
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                    <hr/>
                    <Typography color="warning" variant="h6" sx={{ml: 1, mt: 2, mb: 2}}>
                        About the Entrepreneur
                    </Typography>
                    <hr/>
                    <List sx={{justifyContent: 'center'}}>
                        <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                            <AccountCircleIcon sx={{mr: 2}}/>
                            <ListItemText primary={dataInputed.user.fullName} />
                        </ListItem> 
                        <ListItem sx={{mb: 1 ,color: 'primary.main'}} >
                            <DriveFileRenameOutlineIcon sx={{mr: 2}}/>
                            <ListItemText primary={dataInputed.user.bio}  />
                        </ListItem> 
                    </List>
                    <hr/>
                    <Button name={dataInputed.user.id} onClick={addMatch} variant="contained" sx={{ml: 1, mt: 1,}}>
                        Contact the Entrepreneur
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    )
}

Recommendation.propTypes = {
    data: PropTypes.object.isRequired,
    dataInputed: PropTypes.object.isRequired,
    updateChatID: PropTypes.func.isRequired,
    addOneMatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    updateChatID,
    addOneMatch
}

export default connect(mapStateToProps, mapActionsToProps) (Recommendation);
