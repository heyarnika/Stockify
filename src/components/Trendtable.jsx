import React from 'react';
import './Trendtable.css';

function Trendtable({ marketData }) {
  return (
    <div className="trendtable-wrapper">
      <table className="trendtable">
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
          {marketData.map((stock, index) => (
            <tr key={index}>
              <td>{stock.symbol}</td>
              <td>₹{stock.price}</td>
              {/* Restored your original color logic */}
              <td className={stock.change >= 0 ? "up" : "down"}>
                {stock.change >= 0 ? "+" : ""}{stock.change}
              </td>
              <td>
                <span className={`pill ${stock.change >= 0 ? "up-bg" : "down-bg"}`}>
                  {stock.change >= 0 ? "📈" : "📉"} {stock.percent}%
                </span>
              </td>
              {/* Back to your original display */}
              <td className="dim-text">10.5M</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Trendtable;