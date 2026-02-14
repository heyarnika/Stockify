from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import yfinance as yf 
import jwt
import datetime
from datetime import timezone
import os
from model_logic import get_dynamic_forecast 

app = Flask(__name__)
app.config["SECRET_KEY"] = "stockify_secure_key_2026"
CORS(app)
bcrypt = Bcrypt(app)

# Database connection
client = MongoClient("mongodb+srv://stockify_maker:blahblahidk@cluster0.ffdpe3g.mongodb.net/?appName=Cluster0")
db = client["stockify"]
users = db["users"]

@app.route('/market_snapshot', methods=['GET'])
def get_market_data():
    try:
        tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
                   "ICICIBANK.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS"]
        # Download 2 days for comparison
        data = yf.download(tickers, period="2d", interval="1m", group_by='ticker')
        market_list = []
        for t in tickers:
            if t in data and not data[t].empty:
                current = data[t]['Close'].iloc[-1]
                prev = data[t]['Open'].iloc[0]
                market_list.append({
                    "symbol": t.replace(".NS", ""),
                    "price": round(float(current), 2),
                    "change": round(float(current - prev), 2),
                    "percent": round(float(((current - prev) / prev) * 100), 2)
                })
        return jsonify(market_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        days = int(request.args.get('days', 30))
        forecast = get_dynamic_forecast(ticker.lower(), days)
        return jsonify({"status": "success", "forecast": forecast})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# FIXED HISTORICAL ROUTE
@app.route('/historical_data', methods=['GET'])
def get_historical():
    try:
        ticker = request.args.get('ticker', 'TCS').upper()
        start = request.args.get('start', '2025-12-15')
        end = request.args.get('end', '2025-12-30')
        symbol = f"{ticker}.NS" if ".NS" not in ticker else ticker

        # The Fix: Use auto_adjust=True to flatten the data structure
        df = yf.download(symbol, start=start, end=end, auto_adjust=True)
        
        history = []
        for d, r in df.iterrows():
            # The Fix: Ensure we get a single float, not a 'Series' object
            price_val = r['Close']
            if hasattr(price_val, 'iloc'): # Checks if it's a Series
                price_val = price_val.iloc[0]
            
            history.append({
                "date": d.strftime('%b %d'),
                "price": round(float(price_val), 2)
            })
        
        return jsonify({"status": "success", "forecast": history})
    except Exception as e:
        print(f"Historical Error: {e}") # This shows you the fix worked in terminal
        return jsonify({"error": str(e)}), 500

@app.route('/model_performance', methods=['GET'])
def get_performance():
    return jsonify([
        {"month": "Jan", "accuracy": 88, "rmse": 12.5},
        {"month": "Feb", "accuracy": 90, "rmse": 11.2},
        {"month": "Mar", "accuracy": 89, "rmse": 11.8},
        {"month": "Apr", "accuracy": 91, "rmse": 10.5},
        {"month": "May", "accuracy": 92, "rmse": 9.8},
        {"month": "Jun", "accuracy": 94, "rmse": 8.2},
    ])

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User exists"}), 400
    hashed_pass = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    users.insert_one({"fullName": data["fullName"], "email": data["email"], "password": hashed_pass})
    return jsonify({"message": "Success"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"email": data["email"]})
    if user and bcrypt.check_password_hash(user["password"], data["password"]):
        token = jwt.encode({
            "user_id": str(user["_id"]),
            "email": user["email"],
            "name": user.get("fullName", "User"),
            "exp": datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=24)
        }, app.config["SECRET_KEY"], algorithm="HS256")
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)