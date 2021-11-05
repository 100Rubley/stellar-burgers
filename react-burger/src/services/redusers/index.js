import { combineReducers } from 'redux'
import { burgerReducer } from './all-reducers'

export const rootReducer = combineReducers({
  burger: burgerReducer
})
