import './HowItWorks.css';

function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-container">
        <h2 className="how-title">How Stockify Works</h2>
        
        <div className="steps-wrapper">
          {/* Step 1 */}
          <div className="step-item">
            <div className="step-number">1</div>
            <h3>Select Your Stock</h3>
            <p>Pick leading stocks like TCS, RELIANCE, or INFY.</p>
          </div>

          {/* Step 2 */}
          <div className="step-item">
            <div className="step-number">2</div>
            <h3>Analyze the Data</h3>
            <p>Our AI decodes years of market trends using deep learning.</p>
          </div>

          {/* Step 3 */}
          <div className="step-item">
            <div className="step-number">3</div>
            <h3>Get Accurate Predictions</h3>
            <p>Receive precise 7-day forecasts with confidence insights.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;