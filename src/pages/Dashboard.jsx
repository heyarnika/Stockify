import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashnav from '../components/Dashnav';
import Trendcards from '../components/Trendcards';
import Trendtable from '../components/Trendtable';
import './Dashboard.css';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarketSnapshot = async () => {
    try {
      // CORRECTED: Removed the nested axios.get call
      const response = await axios.get('http://127.0.0.1:5000/market_snapshot');
      
      if (Array.isArray(response.data)) {
        setStocks(response.data);
        setLoading(false);
        setError(null);
        console.log("Market Data Updated ✅");
      }
    } catch (err) {
      console.error("Connection error:", err);
      setError("Failed to fetch live prices. Ensure Flask is running.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketSnapshot();

    // LIVE UPDATING: Refreshes data every 30 seconds
    const interval = setInterval(fetchMarketSnapshot, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pagebg">
      <Dashnav />
      <div className='greeting'>
        <h2>Market Dashboard</h2>
        <p>Hi cutieee - Track today's trending stocks and market movements</p>
      </div>

      {loading ? (
        <div className="loading-state">Looking for prices... 🔍</div>
      ) : error ? (
        <div className="error-state" style={{color: 'white', padding: '20px'}}>
          ⚠️ {error}
        </div>
      ) : (
        <div className="dashboard-content">
          {stocks.length > 0 && (
            <>
              <Trendcards marketData={stocks} />
              <Trendtable marketData={stocks} />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;