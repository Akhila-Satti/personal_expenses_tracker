const Expense=require('../../models/Expense');
const Budget=require('../../models/Budget');
const mongoose=require("mongoose");
const editexpenses=async (req, res) => {
 if (!mongoose.Types.ObjectId.isValid(req.params.budgetId)) {
     return res.status(400).send("Invalid Budget ID");
 }
 if (!mongoose.Types.ObjectId.isValid(req.params.expenseId)) {
     return res.status(400).send("Invalid Expense ID");
 }
  const targetBudget=await Budget.findById(req.params.budgetId);
  if(!targetBudget){
    return res.status(404).send("no such budget exists");
  }
   const prevExpense=await Expense.findById(req.params.expenseId);
  if(!prevExpense){
    return res.status(404).send("no such expense exists");
  }
if(prevExpense.budgetId.toString() !== req.params.budgetId){
  return res.status(404).send("The expense doesnt belong to that budget");
}
 if(req.id!=targetBudget.userId.toString()){
    return res.status(403).send("Unauthorised user");
  }
   const expensedata=req.body;
  if(Object.keys(expensedata).length==0){
    return res.status(400).send("No data to add");
  }
  
 const datatoupdate={
    expensename:(expensedata.expensename??prevExpense.expensename).trim().toLowerCase(),
    spentOn:expensedata.spentOn??prevExpense.spentOn,
    amount:expensedata.amount??prevExpense.amount
  }
  if(datatoupdate.amount<=0){
    return res.status(400).send("amount should be positive to add");
  }
  if(new Date(datatoupdate.spentOn)>new Date(targetBudget.to)||new Date(targetBudget.from)>new Date(datatoupdate.spentOn)||new Date(datatoupdate.spentOn)>Date.now()){
    return res.status(400).send("Date must be with in budget timeline and must be completed before this time");
   }
  const expenses=await Expense.find({
    budgetId:req.params.budgetId
  })
 let spent=0;
   for(const d of expenses){
    if(d._id.toString()===req.params.expenseId) continue;
    if(d.expensename==datatoupdate.expensename && new Date(datatoupdate.spentOn).toISOString().split("T")[0] ===
new Date(d.spentOn).toISOString().split("T")[0]){
      return res.status(400).send("Expense name must be unique within a same day");
    }
    spent=spent+d.amount;
   }
   if(datatoupdate.amount>(targetBudget.amount-spent)){
    return res.status(400).send("Expense amount exceeding the allocated budget");
   }
   
  
  await prevExpense.updateOne(datatoupdate);
 
  res.status(201).json({
    message:"succesfully updated"
  });
}
module.exports=editexpenses;