import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Profilenav from '../components/Profilenav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Profile.css';

function Profile() {
  const [performance, setPerformance] = useState([]);
  const [user, setUser] = useState({ name: "User", email: "guest@stockify.com" });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ name: decoded.name, email: decoded.email });
      } catch (e) { 
        console.error("Session error"); 
      }
    }

    axios.get('http://localhost:5000/model_performance')
      .then(res => setPerformance(res.data))
      .catch(err => console.error("Stats error"));
  }, []);

  return (
    <div className="pagebg">
      <Profilenav />
      <div className="profile-container">
        <header className="profile-top">
          <h1>Welcome, {user.name}</h1>
          <p className="subtitle">Account Centre</p>
        </header>

        <section className="profile-card user-main-card">
          <div className="user-header">
            {/* NEW: Modern Profile Icon */}
            <div className="profile-icon-wrapper">
               <div className="avatar-icon">
                 <div className="head"></div>
                 <div className="body"></div>
               </div>
            </div>
            <div className="user-meta">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </section>

        {/* 2 CENTER ALIGNED CARDS WITH STYLISH BORDERS */}
        <div className="stats-row">
          <div className="mini-stat pred-border">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <label>Predictions</label>
              <p>124</p>
            </div>
          </div>
          <div className="mini-stat acc-border">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <label>Accuracy</label>
              <p>94%</p>
            </div>
          </div>
        </div>

        {/* ORIGINAL CHART UNTOUCHED */}
        <section className="profile-card chart-section">
          <h3>Model Trends</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis yAxisId="left" stroke="#10b981" domain={[80, 100]} />
                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" domain={[0, 20]} />
                <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: 'none' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#10b981" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="rmse" name="RMSE (Error)" stroke="#f59e0b" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;