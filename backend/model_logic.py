import numpy as np
import yfinance as yf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import os

def get_dynamic_forecast(ticker, days_to_predict):
    # 1. Locate the AI model file (e.g., tcs_model.h5)
    model_path = f'{ticker.lower()}_model.h5'
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"AI Model file '{model_path}' not found in backend folder.")

    # 2. Get 1 year of data to calibrate the 'Scaler'
    df = yf.download(f"{ticker.upper()}.NS", period="1y")
    data = df[['Close']].values
    
    # 3. Scaling: LSTM models need data between 0 and 1 to work correctly
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)
    
    # 4. Load the 'Brain' (.h5 file)
    model = load_model(model_path)
    
    # 5. Take the most recent 60 days to start the prediction window
    current_batch = scaled_data[-60:].reshape((1, 60, 1))
    
    future_predictions = []

    # 6. The Loop: We predict Day 1, then use Day 1's prediction to help predict Day 2
    for _ in range(days_to_predict):
        # Get one prediction point
        current_pred = model.predict(current_batch, verbose=0)
        future_predictions.append(current_pred[0, 0])
        
        # SLIDING WINDOW: Remove the oldest day, add the new prediction to the end
        new_row = current_pred.reshape(1, 1, 1)
        current_batch = np.append(current_batch[:, 1:, :], new_row, axis=1)
    
    # 7. Un-scale the data to turn 0.85 back into a real Rupee price like 3500.00
    future_predictions = np.array(future_predictions).reshape(-1, 1)
    actual_prices = scaler.inverse_transform(future_predictions)
    
    return actual_prices.flatten().tolist()