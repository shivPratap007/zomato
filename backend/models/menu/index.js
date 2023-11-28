const mongoose=require('mongoose');

const menuSchema= new mongoose.Schema({
   menus:[
    {
        name:{type:String,required:true},
        items:[
            {
                type:mongoose.Types.ObjectId,
                ref:"Food",
            }
        ]
    }
   ],
   recommended:[
    {
        type:mongoose.Types.ObjectId,
        ref:"Food",
        unique:true,
    }
   ]
},{timestamps:true});

const Menu=mongoose.model("Menu",menuSchema);
module.exports={Menu};