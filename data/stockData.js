const fs = require('fs');

async function fetchWithImport() {
    const fetch = (await import('node-fetch')).default;
    return fetch;
}

async function getStockPrices(symbol, date) {
    const fetch = await fetchWithImport();
    const API_TOKEN = '5Ul0vTB1p5tLrLQnxxYYMaofc7zwhK8oM6b4AXKY';
    const BASE_URL = 'https://api.stockdata.org/v1/data/eod';
    const url = `${BASE_URL}?symbols=${symbol}&api_token=${API_TOKEN}&date=${date}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('API Response for', symbol, 'on', date, ':', data);
        return data;
    } catch (error) {
        console.error('Error fetching stock data for', symbol, 'on', date, ':', error);
        return null;
    }
}

// Read existing data from file
let stockDataResults = [];
try {
    stockDataResults = JSON.parse(fs.readFileSync('stockData.json', 'utf8'));
} catch (error) {
    console.log('No existing data file found, starting fresh.');
}

const companies = ['AAPL', 'MSFT', 'AMZN', 'GOOGL'];

async function main() {
    for (const company of companies) {
        for (let month = 5; month <= 10; month++) {
            for (let day = 1; day <= 31; day++) {
                const date = `2022-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                
                if (!stockDataResults.some(data => data.company === company && data.date === date)) {
                    const stockData = await getStockPrices(company, date);
                    if (stockData && stockData.data && stockData.data.length > 0) {
                        const formattedData = {
                            company: company,
                            date: date,
                            high: stockData.data[0].high,
                            low: stockData.data[0].low,
                            volume: stockData.data[0].volume,
                            dayChange: stockData.data[0].day_change,
                            week52High: stockData.data[0]['52_week_high'],
                            week52Low: stockData.data[0]['52_week_low'],
                            marketCap: stockData.data[0].market_cap,
                            previousClosePrice: stockData.data[0].previous_close_price
                        };
                        
                        stockDataResults.push(formattedData);
                    }
                }
                // Save data to file after each new entry
                fs.writeFileSync('stockData.json', JSON.stringify(stockDataResults, null, 2));
            }
        }
    }
}

main();
