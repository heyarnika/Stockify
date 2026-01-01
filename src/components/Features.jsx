import './Features.css';

function Features() {
  return (
    <section className="features-section">
      <h2 className="section-title">Powerful Features</h2>
      
      <div className="features-grid">
        
        {/* Feature 1 */}
        <div className="feature-item">
          <div className="icon-circle blue">🧠</div>
          <h3>AI Stock Prediction</h3>
          <p>Our smart model predicts prices using historical market data.</p>
        </div>

        {/* Feature 2 */}
        <div className="feature-item">
          <div className="icon-circle green">📊</div>
          <h3>Real-Time Analytics</h3>
          <p>Live stock data and interactive visualization charts.</p>
        </div>

        {/* Feature 3 */}
        <div className="feature-item">
          <div className="icon-circle purple">👥</div>
          <h3>Community Chat</h3>
          <p>Discuss predictions anonymously with other traders.</p>
        </div>

        {/* Feature 4 */}
        <div className="feature-item">
          <div className="icon-circle orange">🛡️</div>
          <h3>Secure Platform</h3>
          <p>Your data is encrypted and protected at all times.</p>
        </div>

        {/* Feature 5 */}
        <div className="feature-item">
          <div className="icon-circle red">⚡</div>
          <h3>Fast Predictions</h3>
          <p>Get stock forecasts in seconds with our optimized model.</p>
        </div>

        {/* Feature 6 */}
        <div className="feature-item">
          <div className="icon-circle blue-light">📈</div>
          <h3>Prediction History</h3>
          <p>Track your predictions and performance over time.</p>
        </div>

      </div>
    </section>
  );
}

export default Features;  