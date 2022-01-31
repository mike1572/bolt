import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// MUI
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip'
import Container from '@mui/material/Container';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';


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




let Header = (props) => {


    const size = useWindowSize()

    useEffect(() => {
        console.log(size.width > 520)
    }, [size])



    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters sx={{alignItems: 'center', justifyContent: 'center'}}>
               
                    <Fragment>
                        <Button color="inherit" component={Link} to='/'>{size.width < 520 ? <Tooltip title="Home"><HomeIcon/></Tooltip> : "Home"}</Button>
                        <Button color="inherit" component={Link} to='/login'>{size.width < 520 ? <Tooltip title="Login"><LoginIcon/></Tooltip> : "Login"}</Button>
                        <Button color="inherit" component={Link} to='/entrepreneur'>{size.width < 520 ? <Tooltip title="Entrepreneur"><PersonAddIcon/></Tooltip> : "Entrepreneur"}</Button>
                        <Button color="inherit" component={Link} to='/investor'>{size.width < 520 ? <Tooltip title="Investor"><PersonAddAltIcon/></Tooltip> : "Investor"}</Button>
                    </Fragment>
                    
                </Toolbar>
            </Container>
        </AppBar>
    )
}



export default Header;





