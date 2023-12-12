import json
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import TimeSeriesSplit
from sklearn.impute import SimpleImputer
from sklearn.metrics import mean_absolute_error
from imblearn.over_sampling import SMOTE
from tensorflow.keras.layers import LSTM, Dense, Dropout
import matplotlib.pyplot as plt
import seaborn as sns
import shap
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, roc_auc_score

# Function to load JSON data
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Load and preprocess data
tweets = load_json('tweets_with_sentiments.json')
stockData = load_json('stockData.json')

tweets_df = pd.DataFrame(tweets)
stock_df = pd.DataFrame(stockData)

# Data preprocessing
tweets_df['date'] = pd.to_datetime(tweets_df['date']).dt.date
tweets_df[['positive_sentiment', 'neutral_sentiment', 'negative_sentiment']] = pd.DataFrame(tweets_df.sentiment.tolist(), index=tweets_df.index)
stock_df['date'] = pd.to_datetime(stock_df['date']).dt.date

# Convert 'open' and 'close' to numeric
stock_df['open'] = pd.to_numeric(stock_df['open'], errors='coerce')
stock_df['close'] = pd.to_numeric(stock_df['close'], errors='coerce')

# Aggregating sentiment scores per company per day
grouped_tweets = tweets_df.groupby(['date', 'company']).agg({'positive_sentiment': 'mean', 
                                                             'neutral_sentiment': 'mean', 
                                                             'negative_sentiment': 'mean'}).reset_index()

# Merging with stock data
combined_df = pd.merge(grouped_tweets, stock_df, on=['date', 'company'], how='left')

# Feature engineering: Adding technical indicators
combined_df['moving_average'] = combined_df.groupby('company')['close'].transform(lambda x: x.rolling(window=3).mean())

# Target variable
combined_df['target'] = (combined_df['close'] > combined_df['open']).astype(int)

# Split data into training and testing sets
split_date = combined_df['date'].quantile(0.8, interpolation='nearest')
train_df = combined_df[combined_df['date'] <= split_date]
test_df = combined_df[combined_df['date'] > split_date]

features = ['positive_sentiment', 'neutral_sentiment', 'negative_sentiment', 'moving_average']
X_train, y_train = train_df[features], train_df['target']
X_test, y_test = test_df[features], test_df['target']

# Impute missing values
imputer = SimpleImputer(strategy='mean')
X_train = imputer.fit_transform(X_train)
X_test = imputer.transform(X_test)

# Apply SMOTE for handling class imbalance
smote = SMOTE(random_state=42)
X_train, y_train = smote.fit_resample(X_train, y_train)

# Model Definition
def build_model(input_shape):
    model = tf.keras.Sequential([
        LSTM(50, return_sequences=True, input_shape=(input_shape, 1)),
        Dropout(0.2),
        LSTM(50),
        Dropout(0.2),
        Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Cross-validation
tscv = TimeSeriesSplit(n_splits=5)
cv_scores = []

for train_index, test_index in tscv.split(X_train):
    model = build_model(len(features))
    X_train_t, y_train_t = X_train[train_index], y_train[train_index]
    X_test_t, y_test_t = X_train[test_index], y_train[test_index]
    model.fit(X_train_t, y_train_t, epochs=50, batch_size=32, verbose=0)
    scores = model.evaluate(X_test_t, y_test_t, verbose=0)
    cv_scores.append(scores[1])
    print(f'Fold Score: {scores[1]}')

print(f'Mean CV Accuracy: {np.mean(cv_scores)}')

# Model Interpretability with SHAP
explainer = shap.KernelExplainer(model.predict, X_train[:100])
shap_values = explainer.shap_values(X_train[:100])
#shap.summary_plot(shap_values, X_train[:100], feature_names=features)


final_model = build_model(len(features))
final_model.fit(X_train, y_train, epochs=50, batch_size=32, verbose=0)

# Evaluate the model on the test set
y_pred = final_model.predict(X_test)
y_pred_class = (y_pred > 0.5).astype(int)

# Calculate and print evaluation metrics
accuracy = accuracy_score(y_test, y_pred_class)
conf_matrix = confusion_matrix(y_test, y_pred_class)
classification_rep = classification_report(y_test, y_pred_class)
roc_auc = roc_auc_score(y_test, y_pred)

print(f'Accuracy: {accuracy}')
print('Confusion Matrix:\n', conf_matrix)
print('Classification Report:\n', classification_rep)
print(f'ROC AUC Score: {roc_auc}')

# Save the model, adjust as needed
final_model.save('stock_prediction_model.h5')
