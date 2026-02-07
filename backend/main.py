from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf 
from model_logic import get_30_day_forecast 

# 1. Initialize the Flask App
app = Flask(__name__)

# 2. Enable CORS
# This allows your React frontend (port 5173) to talk to this Python backend (port 5000)
CORS(app)

# 3. ROUTE: GET LIVE MARKET DATA
@app.route('/market_snapshot', methods=['GET'])
def get_market_data():
    try:
        # Our 8 core stocks
        tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
                   "ICICIBANK.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS"]
        
        # Period="2d" ensures we have data even if the market just opened or is closed
        data = yf.download(tickers, period="2d", interval="1m", group_by='ticker')
        
        market_list = []
        for stock in tickers:
            # Check if we successfully got data for this stock
            if stock in data and not data[stock].empty:
                # Remove rows with missing values (NaNs)
                prices = data[stock]['Close'].dropna()
                opens = data[stock]['Open'].dropna()
                
                if not prices.empty and not opens.empty:
                    current_price = prices.iloc[-1]
                    open_price = opens.iloc[0]
                    
                    change = current_price - open_price
                    change_percent = (change / open_price) * 100

                    market_list.append({
                        "symbol": stock.replace(".NS", ""),
                        "price": round(current_price, 2),
                        "change": round(change, 2),
                        "change_percent": round(change_percent, 2)
                    })
        
        return jsonify(market_list)
    except Exception as e:
        print(f"Backend Error: {e}")
        return jsonify({"error": str(e)}), 500

# 4. ROUTE: GET PREDICTIONS
@app.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        # This calls your custom LSTM logic from model_logic.py
        predictions = get_30_day_forecast(ticker.lower())
        
        return jsonify({
            "status": "success",
            "ticker": ticker.upper(),
            "forecast": predictions
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# 5. Start the Server
if __name__ == "__main__":
    # Use debug=True so the server restarts automatically when you save changes
    app.run(port=5000, debug=True)