import { Routes, Route } from 'react-router-dom'; // 1. Import the Routing tools
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Predict from './pages/Predict';
import Login from './pages/Login';          // 2. Import your new pages
import CreateAccount from './pages/CreateAccount';

function App() {
  return (
    <div className="App">
      {/* 3. Wrap everything in <Routes> */}
      <Routes>
        {/* Define which path shows which page */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predict" element={<Predict />} />
        /*<Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount />} />
      </Routes>
    </div>
  );
}

export default App;