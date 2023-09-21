// App.js
import './App.css'

import { Provider, useSelector, useDispatch } from 'react-redux'
import InsiderTrading from './Components/insiderTrading'; 
import TradingView from './Components/tradingView'; 
import StockProfile from './Components/stockProfile'; 
import Autocomplete from './Components/autocomplete';

import store from './store'

function App() {

  const dispatch = useDispatch()
  const currentSymbol = useSelector(state => state.currentSymbol)

  return (
    <Provider store={store}>

      {/* This should be in its own component: TODO */}
      <div className="App">
        {/* <h2>Current symbol is {currentSymbol}</h2>
        <select onChange={(e) => dispatch(changeSymbol(e.target.value))} defaultValue={currentSymbol}>
          <option value="AAPL">AAPL</option>
          <option value="TSLA">TSLA</option>
          <option value="GOOGL">GOOGL</option>
          <option value="AMZN">AMZN</option>
        </select>

<br /><br /><br /><br /><br /> */}
        <br /><br /><br /><br /><br /> 
        <Autocomplete />


        <StockProfile currentSymbol={currentSymbol} /> 
        <InsiderTrading currentSymbol={currentSymbol} /> 
        <div style={{height: '500px'}}>
          <TradingView currentSymbol={currentSymbol} />
        </div>
        
      </div>
    </Provider>
  )
}

export default App