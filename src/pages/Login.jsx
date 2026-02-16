import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://stockify-o4wg.onrender.com/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");

      navigate('/dashboard');
    } 
    catch (err) {
      alert("Invalid email or password");
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
            <h2>Sign In</h2>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            
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

            <button type="submit" className="auth-btn">Sign In</button>
          </form>

          <div className="auth-footer">
            <p className="footer-note">
              Don't have an account? 
              <Link to="/signup" className="link-text"> Create Account</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
