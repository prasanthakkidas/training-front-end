import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, CLEAR_USER } from './userTypes'

const userIntialState = {
    user: ''
}

const userReducer = (state = userIntialState, action) => {
    switch (action.type) {
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case FETCH_USER_FAILURE:
            return {
                error: action.payload
            }
        case CLEAR_USER:
            return {
                ...state,
                user: ''
            }
        default:
            return state
    }
}

export default userReducer

