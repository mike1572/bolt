

import React, {Fragment} from 'react'

//MUI
import Grid from '@mui/material/Grid'

import MatchesCardInvestor from '../../components/investor/MatchesCardInvestor'

import Chat from '../../components/Chat'

let SocialInvestor = () => {

    return (
        <Fragment>
            <Grid container component="main" 
            sx={{ height: '40vh'}} 
            spacing={5}  
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            >
            <Grid
                container
                item
                xs={12} sm={12} md={5} lg={5}
                direction="column"
                justifyContent="center"
            >
                <MatchesCardInvestor/>
            </Grid>

            <Grid
                container
                item
                direction="column"
                justifyContent="center"
                xs={12} sm={12} md={6}
            >
                <Chat/>
            </Grid>


        </Grid>
    </Fragment>
    )
}

export default SocialInvestor;



