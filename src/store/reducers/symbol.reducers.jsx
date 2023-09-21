// count.reducer.js
import { CHANGE_SYMBOL } from '../actions/symbol.actions'

const initialState = {
  currentSymbol: 'GOOGL'
}

const SymbolReducer = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
      case CHANGE_SYMBOL: return { currentSymbol: action.payload}
      default: return state
    }
}

export default SymbolReducer