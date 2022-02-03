


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


let PotentialsCard = (props) => {

    let {data: {user: {fullName, image}}} = props

    return (
        <Grid item sx={{mb: 10}} >
            <Card sx={{ backgroundColor:'success.main',  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                <CardHeader
                    title="Your Potentials"
                    sx={{ml: 3, mt: 1, color: 'white'}}
                >
                </CardHeader>
                <hr/>
                <CardContent>
                    <Typography variant="h6" sx={{ml: 3, mt: 2, color: 'white'}}>
                        Investor A: info
                    </Typography>
                    
                    <br/>
                    <Typography variant="h6" sx={{ml: 3, mt: 1, color: 'white'}}>
                        Investor A: info
                    </Typography>
                    
                    <br/>
                    <Typography variant="h6" sx={{ml: 3, mt: 1, color: 'white'}}>
                        Investor A: info
                    </Typography>
                    <br/>
                    <Typography variant="h6" sx={{ml: 3, mt: 1, color: 'white'}}>
                        Investor A: info
                    </Typography>
                </CardContent>
            </Card>
        </Grid>

    )
}


PotentialsCard.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (PotentialsCard);







