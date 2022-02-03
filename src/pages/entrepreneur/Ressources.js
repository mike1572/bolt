

import React, {Fragment} from 'react'

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
import Box from '@mui/material/Box'

import MontrealNight from '../../images/montreal.jpg'
import DashHead from '../../components/DashHead';

import educationalContent from '../../educationalContent'
import financialResources from '../../financialResources';
 
let Ressources = (props) => {

    let {data: {user: {fullName, image}}} = props


    return (

        <Fragment>

            <DashHead image={MontrealNight} title={'Resources'} display="none" profile="none"/>

            <Grid container 
                sx={{ height: '40vh'}} 
                spacing={5}  
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            
            >
                <Grid item xs={12} md={6} lg={5} >
                    <Card  sx={{ mb: 5,backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                        <CardHeader
                            title="Useful Content"
                            sx={{ml: 3, mt: 1, color: "white"}}
                        />
                        <hr style={{border: '2px solid white'}} />

                        <CardContent sx={{alignText: 'center'}}>


                            {
                                educationalContent.map((item, i) => (
                                   
                                    <Fragment key={i}>
                                        <Box>
                                        <Linked sx={{color: 'white', ml: 3, cursor: 'pointer'}} href={item.website} target="_blank">
                                            <Typography sx={{ ml: 3}} variant="h5">
                                                {item.title}
                                            </Typography>
                                        </Linked>
                                        <Typography sx={{color: 'white', ml: 3, mt: 1, mb: 2}} variant="h6">
                                            {item.description}
                                        </Typography>
                                        <hr style={{marginBottom: 15}}/>
                                        </Box>
                                    </Fragment>
                                ))
                            }
                           
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Card  sx={{ mb: 5, backgroundColor: 'success.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                        <CardHeader
                            title="Financial Resources"
                            sx={{ml: 3, mt: 1, color: "white"}}
                            
                        />
                        <hr style={{border: '2px solid white'}} />

                        <CardContent sx={{alignText: 'center'}}>


                            {
                                financialResources.map((item, i) => (
                                    <Fragment key={i}>
                                        <Linked sx={{color: 'white', ml: 3, textDecorationColor: 'yellow', cursor: 'pointer'}} href={item.website} target="_blank">
                                            <Typography sx={{ ml: 3}} variant="h5">
                                                {item.title}
                                            </Typography>
                                        </Linked>
                                        <Typography  sx={{color: 'white', ml: 3, mt: 1, mb: 2}} variant="h6">
                                            {item.description}
                                        </Typography>
                                        <hr style={{marginBottom: 15}}/>
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


Ressources.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (Ressources);







