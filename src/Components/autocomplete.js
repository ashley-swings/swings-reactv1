import * as React from 'react';
//import React, { useState } from "react";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import { Provider, useSelector, useDispatch } from 'react-redux'
import { changeSymbol } from '../store/actions/symbol.actions'


const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (symbolExchangeList) => symbolExchangeList.label,
});

export default function Filter() {
  const dispatch = useDispatch()
  const currentSymbol = useSelector(state => state.currentSymbol)
  
  //if v.label != ''
  const handleChange = (e, v) => {
    if (v) {
      // Only dispatch the change if v is not null
      dispatch(changeSymbol(v.label));
    } else {
      console.log('nothing selected in autocomplete hehe')
      // Handle the case when v is null (cleared value)
      //dispatch(changeSymbol()); // Dispatch an empty string or handle it as needed
    }
  };




  //{(e) => dispatch(changeSymbol(e.target.value))}
  return (
    <Autocomplete
      id="filter-demo"
      onChange={handleChange} 
      autoHighlight
      groupBy={(symbolExchangeList) => symbolExchangeList.exchange}
      options={symbolExchangeList}
      getOptionLabel={(symbolExchangeList) => symbolExchangeList.label +' - '+symbolExchangeList.exchange}
      renderOption={(props, symbolExchangeList) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img width="20" src={`https://financialmodelingprep.com/image-stock/${symbolExchangeList.label}.png`} />
          {symbolExchangeList.label} - {symbolExchangeList.fullName}
        </Box> 
      )}
      filterOptions={filterOptions}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search by Symbol" />}
    />
  );
}

const symbolExchangeList = [
  { label: 'CMG', exchange: 'NYSE', fullName: 'Chipotle Mexican Grill Inc' },
  { label: 'PFE', exchange: 'NYSE', fullName: 'Pfizer Inc' },
  { label: 'BRK-A', exchange: 'NYSE', fullName: 'Berkshire Hathaway Inc' },
  { label: 'HUBS', exchange: 'NYSE', fullName: 'HubSpot Inc' },
  { label: 'KO', exchange: 'NYSE', fullName: 'The Coca-Cola Company' },
  { label: 'AAPL', exchange: 'NASDAQ', fullName: 'Apple Inc' },
  { label: 'AMZN', exchange: 'NASDAQ', fullName: 'Amazon.com Inc' },
  { label: 'TSLA', exchange: 'NASDAQ', fullName: 'Tesla Inc' },
  { label: 'GOOGL', exchange: 'NASDAQ', fullName: 'Alphabet Inc' },
  { label: 'MREO', exchange: 'NASDAQ', fullName: 'Mereo BioPharma Group plc' },
  { label: 'LNG', exchange: 'AMEX', fullName: 'Cheniere Energy Inc' },
  { label: 'CCF', exchange: 'AMEX', fullName: 'Chase Corporation' },
  { label: 'PRK', exchange: 'AMEX', fullName: 'Park National Corporation' },
  { label: 'OZ', exchange: 'AMEX', fullName: 'Osisko Gold Royalties Ltd' },
  { label: 'NEN', exchange: 'AMEX', fullName: 'New England Realty Associates Limited Partnership' },
];

