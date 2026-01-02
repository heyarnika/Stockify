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

        <button className="hero-cta">Get Started</button>
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