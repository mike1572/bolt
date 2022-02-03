
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


const initialState = {
    authenticated: false,
    type: null, 
    user: {},
    userId: null,
    editProfile: false,
    chatId: null, 
    addBusiness: false, 
    deleteBusiness: false,
    businessToBeDeleted: null
}


export default function(state = initialState, action) {
    switch(action.type){

        case DELETE_B: {
            return {
                ...state,
                user: {
                    ...state.user, 
                    businesses: state.user.businesses.filter(element => element.id !== action.payload)
                }
            }
        }
        case DELETE_BUSINESS_ID: {
            return {
                ...state, 
                businessToBeDeleted: action.payload
            }
        }
        case DELETE_BUSINESS_DIALOG: {
            return {
                ...state, 
                deleteBusiness: action.payload
            }
        }
        case REPLACE_BUSINESSES: {
            return {
                ...state, 
                user: {
                    ...state.user, 
                    businesses: action.payload
                }
            }
        }
        case APPEND_BUSINESS: {
            return {
                ...state,
                user: {
                    ...state.user,
                    businesses: [
                        ...state.user.businesses,
                        action.payload 
                    ]
                }
            }
        }
        case SET_ADD_BUSINESS: {
            return {
                ...state, 
                addBusiness: action.payload
            }
        }
        case UPDATE_USER: {
            return {
                ...state, 
                user: {
                    ...state.user,
                    fullName: action.payload.fullName, 
                    bio: action.payload.bio, 
                    facebook: action.payload.facebook, 
                    github: action.payload.github, 
                    profession: action.payload.profession, 
                    linkedin: action.payload.linkedin,
                    typeOfBusiness: action.payload.typeOfBusiness,
                    fundingStage: action.payload.fundingStage,
                    pitch: action.payload.pitch,
                    location: action.payload.location,
                    industry: action.payload.industry,
                    funding: action.payload.funding
                }
            }
        }
        case SET_EDIT_PROFILE: {
            return {
                ...state, 
                editProfile: action.payload
            }
        }
        case SET_IMAGE: {
            return {
                ...state, 
                user: {
                    ...state.user, 
                    image: action.payload
                }
            }
        }
        case SET_USER_ID: {
            return {
                ...state, 
                userId: action.payload
            }
        }
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
