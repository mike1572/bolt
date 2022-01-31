
import {auth} from '../firebaseConfig';

import {
    SET_AUTHENTICATED, 
    SET_TYPE,
    SET_USER
} from './types'


export const loginUser = (data) => (dispatch) => {
    dispatch({
        type: SET_AUTHENTICATED, 
        payload: true
    })

    dispatch({
        type: SET_USER, 
        payload: data
    })

    dispatch({
        type: SET_TYPE, 
        payload: data.type
    })
}

export const logoutUser = () => (dispatch) => {
    dispatch({
        type: SET_AUTHENTICATED, 
        payload: false
    })

    dispatch({
        type: SET_USER, 
        payload: {}
    })

    dispatch({
        type: SET_TYPE, 
        payload: null
    })

    localStorage.removeItem('FBIdToken');
    auth.signOut()


}
