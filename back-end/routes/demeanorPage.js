// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
const axios = require("axios"); // middleware for making requests to APIs
const router = require("express").Router();

router.post("/", (req, res) => {
  username = req.body.username;
  res.json("Demeanor Page");
  console.log("demeanor");
});

module.exports = router;