import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
    <div className="nav-logo">
     <span className="logo-icon">📈</span> 
     <span className="logo-text">Stockify</span>
    </div>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <button className="nav-btn">Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;