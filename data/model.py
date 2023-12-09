import json
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.metrics import classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# Function to load JSON data
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Load and preprocess data
tweets = load_json('tweets_with_sentiments.json')
stockData = load_json('stockData.json')

tweets_df = pd.DataFrame(tweets)
stock_df = pd.DataFrame(stockData)

# Extract sentiment data
tweets_df['positive_sentiment'] = tweets_df['sentiment'].apply(lambda x: x[0])
tweets_df['neutral_sentiment'] = tweets_df['sentiment'].apply(lambda x: x[1])
tweets_df['negative_sentiment'] = tweets_df['sentiment'].apply(lambda x: x[2])

# Aggregate tweet data
tweets_df['date'] = pd.to_datetime(tweets_df['date']).dt.date
aggregated_tweets = tweets_df.groupby(['date', 'company']).agg(
    mean_positive_sentiment=('positive_sentiment', 'mean'),
    mean_neutral_sentiment=('neutral_sentiment', 'mean'),
    mean_negative_sentiment=('negative_sentiment', 'mean'),
    tweet_count=('tweet', 'count')
).reset_index()

# Prepare stock data
stock_df['date'] = pd.to_datetime(stock_df['date']).dt.date
stock_df['target'] = (stock_df['close'] > stock_df['open']).astype(int)

# Merge datasets
combined_df = pd.merge(aggregated_tweets, stock_df, on=['date', 'company'])

# Exploratory Data Analysis (EDA) and Visualization
# Perform EDA and save plots as needed

# Split data into training and testing sets
features = ['mean_positive_sentiment', 'mean_neutral_sentiment', 'mean_negative_sentiment', 'tweet_count']
X = combined_df[features]
y = combined_df['target']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Impute missing values
imputer = SimpleImputer(strategy='mean')
X_train = imputer.fit_transform(X_train)
X_test = imputer.transform(X_test)

# Model Definition
def build_model(input_shape):
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(32, activation='relu', input_shape=(input_shape,)),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Train the model
model = build_model(X_train.shape[1])
model.fit(X_train, y_train, epochs=10, batch_size=32, verbose=0)

# Evaluate the model
predictions = model.predict(X_test)
print(classification_report(y_test, predictions.round()))

# Save predictions for each company
def make_predictions(data, model):
    predictions = []
    for company in data['company'].unique():
        latest_data = data[data['company'] == company].iloc[-1]
        X = latest_data[features].values.reshape(1, -1)
        X = imputer.transform(X)
        prob = model.predict(X)[0][0]
        prediction = 1 if prob > 0.5 else 0
        predictions.append({
            'company': company,
            'date': str(latest_data['date']),
            'prediction': prediction,
            'confidence': prob if prediction == 1 else 1 - prob
        })
    return predictions

company_predictions = make_predictions(combined_df, model)
predictions_df = pd.DataFrame(company_predictions)
predictions_df.to_csv('stock_predictions.csv', index=False)
print("Predictions saved to 'stock_predictions.csv'")
