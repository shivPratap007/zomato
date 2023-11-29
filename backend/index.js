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

const { dbConnect } = require("./models/connection");

const mongoDb_Url = `${process.env.MONGODB_URL}/Zomato`;
const PORT = process.env.PORT;
dbConnect(mongoDb_Url)
  .then(() => {
    console.log("Database connection is complete");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  return res.json("Welcome to the zomato application");
});
