import { Link } from 'react-router-dom'; // 1. Import Link
import './Hero.css';
import chartImg from '../assets/chart.png'; 

function Hero() {
  return (
    <section className="hero">
    
      <div className="hero-text-container">
        <div className="hero-logo-main">
          <span className="trend-icon">📈</span> 
          <h1>Stockify</h1>
        </div>

        <p className="hero-subtitle">
          Precision-Driven Stock Insights Powered by AI
        </p>

        {/* 2. Change button to Link and point it to /signup */}
        <Link to="/signup" className="hero-cta">Get Started</Link>
      </div>

      <div className="hero-full-width-image">
        <img 
          src={chartImg} 
          alt="Stock Market Chart" 
          className="full-screen-img"
        />
      </div>

    </section>
  );
}

export default Hero;