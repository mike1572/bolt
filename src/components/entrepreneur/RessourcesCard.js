

import React, {Fragment} from 'react'

import {Link} from 'react-router-dom'

//MUI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Linked from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IosShareIcon from '@mui/icons-material/IosShare';

import bestContent from '../../bestContent'

let RessourcesCard = () => {

    return (
        <Grid item >
            <Card  sx={{ backgroundColor:'success.main',  alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300, mb: 1}} raised >
                <CardHeader
                    title="Resources"
                    sx={{ml: 3, mt: 1, color: 'white'}}
                >
                </CardHeader>
                <hr/>
                <CardContent>
                    <Typography variant="h6" sx={{ml: 3, mb: 3, color: 'white'}}>
                        Here a list of available resources to help you on your entrepreneurial journey
                    </Typography>
                    <List>
                    {
                        bestContent.map((element, i) => (

                            <Fragment key={i}>
                               
                                <ListItem>
                       
                                <Linked href={element.website} target="_blank" sx={{color: 'white', textDecoration: 'none'}} color="inherit">
                                    <IosShareIcon sx={{mr: 2}} sx={{color: 'white'}}/>
                                </Linked> 
                               
                                <Typography sx={{ml: 3, mt: 1,  textTransform: 'uppercase', color: 'white'}} variant="body1" >
                                {element.title}
                                </Typography>
                                </ListItem>
                                <br/>
                            </Fragment>
                        ))
                    }
                    </List>

                </CardContent>
                <CardActions sx={{mb: 3, ml: 3}}>
                    <Button sx={{border: 'solid 1px'}} variant="contained" component={Link} to="/resources" color="secondary">View More</Button> 
                </CardActions>
            </Card>
        </Grid>
    )
}


export default RessourcesCard;

