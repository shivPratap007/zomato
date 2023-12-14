const express = require("express");

const Router = express.Router();

const validator = require("email-validator");

const { Users } = require("../../models/allModels");

const passport=require('passport');

//  - Router  => /signup
//  - Des     => Register new user
//  - Params  => none
//  - Access  => Public

// =====================================================
// Code to use google account access
Router.get('/google',passport.authenticate('google',{
  scope:[
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ]
}))

Router.get('google/callback',passport.authenticate('google',{failureRedirect:'/'}),
 (req,res)=>{
  return res.status(200).json({
    token:req.session.passport.user.token,status:true
  })
 }
)

// ==================================================

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phoneNumber, adderss } =
      req.body.credentials;
    const checkUserByEmail = await Users.findOne({ email });
    const checkUserByPhone = await Users.findOne({ phoneNumber });

    // Checking whether the email or phoneno. is already present or not
    if (checkUserByEmail || checkUserByPhone) {
      return res.status(500).json({
        status: false,
        message: "User already exists",
      });
    }

    if (!validator.validate(email)) {
      return res.status(500).json({
        status: false,
        message: "Email is not in proper format",
      });
    }

    // Entering into the DB
    const user = await Users.create({ ...req.body.credentials });

    const jwt = user.generateJwtTokens();

    res.status(200).json({
      jwt,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

Router.post("/signin", async (req, res) => {
  try {
    const { email, phoneNumber } = req.body.credentials;
    console.log(email);
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(500).json({
        statu: false.valueOf,
        message: "Phone no. or email is not correct",
      });
    } else if (user.email && user.phoneNumber == phoneNumber) {
      const token = user.generateJwtTokens();
      return res.status(200).json({
        status: true,
        token: token,
        message: "signin successful",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
});



module.exports = Router;
