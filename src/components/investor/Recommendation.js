
import React, {Fragment, useEffect} from 'react'

import PropTypes from 'prop-types';
// Redux
import {connect } from 'react-redux'
import {} from '../../redux/dataActions'

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


let info = {
    companyName: "SpaceX", 
    employees: "250-500 employees",
    funding: [
        10, 
        2000000
    ], 
    fundingStage: "EarlyStage", 
    image: "https://firebasestorage.googleapis.com/v0/b/bolt-b9576.appspot.com/o/logos%2Fdog3.png?alt=media&token=58c0bbb3-0c7a-45ff-b29a-83612e9c924b",
    industry: [
        "Healthcare", "Transport"
    ], 
    location: "Texas", 
    pitch: "Conquer the world", 
    typeOfBusiness: "Scalable", 
    user: {
        id: "userID",
        bio: "Conquer Mars", 
        email: "email@email.com", 
        facebook: "email@email", 
        image: "https://firebasestorage.googleapis.com/v0/b/bolt-b9576.appspot.com/o/images%2Fdog.jpg?alt=media&token=579af28d-b1e3-4a83-8ca3-e3d274ab9d54", 
        profession: "CEO", 
        fullName: "Elon Musk"
    }
}

let Recommendation = (props) => {


    let {data: {user: {fullName, image, matches}, recommendations, loadingRecommendations}, dataInputed} = props



    useEffect(() => {
        console.log(dataInputed)
    }, [dataInputed])

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

Recommendation.propTypes = {
    data: PropTypes.object.isRequired,
    dataInputed: PropTypes.object.isRequired

}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (Recommendation);
