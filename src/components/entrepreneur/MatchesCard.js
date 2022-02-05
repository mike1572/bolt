

import React, {Fragment} from 'react'

import PropTypes from 'prop-types';
import {Link, useNavigate} from 'react-router-dom'
// Redux
import {connect} from 'react-redux'
import {updateChatID} from '../../redux/dataActions'

//MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

let MatchesCard = (props) => {

    let navigate = useNavigate()
    let {data: {user: {image, matches}}} = props

    let handleMatchChat = (event) => {
        let nm = event.target.value
        if (nm !== undefined) {
            props.updateChatID(nm)
            navigate('/social')
        }   

    }

    return (
        <Grid item sx={{mb: 2}} >
            <Card  sx={{ backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                <CardHeader
                    title="Your Matches with Investors"
                    sx={{ml: 3, mt: 1, color: "white"}}
                    
                />
                <hr style={{border: '2px solid white'}} />


                {
                    matches.length > 0 ? (
                        <CardContent sx={{
                            overflowY: 'scroll',
                            maxHeight: 500
                        }}>
                        <Fragment>
                        {   
                            matches.map((element, i) => (
                                <Fragment key={i}>
                                    <Tooltip title="Message" placement="right" arrow onClick={handleMatchChat} value={element.id} >
                                        <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%', mt: 2, mb: 2}}>
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
                        </Fragment>
                        </CardContent>
                    ) : (
                        <Fragment>
                            <Typography sx={{color: 'white', pt: 5, pl: 5}} variant="h6">
                                You have no new matches to chat with.
                            </Typography>
                            <Button variant='outlined' sx={{backgroundColor: 'primary.main', m: 5, color: 'white', border: 'solid 1px white'}}
                                component={Link} to="/resources"
                            >
                                View Resources
                            </Button>
                        </Fragment>
                    )
                }
                
            </Card>
        </Grid>
    )
}


MatchesCard.propTypes = {
    data: PropTypes.object.isRequired,
    updateChatID: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    updateChatID
}

export default connect(mapStateToProps, mapActionsToProps) (MatchesCard);

