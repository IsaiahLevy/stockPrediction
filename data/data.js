const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const results = [];
const companies = ['AAPL', 'MSFT', 'AMZN', 'TSLA', 'GOOGL', 'FB'];

fs.createReadStream(path.join(__dirname, 'stock_tweets.csv'))
  .pipe(csv())
  .on('data', (data) => {
    for (const company of companies) {
      if (data.Tweet.includes(company)) {
        results.push({
          date: data.Date,
          tweet: data.Tweet,
          company: company // Save the company ticker symbol
        });
        break; // Assuming only one company per tweet for this example
      }
    }
  })
  .on('end', () => {
    fs.writeFile('filtered_tweets.json', JSON.stringify(results, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log('Filtered tweets have been saved to filtered_tweets.json');
      }
    });
  });
