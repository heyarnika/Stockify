import './Trendcards.css';

function Trendcards() {
  return (
    <div className="spacer">
      <div className="card">
        <div className="icon">📈</div>
        <div className="text">
          <h3>Active Stocks</h3>
          <p>8</p>
        </div>
      </div>

      <div className="card">
        <div className="icon">🌿</div>
        <div className="text">
          <h3>Gainers</h3>
          <p className="green">6</p>
        </div>
      </div>
      
      <div className="card">
        <div className="icon">🌿</div>
        <div className="text">
          <h3>Losers</h3>
          <p className="red">2</p>
        </div>
      </div>

      <div className="card">
        <div className="icon">🌿</div>
        <div className="text">
          <h3>Avg Change</h3>
          <p className="green">+1.16%</p>
        </div>
      </div>

    </div>
  );
}

export default Trendcards;