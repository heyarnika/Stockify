import React, { useState } from 'react';
import axios from 'axios';
import Predictnav from '../components/Predictnav';
import PriceChart from '../components/PriceChart'; 
import './Predict.css';

function Predict() {
  const [ticker, setTicker] = useState('TCS');
  const [days, setDays] = useState(7);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const startPrediction = async () => {
    setLoading(true);
    setForecast([]);
    try {
      const res = await axios.get(`http://localhost:5000/predict/${ticker}?days=${days}`);
      setForecast(res.data.forecast);
    } catch (err) {
      alert("Prediction failed.");
    }
    setLoading(false);
  };

  return (
    <div className="pagebg">
      <Predictnav />
      <div className="predict-content">
        <h2 className="title">AI Price Forecast</h2>
        <div className="top-section">
          <div className="box">
            <label>Select Stock</label>
            <select className="input-field" value={ticker} onChange={(e) => setTicker(e.target.value)}>
              <option value="TCS">TCS</option><option value="RELIANCE">RELIANCE</option>
              <option value="INFY">INFY</option><option value="HDFCBANK">HDFCBANK</option>
              <option value="ICICIBANK">ICICIBANK</option><option value="BHARTIARTL">BHARTIARTL</option>
              <option value="ITC">ITC</option><option value="SBIN">SBIN</option>
            </select>
          </div>
          <div className="box">
            <label>Days</label>
            <select className="input-field" value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="7">7 Days</option><option value="30">30 Days</option>
            </select>
          </div>
          <button className="btn-action" onClick={startPrediction}>{loading ? "Processing..." : "🔮 Predict"}</button>
        </div>
        <div className="chart-area">
          <div className="chart-container" style={{padding: '40px', textAlign: 'center', minHeight: '350px'}}>
             {loading ? <p style={{color: '#3b82f6'}}>🧠 AI is analyzing {ticker}...</p> : forecast.length > 0 ? <PriceChart data={forecast} /> : <p style={{color: '#94a3b8', marginTop: '100px'}}>Click Predict</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Predict;