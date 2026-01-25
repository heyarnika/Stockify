import { Link } from 'react-router-dom'; // 1. Always import Link
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        {/* Wrap logo in a Link to go Home */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="logo-icon">📈</span> 
          <span className="logo-text">Stockify</span>
        </Link>
      </div>

      <div className="nav-links">
        {/* 2. Change button to Link */}
        <Link to="/signup" className="nav-btn">Get Started</Link>
      </div>
    </nav>
  );
}

export default Navbar;