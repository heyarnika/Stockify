from flask import Flask, jsonify
from flask_cors import CORS
from model_logic import get_30_day_forecast

app = Flask(__name__)
# CORS allows your React frontend to talk to this Python backend
CORS(app)

# We use <ticker> so the URL can be /predict/reliance, /predict/infy, etc.
@app.route('/predict/<ticker>', methods=['GET'])
def predict_stock(ticker):
    try:
        # We pass the 'ticker' variable from the URL into our logic function
        predictions = get_30_day_forecast(ticker.lower())
        
        # If model_logic returned an error dictionary instead of a list
        if isinstance(predictions, dict) and "error" in predictions:
            return jsonify(predictions), 404

        # Send the numbers back to the website
        return jsonify({
            "status": "success",
            "ticker": ticker.upper(),
            "forecast": predictions
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    # Run the server on port 5000
    app.run(host='0.0.0.0', port=5000)