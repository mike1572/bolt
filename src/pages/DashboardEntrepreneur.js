
import React, {useState, Fragment} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {db, storage, auth} from '../firebaseConfig';
import {setDoc, doc} from 'firebase/firestore';


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


let DashboardEntrepreneur = (props) => {

    let {data: {user: {fullName, image}}} = props

    return (
        <Fragment>
            <DashHead image={MontrealNight} name={fullName}/>
    
            <Grid container component="main" sx={{ height: '40vh'}} spacing={5}  
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                >
                <Grid item xs={12} sm={12} md={6} lg={5}>
                <Card  sx={{  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                    <CardHeader
                        title="Your Profile"
                        sx={{ml: 3, mt: 1, color: "black"}}
                        
                    />
                    <hr style={{border: '2px solid black'}} />
                    <Tooltip title="Edit Profile" placement="right" arrow>
                        <Button sx={{textTransform: 'none'}}>
                            <CardHeader
                                sx={{maxWidth: 300}}
                                title={`Personal Profile`}
                                titleTypographyProps={{variant:'h6' }}
                                avatar={
                                    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                }
                                subheader={`${fullName} Dimitrov`}
                                subheaderTypographyProps={{variant:'h6' }}
                            />
                        </Button>
                    </Tooltip>
                    <br/>
                    <hr/>
                    <Tooltip title="Edit Profile" placement="right" arrow>
                        <Button sx={{textTransform: 'none'}}>
                            <CardHeader
                                sx={{maxWidth: 300}}
                                title={`Business Profile`}
                                titleTypographyProps={{variant:'h6' }}
                                avatar={
                                    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                }
                                subheader={`${fullName} Dimitrov`}
                                subheaderTypographyProps={{variant:'h6' }}
                            />
                        </Button>
                    </Tooltip>
                    <hr/>
                    <CardActions>
                        <IconButton sx={{ml: 1}} aria-label="like/unlike" >
                            <AddIcon/>
                        </IconButton>
                        <Typography sx={{ml: 1}} variant="body1">Add a business profile</Typography>
                    </CardActions>
                  
                </Card>
                </Grid>
                <Grid item item xs={12} sm={12} md={4}>
                <Card color='secondary.main' sx={{  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                    <CardHeader
                        title="Ressources"
                        sx={{ml: 3, mt: 1}}
                    >
                    </CardHeader>
                    <hr/>
                    <CardContent>
                        <Typography variant="h6" sx={{ml: 3, mb: 3}}>
                            Here a list of available ressources to help you on your entrepreneurial journey
                        </Typography>
                        <Typography sx={{ml: 3, mt: 2}}>
                            <Linked variant="h6" href="#">Link</Linked> 
                        </Typography>
                        
                        <br/>
                        <Typography sx={{ml: 3, mt: 1}}>
                            <Linked variant="h6" href="#">Link</Linked> 
                        </Typography>
                     
                        <br/>
                        <Typography sx={{ml: 3, mt: 1}}>
                            <Linked variant="h6" href="#">Link</Linked> 
                        </Typography>
                        <br/>
                        <Typography sx={{ml: 3, mt: 1}}>
                            <Linked variant="h6" href="#">Link</Linked> 
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={5}>
                <Card  sx={{  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                    <CardHeader
                        title="Your Applications"
                        sx={{ml: 3, mt: 1, color: "black"}}
                        
                    />
                    <hr style={{border: '2px solid black'}} />
                    <Tooltip title="View Application" placement="right" arrow >
                        <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%'}}>
                            <CardHeader
                                sx={{maxWidth: 300}}
                                title={`Investor 1 `}
                                titleTypographyProps={{variant:'h6' }}
                                subheader={`January 21, 2022`}
                                subheaderTypographyProps={{variant:'h6' }}
                            />
                        </Button>
                    </Tooltip>
                    <br/>
                    <hr/>
                    <Tooltip title="View Application" placement="right" arrow >
                        <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%'}}>
                            <CardHeader
                                sx={{maxWidth: 300}}
                                title={`Investor 1 `}
                                titleTypographyProps={{variant:'h6' }}
                                subheader={`January 21, 2022`}
                                subheaderTypographyProps={{variant:'h6' }}
                            />
                        </Button>
                    </Tooltip>
                 
                    <hr/>
                    <CardActions>
                        <IconButton sx={{ml: 1}} aria-label="like/unlike" >
                            <AddIcon/>
                        </IconButton>
                        <Typography sx={{ml: 1}} variant="body1">Add an application</Typography>
                    </CardActions>
                  
                </Card>
                </Grid>
                <Grid item item xs={12} sm={12} md={4}>
                <Card color='secondary.main' sx={{  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                    <CardHeader
                        title="Your Potentials"
                        sx={{ml: 3, mt: 1}}
                    >
                    </CardHeader>
                    <hr/>
                    <CardContent>
                        <Typography variant="h6" sx={{ml: 3, mt: 2}}>
                            Investor A: info
                        </Typography>
                        
                        <br/>
                        <Typography variant="h6" sx={{ml: 3, mt: 1}}>
                            Investor A: info
                        </Typography>
                     
                        <br/>
                        <Typography variant="h6" sx={{ml: 3, mt: 1}}>
                            Investor A: info
                        </Typography>
                        <br/>
                        <Typography variant="h6" sx={{ml: 3, mt: 1}}>
                            Investor A: info
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={5}>
                <Card  sx={{  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                    <CardHeader
                        title="Your Matches"
                        sx={{ml: 3, mt: 1, color: "black"}}
                        
                    />
                    <hr style={{border: '2px solid black'}} />
                    <Tooltip title="Message" placement="right" arrow>
                        <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%'}}>
                            <CardHeader
                                sx={{maxWidth: 300}}
                                title={`Investor: Elon Musk`}
                                titleTypographyProps={{variant:'h6' }}
                                avatar={
                                    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                }
                            />
                        </Button>
                    </Tooltip>
                    <br/>
                    <hr/>
                    <Tooltip title="Message" placement="right" arrow>
                        <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%'}}>
                            <CardHeader
                                sx={{maxWidth: 300}}
                                title={`Investor: Elon Musk`}
                                titleTypographyProps={{variant:'h6' }}
                                avatar={
                                    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                }
                            />
                        </Button>
                    </Tooltip>
                  
                </Card>
                </Grid>
                <Grid item item xs={12} sm={12} md={4}>
                <Card color='secondary.main' sx={{  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300, mb: 10}} raised >
                    <CardHeader
                        title="About"
                        sx={{ml: 3, mt: 1}}
                    >
                    </CardHeader>
                    <hr/>
                    <CardContent>
                        <Typography variant="h6" sx={{ml: 3, mt: 2}}>
                            Investor A: info
                        </Typography>
                        
                        <br/>
                        <Typography variant="h6" sx={{ml: 3, mt: 1}}>
                            Investor A: info
                        </Typography>
                     
                        <br/>
                        <Typography variant="h6" sx={{ml: 3, mt: 1}}>
                            Investor A: info
                        </Typography>
                        <br/>
                        <Typography variant="h6" sx={{ml: 3, mt: 1}}>
                            Investor A: info
                        </Typography>
                    </CardContent>
                </Card>
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