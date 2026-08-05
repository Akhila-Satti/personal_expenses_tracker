const Expense=require('../../models/Expense');
const Budget=require('../../models/Budget');
const mongoose=require("mongoose");
const editexpenses=async (req, res) => {
 if (!mongoose.Types.ObjectId.isValid(req.params.budgetId)) {
     return res.status(400).json({message:"Invalid Budget ID"});
 }
 if (!mongoose.Types.ObjectId.isValid(req.params.expenseId)) {
     return res.status(400).json({message:"Invalid Expense ID"});
 }
  const targetBudget=await Budget.findById(req.params.budgetId);
  if(!targetBudget){
    return res.status(404).json({message:"no such budget exists"});
  }
   const prevExpense=await Expense.findById(req.params.expenseId);
  if(!prevExpense){
    return res.status(404).json({message:"no such expense exists"});
  }
if(prevExpense.budgetId.toString() !== req.params.budgetId){
  return res.status(404).json({message:"The expense doesnt belong to that budget"});
}
 if(req.id!=targetBudget.userId.toString()){
    return res.status(403).json({message:"Unauthorised user"});
  }
   const expensedata=req.body;
  if(Object.keys(expensedata).length==0){
    return res.status(400).json({message:"No data to add"});
  }
  let spentOn=null;
  if(expensedata.spentOn){
     spentOn=new Date(req.body.spentOn);
  spentOn.setHours(0,0,0,0);
  }
  
 const datatoupdate={
    expensename:(expensedata.expensename??prevExpense.expensename).trim().toLowerCase(),
    spentOn:spentOn??prevExpense.spentOn,
    amount:expensedata.amount??prevExpense.amount
  }
  if(datatoupdate.amount<=0){
    return res.status(400).json({message:"amount should be positive to add"});
  }

  const expenseDate = new Date(datatoupdate.spentOn);
expenseDate.setHours(0, 0, 0, 0);

const budgetFrom = new Date(targetBudget.from);
budgetFrom.setHours(0, 0, 0, 0);

const budgetTo = new Date(targetBudget.to);
budgetTo.setHours(0, 0, 0, 0);

const today = new Date();
today.setHours(0, 0, 0, 0);

if (
    expenseDate < budgetFrom ||
    expenseDate > budgetTo ||
    expenseDate > today
) {
    return res.status(400).json({
        message: "Date must be within the budget timeline and cannot be after today"
    });
}
  const expenses=await Expense.find({
    budgetId:req.params.budgetId
  })
 let spent=0;
   for(const d of expenses){
    if(d._id.toString()===req.params.expenseId) continue;
    if(d.expensename==datatoupdate.expensename && new Date(datatoupdate.spentOn).toISOString().split("T")[0] ===
    new Date(d.spentOn).toISOString().split("T")[0]){
      return res.status(400).json({message:"Expense name must be unique within a same day"});
    }
    spent=spent+d.amount;
   }
   if(datatoupdate.amount>(targetBudget.amount-spent)){
    return res.status(400).json({message:"Expense amount exceeding the allocated budget"});
   }
   
  
  await prevExpense.updateOne(datatoupdate);
 
  res.status(201).json({
    message:"succesfully updated"
  });
}
module.exports=editexpenses;