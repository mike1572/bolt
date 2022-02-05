
import React, { Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'

//MUI
import Grid from '@mui/material/Grid';

import MontrealNight from '../images/montreal.jpg'
import DashHead from '../components/DashHead'

import ProfileCardInvestor from '../components/investor/ProfileCardInvestor';
import PotentialsCard from '../components/entrepreneur/PotentialsCard';
import MatchesCardInvestor from '../components/investor/MatchesCardInvestor';
import News from '../components/News';


let DashboardInvestor = (props) => {

    let {data: {user: {fullName}}} = props

    return (
        <Fragment>

        <DashHead image={MontrealNight} name={fullName} title={'Dashboard'} profile="none"/>

        <Grid container component="main" 
                sx={{ height: '40vh'}} 
                spacing={5}  
                direction="row"
                justifyContent="space-evenly"
                alignItems="flex-start"
                >
                <Grid
                    container
                    item
                    xs={12} sm={12} md={6} lg={5}
                    direction="column"
                    justifyContent="center"
                >
                    <ProfileCardInvestor/>
                    <MatchesCardInvestor/>
                    <PotentialsCard/>
                </Grid>

                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="center"
                    xs={12} sm={12} md={4}
                >
                    <News/>
                </Grid>
            </Grid>

        </Fragment>
    )
}

DashboardInvestor.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (DashboardInvestor);