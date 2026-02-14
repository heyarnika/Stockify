import numpy as np
import yfinance as yf
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import os
from datetime import datetime, timedelta

def get_dynamic_forecast(ticker, days_to_predict):
    model_path = f'{ticker.lower()}_model.h5'
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"AI Model file '{model_path}' not found.")

    #to get 1 year of data and find the last market date
    df = yf.download(f"{ticker.upper()}.NS", period="1y")
    last_market_date = df.index[-1]
    data = df[['Close']].values
    
    #Scaling
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)
    
    #Load Model so it takes the last 60 rows if data for prediction
    model = load_model(model_path)
    current_batch = scaled_data[-60:].reshape((1, 60, 1))
    
    future_predictions = []

    # 4. Prediction Loop
    for i in range(days_to_predict):
        current_pred = model.predict(current_batch, verbose=0)
        future_predictions.append(current_pred[0, 0])
        
        new_row = current_pred.reshape(1, 1, 1)
        current_batch = np.append(current_batch[:, 1:, :], new_row, axis=1)
    
    # invrse scaling back into prices value
    actual_prices = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1)).flatten()
    
    final_forecast = []
    for i in range(days_to_predict):
        # Generates dates for the next X days
        next_date = last_market_date + timedelta(days=i + 1)
        final_forecast.append({
            "date": next_date.strftime('%b %d'), # Example: "Feb 10"
            "price": round(float(actual_prices[i]), 2)
        })
    
    return final_forecast