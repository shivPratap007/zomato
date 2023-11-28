const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    idContainsEgg: { type: String, required: true },
    photos: { type: mongoose.Types.ObjectId, ref: "Images" },
    prices:{type:Number,default:150,requried:true},
    addOns:[{type:mongoose.Types.ObjectId,ref:"Food"}],
    restaurant:{type:mongoose.Types.ObjectId,ref:"Restaurants",required:true},
  },
  { timestamps: true }
);

const Food = mongoose.model("Food", foodSchema);
module.exports = { Food };
