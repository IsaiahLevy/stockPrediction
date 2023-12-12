const express = require("express");
const fs = require("fs"); // Node.js File System module for reading files
const path = require("path"); // Node.js Path module
const axios = require("axios");
// const mongoose = require("mongoose");
const connect_db = require("./db");
const csv = require("csv-parser");
require("dotenv").config();

// Connect to database
// connect_db();

// Importing routes
const homePage = require("./routes/homePage");
const infoPage = require("./routes/infoPage");
const demeanorPage = require("./routes/demeanorPage");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware for handling Cross-Origin Requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Static files
app.use("/static", express.static("public"));

// Routes
app.use("/", homePage);
app.use("/", infoPage);
app.use("/", demeanorPage);

// Route to serve the sentiment data
app.get("/api/company-sentiment", (req, res) => {
  const filePath = path.join(__dirname, "./", "company_monthly_sentiment.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the sentiment file:", err);
      return res.status(500).send("Unable to retrieve sentiment data.");
    }
    res.json(JSON.parse(data));
  });
});

app.get("/api/stock-prediction/:company", (req, res) => {
  const companyTag = req.params.company.toUpperCase();
  const results = [];

  fs.createReadStream("stock_predictions.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      const companyData = results.filter((item) => item.company === companyTag);
      const latestPrediction = companyData[companyData.length - 1]; // Assuming the latest prediction is at the end

      if (latestPrediction) {
        res.json(latestPrediction);
      } else {
        res
          .status(404)
          .send("No prediction data found for the specified company.");
      }
    });
});
app.listen(7430, () => {
  console.log(`Server is running on port ${7430}`);
});

module.exports = app;
