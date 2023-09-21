// index.js (STORE)
import { createStore } from 'redux'
import SymbolReducer from './reducers/symbol.reducers'

export default createStore(SymbolReducer)