import React, { useEffect } from 'react'; // Import useEffect from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { changeSymbol } from '../store/actions/symbol.actions';

const apiKey = "ac56e3ad8f54cf3e58274f8a74b7268d";

const AnalystPriceTargets = () => {
  const currentSymbol = useSelector((state) => state.currentSymbol);
  const dispatch = useDispatch();

  useEffect(() => {
    // Your code here
    // You can use currentSymbol and dispatch here to perform actions
  }, [currentSymbol]);

  return (
    <div>analystPriceTargets current symbol - {currentSymbol}</div>
  );
}

export default AnalystPriceTargets;
