from flask import Flask, jsonify
from flask_cors import CORS
from model_logic import get_30_day_forecast

app = Flask(__name__)
# CORS allows your React frontend to talk to this Python backend
CORS(app)

@app.route('/predict/tcs', methods=['GET'])
def predict_tcs():
    try:
        # Call the logic from our model_logic.py file
        predictions = get_30_day_forecast()
        
        # Send the numbers back to the website
        return jsonify({
            "status": "success",
            "ticker": "TCS.NS",
            "forecast": predictions
        })
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    # Run the server on port 5000
    app.run(host='0.0.0.0', port=5000)