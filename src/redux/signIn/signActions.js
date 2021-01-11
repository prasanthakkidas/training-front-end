import { SIGN_IN } from './signTypes'
import { SIGN_OUT } from './signTypes'


export const signIn = () => {
    return {
        type: SIGN_IN
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

