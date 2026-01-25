import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import Login from './pages/Login';          
import CreateAccount from './pages/CreateAccount';
import Advisor from './pages/Advisor'; // Ensure the filename is Advisor.jsx in your pages folder

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
        
        {/* Note: If you ever want to add a "Page Not Found" 404, 
          you would add a route with path="*" at the very bottom.
        */}
      </Routes>
    </div>
  );
}

export default App;