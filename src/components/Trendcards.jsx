import React from 'react';
import './Trendcards.css';

function Trendcards({ marketData }) {
    // These simple lines count how many stocks are green or red
    const gainers = marketData.filter(stock => stock.change >= 0).length;
    const losers = marketData.filter(stock => stock.change < 0).length;

    return (
        <div className="spacer">
            {/* Card 1: Total Stocks */}
            <div className="card">
                <div className="icon">📊</div>
                <div className="text">
                    <h3>Active Stocks</h3>
                    <p>{marketData.length}</p>
                </div>
            </div>

            {/* Card 2: Gainers */}
            <div className="card">
                <div className="icon">📈</div>
                <div className="text">
                    <h3>Gainers</h3>
                    <p className="green-text">{gainers}</p>
                </div>
            </div>

            {/* Card 3: Losers */}
            <div className="card">
                <div className="icon">📉</div>
                <div className="text">
                    <h3>Losers</h3>
                    <p className="red-text">{losers}</p>
                </div>
            </div>
        </div>
    );
}

export default Trendcards;