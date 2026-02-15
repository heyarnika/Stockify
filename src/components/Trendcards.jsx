import React from 'react';
import './Trendcards.css';

function Trendcards({ marketData }) {
    const gainers = marketData.filter(stock => stock.change >= 0).length;
    const losers = marketData.filter(stock => stock.change < 0).length;

    return (
        <> {/* Fragments allow the cards to be direct flex-children */}
            <div className="card active-accent">
                <div className="icon">📊</div>
                <div className="text">
                    <h4>Active Stocks</h4>
                    <p>{marketData.length}</p>
                </div>
            </div>

            <div className="card gainer-accent">
                <div className="icon">📈</div>
                <div className="text">
                    <h4>Gainers</h4>
                    <p className="green-text">{gainers}</p>
                </div>
            </div>

            <div className="card loser-accent">
                <div className="icon">📉</div>
                <div className="text">
                    <h4>Losers</h4>
                    <p className="red-text">{losers}</p>
                </div>
            </div>
        </>
    );
}

export default Trendcards;