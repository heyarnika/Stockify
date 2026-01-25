import { Link } from 'react-router-dom';
import './Dashnav.css';

function Dashnav() {
  return (
    <nav className="dashnav">
      <div className="left-section">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <span className="logo-icon">📈</span> 
          <span className="logo-text">Stockify</span>
        </Link>
      </div>

      <div className="middle-section">
        {/* Use Link instead of button for internal pages */}
        <Link to="/dashboard" className="navactive"><span>☷</span> Dashboard</Link>
        <Link to="/predict" className="nav"><span>✨</span> Predict</Link>
        
        <button className="nav"><span>🗨️</span> Community</button>
        <button className="nav"><span>📅</span> Historical</button>
        
        <div className="dropdown">
          <button className="nav">
            <span>📈</span> Market Types <small>▾</small>
          </button>
          <div className="dropdown-content">
            <a href="#">📈 Derivatives</a>
            <a href="#">📊 Indexes</a>
            <a href="#">🪙 Commodities</a>
          </div>
        </div>

        <button className="nav"><span>👤</span> Profile</button>
      </div>

      <div className="right-section">
        {/* Logout usually redirects to Login or Home */}
        <Link to="/login" className="nav"><span>⏻</span> Logout</Link>
      </div>
    </nav>
  ); 
}

export default Dashnav;