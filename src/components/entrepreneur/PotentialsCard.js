


import React, { useEffect, useState } from 'react'

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

    const [quote, setQuote] = useState({})


    useEffect(() => {

        fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);

            let rand = Math.floor(Math.random() * data.length)

            setQuote(data[rand])
        });

    }, [])

    return (
        <Grid item sx={{mb: 10}} >
            <Card sx={{ backgroundColor:'third.main', mt: 5}} raised >

                <CardContent>
                    <CardHeader
                        sx={{textAlign: 'center'}}
                        titleTypographyProps={{color: 'secondary.main', variant: 'h5', mt: 2, fontWeight: 600}}
                        title={"Inspirational Quote"}
                    />

                    <Typography variant="h6" sx={{ mt: 1, color: 'secondary.main',
                        textAlign: 'center', 
                        mx: 1
                    }}>
                        {quote.text}
                    </Typography>
                    <Typography variant="body1" sx={{mt: 2, color: 'secondary.main', textAlign: 'center'}}>
                        <b><i>{quote.author}</i></b>
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







