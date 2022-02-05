
import React, {Fragment} from 'react'
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'

//MUI
import Grid from '@mui/material/Grid';

import MontrealNight from '../images/montreal.jpg'

import DashHead from '../components/DashHead'
import ProfileCard from '../components/entrepreneur/ProfileCard';
import RessourcesCard from '../components/entrepreneur/RessourcesCard';
import PotentialsCard from '../components/entrepreneur/PotentialsCard';
import MatchesCard from '../components/entrepreneur/MatchesCard';
import News from '../components/News';

let DashboardEntrepreneur = (props) => {

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
                    <ProfileCard/>
                    <MatchesCard/>
                    <RessourcesCard/>

                </Grid>

                <Grid
                    container
                    item
                    direction="column"
                    justifyContent="center"
                    xs={12} sm={12} md={4}
                >
                    <PotentialsCard/>
                    <News/>
                </Grid>

                
            </Grid>
        </Fragment>
    )
}

DashboardEntrepreneur.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (DashboardEntrepreneur);