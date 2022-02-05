

import React, {Fragment} from 'react'


//MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Linked from '@mui/material/Link';
import Box from '@mui/material/Box'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IosShareIcon from '@mui/icons-material/IosShare';

import MontrealNight from '../../images/montreal.jpg'
import DashHead from '../../components/DashHead';

import educationalContent from '../../educationalContent'
import financialResources from '../../financialResources';
 
let Ressources = () => {

    return (
        <Fragment>
            <DashHead image={MontrealNight} title={'Resources'} display="none" profile="none"/>
            <Grid container 
                sx={{ height: '40vh'}} 
                spacing={5}  
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            
            >
                <Grid item xs={12} md={6} lg={5} >
                    <Card  sx={{ mb: 5,backgroundColor: 'primary.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                        <CardHeader
                            title="Useful Content"
                            sx={{ml: 3, mt: 1, color: "white"}}
                        />
                        <hr style={{border: '2px solid white'}} />

                        <CardContent sx={{alignText: 'center'}}>

                            <List>
                            {
                                educationalContent.map((item, i) => (
                                   
                                    <Fragment key={i}>
                                        <ListItem>

                                            <Linked href={item.website} target="_blank" sx={{color: 'white', textDecoration: 'none'}} color="inherit">
                                                <IosShareIcon sx={{mr: 2}} sx={{color: 'white'}}/>
                                            </Linked> 
                                            
                                            <Box>
                                                <Typography sx={{color: 'white', ml: 3}} variant="h6">
                                                    {item.title}
                                                </Typography>
                                                <Typography sx={{color: 'white', ml: 3, mt: 1, mb: 2}} variant="body1">
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                        </ListItem>
                                    </Fragment>
                                ))
                            }
                            </List>
                           
                        </CardContent>
                        
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Card  sx={{ mb: 5, backgroundColor: 'success.main', alignItems: 'center', mx: 'auto', mt: 5, fontSize: 13, minWidth: 300}} raised >
                        <CardHeader
                            title="Financial Resources"
                            sx={{ml: 3, mt: 1, color: "white"}}
                            
                        />
                        <hr style={{border: '2px solid white'}} />

                        <CardContent sx={{alignText: 'center'}}>

                            <List>
                            {
                                financialResources.map((item, i) => (
                                    <Fragment key={i}>

                                        <ListItem>

                                        <Linked href={item.website} target="_blank" sx={{color: 'white', textDecoration: 'none'}} color="inherit">
                                            <IosShareIcon sx={{mr: 2}} sx={{color: 'white'}}/>
                                        </Linked> 

                                        <Box>
                                            <Typography sx={{color: 'white', ml: 3}} variant="h6">
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{color: 'white', ml: 3, mt: 1, mb: 2}} variant="body1">
                                                {item.description}
                                            </Typography>
                                        </Box>
                                        </ListItem>
                                        
                                    </Fragment>
                                ))
                            }
                            </List>
                            
                        </CardContent>
                        
                    </Card>
                </Grid>
            </Grid>
        </Fragment>
    )
}


export default Ressources;

