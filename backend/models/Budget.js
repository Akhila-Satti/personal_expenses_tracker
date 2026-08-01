
const mongoose=require("mongoose");

const budgetsSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bn:{
        type:String,
        required:true
    },
    from:{
        type:Date,
        required:true
    },
    to:{

        type:Date,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
    /*
    bn: "food",
    to: "12-02-26",
    from: "12-01-26",
    amount: 10000
   */
},
    {
        timestamps:true
    }
);

const Budget = mongoose.model("Budget", budgetsSchema);
module.exports=Budget;