from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf 
from model_logic import get_dynamic_forecast 

# 1. DEFINE the app first!
app = Flask(__name__)
CORS(app)

# 2. NOW you can define the routes
@app.route('/market_snapshot', methods=['GET'])
def get_market_data():
    try:
        tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
                   "ICICIBANK.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS"]
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
        days = int(request.args.get('days', 30))
        predictions = get_dynamic_forecast(ticker.lower(), days)
        return jsonify({"status": "success", "forecast": predictions})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/historical_data', methods=['GET'])
def get_historical():
    try:
        ticker = request.args.get('ticker', 'TCS')
        start = request.args.get('start', '2025-12-15')
        end = request.args.get('end', '2025-12-30')
        
        df = yf.download(f"{ticker.upper()}.NS", start=start, end=end)
        
        if df.empty:
            return jsonify({"status": "error", "message": "No data found"}), 404

        history_list = []
        for date, row in df.iterrows():
            # Support for both single and multi-index dataframes
            price_val = row['Close']
            if hasattr(price_val, 'iloc'):
                price_val = price_val.iloc[0]
                
            history_list.append({
                "date": date.strftime('%b %d'),
                "price": round(float(price_val), 2)
            })
            
        return jsonify({"status": "success", "forecast": history_list})
    except Exception as e:
        print(f"Historical Error: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

# 3. START the server at the very bottom
if __name__ == "__main__":
    app.run(port=5000, debug=True)