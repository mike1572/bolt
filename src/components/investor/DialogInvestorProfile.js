
import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {db} from '../../firebaseConfig';
import { doc, updateDoc, deleteField  } from 'firebase/firestore';

// Redux
import {connect} from 'react-redux'
import {editProfilePersonal , updateUser} from '../../redux/dataActions';

//MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider';

const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px', 
}

  
const minDistance = 10000;

let DialogInvestorProfile = (props) =>{

    const {data: {editProfile, user, userId}} = props
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [fullname, setFullName] = useState(user.fullName)
    const [linkedin, setLinkedIn] = useState(user.linkedin)
    const [company, setCompany] = useState(user.company)
    const [fundingStage, setFundingStage] = useState([])
    const [typeOfBusiness, setTypeOfBusiness] = useState([])
    const [industry, setIndustry] = useState([])
    const [location, setLocation] = useState('')
    const [pitch, setPitch] = useState('')

    useEffect(() => {
        reset()
    }, [editProfile])


    const handleClose = () => {
        reset()
        props.editProfilePersonal(false)
    };

    let handleChange = (event) => {
        if (event.target.name === 'fullname'){
            setFullName(event.target.value)
        } else if (event.target.name === 'linkedin'){
            setLinkedIn(event.target.value)
        } else if (event.target.name === 'company'){
            setCompany(event.target.value)
        } else if (event.target.name === 'pitch'){
            setPitch(event.target.value)
        } else if (event.target.name === 'location'){
            setLocation(event.target.value)
        }
    }

    let reset = () => {
        setEmail(user.email)
        setFullName(user.fullName)
        setLinkedIn(user.linkedin)
        setCompany(user.company)
        setLoading(false)
        setTypeOfBusiness([])
        setFundingStage([])
        setPitch('')
        setLocation('')
        setIndustry([])
        setLoading(false)
        setFunding([0, 2000000])
        setAllAnswered(false)
    }


    let handleSave = () => {
        let obj = {}
        let newState = {}

        setLoading(true)

        if (fullname !== "" && fullname !== undefined){
            obj.fullName = fullname
            newState.fullName = fullname
        }


        if (company === ""){
            obj.company = deleteField()
            newState.company = null
        } else if (company !== undefined){
            obj.company = company
            newState.company = company
        }


        if (linkedin === ""){
            obj.linkedin = deleteField()
            newState.linkedin = null
        }else if (linkedin !== undefined){
            obj.linkedin = linkedin
            newState.linkedin = linkedin
        }

        if (fullname !== "" && fullname !== undefined && typeOfBusiness.length !== 0 && fundingStage.length !== 0 && pitch !== ""
                && location !== "" && industry.length !== 0  ) 
            {
            
            newState.typeOfBusiness = typeOfBusiness
            newState.fundingStage = fundingStage
            newState.pitch = pitch 
            newState.location = location
            newState.industry = industry
            newState.funding = funding
            obj.typeOfBusiness = typeOfBusiness
            obj.fundingStage = fundingStage
            obj.pitch = pitch 
            obj.location = location
            obj.industry = industry
            obj.funding = funding
        
            updateDoc(doc(db, "users", userId), obj)
            .then(() => {
                setAllAnswered(false)
                props.updateUser(newState)

                reset()
                props.editProfilePersonal(false)

            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
        } else {
            setAllAnswered(true)
            setLoading(false)
        }
    }


    const [funding, setFunding] = useState([0, 2000000]);
    const [allAnswered, setAllAnswered] = useState(false)
 
    const handleChange2 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
          return;
        }
    
        if (newValue[1] - newValue[0] < minDistance) {
          if (activeThumb === 0) {
            const clamped = Math.min(newValue[0], 100 - minDistance);
            setFunding([clamped, clamped + minDistance]);
          } else {
            const clamped = Math.max(newValue[1], minDistance);
            setFunding([clamped - minDistance, clamped]);
          }
        } else {
          setFunding(newValue);
        }
    };

    
    let handleType = (event) => {
        let typeInputed = event.target.value
        if (typeOfBusiness.includes(typeInputed)){
            setTypeOfBusiness(types => types.filter(element => element !== typeInputed))
        } else {
            setTypeOfBusiness(types => [...types, typeInputed])
        }
    }

    let handleStage = (event) => {
        let stageInputed = event.target.value
        if (fundingStage.includes(stageInputed)){
            setFundingStage(stages => stages.filter(element => element !== stageInputed))
        } else {
            setFundingStage(stages => [...stages, stageInputed])
        }
    }

    let handleIndustry = (event) => {
        let industryInputed = event.target.value
        if (industry.includes(industryInputed)){
            setIndustry(industry => industry.filter(element => element !== industryInputed))
        } else {
            setIndustry(industry => [...industry, industryInputed])
        }
    }

    let valuetext = (value) => {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        let v = (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        return `$${v}`;
    }


    return (
        <div>
            <Dialog open={editProfile} onClose={handleClose} sx={{width: '100%'}}>
                <DialogTitle sx={{color: 'primary.main', mt: 1}} variant="h4">Edit Investor Profile</DialogTitle>
                <DialogContent>
                <DialogContentText variant="body1" sx={{color: 'black'}} >
                    Fill the relevant fields with information you want to be displayed. Leave the rest blank.
                </DialogContentText>

                <Box component="form" onSubmit={handleSave} noValidate  sx={{ mt: 1 }}>
                <TextField
                    sx={{mt: 3}}
                    id="name"
                    type="email"
                    fullWidth
                    name="email"
                    label="Email"
                    disabled={true}
                    value={email}
                    onChange={handleChange}
                />
                <TextField
                    sx={{mt: 3}}
                    id="fullName"
                    type="name"
                    label="Full Name"
                    name='fullname'
                    fullWidth
                    defaultValue={user.fullName}
                    onChange={handleChange}
                />
                <TextField
                    sx={{mt: 3}}
                    id="fullName"
                    type="name"
                    label="Company"
                    name="company"
                    fullWidth
                    defaultValue={user.company}
                    onChange={handleChange}
                />
                <TextField
                    sx={{mt: 3}}
                    id="linkedin"
                    label="LinkedIn"
                    type="text"
                    name="linkedin"
                    fullWidth
                    defaultValue={user.linkedin}
                    onChange={handleChange}
                />
           
                </Box>
                <Box component="form" onSubmit={handleSave} noValidate  sx={{  }}>
                    
                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>Which startup funding stage are you interested in?</FormLabel>
                        <FormGroup
                            onChange={handleStage} 
                        >
                            <FormControlLabel value="Pre-Seed Stage" control={<Checkbox  />} label="Pre-Seed Stage" />
                            <FormControlLabel value="Seed Stage" control={<Checkbox  />} label="Seed Stage" />
                            <FormControlLabel value="Early Stage" control={<Checkbox  />} label="Early Stage" />
                            <FormControlLabel value="Growth Stage" control={<Checkbox  />} label="Growth Stage" />
                            <FormControlLabel value="Exit Stage" control={<Checkbox  />} label="Exit Stage" />
                          
                        </FormGroup>
                    </FormControl>
                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>What type of business are you looking for?</FormLabel>
                        <FormGroup
                            onChange={handleType} 
                        >
                            <FormControlLabel value="Lifestyle" control={<Checkbox  />} label="Lifestyle" />
                            <FormControlLabel value="Small Business" control={<Checkbox  />} label="Small Business" />
                            <FormControlLabel value="Scalable" control={<Checkbox  />} label="Scalable" />
                            <FormControlLabel value="Buyable" control={<Checkbox  />} label="Buyable" />
                            <FormControlLabel value="Corporate" control={<Checkbox  />} label="Corporate" />
                            <FormControlLabel value="Social" control={<Checkbox  />} label="Social" />
                        </FormGroup>
                    </FormControl>
                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>Which industry are you interested in?</FormLabel>
                        <FormGroup
                            onChange={handleIndustry} 
                        >
                            <FormControlLabel value="Agriculture" control={<Checkbox  />} label="Agriculture" />
                            <FormControlLabel value="Manufacturing" control={<Checkbox  />} label="Manufacturing" />
                            <FormControlLabel value="Retail Commerce" control={<Checkbox  />} label="Retail Commerce" />
                            <FormControlLabel value="Hospitality" control={<Checkbox  />} label="Hospitality" />
                            <FormControlLabel value="Technology" control={<Checkbox  />} label="Technology" />
                            <FormControlLabel value="Financial Services" control={<Checkbox  />} label="Financial Services" />
                            <FormControlLabel value="Healthcare" control={<Checkbox  />} label="Healthcare" />
                            <FormControlLabel value="Education" control={<Checkbox  />} label="Education" />
                            <FormControlLabel value="Natural Resources" control={<Checkbox  />} label="Natural Resources" />
                            <FormControlLabel value="Media" control={<Checkbox  />} label="Media" />
                            <FormControlLabel value="Transportation" control={<Checkbox  />} label="Transportation" />
                            <FormControlLabel value="Construction" control={<Checkbox  />} label="Construction" />
                            <FormControlLabel value="Food and Alimentation" control={<Checkbox  />} label="Food and Alimentation" />
                            <FormControlLabel value="Environment" control={<Checkbox  />} label="Environment" />
                            <FormControlLabel value="Other" control={<Checkbox  />} label="Other" />
                        </FormGroup>
                    </FormControl>

                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ color: 'primary.main'}}>What is your funding budget? Select an interval.</FormLabel>
                        <Box>
                            <Slider

                            step={10000}
                            getAriaLabel={() => 'Minimum distance shift'}
                            value={funding}
                            onChange={handleChange2}
                            valueLabelDisplay="auto"
                            valueLabelFormat={valuetext}
                            disableSwap
                            marks={[
                                {
                                    value: 0,
                                    label: '$ 0'
                                }, 
                                {
                                    value: 2000000, 
                                    label: '$ 2,000,000'
                                }
                            ]}
                            min={0}
                            max={2000000}
                            />

                        </Box>
                    </FormControl>

                    <TextField
                        sx={{mt: 3}}
                        id="location"
                        type="location"
                        label="Where are you located?"
                        name='location'
                        fullWidth
                        value={location}
                        onChange={handleChange}
                    />
                    <TextField
                        sx={{mt: 3}}
                        id="pitch"
                        label="Describe yourself in Maximum 500 characters"
                        fullWidth
                        multiline
                        name="pitch"
                        value={pitch}
                        inputProps={{ maxLength: 500 }}
                        rows={5}
                        onChange={handleChange}
                    />
                    
                    {
                        allAnswered ? (
                            <Typography variant="h6" style={customError} sx={{mt: 1}}>
                                Did you fill all the fields ?
                            </Typography>
                        ) : (
                            <Fragment></Fragment>
                        )
                    }
                
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" sx={{backgroundColor: 'primary.main'}}>Cancel</Button>
                        <Button onClick={handleSave}  variant="contained" sx={{backgroundColor: 'secondary.main', color: 'third.main'}}>
                            {loading ? 
                                (<CircularProgress size={24} color="primary" />): ('Save Changes')
                            }
                        </Button>
                    </DialogActions>

                </Box>
                </DialogContent>
               
            </Dialog>
        </div>
    );
}

DialogInvestorProfile.propTypes = {
    data: PropTypes.object.isRequired,
    editProfilePersonal: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data, 
})

const mapActionsToProps = {
    editProfilePersonal,
    updateUser
}

export default connect(mapStateToProps, mapActionsToProps) (DialogInvestorProfile);
