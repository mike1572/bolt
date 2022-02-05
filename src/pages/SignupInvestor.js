
import React, {useState, Fragment} from 'react'
import {useNavigate} from 'react-router-dom';
import {db, auth} from '../firebaseConfig';
import {setDoc, doc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

//MUI
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress';

import Job from '../images/startup3.jpg'

const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px', 
}

let SignupInvestor = (props) => {

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
    
    let navigate = useNavigate()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [company, setCompany] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')
    let [fullName, setFullName] = useState('')

    let errors = useTrait({})

    let [loading, setLoading] = useState(false)

    let handleSubmit = (event) => {
        event.preventDefault()
        errors.set({})
        setLoading(true)

        if (email === ''){
            errors.set({...errors.get(), email: "Cannot be empty"})
        }
        if (password === '') {
            errors.set({...errors.get(), password: "Cannot be empty"})
        }
        if (confirmPassword === ""){
            errors.set({...errors.get(), confirmPassword: "Cannot be empty"})
        }
        if (fullName === ""){
            errors.set({...errors.get(), fullName: "Cannot be empty"})
        }
        if (company=== ""){
            errors.set({...errors.get(), company: "Cannot be empty"})
        }
        if (confirmPassword !== password){
            errors.set({...errors.get(), confirmPassword: "Needs to match your password"})
        } 
        
        if (Object.keys(errors.get()).length === 0){

            let id;
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                id = user.uid

                return user.getIdToken()
            })
            .then((idToken) => {

                setDoc(doc(db, "users", id), {
                    email: email, 
                    fullName, fullName, 
                    company: company,
                    type: 'investor',
                    matches: [],
                    image: 'https://firebasestorage.googleapis.com/v0/b/bolt-b9576.appspot.com/o/blank.png?alt=media&token=3c9d2c2b-681a-4f89-a9a6-848098e64317'           
                })
                .then(() => {

                    setFullName('')
                    setFullName('')
                    setEmail('')
                    setPassword('')
                    setConfirmPassword('')
                    errors.set({})
                    setLoading(false)

                    const FBIdToken = `Bearer ${idToken}`
                    localStorage.setItem('FBIdToken', FBIdToken)
                    navigate('/login')
                })
                .catch((err) => {
                    errors.set({...errors.get(), general: "Something went wrong, please try again"})
                    console.log(err)
                })
            })
            .catch((err) => {
        
                if (err.code === "auth/email-already-exists" || err.code === "auth/email-already-in-use"){
                    errors.set({...errors.get(), email: 'Email is already used'})
                } else if ( err.code === "auth/invalid-password"){
                    errors.set({...errors.get(), password: 'Password needs a minimum of 6 characters'})
                }else {
                    errors.set({...errors.get(), general: "Something went wrong, please try again"})
                }

                setLoading(false)
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
        } else if (event.target.name=== 'confirmPassword'){
            setConfirmPassword(event.target.value)
        } else if (event.target.name === 'fullName'){
            setFullName(event.target.value)
        } else if (event.target.name=== 'company'){
            setCompany(event.target.value)
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
            <Grid item xs={12} sm={7} md={5} component={Paper} elevation={6}  >
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
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color='inherit'>
                        Sign up as an Investor
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
                    <TextField
                    
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="full-name"
                            id="fullName"
                            label="Full Name"
                            name="fullName"
                            helperText={errors.get().fullName}
                            error={errors.get().fullName ? true : false} 
                            value={fullName} 
                            onChange={handleChange}
                           
                            
                        />
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
                            id="company"
                            label="Company"
                            name="company"
                            type="company"
                            autoComplete="company"
                            helperText={errors.get().company}
                            error={errors.get().company ? true : false} 
                            value={company} 
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            autoComplete="confirm-password"
                            id="confirmPassword"
                            helperText={errors.get().confirmPassword}
                            error={errors.get().confirmPassword ? true : false} 
                            value={confirmPassword} 
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
                            (<CircularProgress size={24} color="primary" />): ('Sign up')
                        }
                        </Button>
                    
             
                    </Box>
                </Box>
            </Grid>
        </Grid>
        </Fragment>
    )

}

export default SignupInvestor;