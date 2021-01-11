import { createStore } from 'redux'
import { combineReducers } from 'redux'
import signReducer from './signIn/signReducer'
import usersReducer from './users/usersReducer'
import userReducer from './user/userReducer'

const rootReducer = combineReducers({
    signInReducer: signReducer,
    usersReducer: usersReducer,
    userReducer: userReducer
})

const myStore = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default myStore