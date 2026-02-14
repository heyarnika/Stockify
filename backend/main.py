from gemini_chat import get_chat_response
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask import Flask, jsonify, request
from flask_cors import CORS
from model_logic import get_30_day_forecast
import jwt
import datetime
from datetime import timezone
from functools import wraps
import os

# ================== APP CONFIG ==================
app = Flask(__name__)
app.config["SECRET_KEY"] = "82987745c4db9f5acf0b6998a73e064c37ecf5069497de240d57a1b3e373d8523"

CORS(app)
bcrypt = Bcrypt(app)

# ================== GEMINI CHATBOT API ==================
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "message" not in data:
        return jsonify({"error": "No message provided"}), 400

    user_message = data["message"]

    bot_reply = get_chat_response(user_message)

    return jsonify({
        "status": "success",
        "reply": bot_reply
    })

# ================== DATABASE ==================
client = MongoClient(
    "mongodb+srv://stockify_maker:blahblahidk@cluster0.ffdpe3g.mongodb.net/?appName=Cluster0"
)
db = client["stockify"]
users = db["users"]

# ================== STOCK PREDICTION API ==================
@app.route("/predict/<ticker>", methods=["GET"])
def predict_stock(ticker):
    try:
        predictions = get_30_day_forecast(ticker.lower())

        if isinstance(predictions, dict) and "error" in predictions:
            return jsonify(predictions), 404

        return jsonify({
            "status": "success",
            "ticker": ticker.upper(),
            "forecast": predictions
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ================== SIGNUP API ==================
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400

    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")

    users.insert_one({
        "fullName": data["fullName"],
        "email": data["email"],
        "password": hashed_password
    })

    return jsonify({"message": "Account created successfully"}), 201


# ================== LOGIN API ==================
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = users.find_one({"email": data["email"]})

    if not user or not bcrypt.check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Invalid email or password"}), 400

    token = jwt.encode(
        {
            "user_id": str(user["_id"]),
            "email": user["email"],
            "exp": datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=24)
        },
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token
    }), 200


# ================== JWT PROTECTED ROUTES ==================
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"message": "Token missing"}), 401

        try:
            jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        except:
            return jsonify({"message": "Invalid or expired token"}), 401

        return f(*args, **kwargs)

    return decorated


# ================== RUN SERVER ==================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

