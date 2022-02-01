
import React, {Fragment, useRef, useState, useEffect} from 'react'
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
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SpeedDial from '@mui/material/SpeedDial';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import { makeStyles } from '@mui/styles';

import Tower from '../images/Tower.mp4'
import Startup from '../images/startup.jpg'
import Laptop from '../images/laptop.jpg'

const useStyles = makeStyles({
    color: {
    backgroundColor: 'secondary'
    }
})

// Hook
let useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}



let WelcomePage = (props) => {

    const size = useWindowSize()

    let emptyRef = useRef()
    const classes = useStyles()
    const [open, setOpen] = useState(true)


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    };

    let handleTop = () => {
        emptyRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start"
        });
    }

    const action = (
        <Fragment>
          <Button variant="outlined" color="secondary" size="small" onClick={handleClose} sx={{mb: 1, mt: 1, mr: 1}}>
            CONTINUE
          </Button>
        </Fragment>
    );

    return (

        <Fragment>

            {
                size.width < 600 ? (
                    <Button       
                        sx={{pt: 2,pb: 2,  position: 'fixed', bottom: 10, right: 10, borderRadius: 50, zIndex: 50}}
                        onClick={handleTop}
                        variant="contained"
                    ><KeyboardArrowUpRoundedIcon fontSize='large'  /></Button>
                ): (
                    <Fragment></Fragment>
                )
            }
   
            <Snackbar
                open={open}
                autoHideDuration={6000}
                sx={{ textAlign: 'justify',width: {xs: '80%', sm: 130}, bgcolor: 'primary'}}
                anchorOrigin={{ vertical: 'bottom', horizontal:'right' }}
                onClose={handleClose}
                message="We use cookies to give you the best experience possible. By continuing, you consent to their use for optimal performance"
                action={action}
            />
           
            <div ref={emptyRef} style={{position: 'absolute', top: 0}}></div>
            <div className='videoText'>
                <div className='videoHolder'>
                    <video autoPlay muted loop style={{height: '100%', width: '100%', objectFit: 'cover', zIndex: '2'}}>
                        <source src={Tower} type="video/mp4"/>
                    </video>
                </div>
                <Typography style={{position: 'absolute', zIndex: '5', color: 'white', left: '0', right: '0', margin: 'auto 15%', marginTop: '170px'}} variant="h3">
                    Helping your future startup succeed
                </Typography>
            </div>

            <Grid sx={{mt: 84, color: 'primary', alignItems: 'center'}} 
                container
                alignItems="center"
                justifyContent="center"
            >
                
                <Grid item xs={12} sx={{mb: 10, pt: 10, pb: 15, width: '100%', mx: 0, backgroundColor: 'primary.main'}}>
                   
                    <Typography variant='h4' color="white" sx={{textAlign: 'center'}}>
                        AppName
                    </Typography>
                   
                    <br/>
                    <Typography variant='h5' color="white" sx={{textAlign: 'center', mx: '10%'}}>
                        An easy way for entrepreneurs seeking funding to meet investors and access capital quickly
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
                                        Find ressources, meet investors, gain connections and access capital
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
      

            
                <Grid item xs={12} sx={{mt: 10, mb: 10, pt: 10, pb: 15, width: '100%', mx: 0, backgroundColor: 'primary.main'}}>
                    <Typography variant='h4' color="white" sx={{textAlign: 'center'}}>
                        About Us
                    </Typography>
                    <br/>
                    <Typography variant='h5' color="white" sx={{textAlign: 'center', mx: '10%'}}>
                        We are five students from McGill University
                    </Typography>
                    <br/>
                    <Typography variant='h6' color="white" sx={{textAlign: 'center', mx: '10%'}}>
                        Project built as part of Bolt 2022
                    </Typography>
                    
                </Grid>  
                
            </Grid>
        </Fragment>
    )
}

export default WelcomePage;