import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// MUI
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip'
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton'

// Icons
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LogoutIcon from '@mui/icons-material/Logout';

//Redux
import {connect} from 'react-redux'
import {logoutUser} from '../redux/dataActions'

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

  let handleLogout = () => {
    props.logoutUser()
  }

  let navbar;

  if (props.authenticated) {
    if (props.type === 'entrepreneur'){
      navbar = (
        <Fragment>

          <Button color="inherit" component={Link} to='/home'>{size.width < 520 ? <Tooltip title="Home"><HomeIcon/></Tooltip> : "Home"}</Button>
          <Button color="inherit" onClick={handleLogout} >{size.width < 520 ? <Tooltip title="Logout"><LogoutIcon/></Tooltip> : "Logout"}</Button>

          
        </Fragment>
      )
    } else if (props.type === 'investor') {
      navbar = (
        <Fragment>

          <Button color="inherit" component={Link} to='/dashboard'>{size.width < 520 ? <Tooltip title="Home"><HomeIcon/></Tooltip> : "Home"}</Button>
          <Button color="inherit" onClick={handleLogout} >{size.width < 5020 ? <Tooltip title="Logout"><LogoutIcon/></Tooltip> : "Logout"}</Button>

        </Fragment>
      )
    } else {
      navbar = (
        <Skeleton animation='wave' />
      )
    }
  } else {
    navbar = (
      <Fragment>
        <Button color="inherit" component={Link} to='/'>{size.width < 520 ? <Tooltip title="Home"><HomeIcon/></Tooltip> : "Home"}</Button>
        <Button color="inherit" component={Link} to='/login'>{size.width < 520 ? <Tooltip title="Login"><LoginIcon/></Tooltip> : "Login"}</Button>
        <Button color="inherit" component={Link} to='/entrepreneur'>{size.width < 520 ? <Tooltip title="Entrepreneur"><PersonAddIcon/></Tooltip> : "Entrepreneur"}</Button>
        <Button color="inherit" component={Link} to='/investor'>{size.width < 520 ? <Tooltip title="Investor"><PersonAddAltIcon/></Tooltip> : "Investor"}</Button>
      </Fragment>
    )
  }


  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters sx={{alignItems: 'center', justifyContent: 'center'}}>
        
          {navbar}
            
        </Toolbar>
      </Container>
    </AppBar>
  )
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  type: PropTypes.string,
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.data.authenticated,
  type: state.data.type
})

const mapActionsToProps = {
  logoutUser
}


export default connect(mapStateToProps, mapActionsToProps)(Header);





