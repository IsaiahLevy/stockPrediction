const fs = require('fs');
const path = require('path');

async function fetchWithImport() {
    const fetch = (await import('node-fetch')).default;
    return fetch;
}

async function getStockPrices(symbol) {
    const fetch = await fetchWithImport();
    const API_KEY = 'TZZ5DWX3FW39H8RE';  // Replace with your actual API Key
    const BASE_URL = 'https://www.alphavantage.co/query';
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stock data for', symbol, ':', error);
        return null;
    }
}

const stockDataResults = [];

async function main() {
    const companies = ['AAPL', 'MSFT', 'AMZN', 'GOOGL'];
    const startDate = new Date('2022-05-01');
    const endDate = new Date('2022-11-30');

    for (const company of companies) {
        const stockData = await getStockPrices(company);
        if (stockData && stockData['Time Series (Daily)']) {
            const sortedDates = Object.keys(stockData['Time Series (Daily)']).sort((a, b) => new Date(b) - new Date(a));

            for (const date of sortedDates) {
                const dateObj = new Date(date);
                if (dateObj < startDate) {
                    break;  // Skip dates older than the start date
                }
                if (dateObj <= endDate) {
                    const priceData = stockData['Time Series (Daily)'][date];
                    const formattedData = {
                        company: company,
                        date: date,
                        open: priceData['1. open'],
                        high: priceData['2. high'],
                        low: priceData['3. low'],
                        close: priceData['4. close'],
                        volume: priceData['5. volume']
                    };
                    stockDataResults.push(formattedData);
                }
            }
        } else {
            console.log(`No daily data available for ${company}`);
        }
    }

    const filePath = path.join(__dirname, 'StockData.json');
    fs.writeFileSync(filePath, JSON.stringify(stockDataResults, null, 2));
    console.log(`Data written to ${filePath}`);
}

main();
