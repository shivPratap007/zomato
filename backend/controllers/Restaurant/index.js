const express = require("express");

const Router = express.Router();

const { Restaurant } = require("../../models/allModels");

// http://localhost:5000/restaurant?city
Router.get("/", async (req, res) => {
  try {
    // Getting the city from params
    const { city } = req.query;
    const restaurants = await Restaurant.find({ city });

    return res.status(200).json({
      Restaurants: restaurants,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
});

// http:localhost:5000/restaurant/:_id
Router.get("/:_id", async (res, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await Restaurant.findById(_id);

    if (!restaurant)
      return res.status(400).json({ error: "Restaurant not found" });

    return res.status(200).json({
      Restaurant: restaurant,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
});

Router.get("/search/:searchString", async (req, res) => {
  try {

    const {searchString}=req.params;
    const restaurant=await Restaurant.find({
        name:{$regex:searchString,$options:"i"}
    })

    if(!restaurant) res.status(400).json({error:"No data available"});

    return res.status(200).json({
        Restaurant:restaurant,
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      error: error.message,
    });
  }
});

module.exports = Router;
