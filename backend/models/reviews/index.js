const mongoose=require('mongoose');

const reviewSchema= new mongoose.Schema({
    food:{type:mongoose.Types.ObjectId, ref:"Food"},
    restaurant:{type:mongoose.Types.ObjectId, ref:"Restaurant"},
    user:{type:mongoose.Types.ObjectId,ref:"Users"},
    rating:{type:Number,required:true},
    reviewText:{type:String,required:true},
    isRestaurantReivew:Boolean,
    isFoodReview:Boolean,
    photos:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Images",
        },
    ], 
},{timestamps:true});

const Reviews=mongoose.model("Reviews",reviewSchema);
module.exports={Reviews};