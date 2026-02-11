import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profilenav from '../components/Profilenav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Profile.css';

function Profile() {
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await axios.get('http://localhost:5000/model_performance');
        // Setting state with the array of objects from Python
        setPerformance(res.data);
      } catch (err) {
        console.error("Error loading performance stats");
      }
    };
    fetchPerformance();
  }, []);

  return (
    <div className="pagebg">
      <Profilenav />
      
      <div className="profile-container">
        <header className="profile-top">
          <h1>Your Profile</h1>
          <p className="subtitle">Account Centre</p>
        </header>

        <section className="profile-card main-card">
          <div className="user-header">
            <div className="avatar-circle">D</div>
            <div className="user-meta">
              <h3>miss meow</h3>
              <p>trial@stockify.com</p>
            </div>
          </div>
        </section>

        <div className="stats-row">
          <div className="mini-stat">
            <span className="stat-icon blue-icon">👤</span>
            <div className="stat-info"><label>Total Predictions</label><p>124</p></div>
          </div>
          <div className="mini-stat">
            <span className="stat-icon green-icon">📈</span>
            <div className="stat-info"><label>Avg. Accuracy</label><p>94%</p></div>
          </div>
          <div className="mini-stat">
            <span className="stat-icon purple-icon">📊</span>
            <div className="stat-info"><label>Bullish</label><p>82</p></div>
          </div>
          <div className="mini-stat">
            <span className="stat-icon red-icon">📉</span>
            <div className="stat-info"><label>Bearish</label><p>42</p></div>
          </div>
        </div>

        <section className="profile-card chart-section">
          <h3>Model Performance Trends</h3>
          <div style={{ width: '100%', height: 350, marginTop: '20px' }}>
            <ResponsiveContainer width="100%" height="100%">
              {/* Passing the fetched data to the chart */}
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                
                {/* Fixed: dataKey matches 'month' from Python */}
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                
                {/* Left Axis for Accuracy (80-100 range) */}
                <YAxis yAxisId="left" stroke="#10b981" fontSize={12} domain={[80, 100]} />
                
                {/* Right Axis for RMSE (0-20 range) */}
                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={12} domain={[0, 20]} />
                
                <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: 'none' }} />
                <Legend />
                
               
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="accuracy" 
                  name="Accuracy %" 
                  stroke="#10b981" 
                  strokeWidth={3} 
                  dot={{ r: 6 }} 
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="rmse" 
                  name="RMSE (Error)" 
                  stroke="#f59e0b" 
                  strokeWidth={3} 
                  dot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="profile-card history-section">
          <h3>Recent Prediction History</h3>
          <div className="empty-placeholder">
            <p>Your session history is clear.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;