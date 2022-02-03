import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from 'react'
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

//Pages
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import SignupEntrepreneur from './pages/SignupEntrepreneur';
import SignupInvestor from './pages/SignupInvestor';
import Header from './components/Header'

import DashboardEntrepreneur from './pages/DashboardEntrepreneur';
import DashboardInvestor from './pages/DashboardInvestor';

// Entrepreneur 
import Ressources from './pages/entrepreneur/Ressources'
import EntrepreneurProfile from './pages/entrepreneur/EntrepreneurProfile'
import SocialEntrepreneur from './pages/entrepreneur/SocialEntrepreneur'


// Investor
import InvestorProfile from './pages/investor/InvestorProfile'




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
    // store.dispatch({ type: SET_AUTHENTICATED, payload: true })
    // axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}


function App() {
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

  let handleChange = () => {
    setTheme(!theme)
    localStorage.setItem('StylePreference', !theme)
  }

  return (
    <ThemeProvider theme={appliedTheme}>
      <Provider store={store}>
        <Router>
          <img src={Lynked} alt="logo" style={{
            left: 13,
            top: 21,
            width: 60,  
            height: 20,
            zIndex: '200',
            position: 'absolute',
            display: window.innerWidth > 385 ? 'block' : 'none' 
           }} /> 
          <Button 
            style={{borderRadius: 50, position: 'absolute', right: '0', top: '0', zIndex: 10, width: '50px', height: '50px', alignItems: 'center' }}
            onClick={handleChange}
            sx={{mt: 0.4, mr: -1}}
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

            </Route>

            <Route path='*' element={<ErrorRoute/>} />


          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  
  );
}

export default App;
