import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Profilenav from '../components/Profilenav';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Profile.css';

function Profile() {
  const [performance, setPerformance] = useState([]);
  const [user, setUser] = useState({ fullName: "User", email: "guest@stockify.com" });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ===== GET USER PROFILE FROM FLASK =====
    if (token) {
      axios.get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setUser(res.data.user);
        setHistory(res.data.prediction_history);
      })
      .catch(err => {
        console.error("Profile load error", err);
      });
    }

    // ===== OPTIONAL: Model Performance Chart =====
    axios.get("http://localhost:5000/model_performance")
      .then(res => setPerformance(res.data))
      .catch(() => console.log("No model stats API (ignore)"));
  }, []);

  return (
    <div className="pagebg">
      <Profilenav />

      <div className="profile-container">
        <header className="profile-top">
          <h1>Welcome, {user.fullName}</h1>
          <p className="subtitle">Account Centre</p>
        </header>

        {/* USER CARD */}
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

        {/* STATS */}
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
              <p>94%</p> {/* static unless you compute real */}
            </div>
          </div>
        </div>

        {/* PREDICTION HISTORY LIST */}
        <section className="profile-card">
          <h3>Recent Predictions</h3>

          <ul style={{ color: "white" }}>
            {history.map((h, i) => (
              <li key={i}>
                {h.ticker} | {h.days} days | {new Date(h.time).toLocaleString()}
              </li>
            ))}
          </ul>
        </section>

        {/* CHART SECTION */}
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
