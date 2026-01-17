import numpy as np
import pandas as pd
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
import os

# --- STEP 1: LOAD AND CLEAN DATA ---
print("Loading data...")
#header 2 so that the calc take place from the 3rd row
df = pd.read_csv('backend/tcs_data.csv', header=2)

# Fix the column names (Sometimes yfinance column titles differ)
# to grab the first column (Date) and the second column (usually Close)
df.columns = ['Date', 'Close', 'High', 'Low', 'Open', 'Volume']
df.set_index('Date', inplace=True)

# Focus on 'Close' prices for simplicity
data = df[['Close']]
dataset = data.values

# Scale the data for training
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(dataset)


# Define training data length as 80% of the total data
training_data_len = int(np.ceil(len(scaled_data) * 0.8))
train_data = scaled_data[0:training_data_len, :]

# Create empty lists for features (x_train) and target (y_train)
x_train = []
y_train = []

# Populate x_train with 60 days of data and y_train with the following day’s closing price
for i in range(60, len(train_data)):
    x_train.append(train_data[i-60:i, 0]) # The 60-day window
    y_train.append(train_data[i, 0])      # The answer (next day)

# Reshape x_train to the format [samples, time steps, features] required for LSTM
x_train, y_train = np.array(x_train), np.array(y_train)
x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

# --- STEP 4: BUILD THE AI BRAIN ---
print("Building the LSTM model...")
model = Sequential()

# First LSTM layer with 50 units and return sequences
model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1)))
model.add(Dropout(0.2))  # Dropout layer to prevent overfitting

# Second LSTM layer
model.add(LSTM(units=50, return_sequences=False))
model.add(Dropout(0.2))  # Dropout layer to prevent overfitting

# Dense layer with 25 units
model.add(Dense(units=25))

# Output layer with 1 unit (the predicted price)
model.add(Dense(units=1))

#  Train the Model
model.compile(optimizer='adam', loss='mean_squared_error')

print("Starting training (this may take a minute)...")
# maybe lets use 5 epochs instead 1 like the video?
model.fit(x_train, y_train, batch_size=1, epochs=5)

# --- STEP 6: SAVE THE KNOWLEDGE ---
# Create the file so we can load it in Flask without retraining
model.save('backend/tcs_model.h5')
print("\nSuccess! Model saved as 'backend/tcs_model.h5'")