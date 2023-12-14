require("dotenv").config();

require("@babel/core").transform("code", {
  presets: ["@babel/preset-env"],
});

// ===============================================================
// google authentication config
const { googleAuthConfig } = require("./config/google.config.js");
// ============================================================

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// =====================================
const passport = require("passport");
// ======================================
const app = express();
const session = require("express-session");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// ===================================
// middleware to use google auth
app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
googleAuthConfig(passport);
app.use(passport.initialize());
// app.use(passport.session());
// =================================

// Auth route
const authRoute = require("./controllers/Auth");
app.use("/auth", authRoute);

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
