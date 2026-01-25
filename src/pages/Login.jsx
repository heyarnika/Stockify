import { useState } from 'react'; // 1. Import memory tool
import { Link, useNavigate } from 'react-router-dom'; // Import navigation tool
import './Auth.css';

function Login() {
  const navigate = useNavigate();

  // 2. Create the "Boxes" to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 3. This function runs when the "Sign In" button is clicked
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the page from refreshing

    // In a real project, you'd send 'email' and 'password' to the backend here.
    if (email && password) {
      console.log("Logging in with:", email, password);
      navigate('/dashboard'); // Move to internal pages
    } else {
      alert("Please enter both email and password");
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
            <p>Welcome back! Please enter your details.</p>
          </div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email} // Link input to state
                onChange={(e) => setEmail(e.target.value)} // Update state on type
                required 
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} // Link input to state
                onChange={(e) => setPassword(e.target.value)} // Update state on type
                required 
              />
            </div>

            {/* Change type to "submit" so it triggers the form onSubmit */}
            <button type="submit" className="auth-btn">Sign In</button>
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