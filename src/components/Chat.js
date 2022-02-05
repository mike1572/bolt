

import React, { useRef, useState, useEffect } from 'react'
import Message from './Message'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {db} from '../firebaseConfig';
import {setDoc, doc, updateDoc, onSnapshot, getDoc, arrayUnion  } from 'firebase/firestore';

//Redux
import {connect} from 'react-redux'

//MUI
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'


let Chat = (props) => {

    let {data: {chatId, user: {matches}, userId}} = props

    let [message, setMessage]= useState('')
    let [recipient, setRecipient] = useState({})
    let [list, setList] = useState([])

    useEffect(() => {
        setList([])
        scrollToBottom()
        if (chatId !== null){
            setRecipient(matches.filter(match => match.id === chatId)[0])
            
        }

    }, [chatId])

    let chatRef = useRef()

    let scrollToBottom = () => {
        
        if (chatRef.current !== undefined && chatRef.current !== null){
            chatRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });
        }


    }

    let handleChange = (event) => {
        if (event.target.name === 'message'){
            setMessage(event.target.value)         
        }
    }

    useEffect(()=> {

        if (userId !== null && chatId !== null){
            let msgId;
            if (userId > chatId){
                msgId = `${userId}&&&&&${chatId}`
            } else {
                msgId = `${chatId}&&&&&${userId}`
            }

            onSnapshot(doc(db, "messages", msgId), (doc) => {
                let data = doc.data()
                if (data !== undefined){
                    setList(data.messages)
                    scrollToBottom()
                    
                }
                       
            });
        }
        

    }, [chatId])


    let handleSend = (event) => {
        event.preventDefault()
        if (message !== ''){
            addMesg()
        }       
    }

    let addMesg = async() => {
        let msgId;
        let today = new Date()
        today = today.toISOString()

        if (userId > chatId){
            msgId = `${userId}&&&&&${chatId}`
        } else {
            msgId = `${chatId}&&&&&${userId}`
        }

        let messagesRef = doc(db, "messages", msgId);
        let docSnap = await getDoc(messagesRef);
   
    
        if (docSnap.exists()){
            await updateDoc(messagesRef, {
                messages: arrayUnion({
                    createdAt: today, 
                    id: userId, 
                    msg: message
                })
            });
        } else {
            await setDoc(doc(db, "messages", msgId), {
                messages: [
                    {
                        createdAt: today, 
                        id: userId, 
                        msg: message
                    }
                ]
            });
        }
   
        scrollToBottom()
        setMessage('')
    }

    if (chatId !== null){
        return(
            <Grid item sx={{mb: 10, mt: 3}} >
                <div style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}} >
                    
                    <Paper elevation={2}>
                        <Button variant='contained' sx={{width: '100%'}}
                            component={Link} to="/profile"
                        >
                            View Full Profile
                        </Button>
                        <Paper sx={{pb: 3 }}>
                            
                            <Avatar 
                            src={recipient.image}
                            sx={{ bgcolor: 'red',ml: 4, mt: 4 }} 
                            aria-label="profile picture"/>
                            <Typography variant="h6" sx={{ml: 11, mt: -4.5}}>
                               {recipient.fullName}
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
                                    <Message key={index} text={msg.msg} id={msg.id}/>
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