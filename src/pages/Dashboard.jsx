import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashnav from '../components/Dashnav';
import Trendcards from '../components/Trendcards';
import Trendtable from '../components/Trendtable';
import './Dashboard.css';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state to track crashes

  const fetchMarketSnapshot = async () => {
    try {
      // 1. Fetch data from your Flask Live Bridge
      const response = await axios.get(axios.get('http://127.0.0.1:5000/market_snapshot'));
      
      // 2. Safety Check: Only update if the data is an array
      if (Array.isArray(response.data)) {
        setStocks(response.data);
        setLoading(false);
        setError(null);
        console.log("Live Prices Synced ✅");
      } else {
        throw new Error("Invalid data format from backend");
      }
    } catch (err) {
      console.error("Connection failed:", err);
      setError("Failed to fetch live prices. Is main.py running?");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketSnapshot();

    // LIVE UPDATING: Set a 30-second alarm
    const myAlarm = setInterval(fetchMarketSnapshot, 30000);

    return () => clearInterval(myAlarm);
  }, []);

  return (
    <div className="pagebg">
      <Dashnav />
      
      <div className='greeting'>
        <h2>Market Dashboard</h2>
        <p>Hi, Team! Tracking live stocks for you.</p>
      </div>

      {/* 3. The Guard Logic: Handles Loading, Errors, and Data Display */}
      {loading ? (
        <div className="loading-state">Looking for prices... 🔍</div>
      ) : error ? (
        <div className="error-state" style={{color: 'white', padding: '20px'}}>
          ⚠️ {error}
        </div>
      ) : (
        <div className="dashboard-content">
          {/* Only render components if stocks array has data */}
          {stocks.length > 0 ? (
            <>
              <Trendcards marketData={stocks} />
              <Trendtable marketData={stocks} />
            </>
          ) : (
            <div style={{color: 'white'}}>No stock data available at the moment.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;