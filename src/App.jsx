import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import Login from './pages/Login';          
import CreateAccount from './pages/CreateAccount';
import Advisor from './pages/Advisor';
import Historical from './pages/Historical'; // Added import
import Profile from './pages/Profile';       // Added import

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount />} />

        {/* Private/Internal Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/advisor" element={<Advisor />} />
        <Route path="/historical" element={<Historical />} /> {/* Added Route */}
        <Route path="/profile" element={<Profile />} />       {/* Added Route */}
        
        {/* Catch-all route for 404 - Redirects back to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;