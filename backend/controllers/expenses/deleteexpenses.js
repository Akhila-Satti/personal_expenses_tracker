const Expense=require('../../models/Expense');
const Budget=require('../../models/Budget');
const mongoose = require("mongoose");
const deleteexpenses=async (req, res) => {
  

if (!mongoose.Types.ObjectId.isValid(req.params.budgetId)) {
    return res.status(400).send("Invalid Budget ID");
}
if (!mongoose.Types.ObjectId.isValid(req.params.deleteId)) {
    return res.status(400).send("Invalid Expense ID");
}
 const relatedBudget=await Budget.findById(req.params.budgetId);

 if(!relatedBudget){
  return res.status(404).send("No such budget exist");
 }
  const deleteexpense=await Expense.findById(req.params.deleteId);
 
  if(!deleteexpense){
    return res.status(404).send("No data to delete");
  }
  if (deleteexpense.budgetId.toString() !== req.params.budgetId) {
    return res.status(404).send("Expense doesn't belong to this budget");
}
  if(req.id!==deleteexpense.userId.toString()){
    return res.status(403).send("Unauthorised");
  }
  await deleteexpense.deleteOne();
  return res.status(200).json({
    message:"deletedSuccesfully"
  });
  
}
module.exports=deleteexpenses;