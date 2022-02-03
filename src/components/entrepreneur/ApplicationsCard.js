


import React from 'react'

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


let ApplicationsCard = (props) => {

    let {data: {user: {fullName, image}}} = props

    return (
        <Grid item >
            <Card  sx={{ backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                <CardHeader
                    title="Your Applications"
                    sx={{ml: 3, mt: 1, color: "white"}}
                    
                />
                <hr style={{border: '2px solid white'}} />
                <Tooltip title="View Application" placement="right" arrow >
                    <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%'}}>
                        <CardHeader
                            sx={{maxWidth: 300}}
                            title={`Investor 1 `}
                            titleTypographyProps={{variant:'h6', color: 'white' }}
                            subheader={`January 21, 2022`}
                            subheaderTypographyProps={{variant:'h6' , color: 'white'}}
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
                            titleTypographyProps={{variant:'h6' , color: 'white'}}
                            subheader={`January 21, 2022`}
                            subheaderTypographyProps={{variant:'h6' , color: 'white'}}
                        />
                    </Button>
                </Tooltip>
                
                <hr/>
                <CardActions>
                    <IconButton sx={{ml: 1, color: 'white'}} aria-label="add" >
                        <AddIcon/>
                    </IconButton>
                    <Typography sx={{ml: 1, color: 'white'}} variant="body1">Add an application</Typography>
                </CardActions>
                
            </Card>
        </Grid>
    )
}


ApplicationsCard.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (ApplicationsCard);







