const mongoose=require('mongoose');

const orderSchema= new mongoose.Schema({
   user:{
    type:mongoose.Types.ObjectId,
    ref:"Users"
   },
   orderDetails:[
    {
        food:{type:mongoose.Types.ObjectId,ref:"Food"},
        quantity:{type:Number,required:true},
        paymode:{type:String,required:true},
        status:{type:String,default:"Placed"},
        paymenetDetails:{
            itemTotal:{type:Number,required:true},
            promo:{type:Number,required:true},
            tax:{type:Number,required:true},
        }
    }
   ]
},{timestamps:true});

const Order=mongoose.model("Order",orderSchema);
module.exports={Order};