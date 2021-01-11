import { SIGN_IN } from './signTypes'
import { SIGN_OUT } from './signTypes'

const token = JSON.parse(localStorage.getItem('token'))

const intialLoggedState = token ? { isLogged: true } : { isLogged: false }


const signReducer = (state = intialLoggedState, action) => {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                isLogged: true
            }
        case SIGN_OUT:
            return {
                ...state,
                isLogged: false
            }
        default:
            return state
    }
}

export default signReducer