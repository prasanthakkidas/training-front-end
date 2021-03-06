import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, CLEAR_USER } from './userTypes'


export const fetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

export const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}