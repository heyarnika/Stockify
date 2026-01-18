import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
import os

# The list of companies you downloaded
tickers = ['tcs', 'reliance', 'hdfcbank', 'infy', 'icicibank', 'itc', 'sbin', 'bhartiartl']

# This loop runs the "Factory" for every ticker in the list
for stock in tickers:
    print(f"\n--- Training Model for: {stock.upper()} ---")
    
    # --- STEP 1: LOAD AND CLEAN DATA ---
    # We use f-strings to load the correct file: e.g., 'backend/tcs_data.csv'
    df = pd.read_csv(f'backend/{stock}_data.csv', header=2)
    df.columns = ['Date', 'Close', 'High', 'Low', 'Open', 'Volume']
    df.set_index('Date', inplace=True)

    data = df[['Close']]
    dataset = data.values

    # Scale the data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(dataset)

    # Define training data length as 80%
    training_data_len = int(np.ceil(len(scaled_data) * 0.8))
    train_data = scaled_data[0:training_data_len, :]

    x_train = []
    y_train = []

    for i in range(60, len(train_data)):
        x_train.append(train_data[i-60:i, 0]) 
        y_train.append(train_data[i, 0]) 

    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    # --- STEP 4: BUILD THE AI BRAIN ---
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
    model.add(Dropout(0.2)) 
    model.add(LSTM(units=50, return_sequences=False))
    model.add(Dropout(0.2)) 
    model.add(Dense(units=25))
    model.add(Dense(units=1))

    model.compile(optimizer='adam', loss='mean_squared_error')

    # --- STEP 5: TRAIN ---
    # Running 5 epochs as we discussed
    model.fit(x_train, y_train, batch_size=1, epochs=5)

    # --- STEP 6: SAVE THE KNOWLEDGE ---
    # Each model gets its own name: e.g., 'backend/tcs_model.h5'
    model.save(f'backend/{stock}_model.h5')
    print(f"Success! {stock.upper()} model saved.")

print("\nALL MODELS TRAINED SUCCESSFULLY!")