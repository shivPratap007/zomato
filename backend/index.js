require("dotenv").config();
require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// Using mongodb module
const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB).then(() => console.log("Connected to the database"));

app.get("/", (req, res) => {
  return res.json("Welcome to the zomato application");
});
