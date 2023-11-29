const mongoose=require('mongoose');

const dbConnect=async (mongoDb_Url)=>{
    return mongoose.connect(mongoDb_Url);
}

module.exports={dbConnect};