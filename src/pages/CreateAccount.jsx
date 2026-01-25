import { useState } from 'react'; // Import the state hook
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function CreateAccount() {
  const navigate = useNavigate();

  // 1. Create state "boxes" for all four inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2. The function that handles the "Sign Up" button click
  const handleSignup = (e) => {
    e.preventDefault(); // Stop page refresh

    // 3. Frontend Validation Logic
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (fullName && email && password) {
      console.log("Account Details Captured:", { fullName, email, password });
      // In a real project, you'd send this data to the backend here.
      navigate('/dashboard'); 
    } else {
      alert("Please fill in all fields.");
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
            <p>Start making AI-powered predictions</p>
          </div>

          {/* 4. Link the form to the handler */}
          <form className="auth-form" onSubmit={handleSignup}>
            <div className="input-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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