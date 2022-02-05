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
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ReviewsIcon from '@mui/icons-material/Reviews';

//Redux
import {connect} from 'react-redux'
import {logoutUser, setRecommendations} from '../redux/dataActions'

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

  let refreshRecommendations = () => {
    props.setRecommendations(props.user)
  }


  let navbar;

  if (props.authenticated) {
    if (props.type === 'entrepreneur'){
      navbar = (
        <Fragment>

          <Button color="inherit" component={Link} to='/home'>{size.width < 555 ? <Tooltip title="Home"><HomeIcon/></Tooltip> : "Home"}</Button>
          <Button color="inherit" component={Link} to='/social'>{size.width < 555 ? <Tooltip title="Social"><ChatIcon/></Tooltip> : "Social"}</Button>
          <Button color="inherit" component={Link} to='/profile/entrepreneur'>{size.width < 555 ? <Tooltip title="Profile"><PersonIcon/></Tooltip> : "Profile"}</Button>
          <Button color="inherit" component={Link} to='/resources'>{size.width < 555 ? <Tooltip title="Resources"><MenuBookIcon/></Tooltip> : "Resources"}</Button>
          <Button color="inherit" onClick={handleLogout} >{size.width < 555 ? <Tooltip title="Logout"><LogoutIcon/></Tooltip> : "Logout"}</Button>

          
        </Fragment>
      )
    } else if (props.type === 'investor') {
      navbar = (
        <Fragment>

          <Button color="inherit" component={Link} to='/dashboard'>{size.width < 620 ? <Tooltip title="Home"><HomeIcon/></Tooltip> : "Home"}</Button>
          <Button color="inherit" component={Link} to='/messages'>{size.width < 620 ? <Tooltip title="Social"><ChatIcon/></Tooltip> : "Social"}</Button>
          <Button color="inherit" component={Link} to='/profile/investor'>{size.width < 620 ? <Tooltip title="Profile"><PersonIcon/></Tooltip> : "Profile"}</Button>
          <Button color="inherit" onClick={refreshRecommendations} component={Link} to='/recommendations'>{size.width < 620 ? <Tooltip title="Recommendations"><ReviewsIcon/></Tooltip> : "Recommendations"}</Button>
          <Button color="inherit" onClick={handleLogout} >{size.width < 620 ? <Tooltip title="Logout"><LogoutIcon/></Tooltip> : "Logout"}</Button>

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
  logoutUser: PropTypes.func.isRequired,
  setRecommendations: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.data.authenticated,
  type: state.data.type,
  user: state.data.user
})

const mapActionsToProps = {
  logoutUser,
  setRecommendations
}


export default connect(mapStateToProps, mapActionsToProps)(Header);





