from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
import datetime
from datetime import timezone

# Database
from database import users, predictions

# Your custom logic
from gemini_chat import get_chat_response
from model_logic import get_dynamic_forecast

import yfinance as yf

app = Flask(__name__)
app.config["SECRET_KEY"] = "stockify_secure_key_2026"   # move to .env later
CORS(app)
bcrypt = Bcrypt(app)

# ================= AUTH TOKEN MIDDLEWARE =================

def token_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token missing"}), 401
        
        try:
            token = token.split(" ")[1]   # Remove "Bearer "
            decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            request.user = decoded
        except Exception as e:
            return jsonify({"message": "Invalid token", "error": str(e)}), 401
        
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# ================= CHATBOT =================

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    bot_reply = get_chat_response(user_message)
    return jsonify({"status": "success", "reply": bot_reply})

# ================= MARKET SNAPSHOT =================

@app.route('/market_snapshot', methods=['GET'])
def get_market_data():
    try:
        tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
                   "ICICIBANK.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS"]
        
        data = yf.download(tickers, period="1d", interval="1m", group_by='ticker')
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

# ================= STOCK PREDICTION =================

@app.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        days = int(request.args.get('days', 30))
        forecast = get_dynamic_forecast(ticker.lower(), days)

        # Get user from token (optional)
        token = request.headers.get("Authorization")
        if token:
            token = token.split(" ")[1]
            decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            email = decoded["email"]

            # Save prediction history
            predictions.insert_one({
                "email": email,
                "ticker": ticker.upper(),
                "days": days,
                "time": datetime.datetime.now(timezone.utc)
            })

        return jsonify({"status": "success", "forecast": forecast})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ================= SIGNUP =================

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400

    hashed_pass = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    users.insert_one({
        "fullName": data["fullName"],
        "email": data["email"],
        "password": hashed_pass
    })

    return jsonify({"message": "Signup successful"})

# ================= LOGIN =================

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = users.find_one({"email": data["email"]})

    if user and bcrypt.check_password_hash(user["password"], data["password"]):
        token = jwt.encode({
            "email": user["email"],
            "name": user["fullName"],
            "exp": datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=24)
        }, app.config["SECRET_KEY"], algorithm="HS256")

        return jsonify({"token": token})

    return jsonify({"message": "Invalid credentials"}), 401

# ================= PROFILE PAGE =================

@app.route("/profile", methods=["GET"])
@token_required
def profile():
    email = request.user["email"]

    user = users.find_one({"email": email}, {"password": 0, "_id": 0})
    history = list(predictions.find({"email": email}, {"_id": 0}).sort("time", -1).limit(10))

    return jsonify({
        "user": user,
        "prediction_history": history
    })

# ================= RUN SERVER =================

if __name__ == "__main__":
    app.run(port=5000, debug=True)
