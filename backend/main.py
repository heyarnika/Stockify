from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
import datetime
from datetime import timezone
import yfinance as yf
import pandas as pd  # Added for data handling

# Database imports
from database import users, predictions

# Custom logic imports
from gemini_chat import get_chat_response
from model_logic import get_dynamic_forecast

app = Flask(__name__)
app.config["SECRET_KEY"] = "stockify_secure_key_2026"
CORS(app)
bcrypt = Bcrypt(app)

# ================= AUTH TOKEN MIDDLEWARE =================

def token_required(f):
    def wrapper(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token missing"}), 401
        try:
            token = token.split(" ")[1]
            decoded = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            request.user = decoded
        except Exception as e:
            return jsonify({"message": "Invalid token", "error": str(e)}), 401
        return f(*args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

# ================= MARKET SNAPSHOT =================

@app.route('/market_snapshot', methods=['GET'])
def get_market_data():
    try:
        tickers = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", 
                   "ICICIBANK.NS", "BHARTIARTL.NS", "ITC.NS", "SBIN.NS"]
        
        # Fetch 1-day market snapshot
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

# ================= HISTORICAL DATA (FIXED FOR MULTI-INDEX) =================

@app.route('/historical_data', methods=['GET'])
def get_historical_data():
    """Fetches historical price data and fixes potential MultiIndex errors."""
    try:
        ticker = request.args.get('ticker', 'TCS').upper()
        start_date = request.args.get('start')
        end_date = request.args.get('end')

        yf_ticker = f"{ticker}.NS"
        print(f"DEBUG: Fetching data for {yf_ticker} from {start_date} to {end_date}")

        # Download data from yfinance
        df = yf.download(yf_ticker, start=start_date, end=end_date)

        if df.empty:
            return jsonify({"status": "fail", "message": "No data found for these dates"}), 404

        # FIX: Flatten MultiIndex columns if present (prevents the 500 error)
        if isinstance(df.columns, pd.MultiIndex):
            df.columns = df.columns.get_level_values(0)

        # Format data for the PriceChart frontend component
        history = []
        for date, row in df.iterrows():
            # Safely extract the 'Close' price value
            close_price = row['Close']
            
            # If close_price is returned as a Series, take the first entry
            if hasattr(close_price, 'iloc'):
                close_price = close_price.iloc[0]

            history.append({
                "date": date.strftime('%b %d'), # Format: "Jan 01"
                "price": round(float(close_price), 2)
            })

        return jsonify({"status": "success", "forecast": history})

    except Exception as e:
        print(f"ERROR in historical_data: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

# ================= OTHER ROUTES =================

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    bot_reply = get_chat_response(data.get("message", ""))
    return jsonify({"status": "success", "reply": bot_reply})

@app.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        days = int(request.args.get('days', 30))
        forecast = get_dynamic_forecast(ticker.lower(), days)
        return jsonify({"status": "success", "forecast": forecast})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    hashed_pass = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    users.insert_one({"fullName": data["fullName"], "email": data["email"], "password": hashed_pass})
    return jsonify({"message": "Signup successful"})

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

@app.route("/profile", methods=["GET"])
@token_required
def profile():
    user = users.find_one({"email": request.user["email"]}, {"password": 0, "_id": 0})
    return jsonify({"user": user})

if __name__ == "__main__":
    app.run(port=5000, debug=True)