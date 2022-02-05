

import React from 'react'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux'

//MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import DialogAddBusiness from '../../components/entrepreneur/DialogAddBusiness'

let ProfileCardInvestor = (props) => {

    let {data: {user: {fullName, image}}} = props

    return (
        <Grid item >
                <DialogAddBusiness/>
                <Card aria-disabled sx={{backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                    <CardHeader
                        title="Your Profile"
                        sx={{ml: 3, mt: 1, color: "white"}}
                        
                    />
                    <hr style={{border: '2px solid white'}} />
                    <Tooltip title="View Profile" placement="right" arrow >
                        <Button sx={{textTransform: 'none'}} component={Link} to="/profile/investor"> 
                            <CardHeader
                                sx={{maxWidth: 300, color: 'white', p: 3}}
                                title={<b>Investor Profile</b>}
                                titleTypographyProps={{variant:'h6', mb: 1 }}
                                avatar={
                                    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                }
                                subheader={`${fullName}`}
                                subheaderTypographyProps={{variant:'h6', color: 'white' }}
                            />
                        </Button>
                    </Tooltip>
                    <br/>
                </Card>
            </Grid>
    )
}


ProfileCardInvestor.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps) (ProfileCardInvestor);



