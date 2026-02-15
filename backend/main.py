from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import yfinance as yf 
import jwt
import datetime
from datetime import timezone
import os

# Custom logic imports
from gemini_chat import get_chat_response 
from model_logic import get_dynamic_forecast 

app = Flask(__name__)
app.config["SECRET_KEY"] = "stockify_secure_key_2026"
CORS(app)
bcrypt = Bcrypt(app)

# Database connection
client = MongoClient("mongodb+srv://stockify_maker:blahblahidk@cluster0.ffdpe3g.mongodb.net/?appName=Cluster0")
db = client["stockify"]
users = db["users"]

# 1. AI Chatbot Endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    bot_reply = get_chat_response(user_message)
    return jsonify({"status": "success", "reply": bot_reply})

# 2. Market Dashboard Endpoint (RESTORED TO 8 STOCKS)
@app.route('/market_snapshot', methods=['GET'])
def get_market_data():
    try:
        # Full list of 8 trending stocks
        tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
                   "ICICIBANK.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS"]
        
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

# 3. Stock Prediction Endpoint
@app.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        days = int(request.args.get('days', 30))
        forecast = get_dynamic_forecast(ticker.lower(), days)
        return jsonify({"status": "success", "forecast": forecast})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 4. Historical Data Endpoint
@app.route('/historical_data', methods=['GET'])
def get_historical():
    try:
        ticker = request.args.get('ticker', 'TCS').upper()
        symbol = f"{ticker}.NS"
        # Standardized range for historical demo
        df = yf.download(symbol, start='2025-12-15', end='2025-12-30', auto_adjust=True)
        
        history = []
        for d, r in df.iterrows():
            price = r['Close']
            # Safeguard to extract single float value
            if hasattr(price, 'iloc'): 
                price = price.iloc[0]
            
            history.append({
                "date": d.strftime('%b %d'), 
                "price": round(float(price), 2)
            })
        return jsonify({"status": "success", "forecast": history})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 5. Model Metrics Endpoint (For Profile Trends)
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

# 6. User Authentication Endpoints
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    hashed_pass = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    users.insert_one({
        "fullName": data["fullName"], 
        "email": data["email"], 
        "password": hashed_pass
    })
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