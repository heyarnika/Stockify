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
    setForecast([]); // Clear previous chart to show loading state
    try {
      // We pass the ticker and number of days to our Flask backend
      const res = await axios.get(`http://localhost:5000/predict/${ticker}?days=${days}`);
      setForecast(res.data.forecast);
    } catch (err) {
      console.error(err);
      alert("Prediction failed. Make sure your Python terminal is running main.py!");
    }
    setLoading(false);
  };

  return (
    <div className="pagebg">
      <Predictnav />
      <div className="predict-content">
        <h2 className="title">Stock Prediction Dashboard</h2>

        <div className="top-section">
          <div className="box">
            <label>Select Stock</label>
            <select className="input-field" value={ticker} onChange={(e) => setTicker(e.target.value)}>
              {/* All 8 companies from your dashboard */}
              <option value="TCS">TCS - Tata Consultancy Services</option>
              <option value="RELIANCE">RELIANCE - Reliance Industries</option>
              <option value="INFY">INFY - Infosys Ltd</option>
              <option value="HDFCBANK">HDFCBANK - HDFC Bank</option>
              <option value="ICICIBANK">ICICIBANK - ICICI Bank</option>
              <option value="BHARTIARTL">BHARTIARTL - Bharti Airtel</option>
              <option value="ITC">ITC - ITC Limited</option>
              <option value="SBIN">SBIN - State Bank of India</option>
            </select>
          </div>

          <div className="box">
            <label>Time Range</label>
            <select className="input-field" value={days} onChange={(e) => setDays(e.target.value)}>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
            </select>
          </div>

          <div className="button-row">
            <button className="btn-action" onClick={startPrediction} disabled={loading}>
               {loading ? "Calculating..." : "🔮 Predict"}
            </button>
          </div>
        </div>

        <div className="chart-area">
          <h3>{ticker} - {days} Day Forecast</h3>
          <div className="chart-container" style={{padding: '40px', textAlign: 'center', minHeight: '350px'}}>
             {loading ? (
               <div className="loading-state">
                 <p style={{fontSize: '20px', color: '#3b82f6'}}>🧠 AI is analyzing trends for {ticker}...</p>
                 <p style={{fontSize: '14px', color: '#94a3b8', marginTop: '10px'}}>Running LSTM recursive loops through the .h5 model</p>
               </div>
             ) : forecast.length > 0 ? (
               <PriceChart data={forecast} />
             ) : (
               <p style={{color: '#94a3b8', marginTop: '100px'}}>Select parameters and click Predict to see the graph</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predict;