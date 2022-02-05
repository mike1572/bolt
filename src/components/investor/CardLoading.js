
import React, {Fragment} from 'react'

//MUI
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

let CardLoading = () => {

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