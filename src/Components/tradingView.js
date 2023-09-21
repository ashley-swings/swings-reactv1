import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const symbol = useSelector((state) => state.currentSymbol); // Get symbol from the Redux store
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;
    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (document.getElementById('tradingview_9acfd') && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          width: '100%',
          height: '100%',
          symbol: symbol, // Use the symbol from the Redux store
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          enable_publishing: false,
          allow_symbol_change: false,
          container_id: 'tradingview_9acfd',
        });
      }
    }
  }, [symbol]); // Trigger the effect when the symbol changes in the Redux store

  return (
    <div className="container tradingViewContainer">
      <div className='tradingview-widget-container'>
        <div id='tradingview_9acfd' />
      </div>
    </div>
  );
}
