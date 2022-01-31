
import {
    SET_AUTHENTICATED,
    SET_TYPE,
    SET_USER
} from './types';


const initialState = {
    authenticated: false,
    type: null, 
    user: {}
}


export default function(state = initialState, action) {
    switch(action.type){
        case SET_AUTHENTICATED: {
            return {
                ...state, 
                authenticated: action.payload
            }
        }
        case SET_USER: {
            return {
                ...state, 
                user: action.payload
            }
        }
        case SET_TYPE: {
            return {
                ...state, 
                type: action.payload
            }
        }
        default: 
            return state;
    }
}
