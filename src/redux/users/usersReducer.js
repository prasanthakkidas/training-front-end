import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, SIGN_OUT } from './usersTypes'

const usersIntialState = {
    loading: false,
    users: [],
    error: ''
}

const usersReducer = (state = usersIntialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        case SIGN_OUT:
            return {
                ...state,
                loading: false,
                users: [],
                error: ''
            }
        default:
            return state
    }
}

export default usersReducer

