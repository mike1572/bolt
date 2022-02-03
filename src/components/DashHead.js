
import React from 'react'
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography  from '@mui/material/Typography'
import Button from '@mui/material/Button'

// Redux
import {connect} from 'react-redux'
import { addBusiness} from '../redux/dataActions';


let DashHead = (props) => {

    let handleAddBusinessProfile = () => {
        props.addBusiness(true)
    }

    return (
        <Grid
            container
            sx={{
                backgroundImage: `url(${props.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                borderBottom: 'solid black 1px', 
                height: '40vh'
            }}
        >
            <Container >
                <Typography color="white" variant='h3' sx={{mt: 5, fontWeight: 600, textShadow: '2px 2px #0000'}}> 
                    {props.title}
                </Typography>

                <Button 
                    
                    onClick={handleAddBusinessProfile}
                    sx={{
                        color: 'warning.main', 
                        borderRadius: '50px', 
                        mt: 3,
                        display: props.profile
                            
                    }} 
                   
                    variant="contained"
                >
                    <Typography variant="body2">
                        Add a Business Profile
                    </Typography>
                   
                </Button>

                <Typography display={props.display} color="white" variant='h4' sx={{mt: 2, fontWeight: 600,  textShadow: '2px 2px #0000'}}> 
                Welcome back, {props.name}
                </Typography>
            </Container>
        </Grid>
    )
}

DashHead.propTypes = {
    addBusiness: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
    addBusiness
}

export default connect(mapStateToProps, mapActionsToProps) (DashHead);