import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'; 
import MBTNumberFormatter from "../Helpers/MBTNumberHelper";
import TDPNumberFormatter from "../Helpers/TwoDecimalPlacesHelper";
import { changeSymbol } from '../store/actions/symbol.actions'; // Import your action creator

function StockProfile(props) {
  const apiKey = "ac56e3ad8f54cf3e58274f8a74b7268d";
  const currentSymbol = useSelector((state) => state.currentSymbol); 

  const apiUrlProfile = `https://financialmodelingprep.com/api/v3/profile/${currentSymbol}?apikey=${apiKey}`;
  const apiUrlKeyMetrics = `https://financialmodelingprep.com/api/v3/key-metrics/${currentSymbol}?apikey=${apiKey}`;
  const apiUrlIncomeStatement = `https://financialmodelingprep.com/api/v3/income-statement/${currentSymbol}?apikey=${apiKey}`;
  const apiUrlSharesFloat = `https://financialmodelingprep.com/api/v4/shares_float?symbol=${currentSymbol}&apikey=${apiKey}`;
  const dispatch = useDispatch(); // Initialize dispatch to dispatch actions
  const [loading, setLoading] = useState(true);
  
  const [data, setData] = useState({
    stockData: null,
    keyMetricsData: null,
    IncomeStatementData: null,
    SharesFloatData: null,
  });

  useEffect(() => {
    dispatch(changeSymbol(currentSymbol));
   
    Promise.all([
      fetch(apiUrlProfile).then((response) => response.json()),
      fetch(apiUrlKeyMetrics).then((response) => response.json()),
      fetch(apiUrlIncomeStatement).then((response) => response.json()),
      fetch(apiUrlSharesFloat).then((response) => response.json()),
    ])
      .then(([profileData, keyMetricsData, incomeStatementData, sharesFloatData]) => {
        setData({
          stockData: profileData[0],
          keyMetricsData: keyMetricsData[0],
          IncomeStatementData: incomeStatementData[0],
          SharesFloatData: sharesFloatData[0],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [apiUrlProfile, apiUrlKeyMetrics, apiUrlIncomeStatement, apiUrlSharesFloat]);



  return (
    <div className="container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="stock-profile">
          <div className="stock-profile__title">
            <h4>
              <img src={data.stockData.image} /><span>{currentSymbol} - {data.stockData.companyName} ({data.stockData.exchangeShortName})</span>
            </h4>
          </div>
          <div className="stock-profile__description">
            <p>{data.stockData.description}</p>
            <a href="#">Read more</a>
          </div>


          <div className="row">
            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Sector</p>
                        <h4 className="card-title mb-2">{data.stockData.sector}</h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Industry</p>
                        <h4 className="card-title mb-2">{data.stockData.industry}</h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Market Cap</p>
                        <h4 className="card-title mb-2">
                        <MBTNumberFormatter number={data.keyMetricsData.marketCap}/>
                          
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">PE Ratio</p>
                        <h4 className="card-title mb-2">
                          <TDPNumberFormatter number={data.keyMetricsData.peRatio} />
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Revenue</p>
                        <h4 className="card-title mb-2">
                          <MBTNumberFormatter number={data.IncomeStatementData.revenue}/>
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Profit Margin</p>
                        <h4 className="card-title mb-2">
                          <TDPNumberFormatter number={data.IncomeStatementData.grossProfitRatio} />
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Float</p>
                        <h4 className="card-title mb-2">
                          <MBTNumberFormatter number={data.SharesFloatData.floatShares}/>
                          
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">52W Range</p>
                        <h4 className="card-title mb-2">${data.stockData.range}</h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">P/B</p>
                        <h4 className="card-title mb-2">
                          <TDPNumberFormatter number={data.keyMetricsData.pbRatio} />
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Debt / Equity</p>
                        <h4 className="card-title mb-2">
                        <TDPNumberFormatter number={data.keyMetricsData.debtToEquity} />%
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">ROE</p>
                        <h4 className="card-title mb-2">
                          <TDPNumberFormatter number={data.keyMetricsData.roe * 100} />%
                        </h4>
                    </div>
                </div>
            </div>

            <div className="stock-profile__card-wrapper">
                <div className="card">
                    <div className="card-body">
                        <p className="card-text">Volume Avg.</p>
                        <h4 className="card-title mb-2"><MBTNumberFormatter number={data.stockData.volAvg}/></h4>
                    </div>
                </div>
            </div>
          </div>           {/* endrow */}

        </div> /* end stock-profile */

        
      )}


    </div>
  );

  
}

export default StockProfile;
