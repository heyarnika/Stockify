import React, { useState } from 'react';
import axios from 'axios';
import Historicalnav from '../components/Historicalnav';
import PriceChart from '../components/PriceChart'; 
import './Predict.css';

function Historical() {
  // 1. State: Variables that hold your choices and the data from Python
  const [ticker, setTicker] = useState('TCS');
  const [startDate, setStartDate] = useState('2025-01-01'); // Initial placeholder
  const [endDate, setEndDate] = useState('2025-01-10');   // Initial placeholder
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 2. Fetch Function: Sends your inputs to the Python Backend
  const fetchHistory = async () => {
    setLoading(true);
    setHistoryData([]); // Clear the chart while loading
    
    try {
      // Sending ticker, start, and end dates as "params"
      const response = await axios.get(`https://stockify-o4wg.onrender.com/historical_data`, {
        params: {
          ticker: ticker,
          start: startDate, // Example: "2025-01-01"
          end: endDate
        }
      });

      // If successful, save the 'forecast' array to our state
      if (response.data.status === "success") {
        setHistoryData(response.data.forecast);
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Error: Check if dates are correct (YYYY-MM-DD) and Python is running!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pagebg">
      <Historicalnav />
      <div className="predict-content">
        <h2 className="title">Historical Analysis</h2>
        
        <div className="top-section">
          {/* Stock Selection */}
          <div className="box">
            <label>Select Ticker</label>
            <select className="input-field" value={ticker} onChange={(e) => setTicker(e.target.value)}>
              <option value="TCS">TCS</option>
              <option value="RELIANCE">RELIANCE</option>
              <option value="INFY">INFY</option>
              <option value="SBIN">SBIN</option>
              <option value="HDFCBANK">HDFCBANK</option>
              <option value="ICICIBANK">ICICIBANK</option>
              <option value="BHARTIARTL">BHARTIARTL</option>
              <option value="ITC">ITC</option>
            </select>
          </div>

          {/* Manual Date Input: Start */}
          <div className="box">
            <label>Start (YYYY-MM-DD)</label>
            <input 
              type="text" 
              className="input-field" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
            />
          </div>

          {/* Manual Date Input: End */}
          <div className="box">
            <label>End (YYYY-MM-DD)</label>
            <input 
              type="text" 
              className="input-field" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
            />
          </div>
          
          <button className="btn-action" onClick={fetchHistory}>
            📅 Fetch Data
          </button>
        </div>

        <div className="chart-area">
          <h3 style={{color: '#94a3b8', paddingLeft: '40px', marginBottom: '20px', fontWeight: '600'}}>
            {ticker} Historical Trend Chart
          </h3>
          <div className="chart-container" style={{padding: '20px 40px', minHeight: '400px'}}>
             {loading ? (
               <p style={{color: '#3b82f6', textAlign: 'center', marginTop: '150px'}}>
                 Talking to yFinance API...
               </p>
             ) : historyData.length > 0 ? (
               <PriceChart data={historyData} />
             ) : (
               <p style={{color: '#64748b', textAlign: 'center', marginTop: '150px', fontSize: '15px'}}>
                 Type your dates and click Fetch to see the data.
               </p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historical;