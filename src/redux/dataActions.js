
import {auth, db} from '../firebaseConfig';
import {doc, getDoc} from 'firebase/firestore'

import {
    SET_AUTHENTICATED, 
    SET_TYPE,
    SET_USER
} from './types'


export const getUserData = () => (dispatch) => {

    auth.onIdTokenChanged(function(user) {
        if (user) {
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef)
            .then((doc) => {
                if (doc.exists()) {
                    let data =  doc.data()
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
     
                } else {
                    console.log("No such document!");
                }    
            })

        }
    })
    // getAuth().verifyIdToken(idToken)
    // .then((decodedToken) => {
    //     console.log(decodedToken.uid)
    // })
    // .catch((error) => {
    //     console.log(error)
    // });
    
    
}

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
