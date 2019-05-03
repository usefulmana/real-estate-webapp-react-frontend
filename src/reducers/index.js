import { combineReducers } from 'redux'
import propertyReducer from './propertyReducer.js'
import projectReducer from './projectReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
    properties: propertyReducer,
    projects: projectReducer,
    auth: authReducer,
    error: errorReducer
})