
import React from 'react'
import PropTypes from 'prop-types';

import Typography from '@mui/material/Typography'
//Redux
import {connect} from 'react-redux'

let Message = (props) => {

    let {data: {userId}} = props
    let {id, text} = props;
    
    if (id === userId) {
        return (
            <div style={{display:'flex', justifyContent: 'flex-end', marginRight: '30px', marginTop: '7px', marginBottom: '3px'}}>
                <div style={{backgroundColor: "#0024b3", borderRadius: '30px', maxWidth: '250px'}}>
                    <Typography sx={{m: 1, p: 1}} color="white">
                       {text}
                    </Typography>
                </div>
            </div>
    
        )
    } else {
        return (
        
            <div style={{display:'flex', justifyContent: 'flex-start', marginLeft: '30px', marginTop: '7px', marginBottom: '3px'}}>
                <div style={{backgroundColor: "#e8d100",  borderRadius: '30px', maxWidth: '250px'}}>
                    <Typography sx={{m: 1, p: 1}} color="#0024b3">
                       {text}
                    </Typography>
                </div>
            </div>
    
        )
    }



}

Message.propTypes = {
    data: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data 
})

const mapActionsToProps = {
   
}

export default connect(mapStateToProps, mapActionsToProps)(Message);