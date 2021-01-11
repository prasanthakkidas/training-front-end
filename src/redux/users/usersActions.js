import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, SIGN_OUT } from './usersTypes'

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersError = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const clearUsers = () => {
    return {
        type: SIGN_OUT
    }
}



