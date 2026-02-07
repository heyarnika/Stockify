import React from 'react';
import './Trendtable.css';

// We accept marketData as a 'Prop' from the Dashboard
function Trendtable({ marketData }) {
  return (
    <div className="trendtable">
      <h2>Today's Trending Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Change %</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {/* We loop through the data from our Python backend */}
          {marketData.map((stock, index) => (
            <tr key={index}>
              {/* stock.symbol will be "TCS", "RELIANCE", etc. */}
              <td>{stock.symbol}</td>
              
              <td>₹{stock.price}</td>
              
              {/* If change is positive, use 'up' class. If negative, use 'down' */}
              <td className={stock.change >= 0 ? "up" : "down"}>
                {stock.change >= 0 ? "+" : ""}{stock.change}
              </td>
              
              <td>
                <span className={`box ${stock.change >= 0 ? "up-bg" : "down-bg"}`}>
                  {stock.change >= 0 ? "📈" : "📉"} {stock.change_percent}%
                </span>
              </td>

              {/* Static placeholder for volume until we update backend again */}
              <td className="dim">10.5M</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trendtable;