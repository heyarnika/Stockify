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
      const res = await axios.get(`https://stockify-o4wg.onrender.com/predict/${ticker}?days=${days}`);
      setForecast(res.data.forecast);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Check if main.py is running!");
    }
    setLoading(false);
  };

  return (
    <div className="pagebg">
      <Predictnav />
      <div className="predict-content">
        <h2 className="title">Stock Prediction Dashboard</h2>
        
        {/* The White Control Panel */}
        <div className="top-section">
          <div className="box">
            <label>Select Stock</label>
            <select className="input-field" value={ticker} onChange={(e) => setTicker(e.target.value)}>
              <option value="TCS">TCS</option>
              <option value="RELIANCE">RELIANCE</option>
              <option value="INFY">INFY</option>
              <option value="HDFCBANK">HDFCBANK</option>
              <option value="ICICIBANK">ICICIBANK</option>
              <option value="BHARTIARTL">BHARTIARTL</option>
              <option value="ITC">ITC</option>
              <option value="SBIN">SBIN</option>
            </select>
          </div>

          <div className="box">
            <label>Time Range</label>
            <select className="input-field" value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="7">7 Days</option>
              <option value="10">10 Days</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>

          <button className="btn-action" onClick={startPrediction}>
            <span>🔮</span> Predict
          </button>
        </div>

        {/* The Dark Chart Display */}
        <div className="chart-area">
          <div className="chart-container">
            {loading ? (
              <div style={{ textAlign: 'center' }}>
                <div className="loader"></div> {/* You can add a CSS spinner here */}
                <p style={{ color: '#3b82f6', marginTop: '15px', fontWeight: '600' }}>
                  🧠 AI is analyzing market patterns...
                </p>
              </div>
            ) : forecast.length > 0 ? (
              <PriceChart data={forecast} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#94a3b8', fontSize: '16px' }}>
                  Select a ticker and click Predict to generate the AI graph
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predict;