import json
import pandas as pd
import tensorflow as tf
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from imblearn.over_sampling import SMOTE
from datetime import datetime

# Function to load JSON data
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Load and preprocess data
tweets = load_json('tweets_with_sentiments.json')
stockData = load_json('stockData.json')

tweets_df = pd.DataFrame(tweets)
stock_df = pd.DataFrame(stockData)

tweets_df['date'] = pd.to_datetime(tweets_df['date']).dt.date
tweets_df[['positive_sentiment', 'neutral_sentiment', 'negative_sentiment']] = pd.DataFrame(tweets_df.sentiment.tolist(), index=tweets_df.index)
stock_df['date'] = pd.to_datetime(stock_df['date']).dt.date
stock_df['date'] = stock_df['date'] - pd.Timedelta(days=1)

# Convert 'open' and 'close' to numeric
stock_df['open'] = pd.to_numeric(stock_df['open'], errors='coerce')
stock_df['close'] = pd.to_numeric(stock_df['close'], errors='coerce')

combined_df = pd.merge(tweets_df, stock_df, on=['date', 'company'], how='left')
combined_df['target'] = (combined_df['close'] > combined_df['open']).astype(int)
combined_df['daily_return'] = (combined_df['close'] - combined_df['open']) / combined_df['open']

# Split data into training and testing sets
split_date = combined_df['date'].quantile(0.8, interpolation='nearest')
train_df = combined_df[combined_df['date'] <= split_date]
test_df = combined_df[combined_df['date'] > split_date]

features = ['positive_sentiment', 'neutral_sentiment', 'negative_sentiment', 'daily_return']
X_train, y_train = train_df[features], train_df['target']
X_test, y_test = test_df[features], test_df['target']

# Impute missing values
imputer = SimpleImputer(strategy='mean')
X_train = imputer.fit_transform(X_train)
X_test = imputer.transform(X_test)

# Apply SMOTE for handling class imbalance
smote = SMOTE(random_state=42)
X_train, y_train = smote.fit_resample(X_train, y_train)

# Define the deep learning model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dropout(0.5),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=50, batch_size=32, validation_split=0.2)

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test)
y_pred = model.predict(X_test)
y_pred = (y_pred > 0.5).astype(int).reshape(-1)

print("Deep Learning Model Accuracy:", accuracy)
print("Confusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("Classification Report:\n", classification_report(y_test, y_pred))
