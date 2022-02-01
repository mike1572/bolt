
import React from 'react'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography  from '@mui/material/Typography'

let DashHead = (props) => {


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
                    Dashboard
                </Typography>
                <Typography color="white" variant='h4' sx={{mt: 2, fontWeight: 600,  textShadow: '2px 2px #0000'}}> 
                Welcome back, {props.name}
                </Typography>
            </Container>
        </Grid>
    )
}

export default DashHead;