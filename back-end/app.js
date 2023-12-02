// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const mongoose = require("mongoose");
const connect_db = require("./db");
require("dotenv").config();

connect_db();

const homePage = require("./routes/homePage");
const infoPage = require("./routes/infoPage");
const demeanorPage = require("./routes/demeanorPage");

// use express' builtin body-parser middleware to parse data included in a request
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/static", express.static("public"));

app.use("/", homePage);
app.use("/", infoPage);
app.use("/", demeanorPage);

// export the express app we created to make it available to other modules
module.exports = app;
