
import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'
import {addBusiness} from '../../redux/dataActions'

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


import DialogAddBusiness from '../../components/entrepreneur/DialogAddBusiness'

let ProfileCard = (props) => {




    let {data: {user: {fullName, image, businesses, type}}} = props


    let handleAdd = () => {
        props.addBusiness(true)
    }

    return (
        <Grid item >
                <DialogAddBusiness/>
                <Card aria-disabled sx={{backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                    <CardHeader
                        title="Your Profile"
                        sx={{ml: 3, mt: 1, color: "white"}}
                        
                    />
                    <hr style={{border: '2px solid white'}} />
                    <Tooltip title="View Profile" placement="right" arrow >
                        <Button sx={{textTransform: 'none'}} component={Link} to="/profile/entrepreneur"> 
                            <CardHeader
                                sx={{maxWidth: 300, color: 'white'}}
                                title={`Personal Profile`}
                                titleTypographyProps={{variant:'h6' }}
                                avatar={
                                    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                }
                                subheader={`${fullName}`}
                                subheaderTypographyProps={{variant:'h6', color: 'white' }}
                            />
                        </Button>
                    </Tooltip>
                    <br/>
                    <hr/>


                        {
                            businesses.length > 0 ? (
                                <Fragment>
                                    {
                                        businesses.map((business, i) => (
                                            <Fragment key={i}>
                                                <Tooltip title="View Profile" placement="right" arrow >
                                                    <Button sx={{textTransform: 'none'}} component={Link} to="/profile/entrepreneur"> 
                                                        <CardHeader
                                                            sx={{maxWidth: 300, color: 'white'}}
                                                            title={`Business Profile`}
                                                            titleTypographyProps={{variant:'h6' }}
                                                            avatar={
                                                                <Avatar src={business.image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                                            }
                                                            subheader={`${business.companyName}`}
                                                            subheaderTypographyProps={{variant:'h6', color: 'white' }}
                                                        />
                                                    </Button>
                                                </Tooltip>
                                                <hr/>
                                            </Fragment>
                                        ))
                                    }

                                </Fragment>


                            ): (
                               
                                <Fragment></Fragment>
                            )
                        }

                     
                    <CardActions >
                        <IconButton sx={{ml: 1, color:"white"}} aria-label="add" onClick={handleAdd} >
                            <AddIcon/>
                        </IconButton>
                        <Typography sx={{ml: 1, color:"white"}} variant="body1">Add a business profile</Typography>
                    </CardActions>
                  
                </Card>
            </Grid>
    )
}


ProfileCard.propTypes = {
    data: PropTypes.object.isRequired,
    addBusiness: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    addBusiness
}

export default connect(mapStateToProps, mapActionsToProps) (ProfileCard);









