import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { changeSymbol } from '../store/actions/symbol.actions'; // Import your action creator

const apiKey = "ac56e3ad8f54cf3e58274f8a74b7268d";

const InsiderTrading = () => {
  const currentSymbol = useSelector((state) => state.currentSymbol); // Get chosenSymbol from the Redux store
  const dispatch = useDispatch(); // Initialize dispatch to dispatch actions

  const [insiderData, setInsiderData] = useState([]);

  useEffect(() => {
    // Dispatch an action to update chosenSymbol in the Redux store
    dispatch(changeSymbol(currentSymbol));

    // Replace with your actual FMP API endpoint and key for ticker-level data
    const apiEndpoint = `https://financialmodelingprep.com/api/v4/insider-trading?symbol=${currentSymbol}&apikey=${apiKey}`;

    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        // Filter the data to only include acquisitions and dispositions
        const filteredData = data.filter((transaction) => 
          transaction.acquistionOrDisposition === 'D' || 
          transaction.acquistionOrDisposition === 'A'
        )
        .slice(0, 5); // Get the first 5 results
        setInsiderData(filteredData);
      })
      .catch((error) => {
        console.error('Error fetching insider trading data:', error);
      });
  }, [currentSymbol]); // Trigger the effect when chosenSymbol changes

  return (
    <div className="container">
      <h1>Insider Trading Data for {currentSymbol}</h1>
      <div className="table-responsive">
        <table className="table align-middle table-nowrap mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col">Transaction Date</th>
              <th scope="col">Transaction Type</th>
              <th scope="col">A or D</th>
              <th scope="col">Securities Owned</th>
              <th scope="col">Reporting Name</th>
              <th scope="col">Type of Owner</th>
              <th scope="col">Securities Transacted</th>
              <th scope="col">price</th>
            </tr>
          </thead>
          <tbody>
            {insiderData.map((transaction, index) => (
              <tr key={index}>
                <td key={index}>
                  {transaction.transactionDate}
                </td>
                <td>
                  {transaction.transactionType}
                </td>
                <td>{transaction.acquistionOrDisposition === 'D' ? 'Sale' : 'Purchase'}
                    <br />
                    {transaction.acquistionOrDisposition === 'D' ? (<span style={{background:'red'}}>SALE</span>) : (<span style={{background:'green'}}>BUY</span>)}
                    <br /><br />
                </td>
                <td>{transaction.securitiesOwned}</td>
                <td>{transaction.reportingName}</td>
                <td>{transaction.typeOfOwner}</td>
                <td>
                  {transaction.securitiesTransacted}
                </td>
                <td>
                  {transaction.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InsiderTrading;
