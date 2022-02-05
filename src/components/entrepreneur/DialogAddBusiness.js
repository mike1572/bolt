
import React, {useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {db, storage, auth} from '../../firebaseConfig';
import {setDoc, doc, updateDoc, deleteField, addDoc, collection, arrayUnion } from 'firebase/firestore';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';

// Redux
import {connect} from 'react-redux'
import { addBusiness, updateUser, appendBusinesses} from '../../redux/dataActions';

// MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Icon from '@mui/material/Icon'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider';

const customError = {
    color: 'red',
    fontSize: '0.8rem', 
    marginLeft: '15px', 
}

function valuetext(value) {
    value = (value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return `$${value}`;
}
  
const minDistance = 10000;

let DialogAddBusiness = (props) =>{

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


    const {data: {editProfile, user, userId, addBusiness}} = props

    const [loading, setLoading] = useState(false)

    const [companyName, setCompanyName] = useState('')
    const [fundingStage, setFundingStage] = useState('')
    const [typeOfBusiness, setTypeOfBusiness] = useState('')
    const [employees, setEmployees] = useState("")
    const [industry, setIndustry] = useState([])
    const [location, setLocation] = useState('')
    const [reason, setReason] = useState('')
    const [pitch, setPitch] = useState('')
    const [image, setImage] = useState('')
    const [imagePresent, setImagePresent] = useState(false)


    const handleClose = () => {
        reset()
        props.addBusiness(false)
    };

    let handleChange = (event) => {
        if (event.target.name === 'companyName'){
            setCompanyName(event.target.value)
        } else if (event.target.name === 'pitch'){
            setPitch(event.target.value)
        } else if (event.target.name === 'location'){
            setLocation(event.target.value)
        }
    }


    let reset = () => {
        setReason('')
        setTypeOfBusiness('')
        setFundingStage('')
        setCompanyName('')
        setPitch('')
        setLocation('')
        setIndustry([])
        setLoading(false)
        setEmployees("")
        setFunding([0, 2000000])
        setImage('')
        setImagePresent(false)
        setAllAnswered(false)
    }


    let handleSave = () => {

        if (reason !== "" && typeOfBusiness !== "" && fundingStage !== "" && companyName !== "" && pitch !== ""
            && location !== "" && industry.length !== 0 && employees !== "" && image !== ""
        ) {
            setAllAnswered(false)
            setLoading(true)

            let storageRef = ref(storage, `logos/${image.name}`)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on(
                "state_changed",
                snapshot => {}, 
                error => {
                    console.log(error)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        //addData(downloadURL, id)

                        let date = new Date()
                        date = date.toISOString()
                        let business = {
                            typeOfBusiness: typeOfBusiness, 
                            reason: reason, 
                            fundingStage: fundingStage, 
                            companyName: companyName, 
                            pitch: pitch,
                            location: location, 
                            industry: industry, 
                            employees: employees, 
                            image: downloadURL, 
                            funding: funding, 
                            user: userId, 
                            createdAt: date
                        }

                        let id;
                        addDoc(collection(db, "businesses"), business)
                        .then((docRef) => {
                            id = docRef.id
                            updateDoc(doc(db, "users", userId), {
                                businesses: arrayUnion(docRef.id)    
                            })
                            .then(() => {
                                business.id = id
                                props.appendBusinesses(business)
                                setLoading(false)
                                handleClose()
                            })

                        })
                        .catch((err) => {
                            console.log(err)
                        })


                    });
                }
            )

        }
        else {
            setAllAnswered(true)
        }

    }

    let handleChangeEmployees = (event) => {
        setEmployees(event.target.value)
    }

    let handleChangeType = (event) => {
        setTypeOfBusiness(event.target.value)
    }

    let handleChangeStage = (event) => {
        setFundingStage(event.target.value)
    }

    let handleChangeReason = (event) => {
        setReason(event.target.value)
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

    let handleImage = (event) => {

        if (event.target.files[0]){
            setImagePresent(true)
            setImage(event.target.files[0])

        } else {
            setImagePresent(false)
        }
    }

    return (
        <div>
            <Dialog open={addBusiness} onClose={handleClose} sx={{width: '100%'}}>
                <DialogTitle sx={{color: 'primary.main', mt: 1}} variant="h4">Add Business Profile</DialogTitle>
                <DialogContent>
                <DialogContentText variant="body1" sx={{color: 'black',textAlign: 'justify', mt: 1}} >
                    This business profile will be shared with interested investors to help you get in touch with them and obtain the necessary funding.
                    You can always delete the profile when it is not necessary anymore. Please fill in all the fields.
                </DialogContentText>
                <hr></hr>

                <Box component="form" onSubmit={handleSave} noValidate  sx={{  }}>
                    <TextField
                        sx={{mt: 3}}
                        id="companyName"
                        type="companyName"
                        label="Company Name"
                        name='companyName'
                        fullWidth
                        value={companyName}
                        onChange={handleChange}
                    />

                    <Button
                        variant="contained"
                        component="label"
                        color="primary"
                        sx={{mt: 2}}
                        >
                        Upload your Logo
                        <input
                            type="file"
                            id="imageUpload"
                            onChange={handleImage}
                            hidden
                        />    
                    </Button>
                    <Icon sx={{ ml: 1, mt: 1}}>
                        {imagePresent? (
                                <CheckCircleOutlineIcon fontSize='medium' color="primary"/>
                            ): (
                                <CircleOutlinedIcon fontSize='medium' color="primary"/>
                            )
                        }
                        </Icon>

                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>Which start-up founding stage is your business currently at?</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={handleChangeStage}
                        >
                            <FormControlLabel value="Pre-Seed Stage" control={<Radio />} label="Pre-Seed Stage" />
                            <FormControlLabel value="Seed Stage" control={<Radio />} label="Seed Stage" />
                            <FormControlLabel value="Early Stage" control={<Radio />} label="Early Stage" />
                            <FormControlLabel value="Growth Stage" control={<Radio />} label="Growth Stage" />
                            <FormControlLabel value="Exit Stage" control={<Radio />} label="Exit Stage" />
                        </RadioGroup>
                    </FormControl>

                    
                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>What type of business are you?</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={handleChangeType}
                        
                        >
                            <FormControlLabel value="Lifestyle" control={<Radio />} label="Lifestyle" />
                            <FormControlLabel value="Small Business" control={<Radio />} label="Small Business" />
                            <FormControlLabel value="Scalable" control={<Radio />} label="Scalable" />
                            <FormControlLabel value="Buyable" control={<Radio />} label="Buyable" />
                            <FormControlLabel value="Corporate" control={<Radio />} label="Corporate" />
                            <FormControlLabel value="Social" control={<Radio />} label="Social" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>How many individuals are currently employed at your company?</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={handleChangeEmployees}
                        >
                            <FormControlLabel value="0-50 employees" control={<Radio />} label="0-50 employees" />
                            <FormControlLabel value="50-250 employees" control={<Radio />} label="50-250 employees" />
                            <FormControlLabel value="250-500 employees" control={<Radio />} label="250-500 employees" />
                            <FormControlLabel value="500+ employees" control={<Radio />} label="500+ employees" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>Why do you need the funding ?</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            onChange={handleChangeReason}
                        >
                            <FormControlLabel value="Continuing development/research" control={<Radio />} label="Continuing development/research" />
                            <FormControlLabel value="Starting production" control={<Radio />} label="Starting production" />
                            <FormControlLabel value="Scaling up production" control={<Radio />} label="Scaling up production" />
                            <FormControlLabel value="Expanding in new areas" control={<Radio />} label="Expanding in new areas" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl sx={{ml: 1, mt: 3}}>
                        <FormLabel sx={{ mb: 2, color: 'primary.main'}}>Which industry does your business operate in?</FormLabel>
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
                        <FormLabel sx={{ color: 'primary.main'}}>How much funding do you require? Select an interval.</FormLabel>
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
                        label="Pitch to Investors in Maximum 500 characters"
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
                                (<CircularProgress size={24} color="primary" />): ('Add Business')
                            }
                        </Button>
                    </DialogActions>

                </Box>
                </DialogContent>
               
            </Dialog>
        </div>
    );
}

DialogAddBusiness.propTypes = {
    data: PropTypes.object.isRequired,
    addBusiness: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    appendBusinesses: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data, 
})

const mapActionsToProps = {
    addBusiness,
    updateUser,
    appendBusinesses
}

export default connect(mapStateToProps, mapActionsToProps) (DialogAddBusiness);
