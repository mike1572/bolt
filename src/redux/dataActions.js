
import {auth, db} from '../firebaseConfig';
import {doc, getDoc} from 'firebase/firestore'
import { collection, query, where, getDocs } from "firebase/firestore";

import {
    SET_AUTHENTICATED, 
    SET_TYPE,
    SET_USER, 
    SET_USER_ID,
    SET_IMAGE,
    SET_EDIT_PROFILE,
    UPDATE_USER,
    SET_ADD_BUSINESS,
    APPEND_BUSINESS, 
    REPLACE_BUSINESSES,
    DELETE_BUSINESS_DIALOG,
    DELETE_BUSINESS_ID,
    DELETE_B
} from './types';

export const removeBusinessFromArray = (id) => (dispatch) => {

    dispatch({
        type: DELETE_B,
        payload: id
    })
}

export const deleteBusinessDialog = (bool, value=null) => (dispatch) => {
    dispatch({
        type: DELETE_BUSINESS_DIALOG, 
        payload: bool
    })

    dispatch({
        type: DELETE_BUSINESS_ID, 
        payload: value
    })
}


export const setBusinesses = (businessesArray, type) => (dispatch) => {

    if (type === "entrepreneur" && businessesArray.length > 0){
        // array can be max 10

        const promises = businessesArray.map(u => getDoc(doc(db, "businesses", u)))

        let array = []
        Promise.all(promises)
        .then(results => {
            results.map(docSnapshot => {
                let obj = docSnapshot.data()
                obj.id = docSnapshot.id
                array.push(obj)
            });
        })
        .then(() => {

            dispatch({
                type: REPLACE_BUSINESSES, 
                payload: array
            })
           
        })

    }

}

export const appendBusinesses = (business) => (dispatch) => {

    dispatch({
        type: APPEND_BUSINESS, 
        payload: business
    })
}

export const addBusiness = (bool) => (dispatch) => {
    dispatch({
        type: SET_ADD_BUSINESS, 
        payload: bool
    })
}


export const updateUser = (obj) => (dispatch) => {
    dispatch({
        type: UPDATE_USER, 
        payload: obj
    })
}

export const editProfilePersonal = (bool) => (dispatch) => {
    dispatch({
        type: SET_EDIT_PROFILE, 
        payload: bool
    })
}


export const updateImage = (image) => (dispatch) => {
    dispatch({
        type: SET_IMAGE, 
        payload: image
    })
}


export const getUserData = () => (dispatch) => {

    auth.onIdTokenChanged(function(user) {
        if (user) {
            let userId = user.uid
            const docRef = doc(db, "users", user.uid);
            getDoc(docRef)
            .then((document) => {
                if (document.exists()) {
                    let data =  document.data()

                    // setBusinesses(data.businesses)

                    if (data.type === 'entrepreneur' && data.businesses.length > 0){
                        // array can be max 10
                
                        const promises = data.businesses.map(u => getDoc(doc(db, "businesses", u)))
                
                        let array = []
                        Promise.all(promises)
                        .then(results => {
                            results.map(docSnapshot => {
                                let obj = docSnapshot.data()
                                obj.id = docSnapshot.id
                                array.push(obj)
                            });
                        })
                        .then(() => {
                
                            dispatch({
                                type: REPLACE_BUSINESSES, 
                                payload: array
                            })
                           
                        })
                
                    }
                
                    dispatch({
                        type: SET_USER_ID, 
                        payload: userId
                    })
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

export const loginUser = (data, userId) => (dispatch) => {
    
    dispatch({
        type: SET_USER_ID, 
        payload: userId
    })

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

    dispatch({
        type: SET_USER_ID, 
        payload: null
    })

    localStorage.removeItem('FBIdToken');
    auth.signOut()

}
