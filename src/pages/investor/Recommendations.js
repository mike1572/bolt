

import React, {Fragment} from 'react'

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

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
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import CardLoading from '../../components/investor/CardLoading';
import Recommendation from '../../components/investor/Recommendation';
import DashHead from '../../components/DashHead'

import Startup from '../../images/montreal.jpg'


let Recommendations = (props) => {

    let {data: {user: {fullName, image, matches, typeOfBusiness, fundingStage, pitch, industry, location, funding},
    recommendations, loadingRecommendations}} = props


    let needToCompleteProfile = () => {
        if (typeOfBusiness === null || typeOfBusiness === undefined || fundingStage === null || fundingStage === undefined
            || pitch === undefined || pitch === null || industry === undefined || industry === null ||
            location === undefined || location === null 
            || funding === null || funding === undefined){

            console.log(typeOfBusiness, fundingStage, fundingStage, pitch, industry, funding)
            return true
        } else {
            return false
        }

    }


    return (
        <Fragment>

    
        <DashHead image={Startup} title='Your Recommendations' display="none" profile="none" />

            {
                needToCompleteProfile() ? (
                    <Fragment>
                      
                        <Card sx={{backgroundColor: 'primary.main', p: 3, mt: 5, mx: '15%', textAlign: 'center'}}>
                            <CardHeader
                                title={
                                <Typography sx={{color: 'warning.main', mb: 1}} variant="h6">
                                    Finish setting up your profile to get tailored investment recommendations
                                </Typography>
                                }
                        
                            >
                                
                            </CardHeader>
                            <Button 
                                variant='contained' 
                                component={Link}
                                to="/profile/investor"
                                sx={{color: 'white', backgroundColor: 'success.main', border: 'solid 1px white'}}
                            >
                                Go to Profile
                            </Button>
                        </Card>
                            
                        
                    </Fragment>
                ): (
                    <Fragment>

                        {
                            loadingRecommendations ? (
                                <Fragment>

                                    <Grid 
                                        container
                                        
                                        sx={{mt: 5}}
                                        spacing={4} 
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="flex-start"
                                    
                                    > 
                                        <CardLoading/>
                                        <CardLoading/>
                                        <CardLoading/>
                                        <CardLoading/>

                                    </Grid>
                                </Fragment>
                            ): (
                                <Fragment>
                                    {
                                        recommendations.length === 0 ? (
                                            <Fragment>
                                                <Card sx={{backgroundColor: 'primary.main', p: 3, mt: 5, mx: '15%', textAlign: 'center'}}>
                                                    <CardHeader
                                                        title={
                                                        <Typography sx={{color: 'warning.main', mb: 1}} variant="h6">
                                                            You have no new recommendations 
                                                        </Typography>
                                                        }
                                                        subheader={
                                                            <Typography sx={{color: 'white'}} variant="body1">
                                                            Come back later
                                                            </Typography>
                                                            }
                                                    >
                                                    </CardHeader>
                                                </Card>
                                                    
                                          
                                            </Fragment>
                                        ): (
                                            <Fragment>

                                                <Grid 
                                                    container
                                                    sx={{mt: 5}}
                                                    spacing={4} 
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="flex-start"
                                                
                                                > 

                                                {
                                                    recommendations.map((recom, i) => (
                                                        <Fragment key={i}>
                                                            <Recommendation dataInputed={recom}/>
                                                        </Fragment>
                                                    ))
                                                }
                                                
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


        </Fragment>
    )
}


Recommendations.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (Recommendations);








