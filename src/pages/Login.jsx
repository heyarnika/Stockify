import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  return (
    <div className="pagebg">
      {/* Navbar removed for a focused UI */}
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-logo-container">
             <span className="logo-icon">📈</span> 
             <span className="logo-text">Stockify</span>
          </div>

          <div className="greeting">
            <h2>Sign In</h2>
            <p>Welcome back! Please enter your details.</p>
          </div>

          <form className="auth-form">
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="name@example.com" required />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button type="button" className="auth-btn">Sign In</button>
          </form>

          <div className="auth-footer">
            <p className="footer-note">
              Don't have an account? <Link to="/signup" className="link-text">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;