import './Dashnav.css';

function Predictnav() {
  return (
    <nav className="dashnav">
      <div className="left-section">
        <span className="logo-icon">📈</span> 
        <span className="logo-text">Stockify</span>
      </div>

      <div className="middle-section">
        {/* On this page, Dashboard is just 'nav' and Predict is 'navactive' */}
        <button className="nav"><span>☷</span> Dashboard</button>
        <button className="navactive"><span>✨</span> Predict</button>
        <button className="nav"><span>🗨️</span> Community</button>
        <button className="nav"><span>📅</span> Historical</button>
        
        {/* The simple CSS-only Dropdown */}
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
        <button className="nav"><span>⏻</span> Logout</button>
      </div>
    </nav>
  ); 
}

export default Predictnav;