import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function CreateAccount() {
  const navigate = useNavigate();

  // Simplified state to just Username and Password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (username && password) {
      console.log("New User Created:", { username, password });
      // Logic for uniqueness check would happen at the backend level
      navigate('/dashboard'); 
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="pagebg">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-logo-container">
             <span className="logo-icon">📈</span> 
             <span className="logo-text">Stockify</span>
          </div>

          <div className="greeting">
            <h2>Create Account</h2>
          </div>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="input-group">
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Choose a unique username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="auth-btn">Create Account</button>
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