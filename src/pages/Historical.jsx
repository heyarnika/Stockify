import React, { useState } from 'react';
import axios from 'axios';
import Historicalnav from '../components/Historicalnav';
import PriceChart from '../components/PriceChart'; 
import './Predict.css';

function Historical() {
  const [ticker, setTicker] = useState('TCS');
  const [startDate, setStartDate] = useState('2025-12-15');
  const [endDate, setEndDate] = useState('2025-12-30');
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    setHistoryData([]); // Clear old graph while loading
    try {
      const res = await axios.get(`http://localhost:5000/historical_data?ticker=${ticker}&start=${startDate}&end=${endDate}`);
      // Ensure we use .forecast to match our main.py change
      setHistoryData(res.data.forecast);
    } catch (err) {
      alert("Error fetching data. Check if your Python terminal is running!");
    }
    setLoading(false);
  };

  return (
    <div className="pagebg">
      <Historicalnav />
      <div className="predict-content">
        <h2 className="title">Historical Stock Data</h2>
        <div className="top-section">
          <div className="box">
            <label>Select Stock</label>
            <select className="input-field" value={ticker} onChange={(e) => setTicker(e.target.value)}>
              <option value="TCS">TCS</option><option value="RELIANCE">RELIANCE</option>
              <option value="INFY">INFY</option><option value="SBIN">SBIN</option>
              <option value="HDFCBANK">HDFCBANK</option><option value="ICICIBANK">ICICIBANK</option>
              <option value="BHARTIARTL">BHARTIARTL</option><option value="ITC">ITC</option>
            </select>
          </div>
          <div className="box">
            <label>Start Date (YYYY-MM-DD)</label>
            <input type="text" className="input-field" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="box">
            <label>End Date (YYYY-MM-DD)</label>
            <input type="text" className="input-field" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <button className="btn-action" onClick={fetchHistory}>
            {loading ? "Fetching..." : "📅 Fetch Data"}
          </button>
        </div>

        <div className="chart-area">
          <h3>{ticker} Historical Trend</h3>
          <div className="chart-container" style={{padding: '40px', minHeight: '350px'}}>
             {historyData.length > 0 ? (
               <PriceChart data={historyData} />
             ) : (
               <p style={{color: '#94a3b8', textAlign: 'center', marginTop: '100px'}}>
                 {loading ? "Loading..." : "Change dates and click Fetch Data"}
               </p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historical;