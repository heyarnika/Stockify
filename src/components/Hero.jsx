import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-logo-main">
          {/* We'll use a placeholder icon for now */}
          <span className="trend-icon">📈</span> 
          <h1>Stockify</h1>
        </div>
        <p className="hero-subtitle">
          Precision-Driven Stock Insights Powered by AI
        </p>
        <button className="hero-cta">Get Started</button>
      </div>
      <div className="hero-image-container">
        {/* This represents the stock chart image from your design */}
        <div className="chart-placeholder"></div>
      </div>
    </section>
  );
}

export default Hero;