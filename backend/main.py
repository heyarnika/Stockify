from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf 
# This line now matches the function name in model_logic.py exactly
from model_logic import get_dynamic_forecast 

app = Flask(__name__)
# CORS allows your React app (port 5173) to talk to this Flask app (port 5000)
CORS(app)

@app.route('/market_snapshot', methods=['GET'])
def get_market_data():
    try:
        tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
                   "ICICIBANK.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS"]
        
        # We fetch 2 days of data to ensure we have the 'Open' price from the start of the day
        data = yf.download(tickers, period="2d", interval="1m", group_by='ticker')
        
        market_list = []
        for stock in tickers:
            if stock in data and not data[stock].empty:
                prices = data[stock]['Close'].dropna()
                opens = data[stock]['Open'].dropna()
                
                if not prices.empty and not opens.empty:
                    market_list.append({
                        "symbol": stock.replace(".NS", ""),
                        "price": round(prices.iloc[-1], 2),
                        "change": round(prices.iloc[-1] - opens.iloc[0], 2),
                        "change_percent": round(((prices.iloc[-1] - opens.iloc[0]) / opens.iloc[0]) * 100, 2)
                    })
        return jsonify(market_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        # 1. Capture the 'days' from the URL (e.g., /predict/tcs?days=7)
        # We use a default of 30 if the user hasn't picked anything
        days = int(request.args.get('days', 30))
        
        # 2. Call our AI Brain with the ticker and the number of days
        predictions = get_dynamic_forecast(ticker.lower(), days)
        
        # 3. Send the list of predicted prices back to the React chart
        return jsonify({
            "status": "success", 
            "ticker": ticker.upper(), 
            "forecast": predictions
        })
    except Exception as e:
        print(f"Server Error during prediction: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    # debug=True allows the server to restart automatically when you save changes
    app.run(port=5000, debug=True)