import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import tableReducer from '../features/table/tableSlice'
import logger from 'redux-logger'
const middleware = [logger]

export default configureStore({
    reducer: {
        counter: counterReducer,
        table: tableReducer,
    },
    middleware,
})
