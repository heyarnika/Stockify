import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Profilenav from '../components/Profilenav';
import PriceChart from '../components/PriceChart'; // Unified chart component
import './Profile.css';

function Profile() {
  const [performance, setPerformance] = useState([]);
  const [user, setUser] = useState({ name: "User", email: "guest@stockify.com" });

  useEffect(() => {
    // Authenticate user session
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name, email: decoded.email });
      } catch (e) {
        console.error("Session sync failed");
      }
    }

    // Load training performance metrics
    axios.get('http://localhost:5000/model_performance')
      .then(res => {
        // We map 'accuracy' to 'price' so it works with your PriceChart.jsx logic
        const formattedData = res.data.map(item => ({
          date: item.month,
          price: item.accuracy 
        }));
        setPerformance(formattedData);
      })
      .catch(err => console.error("Error loading performance stats"));
  }, []);

  return (
    <div className="pagebg">
      <Profilenav />
      <div className="profile-container">
        
        <header className="profile-top">
          <h1>Welcome, {user.name}</h1>
          <p className="subtitle">Account Centre</p>
        </header>

        {/* Identity Section */}
        <section className="profile-card main-card">
          <div className="user-header">
            <div className="avatar-circle">{user.name[0]}</div>
            <div className="user-meta">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </section>

        {/* Centered KPI Cards */}
        <div className="centered-stats">
          <div className="mini-stat">
            <span className="stat-emoji">👤</span>
            <div className="stat-info">
              <label>Predictions</label>
              <p>124</p>
            </div>
          </div>
          <div className="mini-stat">
            <span className="stat-emoji">📈</span>
            <div className="stat-info">
              <label>Accuracy</label>
              <p>94%</p>
            </div>
          </div>
        </div>

        {/* Performance Chart Section */}
        <section className="profile-card chart-section">
          <h3>Model Accuracy Trends</h3>
          <div className="chart-area" style={{ marginTop: '20px' }}>
             {performance.length > 0 ? (
               <PriceChart data={performance} />
             ) : (
               <p style={{ color: '#94a3b8', textAlign: 'center', padding: '100px' }}>
                 Loading model trends...
               </p>
             )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default Profile;