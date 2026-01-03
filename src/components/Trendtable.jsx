import './Trendtable.css';

function Trendtable() {
  return (
    <div className="trendtable">
      <h2>Today's Trending Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Company</th>
            <th>Price</th>
            <th>Change</th>
            <th>Change %</th>
            <th>Volume</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RELIANCE</td>
            <td className="dim">Reliance Industries</td>
            <td>₹2456.30</td>
            <td className="up">+45.20</td>
            <td><span className="box up-bg">+1.87%</span></td>
            <td>12.5M</td>
            <td>₹16.6T</td>
          </tr>
          <tr>
            <td>TCS</td>
            <td className="dim">Tata Consultancy</td>
            <td>₹3721.85</td>
            <td className="down">-22.40</td>
            <td><span className="box down-bg">-0.60%</span></td>
            <td>8.2M</td>
            <td>₹13.6T</td>
          </tr>
          <tr>
            <td>HDFCBANK</td>
            <td className="dim">HDFC Bank</td>
            <td>₹1642.50</td>
            <td className="up">+18.75</td>
            <td><span className="box up-bg">+1.15%</span></td>
            <td>15.8M</td>
            <td>₹12.4T</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Trendtable;