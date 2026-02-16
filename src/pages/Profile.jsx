import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profilenav from '../components/Profilenav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Profile.css';

function Profile() {
  // Mock data to ensure the chart works even if the API is down
  const mockData = [
    { month: 'Oct', accuracy: 88, rmse: 12 },
    { month: 'Nov', accuracy: 91, rmse: 10 },
    { month: 'Dec', accuracy: 90, rmse: 11 },
    { month: 'Jan', accuracy: 94, rmse: 8 },
    { month: 'Feb', accuracy: 95, rmse: 7 },
  ];

  const [performance, setPerformance] = useState(mockData); 
  const [user, setUser] = useState({ fullName: "User", email: "guest@stockify.com" });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data.user);
        setHistory(res.data.prediction_history);
      })
      .catch(err => console.error("Profile load error", err));
    }

    // Try to get real data, otherwise keep the mockData
    axios.get("http://localhost:5000/model_performance")
      .then(res => {
        if(res.data.length > 0) setPerformance(res.data);
      })
      .catch(() => console.log("Using fallback chart data"));
  }, []);

  return (
    <div className="pagebg">
      <Profilenav />

      <div className="profile-container">
        <header className="profile-top">
          <h1>Welcome, {user.fullName}</h1>
          <p className="subtitle">Account Centre</p>
        </header>

        <section className="profile-card user-main-card">
          <div className="user-header">
            <div className="profile-icon-wrapper">
              <div className="avatar-icon">
                <div className="head"></div>
                <div className="body"></div>
              </div>
            </div>
            <div className="user-meta">
              <h3>{user.fullName}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </section>

        <div className="stats-row">
          <div className="mini-stat pred-border">
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <label>Total Predictions</label>
              <p>{history.length}</p>
            </div>
          </div>

          <div className="mini-stat acc-border">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <label>Model Accuracy</label>
              <p>94%</p>
            </div>
          </div>
        </div>

        {/* RECENT PREDICTIONS LIST */}
        <section className="profile-card">
          <h3 className="section-title">Recent Activity</h3>
          <div className="history-list">
            {history.length > 0 ? (
              history.map((h, i) => (
                <div key={i} className="history-item">
                  <span className="ticker-badge">{h.ticker}</span>
                  <span className="history-meta">{h.days} Day Forecast</span>
                  <span className="history-date">{new Date(h.time).toLocaleDateString()}</span>
                </div>
              ))
            ) : (
              <p className="dim-text">No recent predictions found.</p>
            )}
          </div>
        </section>

        {/* FIXED CHART SECTION */}
        <section className="profile-card chart-section">
          <h3>Model Performance Trends</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={performance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left" stroke="#10b981" domain={[80, 100]} fontSize={12} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" domain={[0, 20]} fontSize={12} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
                <Line yAxisId="left" type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#10b981" strokeWidth={4} dot={{r: 6}} activeDot={{r: 8}} />
                <Line yAxisId="right" type="monotone" dataKey="rmse" name="RMSE (Error)" stroke="#f59e0b" strokeWidth={4} dot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;