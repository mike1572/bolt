
import {
    SET_AUTHENTICATED
} from './types';


const initialState = {
    authenticated: false
}


export default function(state = initialState, action) {
    switch(action.type){
        case SET_AUTHENTICATED: {
            return {
                ...state, 
                authenticated: action.payload
            }
        }
        default: 
            return state;
    }
}
