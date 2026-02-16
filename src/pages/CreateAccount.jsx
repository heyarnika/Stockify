import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function CreateAccount() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signup", {
        fullName,
        email,
        password
      });

      alert(res.data.message);
      navigate("/login");
    }
    catch (err) {
      alert("Signup failed. Email already exists?");
      console.error(err);
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
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email"
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
