import { combineReducers, createStore } from 'redux'
import modalReducer from './modal-reducer'


const rootReducer = combineReducers({
  modalReducer,
})

export const store = createStore(rootReducer)
