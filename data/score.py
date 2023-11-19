import json
from transformers import BertTokenizer, BertForSequenceClassification
from torch.utils.data import DataLoader, SequentialSampler, TensorDataset
import torch

# Load FinBERT model and tokenizer
model = BertForSequenceClassification.from_pretrained('yiyanghkust/finbert-tone', num_labels=3)
tokenizer = BertTokenizer.from_pretrained('yiyanghkust/finbert-tone')

# Function to evaluate tweets
def finbert_predict(texts):
    inputs = tokenizer(texts, padding=True, truncation=True, return_tensors="pt", max_length=512)
    dataset = TensorDataset(inputs['input_ids'], inputs['attention_mask'])
    dataloader = DataLoader(dataset, sampler=SequentialSampler(dataset), batch_size=32)

    predictions = []
    for batch in dataloader:
        inputs = {'input_ids': batch[0], 'attention_mask': batch[1]}
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs[0]
            predictions.extend(torch.softmax(logits, dim=1).numpy())
    return predictions

# Load the JSON data
with open('filtered_tweets.json', 'r') as file:
    tweets_data = json.load(file)

# Extract tweets text for sentiment analysis
tweets = [tweet['tweet'] for tweet in tweets_data]

# Get sentiments
sentiments = finbert_predict(tweets)

# Attach the sentiment predictions to your JSON objects
for i, tweet in enumerate(tweets_data):
    tweet['sentiment'] = sentiments[i].tolist()  # Converting numpy array to list for JSON serialization

# Save the results with sentiment scores
with open('tweets_with_sentiments.json', 'w') as outfile:
    json.dump(tweets_data, outfile, indent=4)

print("Sentiment analysis completed and saved to tweets_with_sentiments.json")
