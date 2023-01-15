import anecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/NotificationReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    
    reducer:{
    
    anecdotes: anecdoteReducer,
    notification: NotificationReducer,
    filter: filterReducer
}

})


export default store
