import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import os

# We now pass 'ticker' as an argument so this function is universal
def get_30_day_forecast(ticker):
    # 1. Create dynamic paths based on the ticker name
    data_path = f'backend/{ticker}_data.csv'
    model_path = f'backend/{ticker}_model.h5'
    
    # Load the specific data for the requested stock
    df = pd.read_csv(data_path, header=2)
    df.columns = ['Date', 'Close', 'High', 'Low', 'Open', 'Volume']
    
    close_prices = df[['Close']].values
    
    # Scaling MUST be consistent with how the model was trained
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(close_prices)
    
    # Load the specific 'Brain' for this company
    model = load_model(model_path)
    
    # Prepare the last 60 days of data for prediction
    last_60_days = scaled_data[-60:]
    x_future = last_60_days.reshape((1, 60, 1))
    
    # The Hallucination (Recursive Forecasting)
    future_predictions = []
    for _ in range(30):
        pred = model.predict(x_future, verbose=0)
        future_predictions.append(pred[0, 0])
        
        # Drop oldest day and add the new prediction to the window
        x_future = np.append(x_future[:, 1:, :], [[pred[0]]], axis=1)
    
    # Inverse scaling to get the actual stock prices
    future_predictions = np.array(future_predictions).reshape(-1, 1)
    unscaled_predictions = scaler.inverse_transform(future_predictions)
     
    # Convert to a list for Flask compatibility
    return unscaled_predictions.flatten().tolist()

# Testing block - you can change 'tcs' to 'reliance' to test different ones
if __name__ == "__main__":
    test_ticker = "tcs"
    print(f"Generating test forecast for {test_ticker}...")
    print(get_30_day_forecast(test_ticker)) 