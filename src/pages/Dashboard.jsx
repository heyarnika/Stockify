import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashnav from '../components/Dashnav';
import Trendcards from '../components/Trendcards';
import Trendtable from '../components/Trendtable';
import './Dashboard.css';

function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPrices = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/market_snapshot');
      setStocks(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPrices();
    const timer = setInterval(getPrices, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pagebg">
      <Dashnav />
      
      {/* Aligned Greeting Section */}
      <div className="greeting-container">
        <div className='greeting'>
          <h2>Market Dashboard</h2>
          <p>Track today's trending stocks and market movements</p>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">Syncing market prices...</div>
      ) : (
        <div className="dashboard-content">
          {/* Side-by-side metric cards */}
          <div className="stats-row">
            <Trendcards marketData={stocks} />
          </div>

          {/* Clean table box with single title */}
          <div className="table-section">
            <h3 className="table-title">Today's Trending Stocks</h3>
            <Trendtable marketData={stocks} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;