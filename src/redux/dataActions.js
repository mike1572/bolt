
import {auth, db} from '../firebaseConfig';
import {doc, getDoc} from 'firebase/firestore'
import { collection, query, where, getDocs, orderBy, limit  } from "firebase/firestore";


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
    DELETE_B,

    SET_LOADING_RECOMMENDATIONS, 
    SET_RECOMMENDATIONS,

    SET_CHAT_ID,

    SET_MATCHES,
    ADD_MATCH
} from './types';

export const addOneMatch = (match) => (dispatch) => {
    dispatch({
        type: ADD_MATCH, 
        payload: match
    })
}


export const updateChatID = (id) => (dispatch) => {
    
    dispatch({
        type: SET_CHAT_ID, 
        payload: id
    })

}

export const setRecommendations = (user) => (dispatch) => {


    dispatch({
        type: SET_LOADING_RECOMMENDATIONS, 
        payload: true
    })

    const {funding, fundingStage, industry, typeOfBusiness} = user


    let maxFunding = funding[1]
    let minFunding = funding[0]

    let businessesRef = collection(db, "businesses");

    let q = query(businessesRef, 
        // where("fundingStage", "in", fundingStage), 
        where("typeOfBusiness", "in", typeOfBusiness),
        // where("industry", "array-contains-any", industryList),
        orderBy("createdAt", "desc")
        //,limit(100)
    )


    
    let arrayOfRecommendations = []

    getDocs(q)
    .then((docs) => {
        docs.forEach((doc) => {
            let info = doc.data()
            let match = 0

            if (fundingStage.includes(info.fundingStage)){
                match++
            }

            for (let i = 0; i < info.industry.length; i++){
                if (industry.includes(info.industry[i])) {
                    match++
                    break;
                }
            }

            //#if the lower bound of the investor is not higher than the upper bound of the buisiness AND the lower bound of the buisnnes is not higher than the upper bound of the investor.
            //if (not(investor.funding_budget[0] > business.funding_required[1]) and not(investor.funding_budget[1] < business.funding_required[0])):

            if ( !(minFunding > info.funding[0]) && !(maxFunding < info.funding[1])){
                match++
            }

            if (match > 0){
                info.id = doc.id
                arrayOfRecommendations.push(info)
            }

 
        })
    })
    .then(() => {

        const promises = arrayOfRecommendations.map(recom => getDoc(doc(db, "users", recom.user)))

        Promise.all(promises)
        .then(results => {
            results.map((docSnapshot, i) => {

                let obj = docSnapshot.data()
                obj.id = docSnapshot.id

                let user = {
                    id: docSnapshot.id,
                    image: obj.image, 
                    email: obj.email,
                    profession: obj.profession, 
                    bio: obj.bio, 
                    fullName: obj.fullName, 
                    facebook: obj.facebook, 
                    github: obj.github, 
                    linkedin: obj.linkedin,
                    businesses: obj.businesses
                }

                arrayOfRecommendations[i].user = user
            });

            dispatch({
                type: SET_RECOMMENDATIONS, 
                payload: arrayOfRecommendations
            })

            dispatch({
                type: SET_LOADING_RECOMMENDATIONS, 
                payload: false
            })

            
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: SET_LOADING_RECOMMENDATIONS, 
                payload: false
            })

            dispatch({
                type: SET_RECOMMENDATIONS, 
                payload: []
            })
        })
    })
    .catch((err) => {
        
        dispatch({
            type: SET_LOADING_RECOMMENDATIONS, 
            payload: false
        })

        dispatch({
            type: SET_RECOMMENDATIONS, 
            payload: []
        })
        console.log(err)
    })
    



}


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


                    const promises = data.matches.map(u => getDoc(doc(db, "users", u)))
                
                    let matchesValues = []
                    Promise.all(promises)
                    .then(results => {
                        results.map(docSnapshot => {
                            let obj = docSnapshot.data()
                        
                            let info = {}

                            info.id = docSnapshot.id
                            info.linkedin = obj.linkedin
                            info.email = obj.email
                            info.facebook = obj.facebook
                            info.github = obj.github
                            info.fullName = obj.fullName
                            info.image = obj.image
                            info.profession = obj.profession
                            info.businesses = obj.businesses
                            info.bio = obj.bio
                            info.location = obj.location
                            info.fundingStage = obj.fundingStage
                            info.industry = obj.industry
                            info.location = obj.location
                            info.pitch = obj.pitch
                            info.typeOfBusiness = obj.typeOfBusiness

                            console.log("Match")
                            console.log(info)


                            matchesValues.push(info)
                        });
                    })
                    .then(() => {
            
                        dispatch({
                            type: SET_MATCHES, 
                            payload: matchesValues
                        })
                        
                    })

                    


                
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
