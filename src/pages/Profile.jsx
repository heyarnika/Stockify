import Profilenav from '../components/Profilenav';
import './Profile.css';

function Profile() {
  return (
    <div className="pagebg">
      <Profilenav />
      
      <div className="profile-container">
        <header className="profile-top">
          <h1>Your Profile</h1>
          <p className="subtitle">Account Centre</p>
        </header>

        {/* User Info Section - Logout button removed */}
        <section className="profile-card main-card">
          <div className="user-header">
            <div className="avatar-circle">D</div>
            <div className="user-meta">
              <h3>Demo User</h3>
              <p>demo@stockify.com</p>
            </div>
          </div>
        </section>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="mini-stat">
            <span className="stat-icon blue-icon">👤</span>
            <div className="stat-info">
              <label>Total Predictions</label>
              <p>0</p>
            </div>
          </div>
          <div className="mini-stat">
            <span className="stat-icon green-icon">📈</span>
            <div className="stat-info">
              <label>Average Accuracy</label>
              <p>0%</p>
            </div>
          </div>
          <div className="mini-stat">
            <span className="stat-icon purple-icon">📊</span>
            <div className="stat-info">
              <label>Bullish Predictions</label>
              <p>0</p>
            </div>
          </div>
          <div className="mini-stat">
            <span className="stat-icon red-icon">📉</span>
            <div className="stat-info">
              <label>Bearish Predictions</label>
              <p>0</p>
            </div>
          </div>
        </div>

        {/* Prediction History Placeholder */}
        <section className="profile-card history-section">
          <h3>Prediction History</h3>
          <div className="empty-placeholder">
            <p>No predictions yet</p>
            <span>Start making predictions from the Dashboard to see your history here</span>
          </div>
        </section>

        {/* Chart Placeholder Section */}
        <section className="profile-card chart-section">
          <h3>Model Performance Trends</h3>
          <div className="chart-placeholder-box">
             <p>Chart visualization placeholder</p>
             <div className="legend-preview">
                <span className="dot green"></span> Accuracy % 
                <span className="dot orange"></span> RMSE
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;