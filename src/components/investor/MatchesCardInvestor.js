



import React, {Fragment} from 'react'

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
// Redux
import {connect} from 'react-redux'


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


let MatchesCardInvestor = (props) => {

    let {data: {user: {fullName, image, matches}}} = props

    let matchese = [
        {
            fullName:"Elon Musk", 
            image: image
        },
        {
            fullName:"Elon Musk", 
            image: image
        }
    ]

    let handleMatchChat = () => {

    }

    return (
        <Grid item sx={{mb: 10}} >
            <Card  sx={{ backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                <CardHeader
                    title="Your Matches with Entrepreneurs"
                    sx={{ml: 3, mt: 1, color: "white"}}
                    
                />
                <hr style={{border: '2px solid white'}} />


                {
                    matchese.length > 0 ? (
                        <Fragment>
                        {   
                            matchese.map((element, i) => (
                                <Fragment key={i}>
                                    <Tooltip title="Message" placement="right" arrow>
                                        <Button sx={{textTransform: 'none', pl: 3, justifyContent: 'flex-start', textAlign: 'left', width: '100%'}}
                                            onClick={handleMatchChat}
                                        >
                                            <CardHeader
                                                sx={{maxWidth: 300}}
                                                title={`${element.fullName}`}
                                                titleTypographyProps={{variant:'h6', color: 'white' }}
                                                avatar={
                                                    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2, ml: 2 }} aria-label="profile picture"/>
                                                }
                                            />
                                        </Button>
                                    </Tooltip>
                                    <br/>
                                    <hr/>
                                </Fragment>
                            ))
                        }
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Typography sx={{color: 'white', pt: 5, pl: 5}} variant="h6">
                                You have no new matches to chat with.
                            </Typography>
                            <Button outlined sx={{backgroundColor: 'primary.main', m: 5, color: 'white', border: 'solid 1px white'}}
                                component={Link} to="/resources"
                            >
                                View Ressources
                            </Button>
                        </Fragment>
                    )
                }
                
            </Card>
        </Grid>
    )
}


MatchesCardInvestor.propTypes = {
    data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    
}

export default connect(mapStateToProps, mapActionsToProps) (MatchesCardInvestor);







