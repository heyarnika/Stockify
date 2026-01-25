import { Link } from 'react-router-dom';
import './Dashnav.css';

function Predictnav() {
  return (
    <nav className="dashnav">
      <div className="left-section">
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="logo-icon">📈</span> 
          <span className="logo-text">Stockify</span>
        </Link>
      </div>

      <div className="middle-section">
        <Link to="/dashboard" className="nav"><span>☷</span> Dashboard</Link>
        <Link to="/predict" className="navactive"><span>✨</span> Predict</Link>
        <Link to="/advisor" className="nav"><span>🤖</span> FinAdvisor</Link>
        <button className="nav"><span>📅</span> Historical</button>
        <button className="nav"><span>👤</span> Profile</button>
      </div>

      <div className="right-section">
        <Link to="/" className="nav"><span>⏻</span> Logout</Link>
      </div>
    </nav>
  ); 
}

export default Predictnav;