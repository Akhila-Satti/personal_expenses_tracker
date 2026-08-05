const Expense=require('../../models/Expense');
const Budget=require('../../models/Budget');
const mongoose= require('mongoose');
const totalvalue= async (req,res)=>{
   const userId = new mongoose.Types.ObjectId(req.id);
    const totalBudget=await Budget.aggregate([
        {
            $match:{
                userId:userId,
            }
        },{
            $group: {
        _id: null,
        totalBudget: { $sum: "$amount" }
    }
        }
    ])
    const totalExpense=await Expense.aggregate([
        {
            $match:{
                userId:userId,
            }
        },{
             $group: {
        _id: null,
        totalExpense: { $sum: "$amount" }
    }
        }
    ])
    return res.status(200).json({
        totalBudget:totalBudget[0]?.totalBudget||0,
        totalExpense:totalExpense[0]?.totalExpense||0
    })
}
module.exports=totalvalue;