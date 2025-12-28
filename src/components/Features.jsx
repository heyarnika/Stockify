import './Features.css';

function Features() {
  const featuresData = [
    { icon: "🧠", title: "LSTM Neural Network", desc: "Advanced deep learning model trained on historical market data", color: "blue" },
    { icon: "📊", title: "Real-Time Analytics", desc: "Live stock data and interactive visualization charts", color: "green" },
    { icon: "👥", title: "Community Chat", desc: "Discuss predictions anonymously with other traders", color: "purple" },
    { icon: "🛡️", title: "Secure Platform", desc: "Your data is encrypted and protected at all times", color: "orange" },
    { icon: "⚡", title: "Fast Predictions", desc: "Get stock forecasts in seconds with our optimized model", color: "red" },
    { icon: "📈", title: "Prediction History", desc: "Track your predictions and an performance over time", color: "blue-light" },
  ];

  return (
    <section className="features-section">
      <h2 className="section-title">Powerful Features</h2>
      <div className="features-grid">
        {featuresData.map((f, index) => (
          <div key={index} className="feature-item">
            <div className={`icon-circle ${f.color}`}>{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;