import './Dashnav.css';

function Dashnav() {
  return (
    <nav className="dashnav">
      <div className="left-section">
        <span className="logo-icon">📈</span> 
        <span className="logo-text">Stockify</span>
      </div>

      <div className="middle-section">
        <button className="nav"><span>☷</span> Dashboard</button>
        <button className="navactive"><span>✨</span> Predict</button>
        <button className="nav"><span>🗨️</span> Community</button>
        <button className="nav"><span>📅</span> Historical</button>
        {/*dowpdown????*/}
        <button className="nav"><span>📈</span> Market Types</button>
        <button className="nav"><span>👤</span> Profile</button>
      </div>

      <div className="right-section">
        <button className="nav"><span>⏻</span> Logout</button>
      </div>
    </nav>
  ); 
}

export default Dashnav;