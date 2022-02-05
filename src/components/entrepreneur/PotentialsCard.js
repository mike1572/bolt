

import React, { useEffect, useState } from 'react'

//MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';


let PotentialsCard = () => {

    const [quote, setQuote] = useState({})

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let rand = Math.floor(Math.random() * data.length)
            setQuote(data[rand])
        });

    }, [])

    return (
        <Grid item sx={{mb: 1}} >
            <Card sx={{ backgroundColor:'third.main', mt: 5}} raised >

                <CardContent>
                    <CardHeader
                        sx={{textAlign: 'center'}}
                        titleTypographyProps={{color: 'secondary.main', variant: 'h5', mt: 2, fontWeight: 600}}
                        title={"Inspirational Quote"}
                    />

                    <Typography variant="h6" sx={{ mt: 1, color: 'secondary.main',
                        textAlign: 'center', 
                        mx: 1
                    }}>
                        {quote.text}
                    </Typography>
                    <Typography variant="body1" sx={{mt: 2, color: 'secondary.main', textAlign: 'center'}}>
                        <b><i>{quote.author}</i></b>
                    </Typography>                    
                </CardContent>
            </Card>
        </Grid>

    )
}


export default PotentialsCard



