import {combineReducers, configureStore} from '@reduxjs/toolkit'
import categoryReducer from './category'
import countReducer from './count'
import operationReducer from './operation'
import userReducer from './user'

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  operation: operationReducer,
  count: countReducer
})

export const createStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}
