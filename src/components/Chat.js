


import React, { useRef, useState, Fragment, useEffect } from 'react'
import Message from './Message'
import PropTypes from 'prop-types';

import {connect} from 'react-redux'

//MUI
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'

import image from '../images/job.jpg'
import { borderBottom } from '@mui/system';

let Chat = (props) => {

    let {data: {chatId}} = props

    let [message, setMessage]= useState('')

    let chatRef = useRef()

    let list = [
        {
            id: "1CJYxCxKQFOIkzrooamhVZSlI7U2", 
            msg: "i love u"
        }, 
        {
            id: "i44k4mkr", 
            msg: "i love u"
        }
    ]

    let handleGoBack = () => {


    }

    let handleChange = () => {

    }

    let handleSend = () => {

    }

    if (chatId === null){
        return(
            <Grid item sx={{mb: 10, mt: 3}} >
                <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} >
                    
                    <Paper elevation={2}>
                        <Paper sx={{pb: 3, }}>
                            <Avatar 
                            src={image}
                            sx={{ bgcolor: 'red',ml: 4, mt: 4 }} 
                            aria-label="profile picture"/>
                            <Typography variant="h6" sx={{ml: 11, mt: -4.5}}>
                                Mike Dimitrov
                            </Typography>
                        </Paper>
                       
                        <div id="chat" style={{ maxWidth: "500px", 
                            maxHeight: "600px", width: "80vw", 
                            height: "60vh", 
                            display: "flex",
                            flexDirection: "column", 
                            position: "relative", 
                            overflowY: 'scroll', 
                            borderBottom: 'solid 3px darkblue', 
                            paddingTop: '5px'
                            }}
                            >

                            {
                                list.map((msg, index) => (
                                    <Message key={index} text={msg.msg} id ={msg.id}/>
                                ))
                            }

                            <div ref={chatRef}></div>
                        </div>
                        
                        <form onSubmit={handleSend} noValidate style={{display: 'flex', margin: 1}} > 
                            <TextField sx={{m: 1}} style={{width: '82%'}} 
                                fullWidth
                                id="message"
                                name="message"
                                value={message} 
                                onChange={handleChange}/>
                            <Button type="submit" variant="contained" color="primary" style={{width: '25px', height: '40px'}} sx={{mt: 1.7, mr: 1}}>Send</Button>
                        </form>
                    </Paper>
                </div>
            </Grid>
        )

    } else {
        return (
            <Grid item sx={{mb: 10, mx: 7}} >
                <Paper sx={{mt: 15, textAlign: 'center', mr: 5, backgroundColor: 'primary.main' }} elevation={3} >
                    <Typography sx={{ml: 1, mt: 2,  alignItems: 'center', p: 5, justifyContent: 'center', color: 'warning.main'}} variant="h5" >
                        Select a match to keep the conversation going
                    </Typography>
                </Paper>
            </Grid>
        )
    }


}

Chat.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data, 
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps) (Chat);