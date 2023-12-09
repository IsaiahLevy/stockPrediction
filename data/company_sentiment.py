import json
import pandas as pd

# Function to load JSON data
def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

# Load data
tweets = load_json('tweets_with_sentiments.json')
tweets_df = pd.DataFrame(tweets)

# Extract sentiment data
tweets_df[['positive_sentiment', 'neutral_sentiment', 'negative_sentiment']] = pd.DataFrame(
    tweets_df['sentiment'].tolist(), index=tweets_df.index)

# Convert date to datetime and extract year and month
tweets_df['date'] = pd.to_datetime(tweets_df['date'])
tweets_df['year_month'] = tweets_df['date'].dt.to_period('M')

# Define a function to calculate a sentiment score
def calculate_sentiment_score(row):
    return row['positive_sentiment'] - row['negative_sentiment']

# Calculate sentiment score for each tweet
tweets_df['sentiment_score'] = tweets_df.apply(calculate_sentiment_score, axis=1)

# Aggregate sentiment score per company per month
aggregated_sentiments = tweets_df.groupby(['company', 'year_month']).agg(
    average_sentiment_score=('sentiment_score', 'mean')
).reset_index()

# Convert 'year_month' to string to avoid serialization issues
aggregated_sentiments['year_month'] = aggregated_sentiments['year_month'].astype(str)

# Convert to JSON
aggregated_sentiments_json = aggregated_sentiments.to_json(orient='records', date_format='iso')

# Write to a file
with open('company_monthly_sentiment.json', 'w') as file:
    file.write(aggregated_sentiments_json)

print("Aggregated monthly company sentiments saved to 'company_monthly_sentiment.json'")
