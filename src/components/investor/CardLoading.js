

import React, {Fragment} from 'react'

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


let CardLoading = (props) => {

    return (
        <Grid item alignItems={'center'} justifyContent={'center'} sx={{mb: 5}} xs={12} sm={8} md={6} lg={5}>
            <Card sx={{ mx: 2 }}>
                <CardHeader
                    avatar={
                        <Skeleton animation="wave" variant="circular" width={60} height={60} />
                    }
                    title={
               
                        <Skeleton
                        animation="wave"
                        height={20}
                        width="80%"
                        style={{ marginBottom: 6 }}
                        />

                    }
                    subheader={
                        <Skeleton animation="wave" height={20} width="40%" />
                    }
                />
                
                    <Skeleton sx={{ height: 290 }} animation="wave" variant="rectangular" />
             
                <CardContent>
                    <Fragment>
                        <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
                        <Skeleton animation="wave" height={20} width="80%" />
                    </Fragment>
                </CardContent>
            </Card>
        </Grid>
    )
}


export default CardLoading