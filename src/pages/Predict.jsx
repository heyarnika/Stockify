import Predictnav from '../components/Predictnav';
import './Predict.css';

function Predict() {
  return (
    <div className="pagebg">
      <Predictnav />
      <div className="predict-content">
        <h2 className="title">Stock Prediction Dashboard</h2>

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

          <div className="box">
            <label>Time Range</label>
            <select className="input-field">
              <option>7 Days</option>
              <option>30 Days</option>
              <option>60 Days</option>
              <option>90 Days</option>
            </select>
          </div>

          <div className="button-row">
            <button className="btn-action">Fetch Data</button>
            <button className="btn-action">🔮 Predict</button>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <label>Current Price</label>
            <p className="big-text">₹3692.78</p>
          </div>

          <div className="stat-card">
            <label>Change</label>
            <p className="big-text red-text">📉 -0.45%</p>
          </div>
        </div>

        <div className="chart-area">
          <h3>TCS - Price Chart</h3>
          <div className="chart-placeholder">
            Chart visualization will appear here...
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predict;