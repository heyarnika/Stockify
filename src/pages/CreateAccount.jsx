import { Link } from 'react-router-dom';
import './Auth.css';

function CreateAccount() {
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
            <h2>Create Account</h2>
            <p>Start making AI-powered predictions</p>
          </div>

          <form className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" />
            </div>

            <button type="button" className="auth-btn">Create Account</button>
          </form>

          <div className="auth-footer">
            <p className="footer-note">
              Already have an account? <Link to="/login" className="link-text">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;