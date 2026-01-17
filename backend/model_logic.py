import numpy as np
import pandas as pd
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler

def get_30_day_forecast():
    # 1. Load the same data to get the most recent prices and the scaler(scaling and values MUST be same as in train.py)
    df = pd.read_csv('backend/tcs_data.csv', header=2)
    df.columns = ['Date', 'Close', 'High', 'Low', 'Open', 'Volume']
    

    close_prices = df[['Close']].values
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(close_prices)
    
    #  Load your trained brain
    model = load_model('backend/tcs_model.h5')
    
    # Prepare the last 60 days of data for prediction
    last_60_days = scaled_data[-60:]
    x_future = last_60_days.reshape((1, 60, 1))
    
    # The Hallucination
    future_predictions = []
    for _ in range(30):
        pred = model.predict(x_future, verbose=0) # verbose=0 keeps terminal clean!!
        future_predictions.append(pred[0, 0])
        
        # MOST IMP! Drop oldest add the new prediction
        x_future = np.append(x_future[:, 1:, :], [[pred[0]]], axis=1)
    
    # inversion
    future_predictions = np.array(future_predictions).reshape(-1, 1)
    unscaled_predictions = scaler.inverse_transform(future_predictions)
     
    # Convert to a simple list of numbers for Flask since it doesn't like numpy arrays thus the list
    return unscaled_predictions.flatten().tolist()

# only for quick testing of this file separately. COMMENT THIS PART OUT LATER!
if __name__ == "__main__":
    print("Generating test forecast...")
    print(get_30_day_forecast())