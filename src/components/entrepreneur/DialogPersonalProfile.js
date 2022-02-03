
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {db, storage, auth} from '../../firebaseConfig';
import {setDoc, doc, updateDoc, deleteField  } from 'firebase/firestore';


// Redux
import {connect} from 'react-redux'
import {editProfilePersonal , updateUser} from '../../redux/dataActions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'


let DialogPersonalProfile = (props) =>{

    const {data: {editProfile, user, userId}} = props

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState(user.email)
    const [fullname, setFullName] = useState(user.fullName)
    const [linkedin, setLinkedIn] = useState(user.linkedin)
    const [github, setGithub] = useState(user.github)
    const [profession, setProfession] = useState(user.profession)
    const [bio, setBio] = useState(user.bio)
    const [facebook, setFacebook] = useState(user.facebook)


    useEffect(() => {
        reset()
    }, [editProfile])


    const handleClose = () => {
        props.editProfilePersonal(false)
    };

    let handleChange = (event) => {
        if (event.target.name === 'fullname'){
            setFullName(event.target.value)
        } else if (event.target.name === 'linkedin'){
            setLinkedIn(event.target.value)
        } else if (event.target.name === 'github'){
            setGithub(event.target.value)
        } else if (event.target.name === 'facebook'){
            setFacebook(event.target.value)
        } else if (event.target.name === 'bio'){
            setBio(event.target.value)
        } else if (event.target.name === 'profession'){
            setProfession(event.target.value)
        }
    }


    let reset = () => {
        setEmail(user.email)
        setFullName(user.fullName)
        setLinkedIn(user.linkedin)
        setGithub(user.github)
        setProfession(user.profession)
        setBio(user.bio)
        setFacebook(user.facebook)
        setLoading(false)

    }


    let handleSave = () => {
        let obj = {}
        let newState = {}

        setLoading(true)

        if (fullname !== "" && fullname !== undefined){
            obj.fullName = fullname
            newState.fullName = fullname
        }

        if (bio === ""){
            obj.bio = deleteField()
            newState.bio = null
        } else if (bio !== undefined){
            obj.bio = bio
            newState.bio = bio
        }

        if (github === ""){
            obj.github = deleteField()
            newState.github = null
        } else if (github !== undefined) {
            obj.github = github
            newState.github = github
        }

        if (profession === ""){
            obj.profession = deleteField()
            newState.profession = null
        } else if (profession !== undefined){
            obj.profession = profession
            newState.profession = profession
        }

        if (facebook === ""){
            obj.facebook = deleteField()
            newState.facebook = null
        } else if (facebook !== undefined){
            obj.facebook = facebook
            newState.facebook = facebook
        }

        if (linkedin === ""){
            obj.linkedin = deleteField()
            newState.linkedin = null
        }else if (linkedin !== undefined){
            obj.linkedin = linkedin
            newState.linkedin = linkedin
        }

        if (fullname !== "" && fullname !== undefined){
            updateDoc(doc(db, "users", userId), obj)
            .then(() => {
                props.updateUser(newState)

                reset()
                props.editProfilePersonal(false)

            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
        } else {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={editProfile} onClose={handleClose} sx={{width: '100%'}}>
                <DialogTitle sx={{color: 'primary.main', mt: 1}} variant="h4">Edit Profile</DialogTitle>
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
                    label="Profession"
                    name="profession"
                    fullWidth
                    defaultValue={user.profession}
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
                <TextField
                    sx={{mt: 3}}
                    id="github"
                    label='GitHub'
                    type="text"
                    name="github"
                    fullWidth
                    defaultValue={user.github}
                    onChange={handleChange}
                    />
                    <TextField
                    sx={{mt: 3}}
                    id="fb"
                    label="Facebook"
                    type="text"
                    fullWidth
                    name="facebook"
                    defaultValue={user.facebook}
                    onChange={handleChange}
                    />
                    <TextField
                    sx={{mt: 3}}
                    id="bio"
                    label="Bio in 100 characters"
                    fullWidth
                    multiline
                    name="bio"
                    inputProps={{ maxLength: 100 }}
                    rows={4}
                    defaultValue={user.bio}
                    onChange={handleChange}
                />

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

DialogPersonalProfile.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps) (DialogPersonalProfile);
