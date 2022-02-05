


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
import Box from '@mui/material/Box'


let NewsCardLoading = (props) => {
    return (
        <Fragment>
            <Card sx={{  mx: 3, mb: 1, mt: 2 }}>
                <Skeleton sx={{ width: '100%', height: 220}} animation="wave" variant="rectangular" />
                <Fragment>
                    <Skeleton sx={{ml: 4, mr: 1, mt: 3}} animation="wave" height={60} width={250} />
                    <Skeleton sx={{ml: 4, mr: 1, mt: 1}} animation="wave" height={45} width={200}  />
                    <Skeleton sx={{ml: 4, mr: 1, mt: 1}} animation="wave" height={45} width={140} />
                    <Skeleton sx={{ml: 4, mr: 1, mt: 1, mb: 3}} animation="wave" height={25} width={25} />
                </Fragment>
            </Card>
            <br/>
        </Fragment>
    )
}


export default NewsCardLoading