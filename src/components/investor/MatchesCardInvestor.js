

import React, {Fragment, useEffect, useRef, useState} from 'react'

import {db, storage, auth} from '../../firebaseConfig';
import {setDoc, doc, updateDoc, deleteField, onSnapshot  } from 'firebase/firestore';

import PropTypes from 'prop-types';
import {Link, useNavigate} from 'react-router-dom'
// Redux
import {connect} from 'react-redux'
import {updateChatID} from '../../redux/dataActions'

//MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Fade from '@mui/material/Fade';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Linked from '@mui/material/Link';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
    content: {
      justifyContent: "center",
      color: 'secondary'
    }
});


let MatchesCardInvestor = (props) => {

    const classes = useStyles();
    let navigate = useNavigate()

    let {data: {user: {fullName, image, matches},userId, chatId}} = props



    let handleMatchChat = (event) => {
        let nm = event.target.value
        if (nm !== undefined) {
            props.updateChatID(nm)
            navigate('/messages')
        }   
    }


    return (
        <Grid item sx={{mb: 10}} >
            <Card  sx={{
                backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                <CardHeader
                    title="Your Matches with Entrepreneurs"
                    sx={{ml: 3, mt: 1, color: "white"}}
                    
                />
                <hr style={{border: '2px solid white'}} />


                {
                    matches.length > 0 ? (
                        <CardContent sx={{
                            overflowY: 'scroll',
                            maxHeight: 500
                        }}>

                        {   
                            matches.map((element, i) => (
                                <Fragment key={i}>
                                    <Tooltip title="Message" placement="right" arrow onClick={handleMatchChat} value={element.id} >
                                        <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%'}}>
                                            <Avatar src={element.image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                            <Typography variant='h6' color='white' >
                                            {`${element.fullName}`}
                                            </Typography>
                                        </Button>
                                    </Tooltip>
                                    <br/>
                                    <hr/>
                                </Fragment>
                            ))
                        } 
                        </CardContent>
                    ) : (
                        <Fragment>
                            <Typography sx={{color: 'white', pt: 5, pl: 5}} variant="h6">
                                You have no new matches to chat with.
                            </Typography>
                        </Fragment>
                    )
                }
                
            </Card>
        </Grid>
    )
}


MatchesCardInvestor.propTypes = {
    data: PropTypes.object.isRequired,
    updateChatID: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    updateChatID
}

export default connect(mapStateToProps, mapActionsToProps) (MatchesCardInvestor);







