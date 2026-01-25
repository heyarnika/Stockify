import Advisornav from '../components/Advisornav';
import Chatbot from '../components/Chatbot'; // Fixed import name
import './Advisor.css';

function Advisor() {
  return (
    <div className="pagebg">
      <Advisornav />

      <div className="chatbot-page-content">
        {/* Section 1: Header/Greeting */}
        <div className="advisor-greeting">
          <div className="bot-header">
            <span className="bot-icon">🤖</span>
            <div className="bot-status">
              <h2>Fin Advisor</h2>
              <p className="status-online">● AI-Powered Finance Assistant</p>
            </div>
          </div>
          <p className="advisor-desc">
            Get instant answers about stocks, derivatives, commodities, and investment strategies.
          </p>
        </div>

        {/* Section 2: The Chatbot Area */}
        <div className="chat-section">
          <Chatbot />
        </div>

        {/* Section 3: Information Cards */}
        <div className="advisor-cards">
          <div className="info-card card-blue">
            <h3>Stock Market Basics</h3>
            <p>Learn about stocks, trading, and market fundamentals</p>
          </div>
          <div className="info-card card-green">
            <h3>Investment Strategies</h3>
            <p>Discover diversification, SIPs, and portfolio management</p>
          </div>
          <div className="info-card card-purple">
            <h3>Risk Management</h3>
            <p>Understand risk tolerance and protective strategies</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advisor;