

import React, {Fragment, useState} from 'react'
import {Link} from 'react-router-dom'
import {db, auth} from '../firebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth'
import {getDoc, doc} from 'firebase/firestore'

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
import {loginUser, setBusinesses} from "../redux/dataActions";

//MUI
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress';

import Job from '../images/job.jpg'

const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px', 
}

let Login = (props) => {
    let useTrait = (initialValue) => {
   
        let [errors, setErrors] = useState(initialValue);
     
        let current = errors;
     
        const get = () => current;
     
        const set = newValue => {
           current = newValue;
           setErrors(newValue);
           return current;
        }
     
        return {
           get,
           set,
        }
    }

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [loading, setLoading] = useState(false)
    let errors = useTrait({})

    let handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        errors.set({})

        if (email === ''){
            errors.set({...errors.get(), email: "Cannot be empty"})
        }
        if (password === '') {
            errors.set({...errors.get(), password: "Cannot be empty"})
        }

        if (Object.keys(errors.get()).length === 0){
            let userId;
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                userId = user.uid;
                return user.getIdToken()
            })
            .then((idToken) => {
            
                const docRef = doc(db, "users", userId);
                getDoc(docRef)
                .then((infoObject) => {

                    if (infoObject.exists()) {
                        let data =  infoObject.data()

                        const promises = data.matches.map(u => getDoc(doc(db, "users", u)))
                
                        let matchesValues = []
                        Promise.all(promises)
                        .then(results => {
                            results.map(docSnapshot => {
                                let obj = docSnapshot.data()
                                let info = {}    
                                info.id = docSnapshot.id
                                info.linkedin = obj.linkedin
                                info.email = obj.email
                                info.facebook = obj.facebook
                                info.github = obj.github
                                info.fullName = obj.fullName
                                info.image = obj.image
                                info.profession = obj.profession
                                info.businesses = obj.businesses
                                info.bio = obj.bio
                                info.location = obj.location
                                info.fundingStage = obj.fundingStage
                                info.industry = obj.industry
                                info.location = obj.location
                                info.pitch = obj.pitch
                                info.typeOfBusiness = obj.typeOfBusiness
    
                                matchesValues.push(info)
                            });
                        })
                        .then(() => {
                            props.setBusinesses(data.businesses, data.type)
                            props.loginUser(data, userId, matchesValues)
                            setLoading(false)
                            setEmail('')
                            setPassword('')
                            errors.set({})

                            const FBIdToken = `Bearer ${idToken}`
                            localStorage.setItem('FBIdToken', FBIdToken) 
                        })

                       
                            
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        setLoading(false)
                        setEmail('')
                        setPassword('')
                        errors.set({...errors.get(), general: "Something went wrong, please try again"})
                    }
        
                })
                
            })
            .catch((err) => {
                console.log(err.code)
                setLoading(false)
                setEmail('')
                setPassword('')

                if (err.code === "auth/invalid-email" ){
                    errors.set({...errors.get(), email: 'Email is invalid'})
                } else if ( err.code === "auth/wrong-password"){
                    errors.set({...errors.get(), password: 'Wrong Password'})
                }else {
                    errors.set({...errors.get(), general: "Something went wrong, please try again"})
                }
            });
        } else {
            setLoading(false)
        }

        
    }

    let handleChange = (event) => {
        if (event.target.name === 'email'){
            setEmail(event.target.value)
        } else if (event.target.name === 'password'){
            setPassword(event.target.value)
        }
    }


    return (
        <Fragment>
        <Grid container component="main" sx={{ height: '90vh'}}>
            <Grid
                item
                xs={0}
                sm={5}
                md={7}
                sx={{
                    backgroundImage: `url(${Job})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: 'solid black 1px' 
                }}
            />
            <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6} >
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color='inherit'>
                    Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            helperText={errors.get().email}
                            error={errors.get().email ? true : false} 
                            value={email} 
                            onChange={handleChange} 
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={errors.get().password}
                            error={errors.get().password ? true : false} 
                            value={password} 
                            onChange={handleChange} 
                        />
                        <Typography variant="body2" style={customError}>
                            {errors.get().general}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            color="secondary"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                           
                        >
                        {loading ? 
                            (<CircularProgress size={24} color="primary" />): ('Log In')
                        }
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <small>Don't have an account? Sign up <Link to="/entrepreneur">here</Link> for entrepreneurs and  <Link to="/investor">here</Link> for investors</small>
                            </Grid>
                        </Grid>
             
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </Fragment>
    )
}

Login.propTypes = {
    data: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    setBusinesses: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    loginUser, 
    setBusinesses
}

export default connect(mapStateToProps, mapActionsToProps) (Login);
