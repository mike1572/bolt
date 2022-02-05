

import React, {Fragment, useEffect, useState} from 'react'


// Redux
import {connect} from 'react-redux'

//MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Linked from '@mui/material/Link';
import Box from '@mui/material/Box';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';


import NewsCardLoading from './NewsCardLoading'

import apiKey from '../NewsApiKey'


let News = () => {

    let [dataReturned, setDataReturned] = useState(false)
    let [articles, setArticles] = useState([])


    useEffect(() => {

        // fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`)
        // .then(function(response) {
           
        //     return response.json();
        // })
        // .then(function(data) {
            
        //     if (data === undefined || data.articles === undefined || data.articles.length === 0){
        //         setDataReturned(false)
        //     } else {

        //         setArticles(data.articles)
        //         setDataReturned(true)
        //     }
           
        // });
    }, [])

    return (
        <Grid item >
            <Card  
                sx={{ backgroundColor:'#989898',  alignItems: 'center', mx: 'auto', 
                mt: 5, fontSize: 13, minWidth: 300, mb: 10,
               }} raised >
                <CardHeader
                    title={
                        <Typography variant="h6" sx={{textTransform: 'uppercase'}}>
                            Latest Business Headlines
                        </Typography>
                    }
                   
                    sx={{ml: 3, mt: 2, color: 'white'}}
                >
                </CardHeader>
                <hr/>

                    {dataReturned ? (
                        <Fragment>

                            <CardContent
                                sx={{
                                    overflowY: 'scroll',
                                    maxHeight: 1000
                                }}
                            >
                            
                                {
                                    articles.map((element, i) => (

                                        <Fragment key={i}>
                                        
                                        <Card sx={{  m: 1, }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ width: '100%', height: 200 }}
                                                image={element.urlToImage}
                                                alt="Live from space album cover"
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'column', p :1}}>
                                                <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography variant="body1" sx={{mb: 2, mt: 1}}>
                                                    <b>{element.title}</b>
                                                </Typography>
                                                <Typography sx={{mt: 1}} variant="subtitle2" color="text.secondary" component="div">
                                                <i>By {element.author}</i>  
                                                </Typography>
                                                <Typography variant='body2' sx={{mt: 1}}>
                                                    {element.description}
                                                </Typography>
                                                </CardContent>
                                                <CardActions>

                                                <Linked href={element.url} target="_blank" sx={{ textDecoration: 'none'}} color="inherit">
                                                <ReadMoreOutlinedIcon color="black"/>
                                            </Linked> 
                                                    
                                                </CardActions>
                                        
                                            </Box>
                                            
                                        

                                            </Card>
                                            
                                        
                                            <br/>
                                        </Fragment>
                                    ))
                                }
                            </CardContent>


                        </Fragment>
                    ): (
                        <Fragment>

                            <NewsCardLoading/>
                            <NewsCardLoading/>
                            <NewsCardLoading/>



                        </Fragment>
                    )}
                        
            </Card>
        </Grid>
    )
}


export default (News);



