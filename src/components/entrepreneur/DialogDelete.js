
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {db} from '../../firebaseConfig';
import { doc, updateDoc, arrayRemove, deleteDoc } from 'firebase/firestore';

// Redux
import {connect} from 'react-redux'
import { deleteBusinessDialog, removeBusinessFromArray} from '../../redux/dataActions';

//MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress'


let DialogDelete = (props) =>{

    const {data: {userId, deleteBusiness, businessToBeDeleted}} = props

    const [loading, setLoading] = useState(false)

    let handleClose = () => {
        props.deleteBusinessDialog(false)
    }

    let handleDelete = () => {
        setLoading(true)

        deleteDoc(doc(db, "businesses", businessToBeDeleted))
        .then(()=> {
            updateDoc(doc(db, "users", userId), {
                businesses: arrayRemove(businessToBeDeleted)
            })
            .then(() => {

                setLoading(false)
                props.removeBusinessFromArray(businessToBeDeleted)
                props.deleteBusinessDialog(false)

            })
            .catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <Dialog
            open={deleteBusiness}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle >
                Deleting Business Profile
            </DialogTitle>
            <DialogContent>
            <DialogContentText variant="h6">
                Warning! This action is permanent and cannot be undone. 
                Are you sure you want to proceed ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                    
                <Button onClick={handleClose} variant="contained" sx={{backgroundColor: 'primary.main'}}>Cancel</Button>
                <Button onClick={handleDelete}  variant="contained" sx={{backgroundColor: 'red', color: 'black', width: 90}}>
                    {loading ? 
                        (<CircularProgress size={24} color="primary" />): ('Delete')
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DialogDelete.propTypes = {
    data: PropTypes.object.isRequired,
    deleteBusinessDialog: PropTypes.func.isRequired,
    removeBusinessFromArray: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data, 
})

const mapActionsToProps = {
    deleteBusinessDialog,
    removeBusinessFromArray
}

export default connect(mapStateToProps, mapActionsToProps) (DialogDelete);
