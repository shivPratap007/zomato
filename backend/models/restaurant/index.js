const mongoose=require('mongoose');

const restaurantSchema= new mongoose.Schema({
   name:{type:String,requried:true},
   city:{type:String,requried:true},
   adderss:{type:String,required:true},
   mapLocation:{type:String,required:ture},
   cuisine:[String],
   restaurantTimings:String,
   contactNumber:Number,
   website:String,
   popularDishes:[String],
   averageCost:Number,
   amenties:[String],
   menuImage:{
    type:mongoose.Types.ObjectId,
    ref:"Images",
   },
   menu:{
    type:mongoose.Types.ObjectId,
    ref:"Menu",
   },
   reviews:[{type:mongoose.Types.ObjectId,ref:"Reviews"}],
   photos:{type:mongoose.Types.ObjectId,ref:"Images"},
},{timestamps:true});

const Restaurant=mongoose.model("Restaurant",restaurantSchema);
module.exports={Restaurant};