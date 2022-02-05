
import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'

//MUI
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Snackbar from '@mui/material/Snackbar';

import Tower from '../images/Tower.mp4'
import Startup from '../images/startup.jpg'
import Laptop from '../images/laptop.jpg'
import Lynked from '../images/lynked.png'


let WelcomePage = (props) => {

    const [open, setOpen] = useState(true)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    const action = (
        <Fragment>
          <Button variant="outlined" color="secondary" size="small" onClick={handleClose} sx={{mb: 1, mt: 1, mr: 1}}>
            CONTINUE
          </Button>
        </Fragment>
    );

    return (

        <Fragment>
   
            <Snackbar
                open={open}
                autoHideDuration={6000}
                sx={{ textAlign: 'justify',width: {xs: '80%', sm: 130}, bgcolor: 'primary'}}
                anchorOrigin={{ vertical: 'bottom', horizontal:'right' }}
                onClose={handleClose}
                message="We use cookies to give you the best experience possible. By continuing, you consent to their use for optimal performance"
                action={action}
            />
           
            <div className='videoText'>
                <div className='videoHolder'>
                    <video autoPlay muted loop style={{height: '100%', width: '100%', objectFit: 'cover', zIndex: '2'}}>
                        <source src={Tower} type="video/mp4"/>
                    </video>
                </div>
                
                <img src={Lynked} alt="logo" style={{
                    width: 280,  
                    left: '0', 
                    right: '0',
                    margin: 'auto', 
                    marginTop: '130px',
                    maxWidth: '100%',
                    zIndex: '100',
                    position: 'absolute'
                }} />   
            
                <Typography style={{position: 'absolute', zIndex: '5', color: 'white', left: '0', right: '0', margin: 'auto 15%', marginTop: '270px'}} variant="h3">
                    Helping your startup succeed
                </Typography>
            </div>

            <Grid sx={{mt: 84, color: 'primary', alignItems: 'center'}} 
                container
                alignItems="center"
                justifyContent="center"
            >
                
                <Grid item xs={12} sx={{mb: 10, pt: 10, pb: 15, width: '100%', mx: 0, backgroundColor: 'primary.main'}}>
                   
                    <Typography variant='h4' color="white" sx={{textAlign: 'center'}}>
                        Who are we?
                    </Typography>
                   
                    <br/>
                    <Typography variant='h5' color="white" sx={{textAlign: 'center', mx: '10%'}}>
                        An easy way for entrepreneurs seeking funding to meet investors and access capital
                    </Typography>
                    
                </Grid>  
                

                <Grid item xs={12} md={6} >
                    <Card aria-disabled sx={{backgroundColor: 'primary.main', mx: 5, mb: 3, mt: 2}}>
                        <CardActionArea component={Link} to='/entrepreneur'>
                                <CardMedia
                                component="img"
                                height="350vh"
                                image={Startup}
                                alt="People working"
                                />
                                <CardContent sx={{ml: 2, mt: 3}}>
                                    <Typography gutterBottom color="white" variant="h5" >
                                        Entrepreneurs
                                    </Typography>
                                    <Typography variant="h6" color="white" sx={{mt: 3}}>
                                        Find resources, meet investors, gain connections and access capital
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{mb: 3, ml: 3, mt: 2}}>
                                <Button variant="contained" color="secondary" component={Link} to='/entrepreneur'>Register Now</Button> 
                            </CardActions>
                        </Card>
                </Grid>
                <Grid item xs={12} md={6} >
                    <Card aria-disabled sx={{backgroundColor: 'primary.main', mx: 5, mb: 3, mt: 2}}>
                        <CardActionArea component={Link} to='/investor'>
                                <CardMedia
                                component="img"
                                height="350vh"
                                image={Laptop}
                                alt="People working"
                                />
                                <CardContent sx={{ml: 2, mt: 3}}>
                                    <Typography gutterBottom variant="h5" color="white">
                                        Investors
                                    </Typography>
                                    <Typography variant="h6" color="white" sx={{mt: 3}}>
                                        Fund new startup ideas and help make dreams come true
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions sx={{mb: 3, ml: 3, mt: 2}}>
                                <Button variant="contained" color="secondary" component={Link} to='/investor'>Join Today</Button> 
                            </CardActions>
                        </Card>
                </Grid>
      
                <Grid item xs={12} sx={{mt: 10, mb: 3, pt: 10, pb: 15, width: '100%', mx: 0, backgroundColor: 'primary.main'}}>
                    <Typography variant='h4' color="white" sx={{textAlign: 'center'}}>
                        About Us
                    </Typography>
                    <br/>
                    <Typography variant='h5' color="white" sx={{textAlign: 'center', mx: '15%'}}>
                    We're a team of 5 passionate students from McGill, brought together by a challenge. Gathered from various backgrounds, we put to use our different skillsets towards the same goal!
                    </Typography>

                </Grid>  
                <Grid item xs={12} sx={{mt: 3, mb: 10, pt: 10, pb: 15, width: '100%', mx: 0, backgroundColor: 'secondary.main'}}>
                    <Typography variant='h5' color="third.main" sx={{textAlign: 'center'}}>
                        About this project
                    </Typography>
                    <br/>
                    <Typography variant='h6' color="third.main" sx={{textAlign: 'center', mx: '15%'}}>
                        BOLT is the fusion of a case competition and a hackathon. This project conciliates both the skills of a STEM student as well as the knowledge of business majors. With the theme being the future of fintech, our team came up with the idea of a platform that would make an entrepreneur's life easier. With a matchmaking algorithm, we connect entrepreneurs registered on our app to likeminded investors.
                        <br/>
                        A first push for entrepreneurs who don't know where to start with funding! We offer a large array of resources and an easy way to reach out to investor through open channels of communication.
                    </Typography>

                </Grid>  
                
            </Grid>
        </Fragment>
    )
}

export default WelcomePage;