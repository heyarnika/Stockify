import Historicalnav from '../components/Historicalnav';
import './Predict.css'; // Reusing Predict.css for consistent layout

function Historical() {
  return (
    <div className="pagebg">
      <Historicalnav />
      <div className="predict-content">
        <h2 className="title">Historical Stock Data</h2>
        <p style={{ color: '#94a3b8', marginTop: '-30px', marginBottom: '40px' }}>
          View historical stock prices for any date range
        </p>

        <div className="top-section">
          <div className="box">
            <label>Select Stock</label>
            <select className="input-field">
              <option>TCS - Tata Consultancy S</option>
              <option>RELIANCE - Reliance Ind</option>
              <option>INFY - Infosys Ltd</option>
              <option>HDFCBANK - HDFC Bank</option>
              <option>ICICIBANK - ICICI Bank</option>
              <option>BHARTIARTL - Bharti Airtel</option>
              <option>ITC - ITC Limited</option>
              <option>SBIN - State Bank of India</option>
            </select>
          </div>

          {/* Date Inputs instead of Time Range */}
          <div className="box">
            <label>Start Date</label>
            <input type="date" className="input-field" defaultValue="2025-01-01" />
          </div>

          <div className="box">
            <label>End Date</label>
            <input type="date" className="input-field" defaultValue="2025-10-26" />
          </div>

          <div className="button-row">
            <button className="btn-action">
              <span>📅</span> Fetch Historical Data
            </button>
          </div>
        </div>

        <div className="chart-area">
          <h3>TCS - Historical Price Chart</h3>
          <div className="chart-placeholder">
            {/* Space for the chart visualization */}
            Historical chart visualization will appear here...
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historical;