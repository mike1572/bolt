
import './App.css';

import React, {useState, useEffect, useRef, Fragment} from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import { logoutUser, getUserData } from './redux/dataActions';

// MUI
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes'
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Button from '@mui/material/Button'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

//Pages
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import SignupEntrepreneur from './pages/SignupEntrepreneur';
import SignupInvestor from './pages/SignupInvestor';
import Header from './components/Header'

import DashboardEntrepreneur from './pages/DashboardEntrepreneur';
import DashboardInvestor from './pages/DashboardInvestor';

import ProfileDisplayed from './pages/ProfileDisplayed'

// Entrepreneur 
import Ressources from './pages/entrepreneur/Ressources'
import EntrepreneurProfile from './pages/entrepreneur/EntrepreneurProfile'
import SocialEntrepreneur from './pages/entrepreneur/SocialEntrepreneur'


// Investor
import InvestorProfile from './pages/investor/InvestorProfile'
import SocialInvestor from './pages/investor/SocialInvestor'
import Recommendations from './pages/investor/Recommendations'



import AuthRoute from './util/AuthRoute';
import LoginRoute from './util/LoginRoute';
import ErrorRoute from './util/ErrorRoute';

import Lynked from './images/lynked.png'

export const light = {
  palette: {
    type: 'light',
    third: {
      main: "#ffffff"
    },
    success: {
      main: "#ba000d",
    },
    warning: {
      main: "#ffffff",
      contrastText: '#ffffff'
    },
    primary: {
      main: '#002171',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ba000d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#E1EEC3',
    }
  }
}

export const dark = {
  palette: {
    type: 'dark',
    third: {
      main: "#000000"
    },
    warning: {
      main: "#ffeb3b"
    },
    success: {
      main: "#62727b",
    },
    primary: {
      main: '#263238',
      contrastText: '#ffffff',
      toggleButton: '#fff',
    },
    secondary: {
      main: '#ffeb3b',
      contrastText: '#000000',
    },
    background: {
      default: "#ffcc80", 
    },
  },

}

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href='/login'
  } else {
    store.dispatch(getUserData())
  }
}

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

function App() {

  const size = useWindowSize()

  
  let emptyRef = useRef()


  const [theme, setTheme] = useState(false);
  const icon = theme ? <Brightness6Icon sx={{ color: "inherit"}} /> : <Brightness4Icon sx={{ color: "inherit"}} />;
  let appliedTheme = createTheme(theme ? light : dark);
  appliedTheme = responsiveFontSizes(appliedTheme)

  useEffect(() => {
    let style = localStorage.getItem("StylePreference");
    if (style !== null){
      if (style === "true"){
        setTheme(true)
      } else{
        setTheme(false)
      }
    } else {
      setTheme(true)
    }
  }, [])

  let handleTop = () => {
    emptyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
    });
  
  }
  let handleChange = () => {
    setTheme(!theme)
    localStorage.setItem('StylePreference', !theme)
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <Provider store={store}>
        <Router>

          {
            size.width < 600 ? (
                <Button       
                    sx={{pt: 2,pb: 2, position: 'fixed', bottom: 7, right: 7, borderRadius: 50, zIndex: 50}}
                    onClick={handleTop}
                    variant="contained"
                ><KeyboardArrowUpRoundedIcon fontSize='large'  /></Button>
            ): (
                <Fragment></Fragment>
            )
          }

           
          <div ref={emptyRef} style={{position: 'absolute', top: 0}}></div>

          <img src={Lynked} alt="logo" style={{
            left: 13,
            top: 21,
            width: 60,  
            height: 20,
            zIndex: '200',
            position: 'absolute',
            display: size.width > 450 ? 'block' : 'none' 
           }} /> 
          <Button 
            style={{borderRadius: 50, position: 'absolute', right: '0', top: '0', zIndex: 10, width: '30px', height: '50px', alignItems: 'center' }}
            onClick={handleChange}
            sx={{mt: 0.4, mr: 0}}
            color="secondary">
              {icon}
          </Button>
          <Header/>
          <Routes>

            <Route element={<AuthRoute/>}>

              <Route exact path="/" element={<WelcomePage/>} /> 
              <Route exact path="/login" element={<Login/>} /> 
              <Route exact path="/entrepreneur" element={<SignupEntrepreneur/>} /> 
              <Route exact path="/investor" element={<SignupInvestor/>} /> 

            </Route>

            <Route element={<LoginRoute/>}>

              {/* {Entrepreneur} */}
              <Route exact path="/home" element={<DashboardEntrepreneur/>} />
              <Route exact path="/resources" element={<Ressources/>} />
              <Route exact path="/profile/entrepreneur" element={<EntrepreneurProfile/>} />
              <Route exact path="/social" element={<SocialEntrepreneur/>} />
              
              {/* {Investor} */}
              <Route exact path="/dashboard" element={<DashboardInvestor/>} />
              <Route exact path="/profile/investor" element={<InvestorProfile/>} />
              <Route exact path="/messages" element={<SocialInvestor/>} />
              <Route exact path="/recommendations" element={<Recommendations/>} />

              <Route exact path="/profile" element={<ProfileDisplayed/>} />

            </Route>


            <Route path='*' element={<ErrorRoute/>} />


          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  
  );
}

export default App;
