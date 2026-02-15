from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import yfinance as yf 
import jwt
import datetime
from datetime import timezone
import os

# Assuming you have a gemini_chat.py file for the bot logic
from gemini_chat import get_chat_response 
from model_logic import get_dynamic_forecast 

app = Flask(__name__)
app.config["SECRET_KEY"] = "stockify_secure_key_2026"
CORS(app)
bcrypt = Bcrypt(app)

client = MongoClient("mongodb+srv://stockify_maker:blahblahidk@cluster0.ffdpe3g.mongodb.net/?appName=Cluster0")
db = client["stockify"]
users = db["users"]

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    bot_reply = get_chat_response(user_message)
    return jsonify({"status": "success", "reply": bot_reply})

@app.route('/historical_data', methods=['GET'])
def get_historical():
    try:
        ticker = request.args.get('ticker', 'TCS').upper()
        symbol = f"{ticker}.NS"
        df = yf.download(symbol, start='2025-12-15', end='2025-12-30', auto_adjust=True)
        history = []
        for d, r in df.iterrows():
            price = r['Close']
            if hasattr(price, 'iloc'): price = price.iloc[0]
            history.append({"date": d.strftime('%b %d'), "price": round(float(price), 2)})
        return jsonify({"status": "success", "forecast": history})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ... keep your login, signup, and market_snapshot routes as they were ...

if __name__ == "__main__":
    app.run(port=5000, debug=True)